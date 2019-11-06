<template>
    <div class="filters">
        <el-button
            class="filter-button"
            size="small"
            v-for="filterBtn in avalibleBtnFilters"
            :key="filterBtn"
            @click="setFilterOprion(filterBtn)"
        >{{filterBtn.toUpperCase()}}</el-button>
    </div>
</template>

<script>
export default {
    name: "filters",
    data() {
        return {
            avalibleBtnFilters: ["all", "active", "done"]
        };
    },
    methods: {
        setFilterOprion(option) {
            this.$store.commit("setFilter", option);
        }
    }
};
</script>