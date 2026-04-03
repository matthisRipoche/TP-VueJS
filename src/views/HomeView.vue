<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LayoutDashboard, Zap, ShieldCheck, Github, ArrowRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] bg-white selection:bg-black selection:text-white">
    <section class="container mx-auto px-4 sm:px-6 py-12 md:py-32 flex flex-col items-center text-center space-y-8">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-[10px] sm:text-xs font-bold uppercase tracking-widest border-2 border-black/5">
        <Zap class="size-3 fill-black" />
        Vue.js 3 Project
      </div>
      
      <h1 class="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
        Modern <span class="text-transparent border-text">Ticket</span><br/>
        System.
      </h1>
      
      <p class="max-w-2xl text-lg sm:text-xl text-muted-foreground font-medium">
        Demo application built with <span class="text-black font-bold underline decoration-4 decoration-yellow-400 underline-offset-4">Vue 3</span>, 
        <span class="text-black font-bold underline decoration-4 decoration-blue-400 underline-offset-4">Vite</span> and 
        <span class="text-black font-bold underline decoration-4 decoration-emerald-400 underline-offset-4">Tailwind CSS</span>. 
        Manage support tickets with a fluid interface.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
        <Button 
          size="lg" 
          @click="router.push('/tickets')"
          class="h-16 px-10 bg-black text-white hover:bg-black/80 text-lg sm:text-xl font-black uppercase tracking-tight transition-all hover:scale-105"
        >
          Go to Dashboard
          <ArrowRight class="ml-2 size-6" />
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          as="a"
          href="https://github.com"
          target="_blank"
          class="h-16 px-10 border-4 border-black text-lg sm:text-xl font-black uppercase tracking-tight hover:bg-black hover:text-white transition-all"
        >
          <Github class="mr-2 size-6" />
          GitHub
        </Button>
      </div>
    </section>

    <section class="container mx-auto px-4 sm:px-6 py-12 md:py-20 border-t-4 border-black">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card class="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <CardContent class="p-6 sm:p-8 space-y-4">
            <div class="size-14 bg-black text-white flex items-center justify-center rounded-2xl">
              <LayoutDashboard class="size-8" />
            </div>
            <h3 class="text-2xl font-black uppercase italic text-balance">Intuitive Dashboard</h3>
            <p class="text-muted-foreground font-medium">Clear overview of all tickets. Create, edit, or delete with one click.</p>
          </CardContent>
        </Card>

        <Card class="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <CardContent class="p-6 sm:p-8 space-y-4">
            <div class="size-14 bg-black text-white flex items-center justify-center rounded-2xl">
              <Zap class="size-8" />
            </div>
            <h3 class="text-2xl font-black uppercase italic">Performance</h3>
            <p class="text-muted-foreground font-medium">Built with Composition API and Vite for instant responsiveness and fluid development.</p>
          </CardContent>
        </Card>

        <Card class="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <CardContent class="p-6 sm:p-8 space-y-4">
            <div class="size-14 bg-black text-white flex items-center justify-center rounded-2xl">
              <ShieldCheck class="size-8" />
            </div>
            <h3 class="text-2xl font-black uppercase italic">API First</h3>
            <p class="text-muted-foreground font-medium">Async communication with a real REST API for reliable data persistence.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>

<style scoped>
.border-text {
  -webkit-text-stroke: 2px black;
}

@media (max-width: 640px) {
  .border-text {
    -webkit-text-stroke: 1px black;
  }
}
</style>
