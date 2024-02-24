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
        <div class="d-flex justify-content-between align-items-center">
            <div class="logo d-flex">
                <img width="180" src="../assets/img/logo.png" alt="Logo Boolflix">
            </div>
            <div class="searchNav d-flex">
                <input id="searchBar" v-model="inputText" @keyup.enter="emitInputText" type="text"
                    placeholder="Enter the title here">
                <button class="d-flex justify-content-center align-items-center" @click="emitInputText">
                    <i class="fa-solid fa-caret-right"></i>
                </button>
            </div>
        </div>
    </header>
</template>


<style scoped>
.searchNav input {
    width: 100%;
}

.logo:hover img {
    animation: rotate 1s linear;
}

.searchNav button {
    border: none;
    background-color: var(--boolflix-danger);
    color: var(--boolflix-lighter);
    border-radius: 50%;
    padding: 0.25rem;
    margin-left: 0.25rem;
    height: 1.5rem;
    aspect-ratio: 1;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        filter: brightness(100);
    }
}
</style>