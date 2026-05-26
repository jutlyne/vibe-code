<template>
  <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
    <div class="mb-2">
      <h2 class="text-[11px] font-medium tracking-[0.25em] text-stone-800 uppercase text-center">Đăng nhập</h2>
      <div class="mt-3 w-4 h-px bg-primary-600 mx-auto" />
    </div>

    <AppAlert :message="error" type="error" />

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
      placeholder="Mật khẩu"
      :error="formErrors.password"
      required
      autocomplete="current-password"
      @blur="handleBlur('password')"
    />

    <AppButton type="submit" :loading="loading" class="w-full mt-3">
      Đăng nhập
    </AppButton>

    <p class="text-center text-[11px] font-light tracking-wide text-stone-500">
      Chưa có tài khoản?
      <NuxtLink to="/register" class="text-primary-600 hover:text-primary-700 transition-colors">Đăng ký ngay</NuxtLink>
    </p>
  </form>
</template>

<script setup lang="ts">
import { loginSchema } from '~/schemas/login.schema'
import { useAuth } from '~/composables/useAuth'
import { useAuthStore } from '~/stores/auth'
import { useProfile } from '~/composables/useProfile'
import { useProfileStore } from '~/stores/profile'

const { login } = useAuth()
const { fetchProfile } = useProfile()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const loading = ref(false)
const error = ref('')

const values = reactive({
  email: '',
  password: '',
})

const formErrors = reactive<Record<string, string>>({
  email: '',
  password: '',
})

function validateField(field: string) {
  const result = loginSchema.safeParse(values)
  if (result.success) {
    formErrors[field] = ''
    return
  }
  const fieldError = result.error.errors.find(e => e.path[0] === field)
  formErrors[field] = fieldError?.message || ''
}

function handleBlur(field: string) {
  validateField(field)
}

async function onSubmit() {
  Object.keys(values).forEach(field => validateField(field))

  const result = loginSchema.safeParse(values)
  if (!result.success) return

  loading.value = true
  error.value = ''
  try {
    const { user, token } = await login(result.data.email, result.data.password)
    authStore.setUser(user, token)

    const profile = await fetchProfile(user.id)
    profileStore.setProfile(profile)

    await navigateTo('/profile')
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.'
  } finally {
    loading.value = false
  }
}
</script>
