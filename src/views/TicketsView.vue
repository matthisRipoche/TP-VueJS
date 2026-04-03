<script setup>
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { User, Trash2, Plus, Loader2, Pencil } from 'lucide-vue-next'
import ticketService from '@/api/services/ticketService'
import TicketForm from '@/components/TicketForm.vue'

const results = ref([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const isDialogOpen = ref(false)
const editingItem = ref(null)
const errorMsg = ref('')

const loadResults = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    results.value = await ticketService.getAllTickets()
  } catch (error) {
    console.error("Load error:", error)
    errorMsg.value = 'Failed to load tickets. Please check your API connection.'
  } finally {
    isLoading.value = false
  }
}

const openCreateDialog = () => {
  editingItem.value = null
  isDialogOpen.value = true
}

const openEditDialog = (item) => {
  editingItem.value = { ...item }
  isDialogOpen.value = true
}

const handleFormSubmit = async (formData) => {
  isSubmitting.value = true
  errorMsg.value = ''
  try {
    if (editingItem.value) {
      await ticketService.updateTicket(editingItem.value.id, formData)
    } else {
      await ticketService.createTicket(formData)
    }
    isDialogOpen.value = false
    await loadResults()
  } catch (error) {
    console.error("Save error:", error)
    errorMsg.value = 'Failed to save ticket. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const deleteItem = async (id) => {
  if (confirm('Delete this ticket?')) {
    await ticketService.deleteTicket(id)
    await loadResults()
  }
}

const clearResults = async () => {
  if (confirm('Delete all tickets?')) {
    await ticketService.clearAllTickets()
    await loadResults()
  }
}

onMounted(() => {
  loadResults()
})
</script>

<template>
  <main class="container max-w-none px-4 sm:px-8 py-8 md:py-12 space-y-8">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div class="space-y-1">
        <h1 class="text-3xl md:text-4xl font-black uppercase tracking-tighter">Support Tickets</h1>
        <p class="text-muted-foreground text-base md:text-lg font-medium">Manage your support tickets in real-time.</p>
      </div>
      
      <div class="flex w-full sm:w-auto gap-3">
        <Dialog v-model:open="isDialogOpen">
          <DialogTrigger as-child>
            <Button @click="openCreateDialog" class="flex-1 sm:flex-none bg-black text-white hover:bg-black/80 font-bold px-6 h-12">
              <Plus class="mr-2 size-5" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent class="w-[95vw] sm:max-w-[500px] border-4">
            <DialogHeader>
              <DialogTitle class="text-2xl font-black uppercase">
                {{ editingItem ? 'Edit Ticket' : 'Create Ticket' }}
              </DialogTitle>
              <DialogDescription>
                Fill in the details below to {{ editingItem ? 'update' : 'add' }} a ticket.
              </DialogDescription>
            </DialogHeader>
            
            <TicketForm 
              :initial-data="editingItem || undefined"
              :is-submitting="isSubmitting"
              @submit="handleFormSubmit"
            />
          </DialogContent>
        </Dialog>

        <Button variant="destructive" @click="clearResults" class="h-12 w-12 shrink-0 font-bold" v-if="results.length > 0">
          <Trash2 class="size-5" />
        </Button>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMsg" class="bg-destructive/10 border-2 border-destructive p-4 rounded-lg text-destructive font-bold animate-in fade-in slide-in-from-top-2">
      {{ errorMsg }}
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <Loader2 class="size-12 animate-spin text-muted-foreground" />
      <p class="mt-4 font-bold text-muted-foreground uppercase tracking-widest">Loading...</p>
    </div>

    <div v-else-if="results.length === 0" class="flex flex-col items-center justify-center py-20 border-4 border-dashed rounded-xl">
      <p class="text-xl font-bold text-muted-foreground text-center px-4">No tickets found.</p>
      <Button variant="link" @click="openCreateDialog" class="mt-2 text-black font-bold">
        Create the first ticket now
      </Button>
    </div>

    <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card v-for="item in results" :key="item.id" class="border-2 shadow-none hover:border-black transition-all relative group overflow-hidden">
        <div class="absolute top-2 right-2 flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            @click="openEditDialog(item)" 
            class="size-8 bg-white/80 backdrop-blur hover:bg-white border shadow-sm"
          >
            <Pencil class="size-4 text-black" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            @click="deleteItem(item.id)" 
            class="size-8 bg-white/80 backdrop-blur hover:bg-destructive/10 border border-destructive/20 shadow-sm"
          >
            <Trash2 class="size-4 text-destructive" />
          </Button>
        </div>
        
        <CardHeader class="pb-3">
          <CardTitle class="text-xl font-black uppercase leading-tight line-clamp-2 pr-12">{{ item.title }}</CardTitle>
          <div class="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase mt-2">
            <User class="size-3" />
            {{ item.responsable }}
          </div>
        </CardHeader>
        
        <CardContent>
          <p class="text-sm text-muted-foreground line-clamp-4 min-h-[5rem]">
            {{ item.description }}
          </p>
        </CardContent>

        <div class="px-6 py-3 bg-muted/20 border-t flex justify-between items-center text-[10px] font-mono uppercase tracking-tighter">
          <span>ID: {{ String(item.id).slice(-6) }}</span>
          <span>{{ item.date || 'Recent' }}</span>
        </div>
      </Card>
    </div>
  </main>
</template>
