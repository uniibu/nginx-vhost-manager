<template>
  <div>
    <div
      id="wrapper" 
      class="wrapper">
      <app-side/>
      <nuxt/>
    </div>
  </div>
</template>
<script>
import AppSide from '~/components/AppSide.vue';
export default {
  components: {
    AppSide
  }
};
</script>