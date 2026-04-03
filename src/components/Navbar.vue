<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tickets', path: '/tickets' },
  { name: 'About', path: '/about' }
]
</script>

<template>
  <header class="navbar-header bg-white border-b-2 border-black sticky top-0 z-50">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
      
      <!-- Brand on the left -->
      <div class="flex items-center">
        <RouterLink to="/" class="flex items-center no-underline text-inherit" @click="isMenuOpen = false">
          <span class="font-black text-xl uppercase tracking-tighter whitespace-nowrap">TP Vue.js</span>
        </RouterLink>
      </div>

      <!-- Navigation and Toggle on the right -->
      <div class="flex items-center">
        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center gap-8 mr-2">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="font-extrabold uppercase text-sm tracking-widest hover:text-muted-foreground transition-colors whitespace-nowrap"
            active-class="underline decoration-4 underline-offset-4 decoration-black"
          >
            {{ link.name }}
          </RouterLink>
        </nav>

        <!-- Mobile Toggle -->
        <button @click="toggleMenu" class="md:hidden p-2 -mr-2" aria-label="Toggle menu">
          <Menu v-if="!isMenuOpen" class="size-8" />
          <X v-else class="size-8" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-white border-b-2 border-black absolute w-full left-0 py-8 px-4 shadow-xl">
        <nav class="flex flex-col items-center gap-6">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            @click="isMenuOpen = false"
            class="text-3xl font-black uppercase tracking-tighter"
            active-class="text-muted-foreground"
          >
            {{ link.name }}
          </RouterLink>
        </nav>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.navbar-header {
  width: 100%;
}
</style>
