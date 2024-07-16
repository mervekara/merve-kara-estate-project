<template>
  <div class="flex items-center border border-gray-300 rounded">
    <input
      v-model="localSearchQuery"
      @input="updateSearchQuery"
      type="text"
      class="w-full px-4 py-2"
      placeholder="Search appointments..."
    />
    <FontAwesomeIcon :icon="faMagnifyingGlass" class="text-gray-700 px-3" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Vuex store
const store = useStore();

const searchQuery = computed(() => store.getters.searchQuery);
const localSearchQuery = ref(searchQuery.value);

const updateSearchQuery = () => {
  store.dispatch("updateSearchQuery", localSearchQuery.value);
};
</script>
