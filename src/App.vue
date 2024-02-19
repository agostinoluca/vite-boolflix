<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      inputText: '',
      api_key: '71a27b20b786fe39560049b7c72c9d1f',
      movies: [],
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
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}&query=${formattedInputText}`;
      // console.log(apiUrl);
      axios
        .get(apiUrl)
        .then((response) => {
          this.movies = response.data.results;
          console.log(this.movies);
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
