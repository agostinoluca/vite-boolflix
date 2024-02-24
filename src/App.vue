<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import axios from 'axios';
import { state } from './state';
export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain
  },
  data() {
    return {
      movies: [],
      tvSeries: [],
      searchStart: false,
      state
    }
  },
  created() {
    this.getInitialResultsMovies();
    this.getInitialResultsSeries()
  },
  methods: {
    getInitialResultsMovies() {
      const apiUrl = state.movie_initial_api;
      axios
        .get(apiUrl)
        .then((response) => {
          this.movies = response.data.results;
        })
        .catch((error) => {
          console.error(error);
        })
    },
    getInitialResultsSeries() {
      const apiUrl = state.tv_series_initial_api;
      axios
        .get(apiUrl)
        .then((response) => {
          this.tvSeries = response.data.results;
        })
        .catch((error) => {
          console.error(error);
        })
    },
    getListMovies(formattedInputText) {
      const apiUrl = `${state.movie_api_url}&query=${formattedInputText}`;
      // console.log(apiUrl);
      axios
        .get(apiUrl)
        .then((response) => {
          this.movies = response.data.results;
          // console.log(this.movies);
          this.searchStart = true;
        })
        .catch((error) => {
          console.error(error);
        })
    },
    getListSeries(formattedInputText) {
      const apiUrl = `${state.tv_series_api_url}&query=${formattedInputText}`;
      // console.log(apiUrl);
      axios
        .get(apiUrl)
        .then((response) => {
          this.tvSeries = response.data.results;
          // console.log(this.tvSeries);
          this.searchStart = true;
        })
        .catch((error) => {
          console.error(error);
        })
    },
    startSearch(inputText) {
      // console.log('Cerca', this.inputText);
      const words = inputText.split(' ');
      const formattedInputText = words.join('+');
      // console.log(formattedInputText);
      this.getListMovies(formattedInputText),
        this.getListSeries(formattedInputText)
    },
  },
}
</script>

<template>
  <AppHeader @search="startSearch"></AppHeader>
  <AppMain :movies="movies" :tvSeries="tvSeries" :searchStart="this.searchStart"></AppMain>
</template>

<style></style>
