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
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  fromDate: String,
  toDate: String,
});

const emit = defineEmits(["updateFromDate", "updateToDate"]);

const localFromDate = ref(props.fromDate);
const localToDate = ref(props.toDate);

watch(
  () => props.fromDate,
  (newVal) => {
    localFromDate.value = newVal;
  }
);

watch(
  () => props.toDate,
  (newVal) => {
    localToDate.value = newVal;
  }
);

const updateFromDate = () => {
  emit("updateFromDate", localFromDate.value);
};

const updateToDate = () => {
  emit("updateToDate", localToDate.value);
};
</script>
