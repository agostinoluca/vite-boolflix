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
            <div class="searchNav d-flex g-1">
                <input id="searchBar" v-model="inputText" @keyup.enter="emitInputText" type="text"
                    placeholder="Enter the title here">
                <button @click="emitInputText">
                    <i class="fa-solid fa-caret-right"></i>
                </button>
            </div>
        </div>
    </header>
</template>


<style scoped>
header {
    background-color: var(--boolflix-dark);
    box-shadow: 0 0 0.5rem black;
}

.searchNav button {
    background-color: var(--boolflix-danger);
    color: var(--boolflix-lighter);
    border-radius: 50%;
    padding: 0.25rem;
    border: none;
    height: 1.5rem;
    aspect-ratio: 1;
}
</style>