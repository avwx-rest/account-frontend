<template>
    <div>
        <select v-model="language" v-on:change="setCode" class="form-select">
            <option v-for="lang in languages" :key="lang.display" :value="lang" :selected="language && language.value == lang.value">{{ lang.display }}</option>
        </select>
        <Prism :key="code" :language="language.value">{{ code }}</prism>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Prism from 'vue-prism-component'
import 'prismjs'
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-python.min.js'
import 'prismjs/themes/prism.css'

interface LanguageOption {
    display: string
    value: string
}

const languages: LanguageOption[] = [
    { display: 'cURL', value: 'bash' },
    { display: 'Javascript', value: 'javascript' },
    { display: 'Python', value: 'python' },
]

@Options({
    components: {
        Prism,
    }
})
export default class ApiCodeSampleForm extends Vue {
    languages = languages
    language = languages[0]
    code = ''

    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }

    get token(): string {
        let token
        if (this.loggedIn) {
            const firstToken = this.$store.state.user.tokens[0]
            if (firstToken) token = firstToken.value
        }
        return token || 'Your_Token_Value_Here'
    }

    public setCode(): void {
        console.log(this.language.value)
        switch(this.language.value) {
            case 'bash':
                this.code = `curl --request GET \\
  --url 'https://avwx.rest/api/metar/KMCO' \\
  --header 'Authorization: BEARER ${this.token}'`
                break
            case 'javascript':
                this.code = `const icao = 'KMCO'
const token = '${this.token}'
const resp = axios.get('https://avwx.rest/api/metar/' + icao, {
    headers: {
        Authorization: 'BEARER ' + token
    }
})
console.log(resp.data)`
                break
            case 'python':
                this.code = `icao = "KMCO"
token = "${this.token}"
resp = httpx.get("https://avwx.rest/api/metar/" + icao, headers={
    "Authorization": "BEARER " + token
})
print(resp.json())`
                break
            default:
                this.code = 'None'
                break
        }
    }

    public mounted(): void {
        this.setCode()
    }
}
</script>