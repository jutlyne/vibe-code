<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="inputId" class="text-[11px] font-medium tracking-wider text-stone-500 uppercase">
      {{ label }}
      <span v-if="required" class="text-primary-600 ml-0.5">*</span>
    </label>
    <div class="relative">
      <input
        :id="inputId"
        :type="resolvedType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? `${inputId}-error` : undefined"
        class="w-full border text-sm font-light transition-colors focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-400 disabled:bg-stone-50 disabled:cursor-not-allowed placeholder:text-stone-300"
        :class="[
          error ? 'border-red-300 bg-red-50' : 'border-stone-200 bg-white',
          showToggle ? 'pl-3 pr-10 py-2.5' : 'px-3 py-2.5'
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
      />
      <button
        v-if="showToggle"
        type="button"
        tabindex="-1"
        class="absolute inset-y-0 right-0 flex items-center px-3 text-stone-300 hover:text-stone-600 transition-colors"
        @click="visible = !visible"
      >
        <svg v-if="visible" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
    </div>
    <p v-if="error" :id="`${inputId}-error`" class="text-[11px] text-red-500 tracking-wide">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  modelValue?: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  autocomplete?: string
  showToggle?: boolean
}>(), {
  type: 'text',
  modelValue: '',
  showToggle: false,
})

defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
}>()

const inputId = `input-${Math.random().toString(36).slice(2)}`
const visible = ref(false)

const resolvedType = computed(() => {
  if (props.showToggle) return visible.value ? 'text' : 'password'
  return props.type
})
</script>
