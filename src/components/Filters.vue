<template>
    <div class="filters">
        <button class="btn-show-all" @click="setFilterOprion('all')">All</button>
        <button class="btn-show-active" @click="setFilterOprion('active')">Active</button>
        <button class="btn-show-done" @click="setFilterOprion('done')">Done</button>
    </div>
</template>

<script>
export default {
    name: 'filters',
    methods : {
        setFilterOprion (option) {
            this.$store.commit('setFilter', option)
        }
    }
}
</script>