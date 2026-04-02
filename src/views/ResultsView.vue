<script setup>
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { User, Mail, Globe, Trash2, ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const results = ref([])

const loadResults = () => {
  const saved = localStorage.getItem('form_results')
  results.value = saved ? JSON.parse(saved).reverse() : [] // Inversé pour voir le plus récent en premier
}

const clearResults = () => {
  if (confirm('Voulez-vous vraiment supprimer toutes les réponses ?')) {
    localStorage.removeItem('form_results')
    loadResults()
  }
}

const deleteItem = (id) => {
  const updated = results.value.filter(item => item.id !== id)
  localStorage.setItem('form_results', JSON.stringify(updated.reverse()))
  loadResults()
}

onMounted(() => {
  loadResults()
})
</script>

<template>
  <main class="container max-w-5xl py-12 space-y-8">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h1 class="text-4xl font-black uppercase tracking-tighter">Résultats du Formulaire</h1>
        <p class="text-muted-foreground text-lg">Liste de toutes les soumissions enregistrées localement.</p>
      </div>
      <div class="flex gap-4">
        <Button variant="outline" @click="router.push('/form')" class="border-2 font-bold">
          <ArrowLeft class="mr-2 size-4" />
          Nouveau
        </Button>
        <Button variant="destructive" @click="clearResults" class="font-bold" v-if="results.length > 0">
          <Trash2 class="mr-2 size-4" />
          Tout effacer
        </Button>
      </div>
    </div>

    <div v-if="results.length === 0" class="flex flex-col items-center justify-center py-20 border-4 border-dashed rounded-xl">
      <p class="text-xl font-bold text-muted-foreground">Aucun résultat trouvé.</p>
      <Button variant="link" @click="router.push('/form')" class="mt-2 text-black font-bold">
        Remplir le formulaire maintenant
      </Button>
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2">
      <Card v-for="item in results" :key="item.id" class="border-2 shadow-none hover:border-black transition-colors relative group">
        <Button 
          variant="ghost" 
          size="icon" 
          @click="deleteItem(item.id)" 
          class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 class="size-4 text-destructive" />
        </Button>
        
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-xl font-bold tracking-tight">{{ item.fullname }}</CardTitle>
            <span class="text-xs font-mono bg-muted px-2 py-1 rounded">{{ item.date }}</span>
          </div>
          <CardDescription class="font-medium text-black">@{{ item.username }}</CardDescription>
        </CardHeader>
        
        <CardContent class="grid gap-4">
          <div class="flex items-center gap-3 text-sm">
            <div class="size-8 rounded-full bg-muted flex items-center justify-center">
              <Mail class="size-4" />
            </div>
            <span class="font-medium">{{ item.email }}</span>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <div class="size-8 rounded-full bg-muted flex items-center justify-center">
              <Globe class="size-4" />
            </div>
            <a :href="item.website" target="_blank" class="font-medium underline hover:text-primary transition-colors">
              {{ item.website }}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
