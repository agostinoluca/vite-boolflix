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
      const words = this.inputText.split(' ');
      const formattedInputText = words.join('+');
      // console.log(formattedInputText);
      this.getListMovies(formattedInputText),
        this.getListSeries(formattedInputText)
    },
    getListMovies(formattedInputText) {
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
    getListSeries(formattedInputText) {
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
    starsVote(vote_average) {
      const stars = vote_average / 2;
      // console.log(stars);
      return Math.ceil(stars);
    }
  },
  computed: {
    flagCountryClass() {
      return (originalLanguage) => {
        if (originalLanguage === 'en' || originalLanguage === 'uk') {
          return 'flag-icon flag-icon-gb';
        } else if (originalLanguage === 'hi') {
          return 'flag-icon flag-icon-us';
        } else if (originalLanguage === 'ja') {
          return 'flag-icon flag-icon-jp';
        } else if (originalLanguage === 'te') {
          return 'flag-icon flag-icon-in';
        } else if (originalLanguage === 'sq') {
          return 'flag-icon flag-icon-al';
        } else if (originalLanguage === 'el') {
          return 'flag-icon flag-icon-gr';
        } else if (originalLanguage === 'zh') {
          return 'flag-icon flag-icon-cn';
        } else if (originalLanguage === 'ko') {
          return 'flag-icon flag-icon-kr';
        } else if (originalLanguage === 'cs') {
          return 'flag-icon flag-icon-cz';
        } else if (originalLanguage === 'ar' || originalLanguage === 'ur') {
          return 'flag-icon flag-icon-ae';
        } else if (originalLanguage === 'da') {
          return 'flag-icon flag-icon-dk';
        } else if (originalLanguage === 'ka') {
          return 'flag-icon flag-icon-ge';
        } else {
          return 'flag-icon flag-icon-' + originalLanguage;
        }
      };
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
    <li><i :class="flagCountryClass(movie.original_language)"></i>{{ movie.original_language }}</li>
    <li>{{ starsVote(movie.vote_average) }}</li>
    <li><img :src="`${state.img_url_api}${state.img_size}${movie.poster_path}`"
        :alt="`poster of ${movie.title}, missing img`">
    </li>
  </ul>
  <h1>Tv Series</h1>
  <ul v-for="show in tvSeries">
    <li>{{ show.name }}</li>
    <li>{{ show.original_name }}</li>
    <li><i :class="flagCountryClass(show.original_language)"></i>{{ show.original_language }}</li>
    <li>{{ starsVote(show.vote_average) }}</li>
    <li><img :src="`${state.img_url_api}${state.img_size}${show.poster_path}`"
        :alt="`poster of ${show.name}, missing img`"></li>
  </ul>
</template>

<style>
.flag-icon {
  border: 1px solid black;
  border-radius: 2px;
  box-shadow: 1px 1px 1px black;
}
</style>
