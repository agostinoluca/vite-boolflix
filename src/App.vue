<script>
import { state } from './state';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';
import axios from 'axios';
export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain,
    AppFooter
  },
  data() {
    return {
      state
    }
  },
  // alla creazione della pagina, carico dei risultati per movies e tv series e carico i generi
  created() {
    state.getMovieGenres();
    state.getTvGenres();
    state.getInitialResultsMovies();
    state.getInitialResultsSeries();
  },
  methods: {
    // chiamata API per la ricerca dei Movies
    getListMovies(formattedInputText) {
      const apiUrl = `${state.movie_api_url}&query=${formattedInputText}`;
      axios
        .get(apiUrl)
        .then((response) => {
          state.movies = response.data.results;
          state.loader = false;
        })
        .catch((error) => {
          console.error(error);
        })
    },

    // chiamata API per la ricerca delle Tv Series
    getListSeries(formattedInputText) {
      const apiUrl = `${state.tv_series_api_url}&query=${formattedInputText}`;
      axios
        .get(apiUrl)
        .then((response) => {
          state.tvSeries = response.data.results;
          state.loader = false;
        })
        .catch((error) => {
          console.error(error);
        })
    },

    // avvio della ricerca tramite barra di ricerca
    startSearch(inputText) {
      state.searchStart = true
      state.loader = true
      const words = inputText.split(' ');
      const formattedInputText = words.join('+');
      this.getListMovies(formattedInputText);
      this.getListSeries(formattedInputText);
      // condizione per visualizzare solo film, solo Tv series o entrambe in pagina
      if (state.selectedType === "movies") {
        state.onlyMovies = true;
        state.onlySeries = false;
      } else if (state.selectedType === "series") {
        state.onlySeries = true;
        state.onlyMovies = false;
      } else {
        state.onlyMovies = false;
        state.onlySeries = false;
      }
    },
  },
}
</script>

<template>
  <AppHeader @emitInputText="startSearch"></AppHeader>
  <AppMain></AppMain>
  <AppFooter></AppFooter>
</template>
