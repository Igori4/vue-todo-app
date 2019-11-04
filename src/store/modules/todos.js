import firebase from "firebase";

const state = {
  todos: [],
  isLoading: false,
  filterOption: "all"
};

const mutations = {
  getFirebaseTodos(state, todos) {
    state.todos = [...todos];
  },
  addNewTodos(state, todo) {
    state.todos.push(todo);
  },
  deleteAllTodos(state) {
    state.todos = [];
  },
  deleteItem(state, index) {
    state.todos = state.todos.filter((todo, i) => {
      if (i !== index) {
        return todo;
      }
    });
  },
  itemCheck(state, index) {
    state.todos[index].complited = !state.todos[index].complited;
  },
  updateItemValue(state, { index, newValue }) {
    state.todos[index].value = newValue;
  },
  setFilter(state, option) {
    state.filterOption = option;
  },
  setTodos(state, todos) {
    state.todos = todos;
  },
  loadingData(state) {
    state.isLoading = !state.isLoading;
  }
};

const getters = {
  getTodos(state) {
    return state.todos;
  },
  isLoading(state) {
    return state.isLoading;
  },
  filterOption(state) {
    return state.filterOption;
  }
};

const actions = {
  setTodosFromFirebase() {
    firebase
      .database()
      .ref()
      .set({
        todos: state.todos
      });
  },
  async getTodosFromFirebase({ commit }) {
    commit("loadingData");
    return firebase
      .database()
      .ref("/todos")
      .once("value")
      .then(snapshot => snapshot.val())
      .then(todos => {
        if (todos !== null) {
          commit("setTodos", todos);
        } else {
          return [];
        }
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => commit("loadingData"));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
