<template>
  <li
    class="p-4 bg-white rounded shadow flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between sm:items-start md:items-center lg:items-center xl:items-center space-y-4 sm:space-y-0"
  >
    <!-- Appointment Details -->
    <div class="flex-1 sm:w-1/4 sm:item-start mr-4">
      <div class="text-lg font-semibold break-words">
        <FontAwesomeIcon :icon="faUser" class="pr-2" />{{
          appointment.fullName
        }}
      </div>
      <div class="text-sm text-gray-500 break-words">
        <FontAwesomeIcon :icon="faEnvelope" class="pr-2" />{{
          appointment.email
        }}
      </div>
      <div class="text-sm break-words">
        <FontAwesomeIcon :icon="faPhone" class="pr-2" />{{ appointment.phone }}
      </div>
    </div>

    <!-- Appointment Address -->
    <div class="flex-1 sm:w-2/4 text-sm sm:item-start break-words">
      <FontAwesomeIcon :icon="faHome" class="pr-2" />{{
        appointment.appointment_address
      }}
    </div>

    <!-- Status and Time -->
    <div
      class="flex-1 sm:w-2/4 flex items-center space-x-2 bg-pink-500 p-2 rounded text-white justify-between"
    >
      <span
        :class="['status-label', getStatusColor(appointment.status)]"
        class="bg-white px-2 py-1 rounded text-xs font-semibold"
      >
        {{ appointment.status }}
        <span v-if="appointment.status === 'Upcoming'">
          - {{ appointment.timeUntil }}</span
        >
      </span>
      <span class="flex items-center space-x-1">
        <FontAwesomeIcon :icon="faClock" class="pr-2" />
        <span>{{ appointment.formattedDate }}</span>
      </span>
    </div>

    <!-- Agents -->
    <div class="flex-1 sm:w-1/4 flex items-center justify-center space-x-2">
      <div
        v-for="agentId in appointment.agent_id"
        :key="agentId"
        class="flex items-center"
      >
        <span
          class="border-2 border rounded-full h-10 w-10 md:h-12 md:w-12 -mr-4 md:-mr-6 text-white flex items-center justify-center"
          :style="{ backgroundColor: getAgentColor(agentId, agents) }"
        >
          {{ getAgentInitials(agentId, agents) }}
        </span>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, defineProps } from "vue";
import { useStore } from "vuex";
import {
  getStatusColor,
  getAgentColor,
  getAgentInitials,
} from "../utils/index";
import {
  faClock,
  faEnvelope,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faHome, faPhone } from "@fortawesome/free-solid-svg-icons";

defineProps({
  appointment: Object,
});

const store = useStore();

const agents = computed(() => store.getters.getAgentsData);
</script>

<style scoped>
.status-label {
  display: inline-block;
}
</style>
