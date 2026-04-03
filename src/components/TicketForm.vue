<script setup>
import { ref, reactive, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
} from '@/components/ui/stepper'
import { User, Mail, Check, ArrowRight, ArrowLeft } from 'lucide-vue-next'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ title: '', responsable: '', description: '' })
  },
  isSubmitting: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const stepIndex = ref(1)
const formData = reactive({ ...props.initialData })

watch(() => props.initialData, (newData) => {
  Object.assign(formData, newData)
  stepIndex.value = 1
}, { deep: true })

const steps = [
  { 
    step: 1, 
    title: 'Identity', 
    icon: User, 
    description: 'Title and Owner'
  },
  { 
    step: 2, 
    title: 'Details', 
    icon: Mail, 
    description: 'Description'
  },
  { 
    step: 3, 
    title: 'Review', 
    icon: Check, 
    description: 'Summary'
  },
]

const nextStep = () => {
  if (stepIndex.value < 3) stepIndex.value++
}

const prevStep = () => {
  if (stepIndex.value > 1) stepIndex.value--
}

const handleSubmit = () => {
  emit('submit', { ...formData })
}
</script>

<template>
  <div class="space-y-8 py-4">
    <Stepper v-model="stepIndex" class="flex w-full items-start gap-2">
      <StepperItem
        v-for="item in steps"
        :key="item.step"
        class="relative flex w-full flex-col items-center justify-center gap-1"
        :step="item.step"
      >
        <StepperTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            class="z-10 size-10 rounded-full shrink-0 border-2 transition-all duration-300"
            :class="[
              stepIndex === item.step ? 'border-black bg-black text-white scale-110' : 'border-muted',
              stepIndex > item.step ? 'bg-black text-white border-black' : 'bg-background'
            ]"
          >
            <StepperIndicator>
              <component :is="item.icon" class="size-4" />
            </StepperIndicator>
          </Button>
        </StepperTrigger>
        <StepperTitle 
          class="text-[10px] font-bold uppercase tracking-tight" 
          :class="stepIndex >= item.step ? 'text-black' : 'text-muted-foreground'"
        >
          {{ item.title }}
        </StepperTitle>
      </StepperItem>
    </Stepper>

    <div class="min-h-[250px] flex flex-col justify-center">
      <div v-if="stepIndex === 1" class="grid gap-4 animate-in fade-in slide-in-from-bottom-2">
        <div class="grid gap-2">
          <Label for="title" class="font-bold">Ticket Title</Label>
          <Input id="title" v-model="formData.title" placeholder="e.g. Home page bug" class="h-12 border-2" />
        </div>
        <div class="grid gap-2">
          <Label for="responsable" class="font-bold">Owner</Label>
          <Input id="responsable" v-model="formData.responsable" placeholder="Owner name" class="h-12 border-2" />
        </div>
      </div>

      <div v-else-if="stepIndex === 2" class="grid gap-4 animate-in fade-in slide-in-from-bottom-2">
        <div class="grid gap-2">
          <Label for="description" class="font-bold">Detailed Description</Label>
          <Textarea 
            id="description" 
            v-model="formData.description" 
            placeholder="Describe the issue here..." 
            class="min-h-[150px] border-2 resize-none" 
          />
        </div>
      </div>

      <div v-else-if="stepIndex === 3" class="space-y-4 animate-in zoom-in-95">
        <div class="bg-muted/30 p-4 rounded-lg border-2 border-dashed space-y-3 text-sm">
          <p><strong>Title:</strong> {{ formData.title || 'N/A' }}</p>
          <p><strong>Owner:</strong> {{ formData.responsable || 'N/A' }}</p>
          <p><strong>Description:</strong> {{ formData.description || 'N/A' }}</p>
        </div>
        <p class="text-center text-muted-foreground text-xs italic">
          Please review the information before submitting.
        </p>
      </div>
    </div>

    <div class="flex justify-between pt-4 border-t-2 border-dashed mt-4">
      <Button 
        variant="ghost" 
        @click="prevStep" 
        :disabled="stepIndex === 1 || isSubmitting"
        class="font-bold"
      >
        <ArrowLeft class="mr-2 size-4" />
        Back
      </Button>

      <Button 
        v-if="stepIndex < 3" 
        @click="nextStep"
        :disabled="isSubmitting"
        class="bg-black text-white hover:bg-black/80 font-bold px-6"
      >
        Next
        <ArrowRight class="ml-2 size-4" />
      </Button>

      <Button 
        v-else 
        @click="handleSubmit"
        :disabled="isSubmitting"
        class="bg-black text-white hover:bg-black/80 font-bold px-8"
      >
        {{ isSubmitting ? 'Saving...' : 'Confirm' }}
        <Check class="ml-2 size-4" />
      </Button>
    </div>
  </div>
</template>
