<template>
  <div>
    <PageTitle>All Requests</PageTitle>
    <RequestsTable v-if="requests.length" :requests="requests" />
    <p v-else>Nothing to show here yet</p>
  </div>
</template>

<script lang="ts" setup>
import PageTitle from '@/components/PageTitle.vue'
import { useRequestsStore } from '@/store/composables/useRequestsStore'
import RequestsTable from '@/components/RequestsTable.vue'
import { computed } from 'vue'

const store = useRequestsStore()
const requests = computed(() => store.getAllRequests)
</script>

<style></style>
