<script>
import { state } from '../state';
export default {
    name: 'SelectGenresMovie',
    data() {
        return {
            state
        }
    }
}
</script>

<template>
    <select class="genres_select" name="selectedGenreMovie" id="selectedGenreMovie" v-model="state.selectedGenreMovie">
        <option value="0">All Genre</option>
        <option v-for="genre in state.genresMovie" :value="genre.id">
            {{ genre.name }}
        </option>
    </select>
</template>