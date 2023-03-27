<template>
  <div class="page-auth">
    <TheHeader />
    <main class="page-auth__content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/TheHeader.vue'
import { useRequestsStore } from '@/store/composables/useRequestsStore'

const store = useRequestsStore()

if (!localStorage.getItem('requests')) {
  store.fetchRequests()
}
</script>

<style lang="scss" scoped>
.page-auth {
  display: grid;
  grid-template-rows: min-content 1fr;
  min-height: inherit;
  &__content {
    padding: 3rem 5rem;
    min-height: 100%;
  }
}
</style>
