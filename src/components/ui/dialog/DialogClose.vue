<script setup>
import { DialogClose as DialogClosePrimitive, useForwardPropsEmits } from "reka-ui";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});

const forwarded = useForwardPropsEmits(props);
</script>

<template>
  <DialogClosePrimitive v-bind="forwarded">
    <slot />
  </DialogClosePrimitive>
</template>
