<template>
    <section>
        <DeleteUserModal @delete="deleteUser()" />
        <h2 class="title-danger">Danger Zone</h2>
        <button class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal"><font-awesome-icon icon="trash" /> Delete Account</button>
    </section>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { useToast } from 'vue-toast-notification'
import DeleteUserModal from '@/components/DeleteUserModal.vue'
import UserApi from '@/services/user.service'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth.module'
import { useUserStore } from '@/stores/user.module'

@Component({
    components: {
        DeleteUserModal,
    },
})
class DangerZone extends Vue {
    toast = useToast()
    authStore = useAuthStore()
    userStore = useUserStore()

    public hideDeleteModal(): void {
        const modal = document.getElementById('deleteUserModal')
        if (modal) modal.remove()
        for (const item of document.getElementsByClassName('modal-backdrop')) item.remove()
    }

    public deleteUser(): void {
        UserApi.deleteUser().then(
            () => {
                Promise.all([
                    this.authStore.logout(),
                    this.userStore.clear(),
                ]).then(
                    () => {
                        this.hideDeleteModal()
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

export default toNative(DangerZone)
</script>

<style lang="scss">
.title-danger {
    color: #bb2d3b;
}
</style>