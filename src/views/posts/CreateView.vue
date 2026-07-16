<template>
  <div class="page-shell">
    <div class="max-w-lg mx-auto">
      <header class="mb-8">
        <RouterLink :to="{ name: 'home' }" class="ghost-btn mb-4">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </RouterLink>
        <h1 class="page-title">New post</h1>
        <p class="page-subtitle">Share something worth reading</p>
      </header>

      <form @submit.prevent="createPost(formData)" class="form-card">
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
          <RouterLink :to="{ name: 'home' }" class="secondary-btn w-full sm:w-auto text-center">
            Cancel
          </RouterLink>
          <button type="submit" class="primary-btn w-full sm:w-auto">Publish</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { usePostsStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'

const { errors } = storeToRefs(usePostsStore())
const { createPost } = usePostsStore()

const formData = reactive({
  title: '',
  body: '',
})
</script>
