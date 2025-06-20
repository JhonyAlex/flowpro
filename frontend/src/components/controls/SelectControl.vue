<template>
  <select v-model="selected">
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});

const selected = ref(props.options[0] || '');
</script>
