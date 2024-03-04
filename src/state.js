import axios from "axios";
import { reactive } from "vue";

export const state = reactive({
  loader: true,
  searchStart: false,
  selectedType: "",
  movies: [],
  tvSeries: [],
  cast: [],
  genres: [],
  showGenres: false,
  unavalaibleInfo: false,
  onlyMovies: false,
  onlySeries: false,
  movie_initial_api:
    "https://api.themoviedb.org/3/movie/popular?api_key=71a27b20b786fe39560049b7c72c9d1f",
  tv_series_initial_api:
    "https://api.themoviedb.org/3/tv/top_rated?api_key=71a27b20b786fe39560049b7c72c9d1f",
  movie_api_url:
    "https://api.themoviedb.org/3/search/movie?api_key=71a27b20b786fe39560049b7c72c9d1f",
  tv_series_api_url:
    "https://api.themoviedb.org/3/search/tv?api_key=71a27b20b786fe39560049b7c72c9d1f",
  trending_movies:
    "https://api.themoviedb.org/3/trending/movie/day?api_key=71a27b20b786fe39560049b7c72c9d1f",
  trending_tv_series:
    "https://api.themoviedb.org/3/trending/tv/day?api_key=71a27b20b786fe39560049b7c72c9d1f",
  img_url_api: "https://image.tmdb.org/t/p/",
  img_size: "w780", // available sizes: w92 - w154 - w185 - w342 - w500 - w780 - original
  poster_no_available:
    "https://image.tmdb.org/t/p/w342/1B93sLOD6NbwA4DWPVdIi4bXXKi.jpg",
  movieSectionTitle: "",
  seriesSectionTitle: "",
  noVoteMessage: "no votes available",
  noResults:
    "No results for your search. Please check your input or try a new search.",
  noInfo: "Information not available for this show.",
  getInitialResultsMovies() {
    const apiUrl = state.movie_initial_api;
    axios
      .get(apiUrl)
      .then((response) => {
        state.movies = response.data.results;
        state.movieSectionTitle = "Most viewed movies";
        state.onlySeries = false;
        state.onlyMovies = false;
        state.loader = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getTrendingMovies() {
    const apiUrl = state.trending_movies;
    axios
      .get(apiUrl)
      .then((response) => {
        state.movies = response.data.results;
        state.movieSectionTitle = "Trending Movies";
        state.onlySeries = false;
        state.onlyMovies = true;
        state.loader = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getInitialResultsSeries() {
    const apiUrl = state.tv_series_initial_api;
    axios
      .get(apiUrl)
      .then((response) => {
        state.tvSeries = response.data.results;
        state.seriesSectionTitle = "Top rated Tv Series";
        state.onlySeries = false;
        state.onlyMovies = false;
        state.loader = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getTrendingSeries() {
    const apiUrl = state.trending_tv_series;
    axios
      .get(apiUrl)
      .then((response) => {
        state.tvSeries = response.data.results;
        state.seriesSectionTitle = "Trending Tv Series";
        state.onlySeries = true;
        state.onlyMovies = false;
        state.loader = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getCast(id) {
    this.resetCastAndGenres();
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=71a27b20b786fe39560049b7c72c9d1f`;
    axios
      .get(apiUrl)
      .then((response) => {
        state.cast = response.data.cast.slice(0, 5);
        if (state.cast.length === 0) {
          state.cast.push("Cast not available for this show.");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error) {
          this.unavalaibleInfo = true;
        }
      });
  },
  getGenre(entertainment) {
    this.resetCastAndGenres();
    const apiUrl = `https://api.themoviedb.org/3/genre/${entertainment}/list?api_key=71a27b20b786fe39560049b7c72c9d1f`;
    axios
      .get(apiUrl)
      .then((response) => {
        this.showGenres = true;
        state.genres = response.data.genres;
        console.log(state.genres);
      })
      .catch((error) => {
        console.error(error);
        if (error) {
          this.unavalaibleInfo = true;
        }
      });
  },
  getGenreName(genreId) {
    const genre = state.genres.find((genre) => genre.id === genreId);
    if (genre) {
      return genre.name;
    } else {
      return "Unknown Genres";
    }
  },
  resetCastAndGenres() {
    state.cast = [];
    state.genres = [];
    state.showGenres = false;
    this.unavalaibleInfo = false;
  },
  starsVote(vote_average) {
    const stars = vote_average / 2;
    return Math.ceil(stars);
  },
  cardRating(item) {
    if (item.vote_average === 0) {
      return `
            <div class="text-warning">${state.noVoteMessage}</div>
          `;
    } else {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= state.starsVote(item.vote_average)) {
          stars.push('<span class="fas fa-star"></span>');
        } else {
          stars.push('<span class="far fa-star"></span>');
        }
      }
      return `
              ${stars.join("")}
              <span class="text-secondary">(${item.vote_count} votes)</span>
            `;
    }
  },
});
