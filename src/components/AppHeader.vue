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
        <div class="d-flex justify-content-between align-items-center p-2">
            <div class="logo">
                <img src="../assets/img/logo.png" alt="Logo Boolflix">
            </div>
            <div class="searchNav">
                <input id="searchBar" v-model="inputText" @keyup.enter="emitInputText" type="text"
                    placeholder="Enter the title here">
                <button @click="emitInputText">Search</button>
            </div>
        </div>
    </header>
</template>


<style scoped>
header {
    background-color: --boolflix-primary;
}
</style>