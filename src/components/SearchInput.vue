<template>
  <div class="flex items-center border border-gray-300 rounded">
    <input
      v-model="searchQuery"
      @input="updateSearchQuery"
      type="text"
      class="w-full px-4 py-2"
      placeholder="Search appointments..."
    />
    <FontAwesomeIcon :icon="faMagnifyingGlass" class="text-gray-700 px-3" />
  </div>
</template>

<script setup lang="ts">
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, defineEmits } from "vue";

const searchQuery = ref("");

const emit = defineEmits(["updateSearchQuery"]);

const updateSearchQuery = () => {
  emit("updateSearchQuery", searchQuery.value);
};
</script>
