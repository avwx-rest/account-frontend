<template>
    <div class="modal fade" id="cancelPlanModal" tabindex="-1" aria-labelledby="planModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="planModalLabel">Cancel your Subscription?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>You're about to downgrade your subscirption.</p>
                    <p v-if="userHasAddons">You still have addons. Would you like to keep them and just downgrade your plan?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="$emit('change')" v-if="userHasAddons" type="button" class="btn btn-primary">Yes, Keep Addons</button>
                    <button @click="$emit('cancel')" type="button" class="btn btn-danger">{{ userHasAddons ? 'Cancel Everything' : 'Continue' }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user.module'
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component({
    emits: ['cancel', 'change'],
})
class CancelPlanModal extends Vue {
    userStore = useUserStore()

    get userHasAddons(): boolean {
        return this.userStore.addons.length > 0
    }
}

export default toNative(CancelPlanModal)
</script>