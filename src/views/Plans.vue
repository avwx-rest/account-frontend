<template>
    <div class="container py-3">
        <Header title="Plans" subtitle="Build your project, application, or business with the features and call volume that you need. Basic reports and station information are available to all users while Pro and Enterprise users unlock advanced features with higher daily limits." />
        <main>
            <PlanList />
        </main>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Header from '@/components/Header.vue'
import PlanList from '@/components/lists/PlanList.vue'

@Options({
    components: {
        Header,
        PlanList,
    },
})
export default class Plans extends Vue {}
</script>