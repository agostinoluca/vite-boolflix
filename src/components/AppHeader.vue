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
        // tasto Home - carica i risultati iniziali (preimpostati con query API) di Movies e Series
        goHome() {
            state.loader = true;
            state.getInitialResultsMovies();
            state.getInitialResultsSeries();
            state.searchStart = false;
        },
        // tasto Top Movies - mostra i trending movies (nasconde le Tv Series)
        trendingMovies() {
            state.loader = true;
            state.getTrendingMovies();
            state.searchStart = false;
        },
        // tasto Top Tv-Series - mostra le trending series (nasconde i Movies)
        trendingSeries() {
            state.loader = true;
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
            <!-- /logo e pulsanti Home, top Movies e top Series -->
            <div class="searchNav d-flex">
                <select name="searchType" id="searchType" v-model="state.selectedType">
                    <option value="">All Results</option>
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
            <!-- /.searchNav -->
        </div>
    </header>
    <!-- /header -->
</template>


<style scoped>
.logo:hover img {
    animation: rotate 1s linear;
}

#searchType {
    background-color: transparent;
    border: none;
    border-radius: 0.25rem;
    color: var(--boolflix-danger);
    font-family: inherit;
    box-shadow: 0rem 0 0.25rem var(--boolflix-danger);
    width: 100%;

    &:hover {
        animation: shadowPulse 3s linear infinite;
    }
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
        color: var(--boolflix-lighter);
        box-shadow: 0px 2px 0px 0px var(--boolflix-danger);
        border-radius: 0.15rem;
        cursor: pointer;
    }
}
</style>