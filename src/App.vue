<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 border-b border-claude-border/80 bg-claude-bg/85 backdrop-blur-md">
      <nav class="max-w-3xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
        <RouterLink
          :to="{ name: 'home' }"
          class="font-display text-xl text-claude-text hover:text-claude-accent transition-colors tracking-tight"
        >
          Postly
        </RouterLink>

        <div v-if="authStore.user" class="flex items-center gap-1 sm:gap-2">
          <span class="hidden sm:inline text-sm text-claude-subtle mr-2 truncate max-w-[140px]">
            {{ authStore.user.name }}
          </span>
          <RouterLink :to="{ name: 'create' }" class="primary-btn !px-3.5 !py-1.5 text-xs sm:text-sm">
            New post
          </RouterLink>
          <form @submit.prevent="authStore.logout">
            <button type="submit" class="nav-link">Logout</button>
          </form>
        </div>

        <div v-else class="flex items-center gap-1">
          <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
          <RouterLink :to="{ name: 'register' }" class="primary-btn !px-3.5 !py-1.5 text-xs sm:text-sm">
            Sign up
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="border-t border-claude-border/60 py-6 mt-auto">
      <p class="text-center text-xs text-claude-faint">Postly — write freely</p>
    </footer>
  </div>
</template>
