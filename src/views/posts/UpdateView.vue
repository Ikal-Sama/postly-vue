<template>
  <div class="page-shell">
    <div class="max-w-lg mx-auto">
      <div v-if="loading" class="flex justify-center py-20">
        <div class="spinner" aria-label="Loading"></div>
      </div>

      <template v-else>
        <header class="mb-8">
          <RouterLink
            :to="{ name: 'show', params: { id: route.params.id } }"
            class="ghost-btn mb-4"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to post
          </RouterLink>
          <h1 class="page-title">Edit post</h1>
          <p class="page-subtitle">Update your title or content</p>
        </header>

        <form @submit.prevent="updatePost(post, formData)" class="form-card">
          <div class="field">
            <label class="field-label" for="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Give it a clear title"
              v-model="formData.title"
            />
            <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
          </div>

          <div class="field">
            <label class="field-label" for="body">Content</label>
            <textarea
              id="body"
              rows="8"
              placeholder="Write your post…"
              v-model="formData.body"
            ></textarea>
            <p v-if="errors.body" class="error">{{ errors.body[0] }}</p>
          </div>

          <div class="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-1">
            <RouterLink
              :to="{ name: 'show', params: { id: route.params.id } }"
              class="secondary-btn w-full sm:w-auto text-center"
            >
              Cancel
            </RouterLink>
            <button type="submit" class="primary-btn w-full sm:w-auto">Save changes</button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { usePostsStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { user } = storeToRefs(useAuthStore())
const { errors } = storeToRefs(usePostsStore())
const { getPost, updatePost } = usePostsStore()

const post = ref(null)
const loading = ref(true)

const formData = reactive({
  title: '',
  body: '',
})

onMounted(async () => {
  try {
    post.value = await getPost(route.params.id)

    if (!post.value || user.value.id !== post.value.user_id) {
      router.push({ name: 'home' })
    } else {
      formData.title = post.value.title
      formData.body = post.value.body
    }
  } finally {
    loading.value = false
  }
})
</script>
