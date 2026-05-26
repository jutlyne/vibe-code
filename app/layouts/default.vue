<template>
  <div class="min-h-screen bg-[#f8f6f3] flex flex-col">
    <nav class="bg-[#f8f6f3] border-b border-stone-200">
      <div class="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <div class="flex items-center justify-between h-14">
          <NuxtLink
            to="/"
            class="text-[11px] font-medium tracking-[0.25em] text-stone-900 uppercase"
          >
            Corporate 2
          </NuxtLink>
          <div class="flex items-center gap-6">
            <template v-if="authStore.isAuthenticated">
              <NuxtLink
                to="/profile"
                class="text-[11px] font-medium tracking-wider text-stone-500 hover:text-stone-900 transition-colors uppercase"
              >
                Trang cá nhân
              </NuxtLink>
              <button
                class="text-[11px] font-medium tracking-wider text-stone-400 hover:text-red-700 transition-colors uppercase"
                @click="handleLogout"
              >
                Đăng xuất
              </button>
              <NuxtLink to="/profile">
                <img
                  v-if="authStore.user?.avatarUrl"
                  :src="authStore.user.avatarUrl"
                  class="w-7 h-7 rounded-full object-cover border border-stone-200"
                  alt="avatar"
                />
                <div
                  v-else
                  class="w-7 h-7 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 font-medium text-[11px]"
                >
                  {{ authStore.user?.fullName?.charAt(0)?.toUpperCase() }}
                </div>
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="text-[11px] font-medium tracking-wider text-stone-500 hover:text-stone-900 transition-colors uppercase"
              >
                Đăng nhập
              </NuxtLink>
              <NuxtLink
                to="/register"
                class="text-[11px] font-medium tracking-wider bg-primary-600 text-white px-4 py-2 hover:bg-primary-700 transition-colors uppercase"
              >
                Đăng ký
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1 max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-10 py-10">
      <slot />
    </main>

    <footer class="border-t border-stone-200 py-5 text-center">
      <span class="text-[10px] font-light tracking-[0.2em] text-stone-400 uppercase">
        Corporate 2 &copy; {{ new Date().getFullYear() }}
      </span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useAuth } from '~/composables/useAuth'

const authStore = useAuthStore()
const { logout } = useAuth()

function handleLogout() {
  logout()
}
</script>
