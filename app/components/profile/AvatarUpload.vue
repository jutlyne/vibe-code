<template>
  <div class="flex flex-col items-center gap-3">
    <button
      type="button"
      class="relative w-24 h-24 rounded-full cursor-pointer group"
      aria-label="Tải ảnh đại diện lên"
      @click="triggerInput"
    >
      <img
        v-if="previewUrl"
        :src="previewUrl"
        class="w-24 h-24 rounded-full object-cover border border-stone-200"
        :alt="userName ? userName + ' - ảnh đại diện' : 'Ảnh đại diện'"
      />
      <div
        v-else
        class="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center text-2xl font-light text-primary-400 border border-primary-100"
      >
        {{ initials }}
      </div>
      <div class="absolute inset-0 rounded-full bg-stone-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span class="text-white text-[10px] font-medium tracking-wider uppercase">Thay ảnh</span>
      </div>
    </button>
    <input
      ref="inputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
    <p v-if="uploading" class="text-xs text-gray-400">Đang xử lý...</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  userName?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const uploading = ref(false)
const localPreview = ref<string | null>(null)

const previewUrl = computed(() => localPreview.value || props.modelValue || null)

const initials = computed(() => {
  return props.userName?.charAt(0)?.toUpperCase() || '?'
})

function triggerInput() {
  inputRef.value?.click()
}

async function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploading.value = true
  try {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      localPreview.value = base64
      emit('update:modelValue', base64)
    }
    reader.readAsDataURL(file)
  } finally {
    uploading.value = false
  }
}
</script>
