<template>
  <div class="space-y-4">
    <div
      class="border border-dashed p-8 text-center transition-colors cursor-pointer"
      :class="isDragOver ? 'border-primary-400 bg-primary-50' : 'border-stone-200 hover:border-primary-300'"
      @click="triggerInput"
      @dragover.prevent="isDragOver = true"
      @dragleave="isDragOver = false"
      @drop.prevent="handleDrop"
    >
      <svg class="w-8 h-8 text-primary-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="text-[11px] font-light tracking-wider text-stone-500">Kéo thả hoặc click để chọn ảnh</p>
      <p class="text-[10px] font-light tracking-wide text-stone-400 mt-1">Có thể chọn nhiều ảnh cùng lúc</p>
    </div>

    <input
      ref="inputRef"
      type="file"
      accept="image/*"
      multiple
      class="hidden"
      @change="handleFileChange"
    />

    <div v-if="localImages.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div
        v-for="img in localImages"
        :key="img.id"
        class="relative group aspect-square overflow-hidden bg-stone-100"
      >
        <img
          :src="img.localUrl"
          class="w-full h-full object-cover"
          alt="Gallery image"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
        <button
          class="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          type="button"
          aria-label="Xóa ảnh"
          @click.stop="removeImage(img.id)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageFile } from '~/types/image'

const props = defineProps<{
  modelValue: ImageFile[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ImageFile[]]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)

const localImages = computed(() => props.modelValue)

function triggerInput() {
  inputRef.value?.click()
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

async function processFiles(files: FileList | File[]) {
  const newImages: ImageFile[] = []
  for (const file of Array.from(files)) {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    newImages.push({ id: generateId(), localUrl: base64, serverUrl: base64 })
  }
  emit('update:modelValue', [...localImages.value, ...newImages])
}

function handleFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (files) processFiles(files)
}

function handleDrop(event: DragEvent) {
  isDragOver.value = false
  const files = event.dataTransfer?.files
  if (files) processFiles(files)
}

function removeImage(id: string) {
  emit('update:modelValue', localImages.value.filter(img => img.id !== id))
}
</script>
