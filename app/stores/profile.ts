import { defineStore } from 'pinia'
import type { Profile } from '~/types/user'
import type { ImageFile } from '~/types/image'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(null)

  function setProfile(p: Profile) {
    profile.value = p
  }

  function updateFavoriteImages(images: ImageFile[]) {
    if (profile.value) {
      profile.value.favoriteImages = images
    }
  }

  function clearProfile() {
    profile.value = null
  }

  return { profile, setProfile, updateFavoriteImages, clearProfile }
})
