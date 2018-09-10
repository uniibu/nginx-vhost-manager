<template>
  <app-auth/>
</template>
<script>
import AppAuth from '~/components/AppAuth.vue';
export default {
  middleware: 'public',
  components: {
    AppAuth,
  },
  layout: 'loginPage'
};
</script>