<script setup>
import { RouterLink } from 'vue-router'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
</script>

<template>
  <header class="navbar-header bg-white">
    <div class="navbar-container">
      
      <div class="navbar-brand">
        <RouterLink to="/" class="brand-link">
          <span class="brand-text">TP Vue.js</span>
        </RouterLink>
      </div>

      <div class="navbar-menu">
        <Menubar class="custom-menubar">
          
          <MenubarMenu>
            <MenubarTrigger as-child class="menu-trigger">
              <RouterLink to="/">Home</RouterLink>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger as-child class="menu-trigger">
              <RouterLink to="/tickets">Tickets</RouterLink>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
  }

  .navbar-container {
    width: 100%;
  }
  .navbar-header {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    border-bottom: 2px solid black;
  }

  .navbar-container {
    display: flex;
    height: 4rem;
    max-width: 1400px;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
  }

  .brand-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .brand-text {
    font-weight: 900;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: -0.05em;
  }

  .navbar-menu {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .custom-menubar {
    border: none;
    background-color: transparent;
    box-shadow: none;
  }

  .menu-trigger {
    cursor: pointer;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
  }

  .navbar-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  @media (max-width: 768px) {
    .navbar-menu {
      display: none;
    }
  }
</style>
