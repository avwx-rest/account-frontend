<template>
    <div>
        <select v-model="language" class="form-select">
            <option v-for="lang in languages" :key="lang.display" :value="lang" :selected="language && language.value == lang.value">{{ lang.display }}</option>
        </select>
        <Prism :language="language.value">{{ code }}</prism>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Prism from 'vue-prism-component'
import 'prismjs'
import 'prismjs/components/prism-shell-session.min.js'
import 'prismjs/components/prism-python.min.js'
import 'prismjs/themes/prism.css'

interface LanguageOption {
    display: string
    value: string
}

const languages: LanguageOption[] = [
    { display: 'Python', value: 'python' },
    { display: 'cURL', value: 'shell-session' },
    { display: 'Javascript', value: 'javascript' },
]

@Options({
    components: {
        Prism,
    }
})
export default class ApiCodeSampleForm extends Vue {
    languages = languages
    language = languages[0]

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

    // NOTE: Code Prism section is not yet refreshing after language change
    get code(): string {
        console.log(this.language.value)
        switch(this.language.value) {
            case 'shell-session':
                return `curl --request GET \\
  --url 'https://avwx.rest/api/metar/KMCO' \\
  --header 'Authorization: BEARER ${this.token}'`
            case 'javascript':
                return `const icao = 'KMCO'
const token = '${this.token}'
axios.get('https://avwx.rest/api/metar/' + icao, {
    headers: {
        Authorization: 'BEARER ' + token
    }
})`
            case 'python':
                return `icao = "KMCO"
token = "${this.token}"
httpx.get("https://avwx.rest/api/metar/" + icao, headers={
    "Authorization": "BEARER " + token
})`
            default:
                return 'None'
        }
    }
}
</script>