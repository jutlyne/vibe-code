<template>
  <div class="min-h-screen bg-[#f8f6f3] flex items-center justify-center px-4 py-20">
    <div class="w-full max-w-sm">
      <div class="text-center mb-12">
        <NuxtLink
          to="/"
          class="inline-block text-[11px] font-medium tracking-[0.3em] text-stone-800 uppercase"
        >
          Corporate 2
        </NuxtLink>
        <div class="mt-3 w-6 h-px bg-primary-600 mx-auto" />
        <p class="mt-3 text-[11px] font-light tracking-wider text-stone-400">
          Quản lý tài khoản của bạn
        </p>
      </div>
      <div class="bg-white border border-stone-200 p-10">
        <slot />
      </div>
    </div>
  </div>
</template>
