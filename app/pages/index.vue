<template>
  <!-- Authenticated home -->
  <div v-if="authStore.isAuthenticated" class="max-w-xl mx-auto pt-8">
    <div class="mb-10">
      <p class="text-[10px] font-light tracking-[0.35em] text-stone-500 uppercase mb-2">Xin chào</p>
      <h1 class="text-3xl font-extralight text-stone-900 leading-snug">
        {{ profile?.fullName || authStore.user?.fullName || 'Người dùng' }}
      </h1>
      <p class="text-xs font-light tracking-wider text-stone-500 mt-1">@{{ authStore.user?.username }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <NuxtLink
        to="/profile"
        class="group bg-white border border-stone-200 p-6 hover:border-primary-300 transition-colors"
      >
        <svg class="w-5 h-5 text-primary-300 mb-4 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <p class="text-[11px] font-medium tracking-[0.15em] text-stone-700 uppercase">Trang cá nhân</p>
        <p class="text-xs font-light text-stone-500 mt-1">Xem hồ sơ và ảnh yêu thích</p>
      </NuxtLink>

      <NuxtLink
        to="/profile/edit"
        class="group bg-white border border-stone-200 p-6 hover:border-primary-300 transition-colors"
      >
        <svg class="w-5 h-5 text-primary-300 mb-4 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
        </svg>
        <p class="text-[11px] font-medium tracking-[0.15em] text-stone-700 uppercase">Chỉnh sửa</p>
        <p class="text-xs font-light text-stone-500 mt-1">Cập nhật thông tin tài khoản</p>
      </NuxtLink>
    </div>

    <div class="mt-6 border-t border-stone-100 pt-6">
      <p class="text-[10px] font-light tracking-widest text-stone-500 uppercase text-center">Corporate 2</p>
    </div>
  </div>

  <!-- Guest home -->
  <div v-else class="flex flex-col items-center justify-center min-h-[70vh] text-center">
    <p class="text-[10px] font-light tracking-[0.35em] text-stone-500 uppercase mb-8">
      Hệ thống quản lý
    </p>
    <h1 class="text-5xl sm:text-7xl font-extralight tracking-[0.15em] text-stone-900 uppercase leading-none mb-3">
      Corporate
    </h1>
    <h1 class="text-5xl sm:text-7xl font-extralight tracking-[0.15em] text-primary-600 uppercase leading-none mb-12">
      2
    </h1>
    <p class="text-xs font-light tracking-widest text-stone-500 mb-14 max-w-xs leading-relaxed">
      Quản lý tài khoản và hình ảnh của bạn một cách chuyên nghiệp
    </p>
    <div class="flex items-center gap-4">
      <NuxtLink
        to="/register"
        class="text-[11px] font-medium tracking-[0.2em] bg-primary-600 text-white px-8 py-3 hover:bg-primary-700 transition-colors uppercase"
      >
        Tạo tài khoản
      </NuxtLink>
      <NuxtLink
        to="/login"
        class="text-[11px] font-medium tracking-[0.2em] border border-stone-300 text-stone-600 px-8 py-3 hover:border-stone-500 hover:text-stone-900 transition-colors uppercase"
      >
        Đăng nhập
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'

const authStore = useAuthStore()
const profileStore = useProfileStore()

const profile = computed(() => profileStore.profile)
</script>
