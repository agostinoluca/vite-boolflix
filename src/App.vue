<script>
import axios from 'axios';
import { state } from './state'
export default {
  name: 'App',
  data() {
    return {
      inputText: '',
      movies: [],
      state
    }
  },
  methods: {
    startSearch() {
      // console.log('Cerca', this.inputText);
      this.getListMovies()
    },
    getListMovies() {
      const words = this.inputText.split(' ');
      const formattedInputText = words.join('+');
      const apiUrl = `${state.api_url}${state.api_key}&query=${formattedInputText}`;
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
  }
}
</script>

<template>
  <input v-model="inputText" @keyup.enter="startSearch" type="text" placeholder="Enter the title here">
  <button @click="startSearch">Search</button>
  <ul v-for="movie in movies">
    <li>{{ movie.title }}</li>
    <li>{{ movie.original_title }}</li>
    <li>{{ movie.original_language }}</li>
    <li>{{ movie.vote_average }}</li>
  </ul>
</template>

<style></style>
