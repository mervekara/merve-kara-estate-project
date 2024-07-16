<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-4 sm:p-6 md:p-8 max-h-screen overflow-y-auto"
    >
      <h2 class="text-xl sm:text-2xl mb-4">Edit the Appointment</h2>
      <Error :errorNotificaiton="errorNotificaiton" />
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span class="visually-hidden"></span>
        </div>
      </div>
      <div v-else>
        <form @submit.prevent="updateAppointment">
          <!-- Search Contact -->
          <div class="mb-4">
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
                    :key="contact.id"
                    @click="selectContact(contact)"
                    class="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {{ contact.contact_name }} {{ contact.contact_surname }}
                  </li>
                </ul>
              </div>
            </div>
            <span
              v-if="validationErrors.searchQuery"
              class="text-red-500 text-sm"
              >{{ validationErrors.searchQuery }}</span
            >
          </div>
          <!-- Selected Contacts -->
          <div v-if="selectedContacts.length" class="mb-4">
            <div class="space-y-4 max-h-24 overflow-y-auto">
              <div
                v-for="contact in selectedContacts"
                :key="contact.id"
                class="flex items-center justify-between border p-2 rounded"
              >
                <div>
                  <div class="font-semibold">
                    <FontAwesomeIcon :icon="faUser" class="pr-2" />
                    {{ contact.contact_name }} {{ contact.contact_surname }}
                  </div>
                  <div class="text-gray-600">
                    <FontAwesomeIcon :icon="faEnvelope" class="pr-2" />
                    {{ contact.contact_email }}
                  </div>
                  <div class="text-gray-600">
                    <FontAwesomeIcon :icon="faPhone" class="pr-2" />
                    {{ contact.contact_phone }}
                  </div>
                </div>
                <button
                  @click="removeContact(contact.contact_id)"
                  class="text-gray-500 hover:text-gray-700 ml-2"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
          <!-- Address -->
          <div class="mb-4">
            <div class="flex items-center border border-gray-300 rounded">
              <FontAwesomeIcon :icon="faHome" class="text-gray-700 px-3" />
              <input
                v-model="appointmentAddress"
                @blur="validateField('appointmentAddress')"
                type="text"
                class="flex-grow px-3 py-2 rounded-l"
                :class="{
                  'border-red-500': validationErrors.appointmentAddress,
                }"
                placeholder="Enter address..."
                required
              />
              <button
                type="button"
                @click="removeAddress"
                class="text-gray-500 hover:text-gray-700 ml-2 px-2"
              >
                &times;
              </button>
            </div>
            <span
              v-if="validationErrors.appointmentAddress"
              class="text-red-500 text-sm"
              >{{ validationErrors.appointmentAddress }}</span
            >
          </div>
          <!-- Agent Dropdown -->
          <div class="mb-4 relative">
            <div class="relative">
              <button
                @click="toggleDropdown"
                type="button"
                class="w-full border border-gray-300 rounded px-4 py-2 bg-white flex justify-between items-center"
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
                    :checked="selectedAgents.includes(agent.id)"
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
                :key="agent.agent_id"
                class="bg-blue-100 text-blue-800 rounded px-2 py-1 mr-2 mb-2 flex items-center"
              >
                {{ agent.agent_name }} {{ agent.agent_surname }}
                <button
                  @click="removeAgent(agent.id)"
                  class="text-gray-500 hover:text-gray-700 ml-2"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
          <!-- Appointment Date -->
          <div class="mb-4">
            <label class="block text-gray-700">Appointment Date</label>
            <input
              v-model="formattedAppointmentDate"
              @blur="validateField('formattedAppointmentDate')"
              type="datetime-local"
              class="w-full border border-gray-300 rounded px-4 py-2"
              :class="{
                'border-red-500': validationErrors.formattedAppointmentDate,
              }"
              required
            />
          </div>
          <!-- Appointment Status -->
          <div class="mb-4">
            <select
              v-model="appointmentStatus"
              class="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option
                v-for="option in statusOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Related Appointments -->
          <div class="mb-4" v-if="relatedAppointments.length">
            <label class="block text-gray-700">Related Appointments:</label>
            <div class="max-h-56 overflow-y-auto">
              <div
                v-for="related in relatedAppointments"
                :key="related.id"
                class="bg-white rounded shadow-md p-4 mb-2 flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between sm:items-start md:items-center lg:items-center xl:items-center"
              >
                <div class="flex flex-col">
                  <div class="text-lg font-semibold mb-2">
                    <span>{{ related.appointmentAddress }}</span>
                  </div>
                  <div
                    class="flex items-center space-x-2 bg-pink-500 p-2 rounded-full text-white"
                  >
                    <span
                      class="bg-white rounded-full px-3 py-1 text-xs font-semibold mr-2"
                      :class="[
                        'status-label',
                        getStatusColor(related.appointmentStatus),
                      ]"
                    >
                      {{ related.appointmentStatus }}
                    </span>
                    <span class="flex items-center space-x-1">
                      <i class="fas fa-clock mr-1"></i>
                      {{ related.formattedAppointmentDate }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-center">
                  <div
                    v-for="agentId in related.agent_id"
                    :key="agentId"
                    class="flex mr-2 items-center"
                  >
                    <span
                      class="border-2 border rounded-full h-12 w-12 -mr-6 text-white flex items-center justify-center"
                      :style="{
                        backgroundColor: getAgentColor(agentId, agents),
                      }"
                    >
                      {{ getAgentInitials(agentId, agents) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Actions -->
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Close
            </button>
            <button
              type="submit"
              class="bg-pink-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { defineEmits, defineProps } from "vue";
import {
  determineStatus,
  formatDate,
  getAgentColor,
  getAgentInitials,
  getStatusColor,
} from "@/utils/index";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faPhone,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Error from "../components/ErrorNotification.vue";

const emit = defineEmits(["close", "appointmentUpdated"]);
const props = defineProps({
  appointmentId: String,
});

// Vuex store
const store = useStore();

// Modal state
const searchQuery = ref("");
const searchResults = ref<any[]>([]);
const appointmentAddress = ref("");
const selectedContacts = ref<any[]>([]);
const selectedAgents = ref<number[]>([]);
const appointmentDate = ref("");
const formattedAppointmentDate = ref("");
const appointmentStatus = ref("");
const appointmentCancelled = ref<boolean | undefined>(undefined);
const validationErrors = ref({});

// Dropdown state
const dropdownOpen = ref(false);

// Loading state
const isLoading = ref(true);

// Error states
const errorNotificaiton = ref<string | null>(null);

// Fetch appointment details
onMounted(async () => {
  await store.dispatch("fetchAppointment", props.appointmentId);
  isLoading.value = false;

  const appointment = store.getters.getAppointmentData;

  selectedContacts.value = appointment.contact_id.map(
    (id: number, index: number) => ({
      contact_id: id,
      contact_name: appointment.contact_name[index],
      contact_surname: appointment.contact_surname[index],
      contact_email: appointment.contact_email[index],
      contact_phone: appointment.contact_phone[index],
    })
  );

  appointmentAddress.value = appointment.appointment_address;
  selectedAgents.value = appointment.agent_id
    ? appointment.agent_id.map((id: number) => id)
    : [];
  appointmentDate.value = appointment.appointment_date;
  formattedAppointmentDate.value = formatDateTimeLocal(
    appointment.appointment_date
  );
  appointmentStatus.value = determineStatus(appointment);
  appointmentCancelled.value = appointment.is_cancelled;
});

// Watch for changes in appointmentAddress and searchQuery, then validate form
watch([appointmentAddress, selectedContacts, formattedAppointmentDate], () => {
  validateForm();
});

// Fetch agents from store
const agents = computed(() => store.getters.getAgentsData);

// Get selected agents' full details
const selectedAgentsList = computed(() => {
  return agents.value.filter((agent) =>
    selectedAgents.value.includes(agent.id)
  );
});

const appointments = computed(() => store.getters.getAppointmentsData);

// Search contacts
const searchContacts = () => {
  const query = searchQuery.value.toLowerCase() || "";
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

// Handle click outside dropdown
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".relative")) {
    dropdownOpen.value = false;
    closeSearchResults();
  }
};

// Add event listener for click outside
onMounted(() => {
  window.addEventListener("mousedown", handleClickOutside);
});

// Remove event listener
onUnmounted(() => {
  window.removeEventListener("mousedown", handleClickOutside);
});

// Toggle dropdown
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Select contact
const selectContact = (contact: any) => {
  if (!selectedContacts.value.some((c: any) => c.id === contact.id)) {
    contact.contact_id = contact.id;
    selectedContacts.value.push(contact);
  }
  searchQuery.value = "";
  closeSearchResults();
};

// Remove contact
const removeContact = (contactId: number) => {
  selectedContacts.value = selectedContacts.value.filter(
    (contact) => contact.contact_id !== contactId
  );
};

// Remove agent
const removeAgent = (agentId: number) => {
  selectedAgents.value = selectedAgents.value.filter((id) => id !== agentId);
};

// Remove Address
const removeAddress = () => {
  appointmentAddress.value = "";
};

// Check if the appointment is upcoming
const isUpcoming = computed(() => {
  return new Date(appointmentDate.value) > new Date();
});

const statusOptions = computed(() => {
  if (!isUpcoming.value) {
    return ["Completed", "Cancelled"];
  }

  return ["Upcoming", "Cancelled"];
});

// Get related appointments
const formatRelatedAppointment = (appointment: any) => ({
  id: appointment.id,
  appointmentAddress: appointment.appointment_address,
  agent_id: appointment.agent_id
    ? appointment.agent_id.map((id: number) => id)
    : [],
  formattedAppointmentDate: formatDate(appointment.appointment_date),
  appointmentStatus: determineStatus(appointment),
});

const relatedAppointments = computed(() => {
  const appointmentList = appointments.value;
  const currentAppointmentId = props.appointmentId;

  const findRelatedAppointments = (contactId: number) =>
    appointmentList
      .filter(
        (appt) =>
          appt.contact_id?.includes(contactId) &&
          appt.id !== currentAppointmentId
      )
      .map(formatRelatedAppointment);

  return selectedContacts.value.flatMap((contact) =>
    findRelatedAppointments(contact.contact_id)
  );
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

// Update appointment
const updateAppointment = async () => {
  if (!validateForm()) {
    return;
  }

  const appointment = {
    appointment_address: appointmentAddress.value,
    contact_id: selectedContacts.value.map(
      (contact: any) => contact.contact_id
    ),
    agent_id: selectedAgents.value,
    appointment_date: appointmentDate.value,
    is_cancelled: appointmentStatus.value === "Cancelled",
  };

  try {
    await store.dispatch("updateAppointment", {
      id: props.appointmentId,
      fields: appointment,
    });
    emit("appointmentUpdated");
    emit("close");
  } catch (error) {
    errorNotificaiton.value = "Failed to update appoinment. Please try again.";
  }
};

// Close modal
const closeModal = () => {
  emit("close");
};

// Format date to 'datetime-local' input type
const formatDateTimeLocal = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
