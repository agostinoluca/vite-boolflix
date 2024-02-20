<script>
import axios from 'axios';
import { state } from './state'
export default {
  name: 'App',
  data() {
    return {
      inputText: '',
      movies: [],
      tvSeries: [],
      state
    }
  },
  methods: {
    startSearch() {
      // console.log('Cerca', this.inputText);
      this.getListMovies(),
        this.getListSeries()
    },
    getListMovies() {
      const words = this.inputText.split(' ');
      const formattedInputText = words.join('+');
      const apiUrl = `${state.movie_api_url}${state.api_key}&query=${formattedInputText}`;
      // console.log(apiUrl);
      axios
        .get(apiUrl)
        .then((response) => {
          this.movies = response.data.results;
          // console.log(this.movies);
        })
        .catch((error) => {
          console.error(error);
        })
    },
    getListSeries() {
      const words = this.inputText.split(' ');
      const formattedInputText = words.join('+');
      const apiUrl = `${state.tv_series_api_url}${state.api_key}&query=${formattedInputText}`;
      // console.log(apiUrl);
      axios
        .get(apiUrl)
        .then((response) => {
          this.tvSeries = response.data.results;
          // console.log(this.tvSeries);
        })
        .catch((error) => {
          console.error(error);
        })
    },
  }
}
</script>

<template>
  <input id="searchBar" v-model="inputText" @keyup.enter="startSearch" type="text" placeholder="Enter the title here">
  <button @click="startSearch">Search</button>
  <h1>Movies</h1>
  <ul v-for="movie in movies">
    <li>{{ movie.title }}</li>
    <li>{{ movie.original_title }}</li>
    <li>{{ movie.original_language }}</li>
    <li>{{ movie.vote_average }}</li>
  </ul>
  <h1>Tv Series</h1>
  <ul v-for="show in tvSeries">
    <li>{{ show.name }}</li>
    <li>{{ show.original_name }}</li>
    <li>{{ show.original_language }}</li>
    <li>{{ show.vote_average }}</li>
  </ul>
</template>

<style></style>
