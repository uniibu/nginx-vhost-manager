<template>
  <div 
    class="sidebar"
    data-background-color="darkblues"
    data-active-color="success">
    <div class="logo">
      <a 
        href="/" 
        class="simple-text logo-normal">
        <div class="logo-image-small">
          <img
            src="/img/logonginx.png"
            alt="Nginx Vhost">
        </div>
      </a>
    </div>

    <div class="sidebar-wrapper">
      <ul class="nav">
        <li
          v-for="(item, index) in items"
          :class="isActive(item.path)"
          :key="index">
          <nuxt-link
            :to="{path: item.path, query: item.query}"
            exact>
            <i
              :class="item.icon"
              class="nc-icon"/>
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
      <ul class="nav sticky-bottom">
        <li>
          <a class="btn btn-default btn-sm">Restart NGINX</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default{
  data() {
    return {
      items: [
        { name: 'Dashboard', path: 'dashboard', icon: 'nc-globe' }
      ]      
    };
  },
  methods: {
    isActive(name){
      return this.$route.name == name ? 'active' : '';
    },
  }
};
</script>
