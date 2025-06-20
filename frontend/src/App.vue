<template>
  <div id="app">
    <Editor />
  </div>
</template>

<script>
import Editor from './components/Editor.vue';

export default {
  name: 'App',
  components: {
    Editor
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 1rem;
}
</style>