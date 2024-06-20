<template>
  <div>
    <div class="px-3 py-10 md:px-10">
      <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
        <Spinner v-if="loading" />

        <template v-else>
          <TodoFormAdd />

          <TodoItems />

          <TodoEmpty v-if="$store.state.todos.length < 1" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Spinner from "@/components/Spinner.vue";
import TodoFormAdd from "@/components/TodoFormAdd.vue";
import TodoItems from "@/components/TodoItems.vue";
import TodoEmpty from "@/components/TodoEmpty.vue";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {
    Spinner,
    TodoFormAdd,
    TodoItems,
    TodoEmpty,
  },
  setup() {
    const loading = ref(false);
    const store = useStore();

    loading.value = true;
    setTimeout(() => {
      store.dispatch("getTodos").finally(() => {
        loading.value = false;
      });
    }, 800);

    return { loading };
  },
};
</script>
<style></style>
