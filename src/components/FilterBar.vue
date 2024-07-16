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
      <DateRangeFilter
        @updateFromDate="setFromDate"
        @updateToDate="setToDate"
        :fromDate="fromDate"
        :toDate="toDate"
      />
    </div>
    <div class="mb-4 lg:mb-0">
      <SearchInput @updateSearchQuery="setSearchQuery" />
    </div>
  </div>
  <div class="flex-grow border-t border-gray-400 mb-4"></div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import AgentCircles from "../components/AgentCircles.vue";
import StatusFilter from "../components/StatusFilter.vue";
import DateRangeFilter from "../components/DateRangeFilter.vue";
import SearchInput from "../components/SearchInput.vue";

const props = defineProps({
  fromDate: String,
  toDate: String,
});

const emit = defineEmits(["openAgentSelectionModal"]);

// const setStatusFilter = (status: string) => {
//   emit("statusChanged", status);
// };

const setFromDate = (date: string) => {
  emit("updateFromDate", date);
};

const setToDate = (date: string) => {
  emit("updateToDate", date);
};

const setSearchQuery = (query: string) => {
  emit("updateSearchQuery", query);
};
</script>
