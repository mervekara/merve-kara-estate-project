<template>
  <div class="container mx-auto p-4">
    <Error :errorNotificaiton="errorNotificaiton" />
    <FilterBar
      :selectedStatusFilter="selectedStatusFilter"
      :fromDate="fromDate"
      :toDate="toDate"
      @statusChanged="setStatusFilter"
      @updateFromDate="setFromDate"
      @updateToDate="setToDate"
      @updateSearchQuery="setSearchQuery"
    />
    <SelectedFilters
      :selectedStatusFilter="selectedStatusFilter"
      :fromDate="fromDate"
      :toDate="toDate"
      :searchQuery="searchQuery"
      @updateStatusFilter="setStatusFilter"
      @updateFromDate="setFromDate"
      @updateToDate="setToDate"
    />
    <AppointmentList
      :isLoading="isLoading"
      :selectedAgents="selectedAgents"
      :selectedStatusFilter="selectedStatusFilter"
      :fromDate="fromDate"
      :toDate="toDate"
      :searchQuery="searchQuery"
      @filteredAppointments="updateFilteredAppointments"
      @editAppointment="openEditModal"
      @openCreateModal="openCreateModal"
    />
    <CreateAppointmentModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @appointmentCreated="refreshAppointments"
    />
    <EditAppointmentModal
      v-if="showEditModal"
      :appointmentId="currentAppointment?.id"
      @appointmentUpdated="refreshAppointments"
      @close="showEditModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import FilterBar from "../components/FilterBar.vue";
import SelectedFilters from "../components/SelectedFilters.vue";
import AppointmentList from "../components/AppointmentList.vue";
import CreateAppointmentModal from "../components/CreateAppointmentModal.vue";
import EditAppointmentModal from "../components/EditAppointmentModal.vue";
import Error from "../components/ErrorNotification.vue";

// Vuex store
const store = useStore();

// Modals
const showCreateModal = ref(false);
const showEditModal = ref(false);
const currentAppointment = ref(null);
const selectedAgents = ref<number[]>([]);

// Handle filtered appointments
const filteredAppointments = ref([]);
const updateFilteredAppointments = (appointments) => {
  filteredAppointments.value = appointments;
};

// Loading state
const isLoading = ref(true);

// Error states
const errorNotificaiton = ref<string | null>(null);

// Fetch data on mount
const fetchAppointments = async () => {
  try {
    await store.dispatch("fetchAppointments");
    isLoading.value = false;
  } catch (error) {
    errorNotificaiton.value = "Failed to load appointments. Please try again.";
    isLoading.value = false;
  }
};

const fetchAgents = async () => {
  try {
    await store.dispatch("fetchAgents");
  } catch (error) {
    errorNotificaiton.value = "Failed to load agents. Please try again.";
  }
};

const fetchContacts = async () => {
  try {
    await store.dispatch("fetchContacts");
  } catch (error) {
    errorNotificaiton.value = "Failed to load contacts. Please try again.";
  }
};

const refreshAppointments = () => {
  isLoading.value = true;
  fetchAppointments();
};

onMounted(async () => {
  await fetchContacts();
  await fetchAgents();
  await fetchAppointments();
});

const openCreateModal = () => {
  showCreateModal.value = true;
};

const openEditModal = (appointment) => {
  currentAppointment.value = appointment;
  showEditModal.value = true;
};

const selectedStatusFilter = ref("All Statuses");
const fromDate = ref("");
const toDate = ref("");
const searchQuery = ref("");

const setStatusFilter = (status: string) => {
  selectedStatusFilter.value = status;
};

const setFromDate = (date: string) => {
  console.log(!!date);
  fromDate.value = date || "";
  console.log(fromDate.value);
};

const setToDate = (date: string) => {
  toDate.value = date;
};

const setSearchQuery = (query: string) => {
  searchQuery.value = query;
};
</script>
