<template>
  <div
    class="
      relative
      bg-[url('/images/BG-MOBILE-LIGHT.JPG')]
      dark:bg-[url('/images/BG-MOBILE-DARK.JPG')]
      md:bg-[url('/images/bg-desktop-light.jpg')]
      dark:md:bg-[url('/images/bg-desktop-dark.jpg')]
      h-[300px]
      bg-no-repeat bg-cover
      flex flex-col
      justify-center
      items-start
    "
  >
  </div>
</template>

<script>
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
export default {
  name: 'TopImage',
  setup() {
    const Dark = useDark();
    const isDark = ref(Dark.value);
    console.log('isDark', isDark);
    return { isDark };
  },
};
</script>
