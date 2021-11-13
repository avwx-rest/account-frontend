<template>
    <section>
        <h2>Contact Information</h2>
        <ProfileEdit v-if="showProfileEdit" :user="updateFields" @close="showProfileEdit = false" />
        <div v-else>
            <p>First: {{ user.first_name || '' }}</p>
            <p>Last: {{ user.last_name || '' }}</p>
            <button @click="showProfileEdit = true" class="btn btn-primary">
                <font-awesome-icon icon="edit" /> Edit
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import ProfileEdit from '@/components/forms/ProfileEdit.vue'
import { User, UserUpdate } from '@/models/user'

@Options({
    props: {
        user: { type: Object as PropType<User> }
    },
    components: {
        ProfileEdit,
    },
})
export default class Settings extends Vue {
    user!: User
    showProfileEdit = false

    get updateFields(): UserUpdate {
        return {
            first_name: this.user.first_name,
            last_name: this.user.last_name,
        }
    }
}
</script>