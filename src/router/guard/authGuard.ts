import { RouteName } from '@/router/RouteName'
import { useUserStore } from '@/store/composables/useUserStore'
import type { NavigationGuard } from 'vue-router'

export const authGuard: NavigationGuard = (to) => {
  const store = useUserStore()

  if (!store.getMe?.id) {
    const redirectTo = encodeURIComponent(to.fullPath)
    return { name: RouteName.Login, query: { 'redirect-to': redirectTo } }
  }
}
