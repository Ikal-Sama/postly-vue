<template>
  <div class="page-shell">
    <div class="max-w-md mx-auto">
      <header class="mb-8 text-center">
        <h1 class="page-title">Create account</h1>
        <p class="page-subtitle">Join and start sharing your posts</p>
      </header>

      <form @submit.prevent="authenticate('register', formData)" class="form-card">
        <div class="field">
          <label class="field-label" for="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            autocomplete="name"
            v-model="formData.name"
          />
          <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            v-model="formData.email"
          />
          <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            autocomplete="new-password"
            v-model="formData.password"
          />
          <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="password_confirmation">Confirm password</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat your password"
            autocomplete="new-password"
            v-model="formData.password_confirmation"
          />
        </div>

        <button type="submit" class="primary-btn w-full">Create account</button>
      </form>

      <p class="text-center text-sm text-claude-subtle mt-6">
        Already have an account?
        <RouterLink :to="{ name: 'login' }" class="text-claude-accent font-medium hover:underline">
          Login
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { onMounted, reactive } from 'vue'
import { RouterLink } from 'vue-router'

const { errors } = storeToRefs(useAuthStore())
const { authenticate } = useAuthStore()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

onMounted(() => (errors.value = {}))
</script>
