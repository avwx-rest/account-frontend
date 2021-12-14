<template>
    <div>
        <button @click="showList = !showList"><font-awesome-icon icon="bell" /> {{ notifications.length }}</button>
        <div v-if="showList">
            <p v-show="notifications.length == 0">No Notifications</p>
            <NotificationRow v-for="notification in notifications" :key="notification" :notification="notification" @reload="update" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import NotificationRow from '@/components/lists/NotificationRow.vue'
import { UserNotification } from '@/models/user'

@Options({
    components: {
        NotificationRow,
    }
})
export default class NotificationList extends Vue {
    showList = false

    get notifications(): UserNotification[] {
        return this.$store.state.user.notifications
    }

    public update(): void {
        this.$store.dispatch('user/getNotifications')
    }
}
</script>