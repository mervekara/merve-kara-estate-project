<template>
  <div
    class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0 lg:space-x-4 xl:space-x-6"
  >
    <input
      type="date"
      v-model="localFromDate"
      @input="updateFromDate"
      class="border rounded px-4 py-2 w-full sm:w-auto lg:px-6 xl:px-8"
      placeholder="From date"
    />
    <span>-</span>
    <input
      type="date"
      v-model="localToDate"
      @input="updateToDate"
      class="border rounded px-4 py-2 w-full sm:w-auto lg:px-6 xl:px-8"
      placeholder="To date"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref, watch, computed } from "vue";
const store = useStore();

const fromDate = computed(() => store.getters.fromDate);
const toDate = computed(() => store.getters.toDate);

const localFromDate = ref(fromDate.value);
const localToDate = ref(toDate.value);

watch(
  () => fromDate.value,
  (newVal) => {
    localFromDate.value = newVal;
  }
);

watch(
  () => toDate.value,
  (newVal) => {
    localToDate.value = newVal;
  }
);

const updateFromDate = () => {
  store.dispatch("updateFromDate", localFromDate.value);
};

const updateToDate = () => {
  store.dispatch("updateToDate", localToDate.value);
};
</script>
