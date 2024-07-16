<template>
  <div
    class="filters mb-4 p-4 bg-white rounded shadow flex flex-col lg:flex-row lg:space-x-4 lg:justify-between"
  >
    <div class="mb-4 lg:mb-0">
      <AgentCircles />
    </div>
    <div class="mb-4 lg:mb-0">
      <StatusFilter />
    </div>
    <div class="mb-4 lg:mb-0">
      <DateRangeFilter />
    </div>
    <div class="mb-4 lg:mb-0">
      <SearchInput @updateSearchQuery="setSearchQuery" />
    </div>
  </div>
  <div class="flex-grow border-t border-gray-400 mb-4"></div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import AgentCircles from "../components/AgentCircles.vue";
import StatusFilter from "../components/StatusFilter.vue";
import DateRangeFilter from "../components/DateRangeFilter.vue";
import SearchInput from "../components/SearchInput.vue";

const emit = defineEmits(["openAgentSelectionModal"]);

const setSearchQuery = (query: string) => {
  emit("updateSearchQuery", query);
};
</script>
