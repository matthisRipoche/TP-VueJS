<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import submissionService from '@/api/services/todoService'
import FormStep from './FormStep.vue'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
} from '@/components/ui/stepper'
import { User, Mail, Check, ArrowRight, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const stepIndex = ref(1)
const isSubmitting = ref(false)

const formData = reactive({
  title: '',
  description: '',
  responsable: ''
})

const steps = [
  { 
    step: 1, 
    title: 'Titre du ticket', 
    icon: User, 
    description: 'Vos informations de base',
    type: 'form',
    fields: [
      { id: 'title', label: "Titre du ticket", placeholder: 'Titre du ticket...', type: 'text' },
      { id: 'responsable', label: "Responsable", placeholder: 'John Smith', type: 'text' }
    ]
  },
  { 
    step: 2, 
    title: 'Description du ticket', 
    icon: Mail, 
    description: 'Description du ticket',
    type: 'form',
    fields: [
      { id: 'description', label: "Description", placeholder: 'Description du ticket...', type: 'textarea' },
    ]
  },
  { 
    step: 3, 
    title: 'Confirmation', 
    icon: Check, 
    description: 'Vérification finale',
    type: 'summary',
    items: [
      { label: "Titre", getValue: (data) => `${data.title}` },
      { label: "Responsable", getValue: (data) => data.responsable },
      { label: "Description", getValue: (data) => data.description }
    ]
  },
]

const nextStep = () => {
  if (stepIndex.value < 3) stepIndex.value++
}

const prevStep = () => {
  if (stepIndex.value > 1) stepIndex.value--
}

const onSubmit = async () => {
  isSubmitting.value = true
  try {
    await submissionService.submitForm({ ...formData })
    router.push('/results')
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Card class="w-full max-w-4xl border-4 shadow-none transition-all duration-300">
    <CardHeader class="space-y-10 p-10">
      
      <Stepper v-model="stepIndex" class="flex w-full items-start gap-4">
        <StepperItem
          v-for="item in steps"
          :key="item.step"
          class="relative flex w-full flex-col items-center justify-center gap-3"
          :step="item.step"
        >
          <StepperTrigger as-child>
            <Button
              variant="outline"
              class="z-10 size-16 rounded-full shrink-0 border-2 transition-all duration-500"
              :class="[
                stepIndex === item.step ? 'border-black scale-110 ring-4 ring-black/5' : 'border-muted',
                stepIndex > item.step ? 'bg-black text-white border-black' : 'bg-background'
              ]"
            >
              <StepperIndicator>
                <component :is="item.icon" class="size-6" />
              </StepperIndicator>
            </Button>
          </StepperTrigger>

          <div class="flex flex-col items-center text-center">
            <StepperTitle 
              class="text-sm font-bold uppercase tracking-widest transition-colors" 
              :class="stepIndex >= item.step ? 'text-black' : 'text-muted-foreground'"
            >
              {{ item.title }}
            </StepperTitle>
          </div>
        </StepperItem>
      </Stepper>

      <div class="space-y-2 text-center">
        <CardTitle class="text-4xl font-black uppercase tracking-tighter">
          {{ steps[stepIndex - 1].title }}
        </CardTitle>
        <CardDescription class="text-lg">
          {{ steps[stepIndex - 1].description }}
        </CardDescription>
      </div>
    </CardHeader>

    <CardContent class="px-10 py-6 min-h-[300px]">
      <div :key="stepIndex">
        <FormStep 
          :formData="formData" 
          :config="steps[stepIndex - 1]" 
        />
      </div>
    </CardContent>

    <CardFooter class="flex justify-between border-t-4 p-10 mt-6 bg-muted/5">
      <Button 
        variant="outline" 
        size="lg"
        :disabled="stepIndex === 1" 
        @click="prevStep"
        class="h-14 px-8 border-2 font-bold hover:bg-black hover:text-white transition-all"
      >
        <ArrowLeft class="mr-2 size-5" />
        Retour
      </Button>
      
      <Button 
        v-if="stepIndex < 3" 
        size="lg"
        @click="nextStep"
        class="h-14 px-10 bg-black text-white hover:bg-black/80 font-bold text-lg transition-all"
      >
        Continuer
        <ArrowRight class="ml-2 size-5" />
      </Button>
      
      <Button 
        v-else 
        size="lg"
        variant="default"
        @click="onSubmit"
        class="h-14 px-10 bg-black text-white hover:bg-black/80 font-bold text-lg"
      >
        Confirmer l'inscription
        <Check class="ml-2 size-5" />
      </Button>
    </CardFooter>
  </Card>
</template>
