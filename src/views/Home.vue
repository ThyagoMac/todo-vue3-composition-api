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
    {{ $store.state.todos }}
  </div>
</template>
<script>
import Spinner from "@/components/Spinner.vue";
import TodoFormAdd from "@/components/TodoFormAdd.vue";
import TodoItems from "@/components/TodoItems.vue";
import TodoEmpty from "@/components/TodoEmpty.vue";

export default {
  name: "Home",
  components: {
    Spinner,
    TodoFormAdd,
    TodoItems,
    TodoEmpty,
  },
  data() {
    return {
      loading: false,
    };
  },

  created() {
    this.loading = true;
    setTimeout(() => {
      this.$store.dispatch("getTodos").finally(() => {
        this.loading = false;
      });
    }, 800);
  },
};
</script>
<style></style>
