<template>
  <div class="flex flex-wrap">
    <!-- Selected Agents Filter -->
    <div
      class="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row lg:space-x-4 lg:justify-between"
    >
      <div
        v-for="agent in selectedAgentsList"
        :key="agent.id"
        class="bg-blue-100 text-blue-800 rounded px-2 py-1 mr-2 mb-2 flex items-center text-xs"
      >
        {{ agent.agent_name }} {{ agent.agent_surname }}
        <button @click="removeAgentFilter(agent.id)" class="ml-2 text-gray-500">
          &times;
        </button>
      </div>
    </div>
    <!-- Selected Status Filter -->
    <div
      class="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row lg:space-x-4 lg:justify-between"
    >
      <div
        v-if="selectedStatusFilter !== 'All Statuses'"
        class="bg-blue-100 text-blue-800 rounded px-2 py-1 mr-2 mb-2 flex items-center text-xs"
      >
        {{ selectedStatusFilter }}
        <button @click="removeStatusFilter" class="ml-2 text-gray-500">
          &times;
        </button>
      </div>
    </div>
    <!-- Selected Date Filters -->
    <div
      class="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row lg:space-x-4 lg:justify-between"
    >
      <div
        v-if="fromDate"
        class="bg-blue-100 text-blue-800 rounded px-2 py-1 mr-2 mb-2 flex items-center text-xs"
      >
        From: {{ fromDate }}
        <button @click="removeFromDateFilter" class="ml-2 text-gray-500">
          &times;
        </button>
      </div>
      <div
        v-if="toDate"
        class="bg-blue-100 text-blue-800 rounded px-2 py-1 mr-2 mb-2 flex items-center text-xs"
      >
        To: {{ toDate }}
        <button @click="removeToDateFilter" class="ml-2 text-gray-500">
          &times;
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="shouldShowSelectedFiltersDivider"
    class="flex-grow border-t border-gray-400 mb-8"
  ></div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";
import { useStore } from "vuex";

const emit = defineEmits([
  "updateStatusFilter",
  "updateFromDate",
  "updateToDate",
]);

const props = defineProps({
  searchQuery: String,
});

const store = useStore();

const agents = computed(() => store.getters.getAgentsData);

const selectedAgents = computed(() => store.getters.selectedAgents);
const selectedStatusFilter = computed(() => store.getters.selectedStatusFilter);
const fromDate = computed(() => store.getters.fromDate);
const toDate = computed(() => store.getters.toDate);

const selectedAgentsList = computed(() => {
  return agents.value.filter((agent) =>
    selectedAgents.value.includes(agent.id)
  );
});

const shouldShowSelectedFiltersDivider = computed(
  () =>
    selectedAgents.value.length ||
    !!fromDate.value ||
    !!toDate.value ||
    selectedStatusFilter.value !== "All Statuses"
);

const removeAgentFilter = (agentId: string) => {
  const updatedSelectedAgents = selectedAgents.value.filter(
    (id: string) => id !== agentId
  );
  store.dispatch("updateSelectedAgents", updatedSelectedAgents);
};

const removeStatusFilter = () => {
  store.dispatch("updateStatusFilter", "All Statuses");
};

const removeFromDateFilter = () => {
  store.dispatch("updateFromDate", "");
};

const removeToDateFilter = () => {
  store.dispatch("updateToDate", "");
};
</script>
