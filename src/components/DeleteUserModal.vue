<template>
    <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Delete Your Account?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>You're about to delete your account. This action will delete all user info and cannot be reversed.</p>
                    <p>Type your email to confirm deletion.</p>
                    <p><input v-model="email" placeholder="email" /></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="$emit('delete')" :disabled="isDisabled" type="button" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user.module'
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component({
    emits: ['delete'],
})
class DeleteUserModal extends Vue {
    email = ''

    userStore = useUserStore()

    get isDisabled(): boolean {
        return this.userStore.user?.email != this.email
    }
}

export default toNative(DeleteUserModal)
</script>