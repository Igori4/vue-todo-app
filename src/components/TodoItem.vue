<template>
    <el-row :gutter="12" class="todo-item-wrapper">
        <el-col shadow="hover" v-if="isShowItem">
            <el-card shadow="always">
                <el-col :span="24" class="todo-item" v-if="!isEditValue">
                    <el-col :span="16" class="item-options">
                        <el-checkbox
                            class="todo-checkbox"
                            @change="itemCheck(index)"
                            :checked="todo.complited"
                        ></el-checkbox>
                        <p class="todo-value" :class="{'complited': todo.complited}">{{todo.value}}</p>
                        <span class="todo-time">added: {{todo.time}}</span>
                    </el-col>
                    <el-col :span="8" class="todo-options-buttons">
                        <el-button
                            class="edit-item-btn"
                            size="mini"
                            @click="editValue"
                            v-popover:editPopover
                        >Edit item</el-button>
                        <el-button
                            class="delete-item-btn"
                            @click="deleteItem(index)"
                            size="mini"
                        >Delete item</el-button>
                    </el-col>
                </el-col>

                <el-col :span="24" class="editer-item-wrapper" v-else>
                    <el-col :span="10">
                        <el-input size="mini" v-model="newValue" :autofocus="'autofocus'"></el-input>
                    </el-col>
                    <el-col :span="12" class="todo-options-addition-buttons">
                        <el-button
                            class="update-item"
                            type="success"
                            icon="el-icon-check"
                            @click="updateItemValue(index)"
                            circle
                        ></el-button>
                        <el-button
                            type="danger"
                            class="cancle-btn"
                            icon="el-icon-close"
                            @click="editValue"
                            circle
                        ></el-button>
                    </el-col>
                </el-col>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "TodoItem",
    props: ["todo", "index", "fiterOption"],
    data() {
        return {
            isEditValue: false,
            newValue: this.$props.todo.value
        };
    },

    computed: {
        isShowItem() {
            if (this.$props.fiterOption === "active") {
                return !this.$props.todo.complited;
            } else if (this.$props.fiterOption === "done") {
                return this.$props.todo.complited;
            } else {
                return true;
            }
        }
    },

    methods: {
        editValue() {
            this.isEditValue = !this.isEditValue;
            this.newValue = this.$props.todo.value;
        },

        deleteItem(index) {
            this.$store.commit("deleteItem", index);
        },

        itemCheck(index) {
            this.$store.commit("itemCheck", index);
        },

        updateItemValue(index) {
            this.$store.commit("updateItemValue", {
                index,
                newValue: this.newValue
            });
            this.editValue();
        }
    }
};
</script>

<style lang="scss">
.todo-options-buttons {
    button {
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
}

.todo-options-addition-buttons {
    .update-item {
        color: #34db01;
        background-color: white;
        border-color: #57eb01;
        transition: all 0.1s ease;
        &:hover {
            color: white;
            background-color: #34db01;
            border-color: #57eb01;
        }
    }
    .cancle-btn {
        color: #db0101cb;
        background-color: white;
        border-color: #db0101cb;
        transition: all 0.1s ease;
        &:hover {
            color: white;
            background-color: #db0101cb;
            border-color: #db0101cb;
        }
    }
}

.todo-value {
    font-size: 12px;
}
.todo-time {
    font-size: 10px;
    margin-left: 30px;
    opacity: 0.4;
    font-style: italic;
    overflow: auto;
}

.el-card__body {
    padding: 0 !important;
}

.todo-item-wrapper {
    margin: 10px -6px;
}
</style>