<template>
  <div>
    <label>{{ label }}</label>
    <textarea v-model="value" @input="onChange" rows="3"></textarea>
  </div>
</template>

<script>
export default {
  props: ['value', 'label'],
  methods: {
    onChange() {
      this.$emit('input', this.value);
    }
  }
};
</script>
