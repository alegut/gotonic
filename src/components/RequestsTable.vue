<template>
  <DataTable
    :value="requests"
    resizableColumns
    columnResizeMode="expand"
    showGridlines
    sortField="createdAt"
    :sortOrder="-1"
  >
    <Column field="createdAt" header="Created">
      <template #body="slotProps">
        {{ format(new Date(slotProps.data.createdAt), 'dd.MM.yyyy HH:mm') }}
      </template>
    </Column>
    <Column field="from" header="From"></Column>
    <Column field="to" header="To"></Column>
    <Column field="dispatchDate" sortable header="Dispatch Date">
      <template #body="slotProps">
        {{ format(new Date(slotProps.data.dispatchDate), 'dd.MM.yyyy') }}
      </template>
    </Column>
    <Column field="type" header="Type"></Column>
    <Column field="parcelType" header="Parcel type"></Column>
    <Column field="description" header="Description"></Column>
    <Column header="Actions">
      <template #body="slotProps">
        <div class="requests-table__actions">
          <Button
            v-tooltip.top="'Edit'"
            icon="pi pi-pencil"
            severity="success"
            aria-label="Edit"
            @click="onEdit(slotProps.data)"
          />
          <Button
            v-tooltip.top="'Delete'"
            icon="pi pi-trash"
            severity="danger"
            aria-label="Delete"
            @click="onDelete(slotProps.data.id)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <Dialog v-model:visible="open" modal header="Edit request" :style="{ minWidth: '30vw' }">
    <CreateEditRequest :request="selectedRequest" @submit="onUpdate" />
  </Dialog>
</template>

<script lang="ts" setup>
import type { DeliverableDB } from '@/models'
import CreateEditRequest from '@/components/CreateEditRequest.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import { format } from 'date-fns'
import { useRequestsStore } from '@/store/composables/useRequestsStore'
import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

defineProps<{
  requests: DeliverableDB[]
}>()

const confirm = useConfirm()
const toast = useToast()
const selectedRequest = ref<DeliverableDB | null>(null)
const store = useRequestsStore()
const open = ref(false)

const onDelete = (id: string) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => {
      store.deleteRequest(id)
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    }
  })
}

const onEdit = (request: DeliverableDB) => {
  selectedRequest.value = request
  open.value = true
}

const onUpdate = (request: DeliverableDB) => {
  store.updateRequest(request)
  selectedRequest.value = null
  open.value = false
}
</script>

<style lang="scss" scoped>
.requests-table {
  &__actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
}
</style>
