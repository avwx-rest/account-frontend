<template>
    <section>
        <DeleteUserModal @close="showDeleteModal = false" @delete="deleteUser()" />
        <h2 class="title-danger">Danger Zone</h2>
        <button class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal"><font-awesome-icon icon="trash" /> Delete Account</button>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useToast } from 'vue-toastification'
import DeleteUserModal from '@/components/DeleteUserModal.vue'
import UserApi from '@/services/user.service'
import { AxiosError } from 'axios'

@Options({
    components: {
        DeleteUserModal,
    },
})
export default class DangerZone extends Vue {
    toast = useToast()

    public deleteUser(): void {
        console.log("delete user")
        UserApi.deleteUser().then(
            () => {
                Promise.all([
                    this.$store.dispatch('auth/logout'),
                    this.$store.dispatch('user/clear'),
                ]).then(
                    () => {
                        for (const item of document.getElementsByClassName('modal-backdrop')) item.remove()
                        this.toast.success('Account deleted')
                        this.$router.push('/')
                    }
                )
            },
            (error: Error | AxiosError) => {
                console.log(error)
            }
        )
    }
}
</script>

<style lang="scss">
.title-danger {
    color: #bb2d3b;
}
</style>