<template>
  <div ref="container" class="editor-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { NodeEditor } from 'rete';

const container = ref(null);

function inicializarEditor(el) {
  const editor = new NodeEditor('demo@0.1.0', el);
  // Aquí se podría configurar Rete con nodos y controles
  return editor;
}

onMounted(() => {
  if (container.value) {
    inicializarEditor(container.value);
  }
});
</script>

<style scoped>
.editor-container {
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
}
</style>
