<template>
  <form
    class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3"
    @submit.prevent="onAddTodo"
  >
    <input
      placeholder="Add new item ..."
      type="text"
      class="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3"
      v-model="title"
    />

    <Spinner v-if="isLoading" />
    <button
      v-else
      class="text-green-400 text-xs font-semibold focus:outline-none"
      type="submit"
      :disabled="isLoading"
    >
      ADD
    </button>
  </form>
</template>
<script>
import Spinner from "@/components/Spinner.vue";
export default {
  components: { Spinner },
  data() {
    return {
      title: "",
      isLoading: false,
    };
  },

  methods: {
    onAddTodo() {
      if (this.title.length < 1) {
        return;
      }

      this.isLoading = true;

      const data = {
        title: this.title,
        completed: false,
      };

      setTimeout(() => {
        this.$store.dispatch("addTodo", data).finally(() => {
          this.title = "";
          this.isLoading = false;
        });
      }, 800);
    },
  },
};
</script>
<style></style>
