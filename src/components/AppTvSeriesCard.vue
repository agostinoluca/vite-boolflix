<script>
import { state } from '../state';
import FlagCountry from './FlagCountry.vue';
import SelectGenresTv from './SelectGenresTv.vue';
export default {
    name: 'AppTvSeriesCard',
    components: {
        FlagCountry,
        SelectGenresTv
    },
    data() {
        return {
            state
        }
    },
}
</script>

<template>
    <div class="row">
        <div class="col-12 pb-0 d-flex g-1 justify-content-between">
            <h2 v-if="!state.searchStart" class="text-secondary text-shadow">{{ state.seriesSectionTitle }}</h2>
            <div v-else-if="state.tvSeries.length === 0" class="px-5">
                <h2 class="text-danger text-shadow">Tv Series Not Found</h2>
                <p class="text-secondary">{{ state.noResults }}</p>
            </div>
            <h2 v-else class="text-secondary text-shadow">Tv Series</h2>
            <SelectGenresTv></SelectGenresTv>
        </div>
        <!-- /.col-12 (Tv series title) -->
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="show in state.tvSeries" :key="show.id"
            v-show="show.genre_ids.includes(state.selectedGenreTv) || state.selectedGenreTv == 0">
            <div class="card" @mouseleave="state.resetCastAndGenres()">
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
                        <div class="card-rating" v-html="state.cardRating(show)"></div>
                        <div class="cast-genre">
                            <button class="btn" @click="state.getCast(show.id)">CAST</button>
                            <button class="btn" @click="state.getCardGenre('tv')">GENRE</button>
                            <div v-for="actor in state.cast" :key="show.id">
                                <p>{{ actor.name }}</p>
                            </div>
                            <div v-for="genreId in show.genre_ids" :key="genreId">
                                <p v-if="state.showGenres">{{ state.getGenreName(genreId) }}</p>
                            </div>
                            <p class="text-danger" v-if="state.unavalaibleInfo">{{ state.noInfo }}</p>
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
</template>
