<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 w-full sm:w-auto md:w-auto"
    >
      {{ localSelectedStatusFilter }}
    </button>
    <div
      v-if="isDropdownOpen"
      class="absolute mt-2 w-full sm:w-auto md:w-48 bg-white border rounded shadow-lg z-10"
    >
      <button
        v-for="status in statusFilters"
        :key="status"
        @click="setStatusFilter(status)"
        class="block px-4 py-2 w-full text-left hover:bg-gray-200"
      >
        {{ status }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const selectedStatusFilter = computed(() => store.getters.selectedStatusFilter);

const statusFilters = ["All Statuses", "Cancelled", "Upcoming", "Completed"];
const localSelectedStatusFilter = ref(selectedStatusFilter.value);
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

watch(
  () => selectedStatusFilter.value,
  (newVal) => {
    localSelectedStatusFilter.value = newVal;
  }
);

const setStatusFilter = (status: string) => {
  localSelectedStatusFilter.value = status;
  isDropdownOpen.value = false;
  store.dispatch("updateStatusFilter", status);
  // emit("statusChanged", status);
};
</script>
