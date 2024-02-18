<script>
export default {
  name: 'App',
  data() {
    return {
      inputText: '',
    }
  },
  methods: {
    startSearch() {
      console.log('Cerca', this.inputText);
    }
  }
}
</script>

<template>
  <input v-model="inputText" @keyup.enter="startSearch" type="text" placeholder="Enter the title here">
  <button @click="startSearch">Search</button>
</template>

<style></style>
