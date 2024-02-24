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
        <div class="container">
            <h1>Movies</h1>
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="movie in movies">
                    <div class="card">
                        <div class="card-body d-none">
                            <div class="card-info">
                                <div class="card-title">
                                    <h6>Title:</h6>
                                    <h5>{{ movie.title }}</h5>
                                    <div v-if="movie.title != movie.original_title">
                                        <h6>Original title:</h6>
                                        <h5>{{ movie.original_title }}</h5>
                                    </div>
                                </div>
                                <div class="d-flex g-1 align-items-center">
                                    <span>
                                        <i :class="flagCountryClass(movie.original_language)"></i>
                                    </span>
                                    <span class="card-language">
                                        {{ movie.original_language }}
                                    </span>
                                </div>
                                <div class="card-rating">
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
                                </div>
                            </div>
                        </div>
                        <div class="card-poster">
                            <img :src="movie.poster_path ? `${state.img_url_api}${state.img_size}${movie.poster_path}` : state.poster_no_available"
                                :alt="`poster of ${movie.title}, missing img`">
                        </div>
                    </div>
                </div>
            </div>

            <h1>Tv Series</h1>
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="show in tvSeries">
                    <div class="card">
                        <div class="card-body d-none">
                            <div class="card-info">
                                <div class="card-title">
                                    <h6>Title:</h6>
                                    <h5>{{ show.name }}</h5>
                                    <div v-if="show.name != show.original_name">
                                        <h6>Original title:</h6>
                                        <h5>{{ show.original_name }}</h5>
                                    </div>
                                </div>
                                <div class="d-flex g-1 align-items-center">
                                    <span>
                                        <i :class="flagCountryClass(show.original_language)"></i>
                                    </span>
                                    <span class="card-language">
                                        {{ show.original_language }}
                                    </span>
                                </div>
                                <div class="card-rating">
                                    <div v-if="show.vote_average === 0">
                                        {{ noVoteMessage }}
                                    </div>
                                    <div v-else>
                                        <span v-for="i in 5" :class="{
                                            'fas fa-star': i <= starsVote(show.vote_average),
                                            'far fa-star': i > starsVote(show.vote_average)
                                        }"></span>
                                        <span> ({{ show.vote_count }} votes)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-poster">
                            <img :src="show.poster_path ? `${state.img_url_api}${state.img_size}${show.poster_path}` : state.poster_no_available"
                                :alt="`poster of ${show.name}, missing img`">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>


<style scoped>
main {
    background-color: var(--boolflix-primary);
}

.card {
    position: relative;
    background-color: var(--boolflix-dark);
    color: var(--boolflix-lighter);
    box-shadow: 0 0 0.5rem var(--boolflix-dark);

    &:hover {
        animation: shadow-animation 3s linear infinite;
    }

    & .card-body {
        position: absolute;
        top: 0;
        left: 0;
        padding: 2.5rem 0.5rem;
        background-color: var(--boolflix-dark);
        width: 100%;
        height: 100%;
    }

    & .card-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        text-align: center;
    }

    & .card-title {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    & .card-title h6 {
        color: var(--boolflix-primary);
    }

    & .card-language {
        text-transform: uppercase;
        font-size: 0.75rem;
    }

    & .card-poster {
        height: 18rem;
        display: flex;
    }

    & .card-poster img {
        width: 100%;
    }

    &:hover .card-body {
        display: block;
    }
}

.flag-icon {
    border: 1px solid black;
    border-radius: 2px;
    box-shadow: 1px 1px 1px black;
}

.fa-star {
    color: rgb(245, 245, 39);
}
</style>