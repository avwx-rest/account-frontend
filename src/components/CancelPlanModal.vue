<template>
    <div class="modal fade" id="cancelPlanModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cancel your Subscription?</h5>
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
import { Options, Vue } from 'vue-class-component'

@Options({
    emits: ['cancel', 'change'],
})
export default class CancelPlanModal extends Vue {
    get userHasAddons(): boolean {
        return this.$store.state.user.addons.length > 0
    }

    public static hideModal(): void {
        const modal = document.getElementById('cancelPlanModal')
        if (modal) modal.remove()
        for (const item of document.getElementsByClassName('modal-backdrop')) item.remove()
    }
}
</script>