<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[11px] font-medium tracking-[0.15em] uppercase transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed"
    :class="variantClasses[variant]"
  >
    <svg
      v-if="loading"
      class="animate-spin h-3.5 w-3.5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  type: 'button',
})

const variantClasses = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'border border-stone-300 text-stone-700 hover:border-stone-500 hover:text-stone-900',
  danger: 'bg-red-700 text-white hover:bg-red-800',
  ghost: 'text-stone-500 hover:text-stone-900 hover:bg-stone-100',
}
</script>
