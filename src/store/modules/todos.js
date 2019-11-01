const state = {
    todos: [],
    isLoading: false,
    filterOption: 'all'
}

const mutations = {
    getFirebaseTodos ( state, todos) {
        state.todos = [...todos]
    },
    addNewTodos (state, todo) {
        state.todos.push(todo)
    },
    deleteAllTodos (state) {
        state.todos = []
    },
    deleteItem (state, index) {
        state.todos = state.todos.filter((todo, i) => {
            if(i !== index) {
                return todo
            }
        })
    },
    itemCheck (state, index) {
        state.todos[index].complited = !state.todos[index].complited
    },
    updateItemValue (state, {index, newValue}) {
        state.todos[index].value = newValue
    },
    setFilter (state, option) {
        state.filterOption = option
    }
}

const getters = {
    getTodos (state) {
        return state.todos
    },
    isLoading (state) {
        return state.isLoading
    },
    filterOption (state) {
        return state.filterOption
    }
}

const actions = {
   async getTodosFromFirebase ({ commit }) {
      let res = await fetch('https://vue-todo-f2213.firebaseio.com/')
      let todos = await res.json()
      commit('getFirebaseTodos', todos)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}