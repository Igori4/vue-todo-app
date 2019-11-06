<template>
    <el-row :gutter="12" class="todo-item-wrapper">
        <el-col shadow="hover" v-if="isShowItem">
            <el-card shadow="always">
                <el-col :span="24" class="todo-item" v-if="!isEditValue">
                    <el-col :span="16" class="item-options">
                        <el-checkbox
                            class="todo-checkbox"
                            @change="itemCheck(id)"
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
                            @click="deleteItem(id)"
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
                            @click="updateItemValue(id)"
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
    props: ["todo", "id", "fiterOption"],
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

        deleteItem(id) {
            this.$store.commit("deleteItem", id);
        },

        itemCheck(id) {
            this.$store.commit("itemCheck", id);
        },

        updateItemValue(id) {
            this.$store.commit("updateItemValue", {
                id,
                newValue: this.newValue
            });
            this.editValue();
        }
    }
};
</script>
