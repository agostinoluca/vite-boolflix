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
    state.loader = false;
    // }, 3000);
  },
  methods: {
    getListMovies(formattedInputText) {
      const apiUrl = `${state.movie_api_url}&query=${formattedInputText}`;
      // console.log(apiUrl);
      axios
        .get(apiUrl)
        .then((response) => {
          state.movies = response.data.results;
          state.searchStart = true;
          state.loader = false;
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
          state.tvSeries = response.data.results;
          state.searchStart = true;
          state.loader = false;
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
  <AppHeader @emitInputText="startSearch"></AppHeader>
  <AppMain></AppMain>
  <AppFooter></AppFooter>
</template>
