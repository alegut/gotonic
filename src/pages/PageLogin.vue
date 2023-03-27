<template>
  <div class="page-login">
    <Card role="login">
      <template #title> Login </template>
      <template #content>
        <form class="page-login__form" @submit.prevent="onLogin">
          <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText v-model="user.name" placeholder="Username" />
          </div>
          <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-eye"></i>
            </span>
            <InputText v-model="user.password" type="password" placeholder="Password" />
          </div>
          <Button type="submit" label="Login" :disabled="submitDisabled" />
        </form>
      </template>
    </Card>
    <Toast />
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { computed, reactive } from 'vue'
import { useUserStore } from '@/store/composables/useUserStore'
import { useRouter } from 'vue-router'
import { RouteName } from '@/router/RouteName'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const store = useUserStore()
const toast = useToast()

const user = reactive({
  name: '',
  password: ''
})

// TODO add more thorough validation
const submitDisabled = computed(() => !user.name.length || !user.password.length)

const onLogin = () => {
  store.fetchUser(user)

  if (!store.getMe?.id) {
    toast.add({
      severity: 'error',
      summary: 'Failed',
      detail: 'Incorrect user name or password',
      life: 3000
    })
    return
  }
  router.push({ name: RouteName.AllRequests })
}
</script>

<style scoped lang="scss">
.page-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  &__form {
    min-width: 22rem;
    display: grid;
    gap: 20px;
  }
}
</style>
