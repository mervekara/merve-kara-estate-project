<template>
  <div class="flex space-x-2">
    <div
      v-for="agent in firstFiveAgents"
      :key="agent.agent_id"
      class="flex lg:mr-2 items-center cursor-pointer"
      @click="openAgentSelectionModal"
    >
      <span
        class="border-2 border rounded-full h-10 w-10 md:h-12 md:w-12 -mr-4 md:-mr-6 text-white flex items-center justify-center"
        :style="{ backgroundColor: agent.color }"
      >
        {{ getAgentInitial(agent) }}
      </span>
    </div>
    <div
      v-if="remainingAgentsCount > 0"
      class="flex mr-2 items-center"
      @click="openAgentSelectionModal"
    >
      <span
        class="border-2 border rounded-full h-10 w-10 md:h-12 md:w-12 text-white flex items-center justify-center bg-gray-300"
      >
        +{{ remainingAgentsCount }}
      </span>
    </div>
  </div>

  <AgentSelectionModal
    v-if="showAgentSelectionModal"
    @close="closeAgentSelectionModal"
    @save="saveSelectedAgents"
  />
</template>

<script setup lang="ts">
import AgentSelectionModal from "../components/AgentSelectionModal.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

import { getAgentInitial } from "../utils/index.ts";

const showAgentSelectionModal = ref(false);

const store = useStore();

const agents = computed(() => store.getters.getAgentsData);

const firstFiveAgents = computed(() => agents.value.slice(0, 5));
const remainingAgentsCount = computed(() => agents.value.length - 5);

const openAgentSelectionModal = () => {
  showAgentSelectionModal.value = true;
};

const closeAgentSelectionModal = () => {
  showAgentSelectionModal.value = false;
};

const saveSelectedAgents = () => {
  closeAgentSelectionModal();
};
</script>
