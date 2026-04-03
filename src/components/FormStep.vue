<script setup>
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Check } from 'lucide-vue-next'

defineProps({
  formData: {
    type: Object,
    required: true
  },
  config: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- Rend les champs de formulaire -->
  <div v-if="config.type === 'form'" class="grid gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div v-for="field in config.fields" :key="field.id" class="grid gap-3">
      <Label :for="field.id" class="text-lg font-bold">{{ field.label }}</Label>
      <Textarea
        v-if="field.type === 'textarea'"
        :id="field.id"
        v-model="formData[field.id]"
        :placeholder="field.placeholder"
        class="min-h-[150px] border-2 text-lg focus-visible:ring-0 focus-visible:border-black resize-none"
      />
      <Input
        v-else
        :id="field.id"
        :type="field.type || 'text'"
        v-model="formData[field.id]"
        :placeholder="field.placeholder"
        class="h-14 border-2 text-lg focus-visible:ring-0 focus-visible:border-black"
      />
    </div>
  </div>

  <!-- Rend le récapitulatif -->
  <div v-else-if="config.type === 'summary'" class="flex flex-col items-center justify-center gap-6 py-10 animate-in zoom-in-95 duration-500">
    <div class="rounded-full bg-black p-6 text-white shadow-xl">
      <Check class="size-16" />
    </div>
    <div class="text-center space-y-4">
      <h3 class="text-2xl font-black uppercase">Récapitulatif</h3>
      <div class="text-left bg-muted/20 p-6 rounded-xl border-2 border-dashed space-y-2">
        <p v-for="item in config.items" :key="item.label">
          <strong>{{ item.label }} :</strong> {{ item.getValue(formData) }}
        </p>
      </div>
      <p class="text-muted-foreground text-lg">Tout semble correct ?</p>
    </div>
  </div>
</template>
