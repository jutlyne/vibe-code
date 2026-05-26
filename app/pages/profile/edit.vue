<template>
  <div class="max-w-xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink
        to="/profile"
        class="text-[11px] font-medium tracking-wider text-stone-400 hover:text-stone-700 transition-colors uppercase"
      >
        ← Quay lại
      </NuxtLink>
      <span class="text-stone-200">|</span>
      <h1 class="text-[11px] font-medium tracking-[0.2em] text-stone-800 uppercase">Chỉnh sửa tài khoản</h1>
    </div>

    <form v-if="formValues" class="space-y-4" @submit.prevent="onSubmit">
      <AppAlert :message="successMsg" type="success" />
      <AppAlert :message="errorMsg" type="error" />

      <div class="bg-white border border-stone-200 p-7 space-y-5">
        <h2 class="text-[10px] font-medium tracking-[0.2em] text-stone-400 uppercase">Ảnh đại diện</h2>
        <AvatarUpload v-model="formValues.avatarUrl" :user-name="formValues.fullName" />
      </div>

      <div class="bg-white border border-stone-200 p-7 space-y-5">
        <h2 class="text-[10px] font-medium tracking-[0.2em] text-stone-400 uppercase">Thông tin cá nhân</h2>
        <AppInput
          label="Họ và tên"
          v-model="formValues.fullName"
          :error="formErrors.fullName"
          required
          @blur="validateField('fullName')"
        />
        <AppInput
          label="Username"
          v-model="formValues.username"
          :error="formErrors.username"
          required
          @blur="validateField('username')"
        />
        <AppInput
          label="Số điện thoại"
          v-model="formValues.phone"
          type="tel"
          :error="formErrors.phone"
          @blur="validateField('phone')"
        />
        <div>
          <p class="text-[11px] font-medium tracking-wider text-stone-500 uppercase mb-1.5">Email</p>
          <p class="text-sm font-light text-stone-500 bg-stone-50 border border-stone-100 px-3 py-2.5">
            {{ profile?.email }}
          </p>
          <p class="text-[10px] font-light tracking-wide text-stone-400 mt-1">Email không thể thay đổi</p>
        </div>
      </div>

      <div class="bg-white border border-stone-200 p-7 space-y-5">
        <h2 class="text-[10px] font-medium tracking-[0.2em] text-stone-400 uppercase">Ảnh yêu thích</h2>
        <GalleryUpload v-model="galleryImages" />
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <NuxtLink to="/profile">
          <AppButton variant="secondary" type="button">Hủy</AppButton>
        </NuxtLink>
        <AppButton type="submit" :loading="loading">Lưu thay đổi</AppButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { profileSchema } from '~/schemas/profile.schema'
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'
import { useProfile } from '~/composables/useProfile'
import type { ImageFile } from '~/types/image'

definePageMeta({ middleware: 'auth' })

const authStore = useAuthStore()
const profileStore = useProfileStore()
const { fetchProfile, updateProfile } = useProfile()

const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const formValues = ref<{
  fullName: string
  username: string
  phone: string
  avatarUrl: string
} | null>(null)

const galleryImages = ref<ImageFile[]>([])

const formErrors = reactive<Record<string, string>>({
  fullName: '',
  username: '',
  phone: '',
})

const profile = computed(() => profileStore.profile)

onMounted(async () => {
  if (!profileStore.profile && authStore.user) {
    const p = await fetchProfile(authStore.user.id)
    profileStore.setProfile(p)
  }
  if (profileStore.profile) {
    const p = profileStore.profile
    formValues.value = {
      fullName: p.fullName,
      username: p.username,
      phone: p.phone || '',
      avatarUrl: p.avatarUrl || '',
    }
    galleryImages.value = [...(p.favoriteImages || [])]
  }
})

function validateField(field: string) {
  const result = profileSchema.safeParse(formValues.value)
  if (result.success) {
    formErrors[field] = ''
    return
  }
  const fieldError = result.error.errors.find(e => e.path[0] === field)
  formErrors[field] = fieldError?.message || ''
}

async function onSubmit() {
  if (!formValues.value || !authStore.user) return

  Object.keys(formErrors).forEach(field => validateField(field))

  const result = profileSchema.safeParse(formValues.value)
  if (!result.success) return

  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    const updated = await updateProfile(authStore.user.id, {
      ...result.data,
      phone: result.data.phone || undefined,
      avatarUrl: formValues.value.avatarUrl || undefined,
      favoriteImages: galleryImages.value,
    })

    authStore.setUser(
      { ...authStore.user, ...updated },
      authStore.token!
    )

    localStorage.setItem(`mock_gallery_${authStore.user.id}`, JSON.stringify(galleryImages.value))

    await navigateTo('/profile')
  } catch (e: unknown) {
    errorMsg.value = e instanceof Error ? e.message : 'Cập nhật thất bại'
  } finally {
    loading.value = false
  }
}
</script>
