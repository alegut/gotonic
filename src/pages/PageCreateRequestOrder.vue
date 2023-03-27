<template>
  <Card role="Create request">
    <template #title> Create order </template>
    <template #content>
      <CreateEditRequest :type="RequestType.Order" @submit="onCreateOrder" />
    </template>
  </Card>
</template>

<script lang="ts" setup>
import CreateEditRequest from '@/components/CreateEditRequest.vue'
import Card from 'primevue/card'
import { RequestType } from '@/models'
import { RouteName } from '@/router/RouteName'
import { useRequestsStore } from '@/store/composables/useRequestsStore'
import { useRoute, useRouter } from 'vue-router'
import type { Deliverable } from '@/models'

const store = useRequestsStore()
const router = useRouter()
const route = useRoute()

const onCreateOrder = (order: Deliverable) => {
  store.addRequest(order)
  router.push({ name: RouteName.UserRequests, params: { id: route.params.id } })
}
</script>

<style></style>
