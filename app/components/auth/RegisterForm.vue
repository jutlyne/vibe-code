<template>
  <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
    <div class="mb-2">
      <h2 class="text-[11px] font-medium tracking-[0.25em] text-stone-800 uppercase text-center">Tạo tài khoản</h2>
      <div class="mt-3 w-4 h-px bg-primary-600 mx-auto" />
    </div>

    <AppAlert :message="error" type="error" />

    <div class="flex flex-col items-center mb-3">
      <AvatarUpload v-model="avatarBase64" :user-name="values.fullName || 'U'" />
      <p class="text-[10px] font-light tracking-wider text-stone-400 mt-2 uppercase">Ảnh đại diện (tuỳ chọn)</p>
    </div>

    <AppInput
      label="Họ và tên"
      v-model="values.fullName"
      placeholder="Nguyễn Văn A"
      :error="formErrors.fullName"
      required
      @blur="handleBlur('fullName')"
    />
    <AppInput
      label="Username"
      v-model="values.username"
      placeholder="nguyenvana"
      :error="formErrors.username"
      required
      @blur="handleBlur('username')"
    />
    <AppInput
      label="Email"
      v-model="values.email"
      type="email"
      placeholder="email@example.com"
      :error="formErrors.email"
      required
      autocomplete="email"
      @blur="handleBlur('email')"
    />
    <AppInput
      label="Mật khẩu"
      v-model="values.password"
      type="password"
      show-toggle
      placeholder="Ít nhất 8 ký tự"
      :error="formErrors.password"
      required
      autocomplete="new-password"
      @blur="handleBlur('password')"
    />
    <AppInput
      label="Xác nhận mật khẩu"
      v-model="values.confirmPassword"
      type="password"
      show-toggle
      placeholder="Nhập lại mật khẩu"
      :error="formErrors.confirmPassword"
      required
      autocomplete="new-password"
      @blur="handleBlur('confirmPassword')"
    />
    <AppInput
      label="Số điện thoại"
      v-model="values.phone"
      type="tel"
      placeholder="0901234567"
      :error="formErrors.phone"
      @blur="handleBlur('phone')"
    />

    <AppButton type="submit" :loading="loading" class="w-full mt-3">
      Đăng ký
    </AppButton>

    <p class="text-center text-[11px] font-light tracking-wide text-stone-400">
      Đã có tài khoản?
      <NuxtLink to="/login" class="text-primary-600 hover:text-primary-700 transition-colors">Đăng nhập</NuxtLink>
    </p>
  </form>
</template>

<script setup lang="ts">
import { registerSchema } from '~/schemas/register.schema'
import { useAuth } from '~/composables/useAuth'
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'

const { register } = useAuth()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const loading = ref(false)
const error = ref('')
const avatarBase64 = ref('')

const values = reactive({
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
})

const formErrors = reactive<Record<string, string>>({
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
})

const touchedFields = reactive<Record<string, boolean>>({})

function validateField(field: string) {
  if (field === 'confirmPassword') {
    formErrors.confirmPassword = values.confirmPassword !== values.password
      ? 'Mật khẩu xác nhận không khớp'
      : ''
    return
  }
  const result = registerSchema.safeParse(values)
  if (result.success) {
    formErrors[field] = ''
    return
  }
  const fieldError = result.error.errors.find(e => e.path[0] === field)
  formErrors[field] = fieldError?.message || ''
}

function handleBlur(field: string) {
  touchedFields[field] = true
  validateField(field)
}

async function onSubmit() {
  Object.keys(values).forEach(field => {
    touchedFields[field] = true
    validateField(field)
  })

  const result = registerSchema.safeParse(values)
  if (values.confirmPassword !== values.password) {
    formErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
  }
  if (!result.success || formErrors.confirmPassword) return

  loading.value = true
  error.value = ''
  try {
    const { user, token } = await register({
      ...result.data,
      phone: result.data.phone || undefined,
    })

    const userWithAvatar = avatarBase64.value
      ? { ...user, avatarUrl: avatarBase64.value }
      : user

    authStore.setUser(userWithAvatar, token)
    profileStore.setProfile({ ...userWithAvatar, favoriteImages: [] })

    if (avatarBase64.value) {
      localStorage.setItem(`mock_avatar_${user.id}`, avatarBase64.value)
      const profiles = JSON.parse(localStorage.getItem('mock_profiles') || '{}')
      profiles[user.id] = { ...userWithAvatar, favoriteImages: [] }
      localStorage.setItem('mock_profiles', JSON.stringify(profiles))

      const users = JSON.parse(localStorage.getItem('mock_users') || '[]')
      const idx = users.findIndex((u: { id: string }) => u.id === user.id)
      if (idx !== -1) {
        users[idx].avatarUrl = avatarBase64.value
        localStorage.setItem('mock_users', JSON.stringify(users))
      }
    }

    await navigateTo('/profile')
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Đăng ký thất bại'
  } finally {
    loading.value = false
  }
}
</script>
