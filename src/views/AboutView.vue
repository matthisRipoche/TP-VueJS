<template>
  <main class="container max-w-4xl mx-auto px-4 sm:px-8 py-12 md:py-20 space-y-12">
    <div class="space-y-4">
      <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
        About this <span class="text-transparent border-text">Project</span>
      </h1>
      <p class="text-xl text-muted-foreground font-medium">
        A modern ticket management system built to demonstrate the power of Vue.js 3 and contemporary web technologies.
      </p>
    </div>

    <div class="grid gap-8 border-t-4 border-black pt-12">
      <div class="space-y-2">
        <h2 class="text-2xl font-black uppercase">The Stack</h2>
        <p class="text-muted-foreground">
          This project utilizes <span class="font-bold text-black">Vue 3 (Composition API)</span> for its reactivity, 
          <span class="font-bold text-black">Vite</span> for an ultra-fast development experience, and 
          <span class="font-bold text-black">Tailwind CSS</span> for a utility-first, responsive design. 
          The UI components are built using <span class="font-bold text-black">Reka UI</span> (formerly Radix Vue) for accessibility and flexibility.
        </p>
      </div>

      <div class="space-y-2">
        <h2 class="text-2xl font-black uppercase">Features</h2>
        <ul class="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Full CRUD operations (Create, Read, Update, Delete) via a REST API.</li>
          <li>Multi-step form processing within a modal interface.</li>
          <li>Real-time state management and loading states.</li>
          <li>Fully responsive layout for mobile, tablet, and desktop.</li>
          <li>Comprehensive unit test suite for critical paths.</li>
        </ul>
      </div>
    </div>
  </main>
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
