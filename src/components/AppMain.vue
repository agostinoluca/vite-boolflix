<script>
import AppMovieCard from './AppMovieCard.vue';
import AppTvSeriesCard from './AppTvSeriesCard.vue';
import FlagCountry from './FlagCountry.vue';
export default {
    name: 'AppMain',
    components: {
        AppMovieCard,
        AppTvSeriesCard,
        FlagCountry
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