<template>
  <div
    v-if="message"
    role="alert"
    class="flex items-start gap-3 px-4 py-3 text-sm border"
    :class="variantClasses[type].container"
  >
    <svg
      class="w-4 h-4 mt-0.5 shrink-0"
      :class="variantClasses[type].icon"
      fill="none"
      viewBox="0 0 16 16"
      stroke="currentColor"
      stroke-width="1.5"
    >
      <path v-if="type === 'success'" stroke-linecap="round" stroke-linejoin="round" d="M2.5 8l3.5 3.5 7-7" />
      <path v-else-if="type === 'error'" stroke-linecap="round" stroke-linejoin="round" d="M3 3l10 10M13 3L3 13" />
      <path v-else stroke-linecap="round" stroke-linejoin="round" d="M8 5v4M8 11.5v.5" />
    </svg>
    <span class="font-light leading-relaxed">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
  type?: 'success' | 'error' | 'info'
}>(), {
  type: 'info',
})

const variantClasses = {
  success: {
    container: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    icon: 'text-emerald-600',
  },
  error: {
    container: 'bg-red-50 text-red-900 border-red-200',
    icon: 'text-red-500',
  },
  info: {
    container: 'bg-sky-50 text-sky-900 border-sky-200',
    icon: 'text-sky-500',
  },
}
</script>
