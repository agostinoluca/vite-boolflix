<script>
export default {
    name: 'AppLoader',
};
</script>
  
<template>
    <div class="loader">
        <div class="loader-icon">
            <i class="fa-solid fa-spinner fa-spin"></i>
        </div>
        <div class="loader-text">Loading...</div>
    </div>
</template>
  
  
<style scoped>
.loader {
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loader-text {
    color: var(--boolflix-danger);
    margin-top: 1rem;
    font-size: 1.5rem;
}

.loader-icon {
    text-align: center;
    font-size: 3rem;
    color: var(--boolflix-lighter);
}
</style>