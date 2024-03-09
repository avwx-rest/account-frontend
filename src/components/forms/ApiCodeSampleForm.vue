<template>
    <div>
        <select v-model="language" v-on:change="setCode" class="form-select">
            <option v-for="lang in languages" :key="lang.display" :value="lang" :selected="language && language.value == lang.value">{{ lang.display }}</option>
        </select>
        <Prism :key="code" :language="language.value">{{ code }}</prism>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import Prism from 'vue-prism-component'
import 'prismjs'
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-python.min.js'
import 'prismjs/themes/prism.css'
import { Token } from '@/models/token'
import { useUserStore } from '@/stores/user.module'

interface LanguageOption {
    display: string
    value: string
}

const languages: LanguageOption[] = [
    { display: 'cURL', value: 'bash' },
    { display: 'Javascript', value: 'javascript' },
    { display: 'Python', value: 'python' },
]

@Component({
    components: {
        Prism,
    }
})
class ApiCodeSampleForm extends Vue {
    languages = languages
    language = languages[0]
    code = ''

    userStore = useUserStore()

    get userToken(): Token | undefined {
        return this.userStore.user?.tokens[0]
    }

    public setCode(): void {
        const token = this.userToken
        const value = token?.value || 'Your_Token_Value_Here'
        const name = token?.name || 'token'
        switch(this.language.value) {
            case 'bash':
                this.code = `# Value of ${name}
curl --request GET \\
  --url 'https://avwx.rest/api/metar/KMCO' \\
  --header 'Authorization: BEARER ${value}'`
                break
            case 'javascript':
                this.code = `const icao = 'KMCO'
// Value of ${name}
const token = '${value}'
const resp = axios.get('https://avwx.rest/api/metar/' + icao, {
    headers: {
        Authorization: 'BEARER ' + token
    }
})
console.log(resp.data)`
                break
            case 'python':
                this.code = `icao = "KMCO"
# Value of ${name}
token = "${value}"
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

export default toNative(ApiCodeSampleForm)
</script>