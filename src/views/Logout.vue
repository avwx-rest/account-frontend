<script lang="ts">
import { Options, Vue } from "vue-class-component"

@Options({})
export default class Home extends Vue {
    public created(): void {
        if (this.loggedIn) {
            this.$store.dispatch('auth/logout').then(
                this.$router.push('/')
            )
        } else {
            this.$router.push('/')
        }
    }
    
    get loggedIn(): boolean {
        return this.$store.state.auth.loggedIn
    }
}
</script>
