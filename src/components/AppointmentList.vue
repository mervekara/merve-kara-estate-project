<template>
  <div class="container mx-auto p-4">
    <!-- Header Section -->
    <div
      class="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 md:space-y-0"
    >
      <div>
        <span class="text-gray-700"
          >{{ filteredAppointments.length }} Appointments found.</span
        >
      </div>
      <button
        @click="openCreateModal"
        class="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Create Appointment
      </button>
    </div>

    <!-- Divider -->
    <div class="flex-grow border-t border-gray-400 mb-4"></div>

    <!-- Loading Spinner -->
    <div
      v-if="isLoading"
      class="flex justify-center items-center h-48 sm:h-screen"
    >
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span class="visually-hidden"></span>
      </div>
    </div>

    <!-- Appointment List -->
    <div v-else>
      <ul class="space-y-4">
        <AppointmentItem
          v-for="appointment in paginatedAppointments"
          :key="appointment.id"
          :appointment="appointment"
          @click="openEditModal(appointment)"
        />
      </ul>
    </div>

    <!-- Pagination -->
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits, defineProps } from "vue";
import { useStore } from "vuex";
import { Appointment } from "@/types";
import AppointmentItem from "./AppointmentItem.vue";
import Pagination from "../components/PaginationComponent.vue";
import {
  formatNames,
  formatEmails,
  formatPhoneNumbers,
  formatDate,
  determineStatus,
  calculateTimeUntil,
} from "../utils/index";

const emit = defineEmits([
  "filteredAppointments",
  "editAppointment",
  "openCreateModal",
]);

defineProps({
  isLoading: Boolean,
});

const store = useStore();

// Local state for pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

const appointments = computed(() => store.getters.getAppointmentsData);
const selectedStatusFilter = computed(() => store.getters.selectedStatusFilter);
const fromDate = computed(() => store.getters.fromDate);
const toDate = computed(() => store.getters.toDate);
const searchQuery = computed(() => store.getters.searchQuery);

const selectedAgents = computed(() => store.getters.selectedAgents);
const formattedAppointments = computed(() =>
  appointments.value.map((appointment) => ({
    ...appointment,
    fullName: formatNames(appointment),
    email: formatEmails(appointment),
    phone: formatPhoneNumbers(appointment),
    formattedDate: formatDate(appointment.appointment_date),
    status: determineStatus(appointment),
    timeUntil: calculateTimeUntil(appointment.appointment_date),
  }))
);

const sortDate = function (a: string, b: string) {
  return new Date(a) < new Date(b) ? 1 : -1;
};

const sortedAppointments = computed(() =>
  formattedAppointments.value
    .slice()
    .sort((a: Appointment, b: Appointment) =>
      sortDate(a.appointment_date, b.appointment_date)
    )
);

const filteredAppointments = computed(() => {
  let filtered = sortedAppointments.value;

  if (selectedAgents.value.length > 0) {
    filtered = filtered.filter((appointment) =>
      appointment.agent_id?.some((agentId: number) =>
        selectedAgents.value.includes(agentId)
      )
    );
  }

  if (selectedStatusFilter.value !== "All Statuses") {
    filtered = filtered.filter(
      (appointment) =>
        determineStatus(appointment) === selectedStatusFilter.value
    );
  }

  if (fromDate.value) {
    filtered = filtered.filter(
      (appointment) =>
        new Date(appointment.appointment_date) >= new Date(fromDate.value)
    );
  }

  if (toDate.value) {
    filtered = filtered.filter(
      (appointment) =>
        new Date(appointment.appointment_date) <= new Date(toDate.value)
    );
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (appointment) =>
        appointment.contact_name.find((name) =>
          name.toLowerCase().includes(query)
        ) ||
        appointment.contact_surname.find((surname) =>
          surname.toLowerCase().includes(query)
        ) ||
        appointment.contact_email.find((email) =>
          email.toLowerCase().includes(query)
        ) ||
        appointment.contact_phone.find((phone) =>
          String(phone).includes(query)
        ) ||
        appointment.appointment_address.toLowerCase().includes(query)
    );
  }

  emit("filteredAppointments", filtered);

  return filtered;
});

// Total pages
const totalPages = computed(() =>
  Math.ceil(filteredAppointments.value.length / itemsPerPage.value)
);

// Paginated appointments
const paginatedAppointments = computed(() =>
  filteredAppointments.value.slice(
    (currentPage.value - 1) * itemsPerPage.value,
    currentPage.value * itemsPerPage.value
  )
);

const changePage = (page: number) => {
  currentPage.value = page;
};

const openEditModal = (appointment: Appointment) => {
  console.log("adad");
  emit("editAppointment", appointment);
};

const openCreateModal = () => {
  emit("openCreateModal");
};
</script>
