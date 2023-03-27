<template>
  <Dropdown
    v-model="model"
    :options="options"
    filter
    :optionLabel="label"
    :placeholder="placeholder"
    class="p-inputtext-lg"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center">
        <div>{{ slotProps.value[label] }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex align-items-center">
        <div>{{ slotProps.option[label] }}</div>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue?: { name: string } | { type: string }
  options: []
  label: string
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const model = useVModel(props, 'modelValue', emit)
</script>

<style></style>
