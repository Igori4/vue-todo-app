<template>
    <div class="header">
        <form class="header_form" @submit.prevent>
            <input v-model="inputValue" class="add-item-input" :autofocus="'autofocus'"/>
            <div class="options-buttons">
                <button class="add-item-btn" @click="addNewTodos" :class="{'disabled': !isFeildEmpty}" :disabled="!isFeildEmpty">Add item</button>
                <button class="delete-all-btn" @click="deleteAllTodos" :class="{'disabled': !isTodosExist}" :disabled="!isTodosExist">Delete all</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            inputValue: ''
        }
    },

    methods: {
        addNewTodos () {
            this.$store.commit('addNewTodos',{value: this.inputValue, complited: false})
            this.inputValue = ''
        },
        deleteAllTodos () {
            this.$store.commit('deleteAllTodos')
        }
    },

    computed: {
        todos () {
            return this.$store.getters.getTodos
        },

        isFeildEmpty () {
            return this.inputValue.trim()
        },

        isTodosExist () {
            return this.$store.getters.getTodos.length
        }
    },

    created () {
        this.$store.dispatch('getTodosFromFirebase')
    }
}
</script>
