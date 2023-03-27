<template>
  <form class="create-edit-order__form">
    <div class="p-inputgroup flex-1">
      <SearchDropdown
        v-model="doc.from"
        :options="searchedCities"
        label="name"
        placeholder="From"
      />
    </div>
    <div class="p-inputgroup flex-1">
      <SearchDropdown v-model="doc.to" :options="searchedCities" label="name" placeholder="To" />
    </div>
    <div class="p-inputgroup flex-1">
      <Calendar
        v-model="doc.dispatchDate"
        :minDate="minDate"
        placeholder="Dispatch date"
        dateFormat="dd.mm.yy"
        class="p-inputtext-lg"
      />
    </div>
    <template v-if="requestType === RequestType.Order">
      <div class="p-inputgroup flex-1">
        <SearchDropdown
          v-model="doc.parcelType"
          :options="searchedParcelTypes"
          label="type"
          placeholder="Parcel Type"
        />
      </div>
      <div class="p-inputgroup flex-1">
        <Textarea
          v-model="doc.description"
          placeholder="Description"
          autoResize
          rows="5"
          cols="30"
          class="p-inputtext-lg"
        />
      </div>
    </template>
    <span v-tooltip.top="errorHint" class="create-edit-order__tooltip">
      <Button type="submit" label="Send" :disabled="!!errorHint" @click.prevent="onSubmit" />
    </span>
  </form>
  <div class="create-edit-order__table">
    <RequestsTable v-if="similarRequests.length" :requests="similarRequests" />
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Textarea from 'primevue/textarea'
import RequestsTable from '@/components/RequestsTable.vue'
import SearchDropdown from '@/components/SearchDropdown.vue'
import { cities } from '@/data/cities'
import { parcelTypes } from '@/data/parcelTypes'
import type { Deliverable, DeliverableDB } from '@/models'
import { RequestType } from '@/models'
import { useRequestsStore } from '@/store/composables/useRequestsStore'
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps<{
  type?: RequestType
  request?: DeliverableDB | null
}>()

const store = useRequestsStore()
const requests = computed(() => store.getAllRequests)

const similarRequests = computed(() =>
  requests.value.filter(
    (r) =>
      doc.from?.name === r.from &&
      doc.to?.name === r.to &&
      new Date(doc.dispatchDate) >= new Date(r.dispatchDate as Date) &&
      props.request?.id !== r.id
  )
)

const requestType = computed(() =>
  props.request ? props.request.type : (props.type as RequestType)
)

const doc: any = reactive({
  from: null,
  to: null,
  dispatchDate: null,
  description: '',
  parcelType: null
})

const populateDoc = (req: DeliverableDB) => {
  doc.from = { name: req.from }
  doc.to = { name: req.to }
  doc.dispatchDate = req.dispatchDate ? new Date(req.dispatchDate) : null
  doc.description = req.description
  doc.parcelType = { type: req.parcelType }
}

watch(
  () => props.request,
  (req) => {
    req && populateDoc(req)
  },
  { immediate: true }
)

const searchedCities = computed(
  () => cities.filter((city) => city.name !== doc.from?.name && city.name !== doc.to?.name) as []
)
const searchedParcelTypes = ref(parcelTypes as [])

const minDate = ref(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))

const errorHint = computed(() => {
  if (!doc.from?.name || !doc.to?.name || !doc.dispatchDate) {
    return 'To, from and dispatch date are requred'
  } else {
    return null
  }
})

const emit = defineEmits<{
  (e: 'submit', request: DeliverableDB): void
}>()

const onSubmit = () => {
  const newRequest: Deliverable = {
    from: doc.from.name,
    to: doc.to.name,
    dispatchDate: doc.dispatchDate,
    description: doc.description,
    parcelType: doc.parcelType?.type,
    type: requestType.value
  }

  emit('submit', { ...props.request, ...newRequest } as DeliverableDB)
}
</script>

<style lang="scss" scoped>
.create-edit-order {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 30rem;
  }
  &__tooltip {
    display: inline-block;
  }
  &__table {
    margin-top: 1.5rem;
  }
}
</style>
