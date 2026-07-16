<template>
  <div class="page-shell">
    <div v-if="loading" class="flex justify-center py-20">
      <div class="spinner" aria-label="Loading"></div>
    </div>

    <article v-else-if="post">
      <RouterLink :to="{ name: 'home' }" class="ghost-btn mb-6">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All posts
      </RouterLink>

      <div class="bg-claude-surface border border-claude-border rounded-2xl p-6 sm:p-9 shadow-sm">
        <h1 class="font-display text-3xl sm:text-4xl text-claude-text leading-tight tracking-tight">
          {{ post.title }}
        </h1>
        <p class="text-sm text-claude-faint mt-3 mb-8">
          by <span class="text-claude-subtle">{{ post.user.name }}</span>
        </p>
        <div class="text-[15px] text-claude-text leading-[1.75] whitespace-pre-wrap">
          {{ post.body }}
        </div>

        <div
          v-if="authStore.user && authStore.user.id === post.user_id"
          class="flex flex-wrap items-center gap-3 mt-10 pt-6 border-t border-claude-border"
        >
          <RouterLink
            :to="{ name: 'update', params: { id: post.id } }"
            class="secondary-btn"
          >
            Edit
          </RouterLink>
          <form @submit.prevent="confirmDelete">
            <button type="submit" class="danger-btn" :disabled="deleting">
              {{ deleting ? 'Deleting…' : 'Delete' }}
            </button>
          </form>
        </div>
      </div>
    </article>

    <div v-else class="empty-state">
      <p class="font-display text-2xl text-claude-text mb-2">Post not found</p>
      <p class="text-sm text-claude-subtle mb-6">It may have been removed or the link is wrong.</p>
      <RouterLink :to="{ name: 'home' }" class="primary-btn">Back home</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { usePostsStore } from '@/stores/posts'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const { getPost, deletePost } = usePostsStore()
const authStore = useAuthStore()

const post = ref(null)
const loading = ref(true)
const deleting = ref(false)

onMounted(async () => {
  try {
    post.value = await getPost(route.params.id)
  } finally {
    loading.value = false
  }
})

async function confirmDelete() {
  if (!confirm('Delete this post? This cannot be undone.')) return
  deleting.value = true
  try {
    await deletePost(post.value)
  } finally {
    deleting.value = false
  }
}
</script>
