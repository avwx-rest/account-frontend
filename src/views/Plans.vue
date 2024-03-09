<template>
    <div class="container py-3">
        <Header title="Plans" subtitle="Build your project, application, or business with the features and call volume that you need. Basic reports and station information are available to all users while Pro and Enterprise users unlock advanced features with higher daily limits." />
        <main>
            <PlanList />
            <div class="p-3 pb-md-4 mx-auto text-center">
                <h1 class="display-4 fw-normal" style="color: #4f68ae">Addons</h1>
                <p class="fs-5 text-muted">Add additional features to any plan. Yes, even the Hobby plan.</p>
            </div>
            <AddonList />
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import Header from '@/components/Header.vue'
import AddonList from '@/components/lists/AddonList.vue'
import PlanList from '@/components/lists/PlanList.vue'

@Component({
    components: {
        AddonList,
        Header,
        PlanList,
    },
})
class Plans extends Vue {}

export default toNative(Plans)
</script>