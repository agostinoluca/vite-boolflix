<script>
import { state } from '../state';
export default {
    name: 'SelectGenresTv',
    data() {
        return {
            state
        }
    }
}
</script>

<template>
    <select class="genres_select" name="selectedGenreTv" id="selectedGenreTv" v-model="state.selectedGenreTv">
        <option value="0">All Genre</option>
        <option v-for="genre in state.genresTv" :value="genre.id">
            {{ genre.name }}
        </option>
    </select>
</template>