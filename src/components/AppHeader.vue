<script>
import { state } from '../state';
export default {
    name: 'AppHeader',
    emits: ['emitInputText'],
    data() {
        return {
            inputText: '',
            state
        }
    },
    methods: {
        // emitInputText() {
        //     this.$emit('search', this.inputText)
        // },
        goHome() {
            state.getInitialResultsMovies();
            state.getInitialResultsSeries();
            state.searchStart = false;
        },
        trendingMovies() {
            state.getTrendingMovies();
            state.searchStart = false;
        },
        trendingSeries() {
            state.getTrendingSeries();
            state.searchStart = false;
        },
    }
}
</script>

<template>
    <header>
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center g-5">
                <div class="logo d-flex">
                    <img width="180" src="../assets/img/logo.png" alt="Logo Boolflix">
                </div>
                <ul>
                    <li @click="goHome()">Home</li>
                    <li @click="trendingMovies()">Top Movies</li>
                    <li @click="trendingSeries()">Top Tv-Series</li>
                </ul>
            </div>
            <div class="searchNav d-flex">
                <select name="searchType" id="searchType" v-model="state.selectedType">
                    <option value="">All Result</option>
                    <option value="movies">Movies</option>
                    <option value="series">Series</option>
                </select>
                <input id="searchBar" v-model="inputText" @keyup.enter="$emit('emitInputText', inputText)" type="text"
                    placeholder="Enter the title here">
                <button class="d-flex justify-content-center align-items-center"
                    @click="$emit('emitInputText', inputText)">
                    <i class="fa-solid fa-caret-right"></i>
                </button>
            </div>
        </div>
    </header>
</template>


<style scoped>
.logo:hover img {
    animation: rotate 1s linear;
    cursor: pointer;
}

#searchType {
    background-color: transparent;
    border: none;
    border-radius: 0.10rem;
    color: var(--boolflix-danger);
    font-family: inherit;
}

#searchType option {
    background-color: var(--boolflix-dark);
}

#searchBar {
    width: 100%;
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
    }
}

ul {
    color: var(--boolflix-secondary);
    font-weight: 700;
    list-style: none;
    gap: 1rem;

    & li:hover {
        box-shadow: 0px 2px 0px 0px var(--boolflix-danger);
        border-radius: 0.15rem;
        cursor: pointer;
    }
}
</style>