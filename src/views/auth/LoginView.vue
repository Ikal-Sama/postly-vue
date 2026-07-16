<template>
  <div class="page-shell">
    <div class="max-w-md mx-auto">
      <header class="mb-8 text-center">
        <h1 class="page-title">Welcome back</h1>
        <p class="page-subtitle">Sign in to continue writing</p>
      </header>

      <form @submit.prevent="authenticate('login', formData)" class="form-card">
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
            placeholder="Your password"
            autocomplete="current-password"
            v-model="formData.password"
          />
          <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
        </div>

        <button type="submit" class="primary-btn w-full">Login</button>
      </form>

      <p class="text-center text-sm text-claude-subtle mt-6">
        No account?
        <RouterLink :to="{ name: 'register' }" class="text-claude-accent font-medium hover:underline">
          Sign up
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
  email: '',
  password: '',
})

onMounted(() => (errors.value = {}))
</script>
