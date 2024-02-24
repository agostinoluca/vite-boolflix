<script>
export default {
    name: 'FlagCountry',
    props: {
        originalLanguage: String
    },
    methods: {
        flagCountryClass() {
            const languageMap = {
                en: 'gb',
                uk: 'gb',
                hi: 'us',
                ja: 'jp',
                te: 'in',
                sq: 'al',
                el: 'gr',
                zh: 'cn',
                ko: 'kr',
                cs: 'cz',
                ar: 'ae',
                ur: 'ae',
                da: 'dk',
                ka: 'ge',
                he: 'il'
            };

            const countryCode = languageMap[this.originalLanguage] || this.originalLanguage;
            return `flag-icon flag-icon-${countryCode}`;
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