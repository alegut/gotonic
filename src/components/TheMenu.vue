<template>
  <nav>
    <ul class="the-menu">
      <router-link
        v-for="link in links"
        :key="link.name"
        :to="link.to"
        active-class="the-menu__link--active"
        >{{ link.name }}</router-link
      >
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { RouteName } from '@/router/RouteName'
import { computed } from 'vue'
import { useUserStore } from '@/store/composables/useUserStore'

const store = useUserStore()
const id = computed(() => store.getMe?.id)

const links: { to: { name: RouteName; params?: { id?: string } }; name: string }[] = [
  { to: { name: RouteName.AllRequests }, name: 'All Requests' },
  { to: { name: RouteName.UserRequests, params: { id: id.value } }, name: 'My Requests' },
  { to: { name: RouteName.CreateRequestType, params: { id: id.value } }, name: 'Create Request' }
]
</script>

<style lang="scss" scoped>
.the-menu {
  display: flex;
  gap: 10px;
  &__link {
    &--active {
      color: #2196f3;
    }
  }
}
</style>
