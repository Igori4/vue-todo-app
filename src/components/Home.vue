<template>
    <div class="container">
        <Header></Header>
        <TodoList></TodoList>
        <Filters></Filters>
    </div>
</template>

<script>
import Header from "./Header";
import TodoList from "./TodoList";
import Filters from "./Filters";

export default {
    name: "Home",
    components: {
        Header,
        TodoList,
        Filters
    },
    created() {
        if (this.$store.getters.getUser) {
            this.$router.push("/");
        } else {
            this.$router.push("/login");
        }
    }
};
</script>