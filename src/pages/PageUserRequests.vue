<template>
  <PageTitle>My Requests</PageTitle>
  <RequestsTable v-if="requests.length" :requests="requests" />
  <p v-else>Nothing to show here yet</p>
</template>

<script lang="ts" setup>
import { useRequestsStore } from '@/store/composables/useRequestsStore'
import { computed } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import RequestsTable from '@/components/RequestsTable.vue'

const store = useRequestsStore()
const requests = computed(() => store.getMyRequests)
</script>

<style></style>
