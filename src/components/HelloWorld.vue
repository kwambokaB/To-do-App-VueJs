<script setup>
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

defineProps({
  msg: String,
});

const count = ref(0);
const isDark = useDark();
const toggleDark = useToggle(isDark);
console.log(isDark.value);
</script>

<template>
  <main>
    <header />
    <div class="text-3xl font-bold underline">Click on the Vite and Vue logos to learn more</div>
    <button
      class="py-2 px-4 bg-black text-white rounded-md dark:bg-white dark:text-black"
      @click="toggleDark()"
    >
      Toggle
    </button>
  </main>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
