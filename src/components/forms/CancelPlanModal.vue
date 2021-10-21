<template>
    <transition name="modal">
        <div>
            <h3>Cancel your Subscription?</h3>
            <p>You're about to downgrade your subscirption</p>
            <div v-if="userHasAddons">
                <p>You still have addons. Would you like to keep them and just downgrade your plan?</p>
                <button @click="$emit('change')">Yes, Keep Addons</button>
            </div>
            <button @click="$emit('cancel')">{{ userHasAddons ? 'Cancel Everything' : 'Continue' }}</button>
            <button @click="$emit('close')">Go Back</button>
        </div>
    </transition>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    emits: ['cancel', 'change', 'close'],
})
export default class CancelPlanModal extends Vue {
    get userHasAddons(): boolean {
        return this.$store.state.user.addons.length > 0
    }
}
</script>