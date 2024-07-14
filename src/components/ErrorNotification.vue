<template>
  <div
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
    role="alert"
    v-if="errorNotificaiton"
  >
    <span class="block sm:inline">{{ errorNotificaiton }}</span>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  errorNotificaiton: String,
});
</script>
