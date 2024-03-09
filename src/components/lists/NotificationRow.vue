<template>
    <div>
        {{ notification.text }} |
        {{ displayDate }}
        <button @click="deleteNotification"><font-awesome-icon icon="trash" /></button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import { formatDistanceToNowStrict } from 'date-fns'
import { UserNotification } from '@/models/user'
import UserApi from '@/services/user.service'

@Component({
    emits: ['reload'],
})
class NotificationRow extends Vue {
    @Prop
    notification!: UserNotification

    get displayDate(): string {
        return formatDistanceToNowStrict(Date.parse(this.notification.timestamp), { addSuffix: true })
    }

    public deleteNotification(): void {
        UserApi.deleteNotification(this.notification).then(
            () => this.$emit('reload'),
            (error) => console.log(error),
        )
    }
}

export default toNative(NotificationRow)
</script>