<template>
  <app-main/>
</template>
<script>
import AppMain from '~/components/AppMain.vue';
export default {
  middleware: 'private',
  components: {
    AppMain     
  }
};
</script>