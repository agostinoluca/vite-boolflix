<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            inputText: '',
        }
    },
    methods: {
        emitInputText() {
            this.$emit('search', this.inputText)
        }
    }
}
</script>
        
<template>
    <header>
        <input id="searchBar" v-model="inputText" @keyup.enter="emitInputText" type="text"
            placeholder="Enter the title here">
        <button @click="emitInputText">Search</button>
    </header>
</template>


<style scoped></style>