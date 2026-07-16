<template>
  <div class="page-shell">
    <header class="mb-10">
      <h1 class="page-title">Latest posts</h1>
      <p class="page-subtitle">Stories and notes from the community</p>
    </header>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="spinner" aria-label="Loading"></div>
    </div>

    <div v-else-if="posts.length > 0" class="space-y-4">
      <RouterLink
        v-for="post in posts"
        :key="post.id"
        :to="{ name: 'show', params: { id: post.id } }"
        class="post-card group"
      >
        <h2
          class="font-display text-2xl sm:text-[1.65rem] text-claude-text group-hover:text-claude-accent transition-colors leading-snug"
        >
          {{ post.title }}
        </h2>
        <p class="text-xs text-claude-faint mt-2 mb-3">
          by <span class="text-claude-subtle">{{ post.user.name }}</span>
        </p>
        <p class="text-sm text-claude-subtle leading-relaxed line-clamp-3">
          {{ post.body }}
        </p>
        <span
          class="inline-flex items-center gap-1 mt-4 text-sm font-medium text-claude-accent opacity-80 group-hover:opacity-100 transition-opacity"
        >
          Read more
          <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </RouterLink>
    </div>

    <div v-else class="empty-state">
      <p class="font-display text-2xl text-claude-text mb-2">No posts yet</p>
      <p class="text-sm text-claude-subtle mb-6">Be the first to share something.</p>
      <RouterLink v-if="authStore.user" :to="{ name: 'create' }" class="primary-btn">
        Write a post
      </RouterLink>
      <RouterLink v-else :to="{ name: 'register' }" class="primary-btn">
        Get started
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { usePostsStore } from '@/stores/posts'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const { getAllPosts } = usePostsStore()
const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    posts.value = await getAllPosts()
  } finally {
    loading.value = false
  }
})
</script>
