<template>
  <div>
    <label>{{ label }}</label>
    <textarea
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      placeholder="Escriba aquí..."
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String
  }
};
</script>
