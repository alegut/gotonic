import { StoreId } from '@/store/StoreId'
import { defineStore } from 'pinia'
import { useStorage, StorageSerializers } from '@vueuse/core'
import { generateRandomId } from '@/utils/generateRandomId'

interface User {
  name: string
  password: string
  id: string
}

export const useUserStore = defineStore(StoreId.User, {
  state: () => ({
    me: useStorage<User | null>('me', null, undefined, { serializer: StorageSerializers.object })
  }),
  getters: {
    getMe: (state) => state.me
  },
  actions: {
    // TODO replace with async fetch from backend
    fetchUser(user: { name: string; password: string }) {
      const { name, password } = user
      if (name === 'admin' && password === '123456') {
        this.me = {
          name,
          password,
          id: generateRandomId()
        }
      }
    }
  }
})
