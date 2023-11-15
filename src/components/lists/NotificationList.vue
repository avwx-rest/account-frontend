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
import { Component, Vue, toNative } from 'vue-facing-decorator'
import NotificationRow from '@/components/lists/NotificationRow.vue'
import { UserNotification } from '@/models/user'
import { useUserStore } from '@/stores/user.module'

@Component({
    components: {
        NotificationRow,
    }
})
class NotificationList extends Vue {
    showList = false

    userStore = useUserStore()

    get notifications(): UserNotification[] {
        return this.userStore.notifications
    }

    public update(): void {
        this.userStore.getNotifications()
    }
}

export default toNative(NotificationList)
</script>