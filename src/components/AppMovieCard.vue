<script>
import { state } from '../state';
import FlagCountry from './FlagCountry.vue';
export default {
    name: 'AppMovieCard',
    components: {
        FlagCountry
    },
    data() {
        return {
            state
        }
    }
}
</script>

<template>
    <div class="row">
        <div class="col-12 pb-0">
            <h2 v-if="!state.searchStart" class="text-secondary text-shadow">{{ state.initialMovieTitle }}</h2>
            <div v-else-if="state.movies.length === 0" class="px-5">
                <h2 class="text-danger text-shadow">Movies not found</h2>
                <p class="text-secondary">{{ state.noResults }}</p>
            </div>
            <h2 v-else class="text-secondary text-shadow">Movies</h2>
        </div>
        <!-- /.col-12 (Movies title) -->
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="movie in state.movies">
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
                                {{ state.noVoteMessage }}
                            </div>
                            <div v-else>
                                <span v-for="i in 5" :class="{
                                    'fas fa-star': i <= state.starsVote(movie.vote_average),
                                    'far fa-star': i > state.starsVote(movie.vote_average)
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
</template>