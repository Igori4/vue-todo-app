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

<style scoped lang="scss">
.filter-button {
    color: #e6a23c;
    background-color: white;
    border-color: #dad8d6;
    transition: all 0.1s ease;
    &:hover {
        color: white;
        background-color: #e6a23c;
        border-color: #e6a23c;
    }
    &:focus {
        color: white;
        background-color: #e6a23c;
        border-color: #e6a23c;
    }
}
</style>