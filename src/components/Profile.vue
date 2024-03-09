<template>
    <section>
        <h2>Contact Information</h2>
        <ProfileEdit v-if="showProfileEdit" :user="updateFields" @close="showProfileEdit = false" />
        <div v-else>
            <p>Email: {{ user.email || '' }}</p>
            <p>First: {{ user.first_name || '' }}</p>
            <p>Last: {{ user.last_name || '' }}</p>
            <button @click="showProfileEdit = true" class="btn btn-primary">
                <font-awesome-icon icon="edit" /> Edit
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import ProfileEdit from '@/components/forms/ProfileEdit.vue'
import { User, UserUpdate } from '@/models/user'

@Component({
    components: {
        ProfileEdit,
    },
})
class Profile extends Vue {
    @Prop
    user!: User
    showProfileEdit = false

    get updateFields(): UserUpdate {
        return {
            email: this.user.email,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
        }
    }
}

export default toNative(Profile)
</script>