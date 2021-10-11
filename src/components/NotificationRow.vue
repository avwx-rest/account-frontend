<template>
    <div>
        {{ notification.text }} |
        {{ displayDate }}
        <button @click="deleteNotification"><font-awesome-icon icon="trash" /></button>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { formatDistanceToNowStrict } from 'date-fns'
import { UserNotification } from '@/models/user'
import UserApi from '@/services/user.service'

@Options({
    props: {
        notification: { type: Object as PropType<UserNotification> },
    },
    emits: ['reload'],
})
export default class NotificationRow extends Vue {
    notification!: UserNotification

    get displayDate(): string {
        return formatDistanceToNowStrict(Date.parse(this.notification.timestamp), { addSuffix: true })
    }

    public deleteNotification(): void {
        console.log('Delete notification')
        UserApi.deleteNotification(this.notification).then(
            () => this.$emit('reload'),
            (error) => console.log(error),
        )
    }
}
</script>