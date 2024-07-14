<template>
  <div class="flex justify-end mt-4 text-sm sm:text-base">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-2 py-1 lg:px-4 lg:py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
    >
      &lt;
    </button>
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="changePage(page)"
      :class="[
        'px-2 py-1 mx-1 lg:px-4 lg:py-2 rounded',
        {
          'bg-blue-500 text-white': page === currentPage,
          'bg-gray-200': page !== currentPage,
        },
      ]"
    >
      {{ page }}
    </button>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-2 py-1 lg:px-4 lg:py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
    >
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["changePage"]);

const changePage = (page: number) => {
  console.log(page);
  emit("changePage", page);
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("changePage", props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("changePage", props.currentPage + 1);
  }
};

const visiblePages = computed(() => {
  const pages = [];
  if (props.totalPages <= 7) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (props.currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", props.totalPages);
    } else if (props.currentPage > props.totalPages - 4) {
      pages.push(
        1,
        "...",
        props.totalPages - 4,
        props.totalPages - 3,
        props.totalPages - 2,
        props.totalPages - 1,
        props.totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        props.currentPage - 1,
        props.currentPage,
        props.currentPage + 1,
        "...",
        props.totalPages
      );
    }
  }
  return pages;
});
</script>
