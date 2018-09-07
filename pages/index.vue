<template>
  <app-auth/>
</template>
<script>
import AppAuth from '~/components/AppAuth.vue';
export default {
  components: {
    AppAuth,
  },
  layout: 'loginPage'
};
</script>