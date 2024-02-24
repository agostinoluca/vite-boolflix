<script>
import { state } from '../state';
import FlagCountry from './FlagCountry.vue';
export default {
    name: 'AppMain',
    components: {
        FlagCountry
    },
    props: {
        movies: Array,
        tvSeries: Array
    },
    data() {
        return {
            noVoteMessage: 'no votes available',
            state
        }
    },
    methods: {
        starsVote(vote_average) {
            const stars = vote_average / 2;
            // console.log(stars);
            return Math.ceil(stars);
        },
    }
}
</script>

<template>
    <main>
        <div class="container">
            <h1>Movies</h1>
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="movie in movies">
                    <div class="card">
                        <div class="card-body d-none">
                            <div class="card-info">
                                <div class="card-title">
                                    <h6>Title:</h6>
                                    <h5>{{ movie.title }}</h5>
                                    <div v-if="movie.title != movie.original_title">
                                        <h6>Original title:</h6>
                                        <h5>{{ movie.original_title }}</h5>
                                    </div>
                                </div>
                                <div class="d-flex g-1 align-items-center">
                                    <FlagCountry :originalLanguage="movie.original_language"></FlagCountry>
                                    <span class="card-language">
                                        {{ movie.original_language }}
                                    </span>
                                </div>
                                <div class="card-rating">
                                    <div v-if="movie.vote_average === 0">
                                        {{ noVoteMessage }}
                                    </div>
                                    <div v-else>
                                        <span v-for="i in 5" :class="{
                                            'fas fa-star': i <= starsVote(movie.vote_average),
                                            'far fa-star': i > starsVote(movie.vote_average)
                                        }"></span>
                                        <span> ({{ movie.vote_count }} votes)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-poster">
                            <img :src="movie.poster_path ? `${state.img_url_api}${state.img_size}${movie.poster_path}` : state.poster_no_available"
                                :alt="`poster of ${movie.title}, missing img`">
                        </div>
                    </div>
                </div>
            </div>

            <h1>Tv Series</h1>
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="show in tvSeries">
                    <div class="card">
                        <div class="card-body d-none">
                            <div class="card-info">
                                <div class="card-title">
                                    <h6>Title:</h6>
                                    <h5>{{ show.name }}</h5>
                                    <div v-if="show.name != show.original_name">
                                        <h6>Original title:</h6>
                                        <h5>{{ show.original_name }}</h5>
                                    </div>
                                </div>
                                <div class="d-flex g-1 align-items-center">
                                    <span>
                                        <FlagCountry :originalLanguage="show.original_language"></FlagCountry>
                                    </span>
                                    <span class="card-language">
                                        {{ show.original_language }}
                                    </span>
                                </div>
                                <div class="card-rating">
                                    <div v-if="show.vote_average === 0">
                                        {{ noVoteMessage }}
                                    </div>
                                    <div v-else>
                                        <span v-for="i in 5" :class="{
                                            'fas fa-star': i <= starsVote(show.vote_average),
                                            'far fa-star': i > starsVote(show.vote_average)
                                        }"></span>
                                        <span> ({{ show.vote_count }} votes)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-poster">
                            <img :src="show.poster_path ? `${state.img_url_api}${state.img_size}${show.poster_path}` : state.poster_no_available"
                                :alt="`poster of ${show.name}, missing img`">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>


<style scoped>
main {
    background-color: var(--boolflix-primary);
}

.card {
    position: relative;
    background-color: var(--boolflix-dark);
    color: var(--boolflix-lighter);
    box-shadow: 0 0 0.5rem var(--boolflix-dark);

    &:hover {
        animation: shadow-animation 3s linear infinite;
    }

    & .card-body {
        position: absolute;
        top: 0;
        left: 0;
        padding: 2.5rem 0.5rem;
        background-color: var(--boolflix-dark);
        width: 100%;
        height: 100%;
    }

    & .card-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        text-align: center;
    }

    & .card-title {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    & .card-title h6 {
        color: var(--boolflix-primary);
    }

    & .card-language {
        text-transform: uppercase;
        font-size: 0.75rem;
    }

    & .card-poster {
        height: 18rem;
        display: flex;
    }

    & .card-poster img {
        width: 100%;
    }

    &:hover .card-body {
        display: block;
    }
}

.flag-icon {
    border: 1px solid black;
    border-radius: 2px;
    box-shadow: 1px 1px 1px black;
}

.fa-star {
    color: rgb(245, 245, 39);
}
</style>