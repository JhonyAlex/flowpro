<template>
  <textarea v-model="text"></textarea>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('');
</script>
