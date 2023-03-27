import { StoreId } from '@/store/StoreId'
import { defineStore } from 'pinia'
import { useStorage, StorageSerializers } from '@vueuse/core'
import { requests as dummyRequests } from '@/data/requests'
import type { Deliverable, DeliverableDB } from '@/models'
import { generateRandomId } from '@/utils/generateRandomId'
import { useUserStore } from './useUserStore'
import { computed } from 'vue'

const userStore = useUserStore()
const userId = computed(() => userStore.getMe?.id)

export const useRequestsStore = defineStore(StoreId.Requests, {
  state: () => ({
    requests: useStorage<DeliverableDB[]>('requests', null, undefined, {
      serializer: StorageSerializers.object
    })
  }),
  getters: {
    getAllRequests: (state) => state.requests,
    getMyRequests: (state) => state.requests.filter((request) => request.userId === userId.value)
  },
  actions: {
    // populate with dummyData
    fetchRequests() {
      this.requests = dummyRequests
    },
    addRequest(request: Deliverable) {
      this.requests.push({
        ...request,
        id: generateRandomId(),
        userId: userId.value as string,
        createdAt: new Date()
      })
    },
    updateRequest(request: DeliverableDB) {
      this.requests = [...this.requests].map((el) =>
        el.id === request.id ? { ...el, ...request } : { ...el }
      )
    },
    deleteRequest(id: string) {
      this.requests = this.requests.filter((request) => request.id !== id)
    }
  }
})
