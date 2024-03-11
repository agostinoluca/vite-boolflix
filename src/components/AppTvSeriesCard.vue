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
    computed: {
        // se le card vengono tutte nascoste restituisce un valore booleano true
        allCardsHidden() {
            return state.tvSeries.every(
                (show) =>
                    !show.genre_ids.includes(state.selectedGenreTv) &&
                    state.selectedGenreTv !== 0
            );
        },
    }
}
</script>

<template>
    <div class="row">
        <div class="col-12 pb-0 d-flex g-1 justify-content-between">
            <!-- se searchStart è false, imposta il titolo dinamico seriesSectionTitle -->
            <h2 v-if="!state.searchStart" class="text-secondary text-shadow">{{ state.seriesSectionTitle }}</h2>
            <!-- se la array delle tvSeries è vuota, restituisce un messaggio di avviso -->
            <div v-else-if="state.tvSeries.length === 0" class="px-5">
                <h2 class="text-danger text-shadow">Tv Series Not Found</h2>
                <p class="text-secondary">{{ state.noResults }}</p>
            </div>
            <!-- altrimenti restituisce il titolo generico "Tv Series" -->
            <h2 v-else class="text-secondary text-shadow">Tv Series</h2>
            <SelectGenresTv></SelectGenresTv>
        </div>
        <!-- se allCardsHidden è true ed il select dei generi non è su All Genre, restituisce un messaggio di avviso -->
        <div class="col-12" v-if="allCardsHidden && state.selectedGenreTv !== '0'">
            <h2 class="text-danger text-shadow">Tv Series not found</h2>
            <p class="text-secondary">{{ state.noResultsSelect }}</p>
        </div>
        <!-- /.col-12 (titoli Tv Series dinamici e selezione dei generi) -->

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
                        <!-- /.card-title -->
                        <div class="d-flex g-1 align-items-center">
                            <span>
                                <FlagCountry :originalLanguage="show.original_language"></FlagCountry>
                            </span>
                            <span class="card-language">
                                {{ show.original_language }}
                            </span>
                        </div>
                        <!-- /flag country e lingua -->
                        <div class="card-rating" v-html="state.cardRating(show)"></div>
                        <!-- /.card-rating (stelline della votazione e numero di voti) -->
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
                        <!-- /.cast-genre (bottoni collegati a richieste API per generi e cast delle singole card) -->
                        <div class="overview">
                            <h6 class="text-secondary" v-if="show.overview">Overview:</h6>
                            <p>{{ show.overview }}</p>
                        </div>
                        <!-- /.overview (trama della Tv Series on-hover) -->
                    </div>
                    <!-- /.card-info -->
                </div>
                <!-- /.card-body -->
                <div class="card-poster">
                    <img :src="show.poster_path ? `${state.img_url_api}${state.img_size}${show.poster_path}` : state.poster_no_available"
                        :alt="`poster of ${show.name}, missing img`">
                </div>
                <!-- /.card-poster -->
            </div>
            <!-- /.card -->
        </div>
    </div>
    <!-- /.row (Tv Series) -->
</template>
