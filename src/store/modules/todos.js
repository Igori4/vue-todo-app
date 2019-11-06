import firebase from "firebase";

const state = {
  todos: [],
  isLoading: false,
  filterOption: "all",
  user: null
};

const mutations = {
  addNewTodos(state, todo) {
    state.todos.push(todo);
  },
  deleteAllTodos(state) {
    state.todos = [];
  },
  deleteItem(state, id) {
    state.todos = state.todos.filter(todo => {
      if (todo.id !== id) {
        return todo;
      }
    });
  },
  itemCheck(state, id) {
    const updatedItem = state.todos.find(item => item.id === id);
    updatedItem.complited = !updatedItem.complited;
  },
  updateItemValue(state, { id, newValue }) {
    const updatedItem = state.todos.find(item => item.id === id);
    updatedItem.value = newValue;
  },
  setFilter(state, option) {
    state.filterOption = option;
  },
  setTodos(state, todos) {
    state.todos = todos;
  },
  loadingData(state) {
    state.isLoading = !state.isLoading;
  },
  setUser(state, user) {
    state.user = user;
  },
  logOut(state) {
    state.user = null;
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
  },
  getUser(state) {
    return state.user;
  }
};

const actions = {
  setTodosFromFirebase() {
    firebase
      .database()
      .ref(`/users/${state.user.uid}`)
      .set({
        todos: state.todos
      });
  },
  async getTodosFromFirebase({ commit }) {
    commit("loadingData");
    return firebase
      .database()
      .ref(`/users/${state.user.uid}/todos`)
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
