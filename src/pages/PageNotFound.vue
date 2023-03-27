<template>
  <div class="page-not-found">
    <PageTitle>Page Not Found</PageTitle>
    <Button type="submit" label="Go to requests" @click.prevent="onGoToRequests" />
  </div>
</template>

<script setup>
import { RouteName } from '@/router/RouteName'
import { useUserStore } from '@/store/composables/useUserStore'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import PageTitle from '@/components/PageTitle.vue'

const router = useRouter()
const store = useUserStore()

const onGoToRequests = () => {
  router.push({ name: RouteName.AllRequests, params: { id: store.getMe } })
}
</script>

<style lang="scss" scoped>
.page-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}
</style>
