import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    todos: [],
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
  mutations: {
    setTodos(state, payload) {
      state.todos = payload;
    },
    setTodo(state, payload) {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      if (index >= 0) {
        state.todos.splice(index, 1, payload);
        return;
      }
      state.todos.push(payload);
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index >= 0) {
        state.todos.splice(index, 1);
      }
    },
  },
  actions: {
    getTodos({ commit }) {
      return axios.get("http://localhost:3000/todos").then((response) => {
        commit("setTodos", response.data);
      });
    },

    addTodo({ commit }, payload) {
      axios.post("http://localhost:3000/todos", payload).then((response) => {
        commit("setTodo", response.data);
      });
    },

    updateTodo({ commit }, { id, payload }) {
      axios
        .put(`http://localhost:3000/todos/${id}`, payload)
        .then((response) => {
          commit("setTodo", response.data);
        });
    },
    deleteTodo({ commit }, id) {
      axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        commit("deleteTodo", id);
      });
    },
  },
  modules: {},
});
