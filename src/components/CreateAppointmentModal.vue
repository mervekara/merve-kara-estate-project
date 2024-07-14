<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 p-4 sm:p-6"
    >
      <h2 class="text-xl sm:text-2xl mb-4">Create Appointment</h2>
      <Error :errorNotificaiton="errorNotificaiton" />
      <form @submit.prevent="createAppointment">
        <!-- Search -->
        <div class="mb-4">
          <label class="block text-gray-700">Search Contact</label>
          {{ validationErrors.searchQuery }}
          <div class="relative">
            <div class="flex border border-gray-300 rounded">
              <input
                v-model="searchQuery"
                @input="searchContacts"
                @blur="validateField('searchQuery')"
                type="text"
                class="w-full px-4 py-2"
                :class="{ 'border-red-500': validationErrors.searchQuery }"
                placeholder="Search for a contact..."
              />
              <FontAwesomeIcon
                :icon="faMagnifyingGlass"
                class="text-gray-700 pt-3 pr-4"
              />
            </div>
            <div
              v-if="searchResults.length"
              class="absolute mt-2 w-full border border-gray-300 rounded bg-white max-h-48 overflow-y-auto z-10"
            >
              <ul>
                <li
                  v-for="contact in searchResults"
                  :key="contact.contact_id"
                  @click="toggleContactSelection(contact)"
                  :class="[
                    'cursor-pointer px-4 py-2 hover:bg-gray-100',
                    { 'bg-blue-100': selectedContacts.includes(contact) },
                  ]"
                >
                  {{ contact.contact_name }} {{ contact.contact_surname }}
                </li>
              </ul>
            </div>
            <span
              v-if="validationErrors.searchQuery"
              class="text-red-500 text-sm"
              >{{ validationErrors.searchQuery }}</span
            >
          </div>
          <!-- Selected Contacts -->
          <div class="mt-2 flex flex-wrap">
            <div
              v-for="contact in selectedContacts"
              :key="contact.contact_id"
              class="bg-blue-100 text-blue-800 rounded px-2 py-1 mr-2 mb-2 flex items-center"
            >
              {{ contact.contact_name }} {{ contact.contact_surname }}
              <button
                @click="removeContact(contact)"
                class="ml-2 text-gray-500"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
        <!-- Address -->
        <div class="mb-4">
          <label class="block text-gray-700">Address</label>
          <div class="flex items-center border border-gray-300 rounded">
            <input
              v-model="appointmentAddress"
              @blur="validateField('appointmentAddress')"
              type="text"
              class="flex-grow px-3 py-2 sm:px-4 sm:py-2 rounded-l"
              :class="{ 'border-red-500': validationErrors.appointmentAddress }"
              placeholder="Enter address..."
              required
            />
            <FontAwesomeIcon :icon="faHome" class="text-gray-700 px-3" />
          </div>
          <span
            v-if="validationErrors.appointmentAddress"
            class="text-red-500 text-sm"
            >{{ validationErrors.appointmentAddress }}</span
          >
        </div>

        <!-- Agent Dropdown -->
        <div class="mb-4 relative">
          <label class="block text-gray-700">Select Agents</label>
          <div class="relative">
            <button
              @click="toggleDropdown"
              type="button"
              class="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2 bg-white flex justify-between items-center"
            >
              <span>Select Agents</span>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              v-if="dropdownOpen"
              class="absolute mt-2 w-full border border-gray-300 rounded bg-white max-h-48 overflow-y-auto z-10"
            >
              <label
                v-for="agent in agents"
                :key="agent.id"
                class="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
              >
                <input
                  type="checkbox"
                  v-model="selectedAgents"
                  :value="agent.id"
                  class="mr-2"
                />
                <span :style="{ color: agent.color }"
                  >{{ agent.agent_name }} {{ agent.agent_surname }}</span
                >
              </label>
            </div>
          </div>
          <!-- Selected Agents -->
          <div class="mt-2 flex flex-wrap">
            <div
              v-for="agent in selectedAgentsList"
              :key="agent.id"
              class="bg-blue-100 text-blue-800 rounded px-2 py-1 mr-2 mb-2 flex items-center"
            >
              {{ agent.agent_name }} {{ agent.agent_surname }}
              <button @click="removeAgent(agent.id)" class="ml-2 text-gray-500">
                &times;
              </button>
            </div>
          </div>
        </div>
        <!-- Appointment Date -->
        <div class="mb-4">
          <label class="block text-gray-700">Appointment Date</label>
          <input
            v-model="appointmentDate"
            @blur="validateField('appointmentDate')"
            type="datetime-local"
            class="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2"
            :class="{ 'border-red-500': validationErrors.appointmentDate }"
            required
          />
        </div>
        <!-- Actions -->
        <div class="flex justify-end">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { defineEmits } from "vue";
import Error from "../components/ErrorNotification.vue";
import { faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const emit = defineEmits(["close", "appointmentCreated"]);

// Vuex store
const store = useStore();

// Modal state
const searchQuery = ref("");
const searchResults = ref<any[]>([]);
const appointmentAddress = ref("");
const selectedContacts = ref<any[]>([]);
const selectedAgents = ref<number[]>([]);
const appointmentDate = ref("");
const validationErrors = ref({});

// Error states
const errorNotificaiton = ref<string | null>(null);

// Watch for changes in appointmentAddress and searchQuery, then validate form
watch([appointmentAddress, searchQuery, appointmentDate], () => {
  validateForm();
});

// Dropdown state
const dropdownOpen = ref(false);

// Fetch agents from store
const agents = computed(() => store.getters.getAgentsData);

// Get selected agents' full details
const selectedAgentsList = computed(() => {
  return agents.value.filter((agent) =>
    selectedAgents.value.includes(agent.id)
  );
});

// Search contacts
const searchContacts = () => {
  const query = searchQuery.value?.toLowerCase() || "";
  searchResults.value = store.getters.getContactsData.filter(
    (contact: any) =>
      contact.contact_name.toLowerCase().includes(query) ||
      contact.contact_surname.toLowerCase().includes(query)
  );
};

// Close search results
const closeSearchResults = () => {
  searchResults.value = [];
};

// Toggle dropdown
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Toggle contact selection
const toggleContactSelection = (contact: any) => {
  const index = selectedContacts.value.indexOf(contact);
  if (index !== -1) {
    selectedContacts.value.splice(index, 1);
  } else {
    selectedContacts.value.push(contact);
  }
};

// Remove contact from selected contacts
const removeContact = (contact: any) => {
  const index = selectedContacts.value.indexOf(contact);
  if (index !== -1) {
    selectedContacts.value.splice(index, 1);
  }
};

// Remove agent from selected agents
const removeAgent = (agentId: number) => {
  const index = selectedAgents.value.indexOf(agentId);
  if (index !== -1) {
    selectedAgents.value.splice(index, 1);
  }
};

// Close dropdown if clicked outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".relative")) {
    dropdownOpen.value = false;
    searchQuery.value = "";
    closeSearchResults();
  }
};

// Attach and detach event listeners
onMounted(() => {
  window.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("mousedown", handleClickOutside);
});

const validateField = (field: string) => {
  validationErrors.value[field] = "";

  if (
    field === "searchQuery" &&
    !searchQuery.value.trim() &&
    selectedContacts.value.length === 0
  ) {
    validationErrors.value.searchQuery = "Please select at least one contact.";
  }

  if (field === "appointmentAddress" && !appointmentAddress.value.trim()) {
    validationErrors.value.appointmentAddress = "Address is required.";
  }

  if (field === "appointmentDate" && !appointmentDate.value) {
    validationErrors.value.appointmentDate =
      "Please select an appointment date.";
  }
};

const validateForm = () => {
  validationErrors.value = {};

  validateField("searchQuery");
  validateField("appointmentAddress");
  validateField("appointmentDate");

  return (
    Object.values(validationErrors.value).filter((validation) => validation)
      .length === 0
  );
};

// Create appointment
const createAppointment = () => {
  console.log(validateForm());
  if (!validateForm()) {
    return;
  }

  const newAppointment = {
    contact_id: selectedContacts.value.map((contact) => contact.id),
    appointment_address: appointmentAddress.value,
    agent_id: selectedAgents.value,
    appointment_date: appointmentDate.value,
  };

  try {
    store.dispatch("createAppointment", newAppointment);
    emit("appointmentCreated");
    emit("close");
  } catch (error) {
    errorNotificaiton.value = "Failed to create appoinment. Please try again.";
  }
};

// Close modal
const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
