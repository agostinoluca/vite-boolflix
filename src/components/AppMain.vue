<script>
import { state } from '../state';
import AppLoader from './AppLoader.vue';
import AppMovieCard from './AppMovieCard.vue';
import AppTvSeriesCard from './AppTvSeriesCard.vue';
export default {
    name: 'AppMain',
    components: {
        AppLoader,
        AppMovieCard,
        AppTvSeriesCard
    },
    data() {
        return {
            state
        }
    }
}
</script>


<template>
    <main>
        <AppLoader v-if="state.loader"></AppLoader>
        <div v-else class="container">
            <AppMovieCard></AppMovieCard>
            <AppTvSeriesCard></AppTvSeriesCard>
        </div>
    </main>
</template>