<template>
  <Toolbar>
    <template #start>
      <router-link :to="{ name: RouteName.AllRequests }" class="p-button p-button-text"
        >Gotonic Test / Oleksii Guzenkov</router-link
      >
    </template>

    <template #end>
      <TheMenu />
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { RouteName } from '@/router/RouteName'
import TheMenu from '@/components/TheMenu.vue'
import Toolbar from 'primevue/toolbar'
</script>

<style scoped lang="scss">
.the-header {
  height: 5rem;
  z-index: 997;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 2rem;
  transition: left 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 5px rgb(0 0 0 / 2%), 0px 0px 2px rgb(0 0 0 / 5%), 0px 1px 4px rgb(0 0 0 / 8%);
}
</style>
