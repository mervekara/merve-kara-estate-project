<template>
  <div
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded p-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-4 sm:mx-0"
    >
      <h2 class="text-xl font-bold mb-4">Agent List</h2>
      <div class="mb-4 max-h-64 overflow-y-auto">
        <label
          v-for="agent in agents"
          :key="agent.id"
          class="flex items-center mb-2"
        >
          <input
            type="checkbox"
            v-model="localSelectedAgents"
            :value="agent.id"
            class="mr-2"
            :checked="localSelectedAgents.includes(agent.id)"
          />
          <span :style="{ color: agent.color }"
            >{{ agent.agent_name }} {{ agent.agent_surname }}</span
          >
        </label>
      </div>
      <div class="flex justify-end space-x-2">
        <button
          @click="closeModal"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          @click="confirmSelection"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["close", "save"]);
const selectedAgents = computed(() => store.getters.selectedAgents);

const agents = computed(() => store.state.agents.agents);
const localSelectedAgents = ref<number[]>([]);

onMounted(() => {
  localSelectedAgents.value = [...selectedAgents.value];
});

const closeModal = () => {
  emit("close");
};

const confirmSelection = () => {
  store.dispatch("updateSelectedAgents", localSelectedAgents.value);
  emit("save");
};
</script>
