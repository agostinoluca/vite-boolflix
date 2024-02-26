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
  created() {
    // setTimeout(() => {
    state.getInitialResultsMovies();
    state.getInitialResultsSeries();
    // }, 3000);
  },
  methods: {
    getListMovies(formattedInputText) {
      // setTimeout(() => {
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
      // }, 3000);

    },

    getListSeries(formattedInputText) {
      // setTimeout(() => {
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
      // }, 3000);

    },
    startSearch(inputText) {
      state.loader = true
      const words = inputText.split(' ');
      const formattedInputText = words.join('+');
      this.getListMovies(formattedInputText),
        this.getListSeries(formattedInputText)
    },
  },
}
</script>

<template>
  <AppHeader @emitInputText="startSearch"></AppHeader>
  <AppMain></AppMain>
  <AppFooter></AppFooter>
</template>
