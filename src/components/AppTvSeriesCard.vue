<script>
import { state } from '../state';
import FlagCountry from './FlagCountry.vue';
export default {
    name: 'AppTvSeriesCard',
    components: {
        FlagCountry
    },
    data() {
        return {
            state
        }
    }
}
</script>

<template>
    <div class="row">
        <div class="col-12 pb-0">
            <h2 v-if="!state.searchStart" class="text-secondary text-shadow">{{ state.initialSeriesTitle }}</h2>
            <div v-else-if="state.tvSeries.length === 0" class="px-5">
                <h2 class="text-danger text-shadow">Tv Series Not Found</h2>
                <p class="text-secondary">{{ state.noResults }}</p>
            </div>
            <h2 v-else class="text-secondary text-shadow">Tv Series</h2>
        </div>
        <!-- /.col-12 (Tv series title) -->
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="show in state.tvSeries">
            <div class="card">
                <div class="card-body d-none">
                    <div class="card-info">
                        <div class="card-title">
                            <h6 class="text-secondary">Title:</h6>
                            <h5>{{ show.name }}</h5>
                            <div v-if="show.name != show.original_name">
                                <h6 class="text-secondary">Original title:</h6>
                                <h5>{{ show.original_name }}</h5>
                            </div>
                        </div>
                        <div class="d-flex g-1 align-items-center">
                            <span>
                                <FlagCountry :originalLanguage="show.original_language"></FlagCountry>
                            </span>
                            <span class="card-language">
                                {{ show.original_language }}
                            </span>
                        </div>
                        <div class="card-rating">
                            <div class="text-warning" v-if="show.vote_average === 0">
                                {{ state.noVoteMessage }}
                            </div>
                            <div v-else>
                                <span v-for="i in 5" :class="{
                                    'fas fa-star': i <= state.starsVote(show.vote_average),
                                    'far fa-star': i > state.starsVote(show.vote_average)
                                }"></span>
                                <span class="text-secondary"> ({{ show.vote_count }} votes)</span>
                            </div>
                        </div>
                        <div class="overview">
                            <h6 class="text-secondary" v-if="show.overview">Overview:</h6>
                            <p>{{ show.overview }}</p>
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
    <!-- /.row (Tv Series) -->
</template>
