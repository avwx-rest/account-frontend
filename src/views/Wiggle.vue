<template>
    <div class="container py-3">
        <Header title="Wiggle View" subtitle="Hello there wiggler. Enter the endpoint and email before requesting changes." />
        <main>
            <WiggleForm :header="header" />
            <p><UserDetailForm :header="header" /></p>
            <p><UserUsageForm :header="header" /></p>
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import Header from '@/components/Header.vue'
import UserUsageForm from '@/components/forms/UserUsageForm.vue'
import WiggleForm from '@/components/forms/WiggleForm.vue'
import UserDetailForm from '@/components/forms/UserDetailForm.vue'
import { WiggleHeader } from '@/models/wiggle'

@Component({
    components: {
        WiggleForm,
        Header,
        UserDetailForm,
        UserUsageForm,
    }
})
class ApiUsage extends Vue {
    header: WiggleHeader = { root: "", email: "" }
}

export default toNative(ApiUsage)
</script>