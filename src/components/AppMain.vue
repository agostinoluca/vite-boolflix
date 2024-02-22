<script>
import { state } from '../state';
export default {
    name: 'AppMain',
    data() {
        return {
            noVoteMessage: 'no votes available',
            state
        }
    },
    props: {
        movies: Array,
        tvSeries: Array
    },
    methods: {
        starsVote(vote_average) {
            const stars = vote_average / 2;
            // console.log(stars);
            return Math.ceil(stars);
        },
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
    <main>
        <h1>Movies</h1>
        <ul v-for="movie in movies">
            <li>{{ movie.title }}</li>
            <li>{{ movie.original_title }}</li>
            <li><i :class="flagCountryClass(movie.original_language)"></i>{{ movie.original_language }}</li>
            <li>
                <div v-if="movie.vote_average === 0">
                    {{ noVoteMessage }}
                </div>
                <div v-else>
                    <span v-for="i in 5" :class="{
                        'fas fa-star': i <= starsVote(movie.vote_average),
                        'far fa-star': i > starsVote(movie.vote_average)
                    }"></span>
                    <span> ({{ movie.vote_count }} votes)</span>
                </div>
            </li>
            <li><img :src="`${state.img_url_api}${state.img_size}${movie.poster_path}`"
                    :alt="`poster of ${movie.title}, missing img`">
            </li>
        </ul>
        <h1>Tv Series</h1>
        <ul v-for="show in tvSeries">
            <li>{{ show.name }}</li>
            <li>{{ show.original_name }}</li>
            <li><i :class="flagCountryClass(show.original_language)"></i>{{ show.original_language }}</li>
            <li>
                <span v-for="i in 5" :class="{
                    'fas fa-star': i <= starsVote(show.vote_average),
                    'far fa-star': i > starsVote(show.vote_average)
                }"></span>
                <span> ({{ show.vote_count }} votes)</span>
            </li>
            <li><img :src="`${state.img_url_api}${state.img_size}${show.poster_path}`"
                    :alt="`poster of ${show.name}, missing img`"></li>
        </ul>
    </main>
</template>


<style scoped>
.flag-icon {
    border: 1px solid black;
    border-radius: 2px;
    box-shadow: 1px 1px 1px black;
}

.fa-star {
    color: rgb(245, 245, 39);
}
</style>