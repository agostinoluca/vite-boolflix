<script>
import { state } from '../state';
import FlagCountry from './FlagCountry.vue';
import SelectGenresMovie from './SelectGenresMovie.vue';
export default {
    name: 'AppMovieCard',
    components: {
        FlagCountry,
        SelectGenresMovie
    },
    data() {
        return {
            state
        }
    },
    computed: {
        // se le card vengono tutte nascoste restituisce un valore booleano true
        allCardsHidden() {
            return state.movies.every(
                (movie) =>
                    !movie.genre_ids.includes(state.selectedGenreMovie) &&
                    state.selectedGenreMovie !== 0
            );
        },
    }
}
</script>

<template>
    <div class="row">
        <div class="col-12 pb-0 d-flex g-1 justify-content-between">
            <!-- se searchStart è false, imposta il titolo dinamico movieSectionTitle -->
            <h2 v-if="!state.searchStart" class="text-secondary text-shadow">{{ state.movieSectionTitle }}</h2>
            <!-- se la array dei movies è vuota, restituisce un messaggio di avviso -->
            <div v-else-if="state.movies.length === 0" class="px-5">
                <h2 class="text-danger text-shadow">Movies not found</h2>
                <p class="text-secondary">{{ state.noResults }}</p>
            </div>
            <!-- altrimenti restituisce il titolo generico "Movies" -->
            <h2 v-else class="text-secondary text-shadow">Movies</h2>
            <SelectGenresMovie></SelectGenresMovie>
        </div>
        <!-- se allCardsHidden è true ed il select dei generi non è su All Genre, restituisce un messaggio di avviso -->
        <div class="col-12" v-if="allCardsHidden && state.selectedGenreMovie !== '0'">
            <h2 class="text-danger text-shadow">Movies not found</h2>
            <p class="text-secondary">{{ state.noResultsSelect }}</p>
        </div>
        <!-- /.col-12 (titoli Movies dinamici e selezione dei generi) -->

        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="movie in state.movies" :key="movie.id"
            v-show="movie.genre_ids.includes(state.selectedGenreMovie) || state.selectedGenreMovie == 0">
            <div class="card" @mouseleave="state.resetCastAndGenres()">
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
                        <!-- /.card-title -->
                        <div class="d-flex g-1 align-items-center">
                            <span>
                                <FlagCountry :originalLanguage="movie.original_language"></FlagCountry>
                            </span>
                            <span class="card-language">
                                {{ movie.original_language }}
                            </span>
                        </div>
                        <!-- /flag country e lingua -->
                        <div class="card-rating" v-html="state.cardRating(movie)"></div>
                        <!-- /.card-rating (stelline della votazione e numero di voti) -->
                        <div class="cast-genre">
                            <button class="btn" @click="state.getCast(movie.id)">CAST</button>
                            <button class="btn" @click="state.getCardGenre('movie')">GENRE</button>
                            <div v-for="actor in state.cast" :key="movie.id">
                                <p>{{ actor.name }}</p>
                            </div>
                            <div v-for="genreId in movie.genre_ids" :key="genreId">
                                <p v-if="state.showGenres">{{ state.getGenreName(genreId) }}</p>
                            </div>
                            <p class="text-danger" v-if="state.unavalaibleInfo">{{ state.noInfo }}</p>
                        </div>
                        <!-- /.cast-genre (bottoni collegati a richieste API per generi e cast delle singole card) -->
                        <div class="overview">
                            <h6 class="text-secondary" v-if="movie.overview">Overview:</h6>
                            <p>{{ movie.overview }}</p>
                        </div>
                        <!-- /.overview (trama del Movie on-hover) -->
                    </div>
                    <!-- /.card-info -->
                </div>
                <!-- /.card-body -->
                <div class="card-poster">
                    <img :src="movie.poster_path ? `${state.img_url_api}${state.img_size}${movie.poster_path}` : state.poster_no_available"
                        :alt="`poster of ${movie.title}, missing img`">
                </div>
                <!-- /.card-poster -->
            </div>
            <!-- /.card -->
        </div>
    </div>
    <!-- /.row (movies) -->
</template>