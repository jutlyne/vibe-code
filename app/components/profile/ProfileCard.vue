<template>
  <div class="bg-white border border-stone-200">
    <div class="flex items-start gap-5 p-7 border-b border-stone-100">
      <img
        v-if="profile.avatarUrl"
        :src="profile.avatarUrl"
        class="w-16 h-16 rounded-full object-cover border border-stone-200 shrink-0"
        alt="Avatar"
      />
      <div
        v-else
        class="w-16 h-16 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center text-xl font-light text-primary-500 shrink-0"
      >
        {{ profile.fullName?.charAt(0)?.toUpperCase() }}
      </div>

      <div class="flex-1 min-w-0 pt-1">
        <h2 class="text-lg font-light text-stone-900 leading-tight truncate">{{ profile.fullName }}</h2>
        <p class="text-[11px] font-light tracking-wider text-stone-400 mt-1">@{{ profile.username }}</p>
      </div>

      <NuxtLink
        to="/profile/edit"
        class="shrink-0 text-[10px] font-medium tracking-[0.15em] uppercase text-stone-400 border border-stone-200 px-4 py-2 hover:border-primary-300 hover:text-primary-600 transition-colors"
      >
        Chỉnh sửa
      </NuxtLink>
    </div>

    <div class="px-7 py-5 flex flex-col sm:flex-row gap-4">
      <div class="flex items-center gap-2.5 text-sm font-light text-stone-600 min-w-0 overflow-hidden">
        <svg class="w-3.5 h-3.5 text-primary-200 shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2 4l6 5 6-5M2 4h12v9H2V4z" />
        </svg>
        <span class="truncate">{{ profile.email }}</span>
      </div>
      <div v-if="profile.phone" class="flex items-center gap-2.5 text-sm font-light text-stone-600 min-w-0 overflow-hidden">
        <svg class="w-3.5 h-3.5 text-primary-200 shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 2.5a1.5 1.5 0 013 0v1a1.5 1.5 0 01-3 0v-1zm7 0a1.5 1.5 0 013 0v1a1.5 1.5 0 01-3 0v-1zM3.5 13A9.5 9.5 0 0013 3.5" />
        </svg>
        <span>{{ profile.phone }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from '~/types/user'

defineProps<{ profile: Profile }>()
</script>
