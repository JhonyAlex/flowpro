<template>
  <div>
    <label>{{ label }}</label>
    <select v-model="value" @change="onChange">
      <option disabled value="">Seleccione...</option>
      <option v-for="op in opciones" :key="op" :value="op">{{ op }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['value', 'label', 'opciones'],
  methods: {
    onChange() {
      this.$emit('input', this.value);
    }
  }
};
</script>
