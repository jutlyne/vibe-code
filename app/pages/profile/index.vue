<template>
  <div v-if="profile" class="flex flex-col gap-6">
    <ProfileCard :profile="profile" />
    <ImageSlideshow :images="profile.favoriteImages" />
  </div>
  <div v-else class="flex items-center justify-center py-20">
    <div class="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" role="status" aria-label="Đang tải..." />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'
import { useProfile } from '~/composables/useProfile'

definePageMeta({ middleware: 'auth' })

const authStore = useAuthStore()
const profileStore = useProfileStore()
const { fetchProfile } = useProfile()

const profile = computed(() => profileStore.profile)

onMounted(async () => {
  if (!profileStore.profile && authStore.user) {
    const p = await fetchProfile(authStore.user.id)
    profileStore.setProfile(p)
  }
})
</script>
