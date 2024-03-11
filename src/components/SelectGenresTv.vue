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
    <!-- inserisco un select con un'opzione default e molte altre generate dinamicamente con un v-for su una array popolata da una query API -->
    <select class="genres_select" name="selectedGenreTv" id="selectedGenreTv" v-model="state.selectedGenreTv">
        <option value="0">All Genre</option>
        <option v-for="genre in state.genresTv" :value="genre.id">
            {{ genre.name }}
        </option>
    </select>
</template>