<template>
  <div>
    <PageTitle>Create Request</PageTitle>

    <div class="page-create-request__types">
      <Button label="Order" icon="pi pi-shopping-cart" @click="onOrder" />
      <Button label="Delivery" icon="pi pi-truck" @click="onDelivery" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouteName } from '@/router/RouteName'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import PageTitle from '@/components/PageTitle.vue'

const router = useRouter()

const onOrder = () => {
  router.push({ name: RouteName.CreateRequestOrder })
}

const onDelivery = () => {
  router.push({ name: RouteName.CreateRequestDelivery })
}
</script>

<style lang="scss" scoped>
.page-create-request {
  &__types {
    display: flex;
    justify-content: center;
    gap: 2rem;
    font-size: 2rem;
    margin-top: 12rem;
  }
}
</style>
