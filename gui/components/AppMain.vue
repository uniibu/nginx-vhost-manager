<template>
  <div class="main-panel">
    <app-navbar title="Nginx"/>
    <div class="content">
      <div class="row">
        <app-editor/>
      </div>
    </div>
    <app-footer/>
  </div>
</template>
<script>
import AppNavbar from '~/components/AppNavbar.vue';
import AppFooter from '~/components/AppFooter.vue';
import AppEditor from '~/components/AppEditor.vue';
export default {
  components: {
    AppNavbar,
    AppEditor,
    AppFooter
  }
};
</script>