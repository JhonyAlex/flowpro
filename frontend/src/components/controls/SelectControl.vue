<template>
  <div>
    <label>{{ label }}</label>
    <select :value="value" @input="$emit('update:value', $event.target.value)">
      <option disabled value="">Seleccione una opción</option>
      <option v-for="opt in opciones" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    opciones: Array
  }
};
</script>
