<template>
  <div class="container mx-auto p-4">
    <Error :errorNotificaiton="errorNotificaiton" />
    <FilterBar />
    <SelectedFilters />
    <AppointmentList
      :isLoading="isLoading"
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
</script>
