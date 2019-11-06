<template>
    <div class="header">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form :inline="true" @submit.native.prevent class="todo-form">
                    <el-col :span="8">
                        <el-input
                            class="add-item-input p-10"
                            v-model="inputValue"
                            placeholder="Add task..."
                            :autofocus="'autofocus'"
                            :size="'small'"
                        />
                    </el-col>
                    <el-col :span="10">
                        <el-form-item>
                            <el-button
                                class="add-item-btn"
                                @click.prevent="addNewTodos"
                                :disabled="!isFeildEmpty"
                                :size="'small'"
                            >Add item</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                class="delete-all-item-btn"
                                @click.prevent="deleteAllTodos"
                                :disabled="!isTodosExist"
                                :size="'small'"
                            >Delete all</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="header-info">
                        <router-link
                            to="./login"
                            tag="p"
                            class="logaout-btn"
                            @click="logOut"
                        >Log Out</router-link>
                        <p class="user-name-title">{{userName}}</p>
                        <p class="user-icon">
                            <i class="el-icon-user"></i>
                        </p>
                    </el-col>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            inputValue: ""
        };
    },

    methods: {
        addNewTodos() {
            this.$store.commit("addNewTodos", {
                value: this.inputValue,
                complited: false,
                time: this.getNow(),
                id: this.inputValue + this.getNow()
            });
            this.inputValue = "";
        },
        deleteAllTodos() {
            this.$store.commit("deleteAllTodos");
        },
        getNow() {
            const today = new Date();
            const availableDays = [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ];
            const day = today.getDay();
            return (
                availableDays[day - 1] + " " + today.toLocaleTimeString("it-IT")
            );
        },
        logOut() {
            this.$store.commit("logOut");
        }
    },

    computed: {
        todos() {
            return this.$store.getters.getTodos;
        },

        isFeildEmpty() {
            return this.inputValue.trim();
        },

        isTodosExist() {
            return this.$store.getters.getTodos.length;
        },
        userName() {
            return this.$store.getters.getUser.displayName;
        }
    },

    created() {
        this.$store.dispatch("getTodosFromFirebase");
    }
};
</script>