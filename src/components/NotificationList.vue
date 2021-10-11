<template>
    <div>
        <button @click="showList = !showList"><font-awesome-icon icon="bell" /> {{ notifications.length }}</button>
        <div v-if="showList">
            <p v-show="notifications.length == 0">No Notifications</p>
            <NotificationRow v-for="notification in notifications" :key="notification" v-bind:notification="notification" @reload="update" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NotificationRow from '@/components/NotificationRow.vue'
import { UserNotification } from '@/models/user'
import UserApi from '@/services/user.service'

@Options({
    components: {
        NotificationRow,
    }
})
export default class NotificationList extends Vue {
    notifications: UserNotification[] = []
    showList = false

    public mounted(): void {
        this.notifications = this.$store.state.auth?.user?.notifications || []
    }

    public update(): void {
        UserApi.getNotifications().then(
            (notifications) => this.notifications = notifications,
            (error) => console.log(error),
        )
    }
}
</script>