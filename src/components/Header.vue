<template>
    <div class="header">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form :inline="true" @submit.native.prevent class="todo-form">
                    <el-col :span="12">
                        <el-input
                            class="add-item-input p-10"
                            v-model="inputValue"
                            placeholder="Add task..."
                            :autofocus="'autofocus'"
                            :size="'small'"
                        />
                    </el-col>
                    <el-col :span="12">
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
                time: this.getNow()
            });
            this.inputValue = "";
        },
        deleteAllTodos() {
            this.$store.commit("deleteAllTodos");
        },
        getNow() {
            const today = new Date();
            const time =
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds();
            return time;
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
        getTime() {
            return this.time;
        }
    },

    created() {
        this.$store.dispatch("getTodosFromFirebase");
    }
};
</script>

<style lang="scss">
.el-form-item__content {
    .add-item-btn {
        background-color: white;
        color: #565eea;
        border: 1px solid #565eea;
        transition: all 0.1s ease;
        &:hover {
            background-color: #565eea;
            color: white;
            border: 1px solid #565eea;
        }
    }

    .delete-all-item-btn {
        background-color: white;
        color: #ff4a4a;
        border: 1px solid #ff4a4a;
        &:hover {
            background-color: #dc1111e6;
            color: white;
            border: 1px solid #ff4a4a;
        }
    }
}
</style>