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
        tvSeries: Array,
        searchStart: Boolean
    },
    data() {
        return {
            noVoteMessage: 'no votes available',
            noResults: 'No results for your search. Please check your input or try a new search.',
            initialMovieTitle: 'Most viewed movie',
            initialSeriesTitle: 'Top rated Tv Series',
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
            <div class="row">
                <div class="col-12 pb-0">
                    <h2 v-if="!searchStart" class="text-secondary text-shadow">{{ initialMovieTitle }}</h2>
                    <div v-else-if="this.movies.length === 0" class="px-5">
                        <h2 class="text-secondary text-shadow">Movies not found</h2>
                        <p class="text-secondary">{{ noResults }}</p>
                    </div>
                    <h2 v-else class="text-secondary text-shadow">Movies</h2>
                </div>
                <!-- /.col-12 (Movies title) -->
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="movie in movies">
                    <div class="card">
                        <div class="card-body d-none">
                            <div class="card-info">
                                <div class="card-title">
                                    <h6 class="text-secondary">Title:</h6>
                                    <h5>{{ movie.title }}</h5>
                                    <div v-if="movie.title != movie.original_title">
                                        <h6 class="text-secondary">Original title:</h6>
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
                                    <div class="text-warning" v-if="movie.vote_average === 0">
                                        {{ noVoteMessage }}
                                    </div>
                                    <div v-else>
                                        <span v-for="i in 5" :class="{
                                            'fas fa-star': i <= starsVote(movie.vote_average),
                                            'far fa-star': i > starsVote(movie.vote_average)
                                        }"></span>
                                        <span class="text-secondary"> ({{ movie.vote_count }} votes)</span>
                                    </div>
                                </div>
                                <div class="overview">
                                    <h6 class="text-secondary" v-if="movie.overview">Overview:</h6>
                                    <p>{{ movie.overview }}</p>
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
            <!-- /.row (movies) -->

            <div class="row">
                <div class="col-12 pb-0">
                    <h2 v-if="!searchStart" class="text-secondary text-shadow">{{ initialSeriesTitle }}</h2>
                    <div v-else-if="this.tvSeries.length === 0" class="px-5">
                        <h2 class="text-secondary text-shadow">Tv Series Not Found</h2>
                        <p class="text-secondary">{{ noResults }}</p>
                    </div>
                    <h2 v-else class="text-secondary text-shadow">Tv Series</h2>
                </div>
                <!-- /.col-12 (Tv series title) -->
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="show in tvSeries">
                    <div class="card">
                        <div class="card-body d-none">
                            <div class="card-info">
                                <div class="card-title">
                                    <h6 class="text-secondary">Title:</h6>
                                    <h5>{{ show.name }}</h5>
                                    <div v-if="show.name != show.original_name">
                                        <h6 class="text-secondary">Original title:</h6>
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
                                    <div class="text-warning" v-if="show.vote_average === 0">
                                        {{ noVoteMessage }}
                                    </div>
                                    <div v-else>
                                        <span v-for="i in 5" :class="{
                                            'fas fa-star': i <= starsVote(show.vote_average),
                                            'far fa-star': i > starsVote(show.vote_average)
                                        }"></span>
                                        <span class="text-secondary"> ({{ show.vote_count }} votes)</span>
                                    </div>
                                </div>
                                <div class="overview">
                                    <h6 class="text-secondary" v-if="show.overview">Overview:</h6>
                                    <p>{{ show.overview }}</p>
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
            <!-- /.row (Tv Series) -->
        </div>
        <!-- /.container -->
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

    & ::-webkit-scrollbar {
        width: 0.35rem;
    }

    &:hover {
        animation: shadow-animation 3s linear infinite;
    }

    & .card-body {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0.5rem;
        background-color: var(--boolflix-dark);
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    & .card-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        text-align: center;
    }

    & .card-info .overview p {
        font-size: 0.75rem;
        padding-bottom: 0.5rem;
    }

    & .card-title {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
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

.fa-star {
    color: var(--boolflix-warning);
}
</style>