<template>
    <div class="item-wrapper" v-if="isShowItem">
        <div class="todo-item" v-if="!isEditValue">
            <div class="item-options">
                <input type="checkbox" @change="itemCheck(index)" class="todo-checkbox" :checked="todo.complited"> 
                <p class="todo-value" :class="{'complited': todo.complited}">{{todo.value}}</p>
            </div>
            <div class="todo-options-buttons">
                <button class="edit-todo" @click="editValue">Edit Item</button>
                <button class="delete-todo" @click="deleteItem(index)">Delete Item</button>
            </div>
        </div>
        <div class="editer-item-wrapper" v-else>
            <input type="text" class="todo-edit-input" v-model="newValue" :autofocus="'autofocus'"> 
            <div class="todo-options-buttons">
                <button class="edit-todo-item" @click="updateItemValue(index)">&#10003;</button>
                <button class="delete-todo-item " @click="editValue">X</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TodoItem',
    props: ['todo', 'index', 'fiterOption'],
    data () {
        return {
            isEditValue: false,
            newValue: this.$props.todo.value
        }
    },

    computed: {
        isShowItem () {
             if ( this.$props.fiterOption === 'active') {
               return !this.$props.todo.complited
            } else if (this.$props.fiterOption === 'done') {
                return this.$props.todo.complited
            } else {
                return true
            }
        }
    },

    methods: {
        editValue () {
            this.isEditValue = !this.isEditValue
            this.newValue = this.$props.todo.value
        },
        
        deleteItem (index) {
            this.$store.commit('deleteItem', index)
        },

        itemCheck (index) {
            this.$store.commit('itemCheck', index)
        },

        updateItemValue (index) {
            this.$store.commit('updateItemValue', {index, newValue: this.newValue})
            this.editValue()
        }
    }
}
</script>
