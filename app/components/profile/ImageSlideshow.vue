<template>
  <div v-if="images.length > 0" class="bg-white border border-stone-200 overflow-hidden">
    <div class="px-6 py-4 border-b border-stone-100">
      <h3 class="text-[10px] font-medium tracking-[0.2em] text-stone-400 uppercase">Ảnh yêu thích</h3>
    </div>
    <div class="relative h-64 bg-stone-900">
      <img
        v-for="(img, idx) in images"
        :key="img.id"
        :src="img.serverUrl || img.localUrl"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        :class="idx === activeIndex ? 'opacity-100' : 'opacity-0'"
        :alt="`Ảnh ${idx + 1}`"
      />

      <button
        v-if="images.length > 1"
        class="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors"
        aria-label="Ảnh trước"
        @click="prev"
      >
        ‹
      </button>
      <button
        v-if="images.length > 1"
        class="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors"
        aria-label="Ảnh tiếp theo"
        @click="next"
      >
        ›
      </button>

      <div v-if="images.length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        <button
          v-for="(_, idx) in images"
          :key="idx"
          class="w-2 h-2 rounded-full transition-colors"
          :class="idx === activeIndex ? 'bg-white' : 'bg-white/40'"
          :aria-label="`Xem ảnh ${idx + 1}`"
          :aria-current="idx === activeIndex ? 'true' : undefined"
          @click="goTo(idx)"
        />
      </div>
    </div>
  </div>
  <div v-else class="bg-white border border-stone-200 px-8 py-12 text-center">
    <p class="text-[11px] font-light tracking-widest text-stone-400 uppercase mb-3">Chưa có ảnh yêu thích</p>
    <NuxtLink to="/profile/edit" class="text-[11px] font-medium tracking-wider text-primary-600 hover:text-primary-700 transition-colors uppercase">Thêm ảnh</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { ImageFile } from '~/types/image'

const props = defineProps<{ images: ImageFile[] }>()

const activeIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function next() {
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}

function prev() {
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}

function goTo(idx: number) {
  activeIndex.value = idx
}

function startAutoplay() {
  if (props.images.length > 1) {
    timer = setInterval(next, 4000)
  }
}

function stopAutoplay() {
  if (timer) clearInterval(timer)
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)

watch(() => props.images.length, (len) => {
  if (len === 0) activeIndex.value = 0
})
</script>
