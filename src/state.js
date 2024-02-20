import {reactive} from 'vue'

export const state = reactive({
    movie_api_url: 'https://api.themoviedb.org/3/search/movie?api_key=',
    tv_series_api_url: 'https://api.themoviedb.org/3/search/tv?api_key=',
    api_key: '71a27b20b786fe39560049b7c72c9d1f',
})