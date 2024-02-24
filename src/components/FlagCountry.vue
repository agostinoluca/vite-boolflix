<script>
export default {
    name: 'FlagCountry',
    props: {
        originalLanguage: String
    },
    methods: {
        flagCountryClass() {
            if (this.originalLanguage === 'en' || this.originalLanguage === 'uk') {
                return 'flag-icon flag-icon-gb';
            } else if (this.originalLanguage === 'hi') {
                return 'flag-icon flag-icon-us';
            } else if (this.originalLanguage === 'ja') {
                return 'flag-icon flag-icon-jp';
            } else if (this.originalLanguage === 'te') {
                return 'flag-icon flag-icon-in';
            } else if (this.originalLanguage === 'sq') {
                return 'flag-icon flag-icon-al';
            } else if (this.originalLanguage === 'el') {
                return 'flag-icon flag-icon-gr';
            } else if (this.originalLanguage === 'zh') {
                return 'flag-icon flag-icon-cn';
            } else if (this.originalLanguage === 'ko') {
                return 'flag-icon flag-icon-kr';
            } else if (this.originalLanguage === 'cs') {
                return 'flag-icon flag-icon-cz';
            } else if (this.originalLanguage === 'ar' || this.originalLanguage === 'ur') {
                return 'flag-icon flag-icon-ae';
            } else if (this.originalLanguage === 'da') {
                return 'flag-icon flag-icon-dk';
            } else if (this.originalLanguage === 'ka') {
                return 'flag-icon flag-icon-ge';
            } else {
                return 'flag-icon flag-icon-' + this.originalLanguage;
            }
        }
    },
}
</script>

<template>
    <span :class="flagCountryClass()"></span>
</template>


<style scoped>
.flag-icon {
    border-radius: 2px;
    box-shadow: 0 0 0.25rem var(--boolflix-primary);
}
</style>