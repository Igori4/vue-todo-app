<template>
    <div class="todo-wrapper">
        <transition name="el-zoom-in-top">
            <div class="todo-list" v-if="todos.length">
                <TodoItem
                    v-for="(todo, index) in todos"
                    :key="index"
                    :todo="todo"
                    :index="index"
                    :fiterOption="filterOption"
                ></TodoItem>
            </div>
            <div class="todo-empty-block" v-else>
                <h2 class="todo-empty-title">{{isDataLoading ? 'Loading...': 'Create New Todo...' }}</h2>
            </div>
        </transition>
    </div>
</template>

<script>
import TodoItem from "./TodoItem";
export default {
    name: "TodoList",
    components: {
        TodoItem
    },

    computed: {
        todos() {
            return this.$store.getters.getTodos;
        },
        filterOption() {
            return this.$store.getters.filterOption;
        },
        isDataLoading() {
            return this.$store.getters.isLoading;
        }
    },
    updated() {
        this.$store.dispatch("setTodosFromFirebase");
    }
};
</script>
