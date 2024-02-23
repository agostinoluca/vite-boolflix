import {reactive} from 'vue'

export const state = reactive({
    movie_api_url: 'https://api.themoviedb.org/3/search/movie?api_key=',
    tv_series_api_url: 'https://api.themoviedb.org/3/search/tv?api_key=',
    api_key: '71a27b20b786fe39560049b7c72c9d1f',
    img_url_api: 'https://image.tmdb.org/t/p/',
    img_size: 'w342', // available sizes: w92 - w154 - w185 - w342 - w500 - w780 - original
    poster_no_available: 'https://image.tmdb.org/t/p/w342/1B93sLOD6NbwA4DWPVdIi4bXXKi.jpg',
})