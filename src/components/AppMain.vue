<script>
import AppMovieCard from './AppMovieCard.vue';
import AppTvSeriesCard from './AppTvSeriesCard.vue';
export default {
    name: 'AppMain',
    components: {
        AppMovieCard,
        AppTvSeriesCard,
    },
}
</script>


<template>
    <main>
        <div class="container">
            <AppMovieCard></AppMovieCard>
            <AppTvSeriesCard></AppTvSeriesCard>
        </div>
    </main>
</template>