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
  "updateSelectedAgents",
  "updateStatusFilter",
  "updateFromDate",
  "updateToDate",
]);

const store = useStore();

const props = defineProps({
  selectedAgents: Array,
  selectedStatusFilter: String,
  fromDate: String,
  toDate: String,
  searchQuery: String,
});

const agents = computed(() => store.getters.getAgentsData);
const selectedAgentsList = computed(() => {
  return agents.value.filter((agent) =>
    props.selectedAgents.includes(agent.id)
  );
});

const shouldShowSelectedFiltersDivider = computed(
  () =>
    props.selectedAgents.length ||
    !!props.fromDate ||
    !!props.toDate ||
    props.selectedStatusFilter !== "All Statuses"
);

const removeAgentFilter = (agentId: number) => {
  const selectedAgents = props.selectedAgents.filter((id) => id !== agentId);
  emit("updateSelectedAgents", selectedAgents);
};

const removeStatusFilter = () => {
  emit("updateStatusFilter", "All Statuses");
};

const removeFromDateFilter = () => {
  emit("updateFromDate", "");
};

const removeToDateFilter = () => {
  emit("updateToDate", "");
};
</script>
