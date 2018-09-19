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
          :key="index">
          <a
            href="#"
            @click="getSite(item.site)">
            <i
              :class="item.icon"
              class="nc-icon"/>
            {{ item.name }}
          </a>
        </li>
      </ul>
      <ul class="nav sticky-bottom">
        <li>
          <button 
            class="btn btn-sm btn-default" 
            @click="newNginx">NEW NGINX CONFIG</button>
        </li>
        <li>
          <button 
            class="btn btn-sm btn-default" 
            @click="nginxRestart">RESTART NGINX</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default{
  data() {
    return {
      items: [],
    };
  },
  mounted(){
    this.getVhosts();
  },
  methods: {
    getVhosts(){
      this.$store.dispatch('getvhosts').then(({ sites }) => {
        this.items = [];
        for(const [k, v] of Object.entries(sites)){
          this.items.push({ name: k, icon: v == true ? 'nc-globe' : 'nc-alert-circle-i', site: k });
        }
      });
    },
    async getSite(name){
      try {
        await this.$store.dispatch('getsite', name);
      } catch(e){
        this.$toast.error(e);
      }
    },
    async nginxRestart(){
      try {
        await this.$store.dispatch('nginxrestart');
        this.$toast.success('Nginx Restarted');
      } catch(e){
        this.$toast.error(e);
      }
    },
    newNginx() {
      this.$store.dispatch('neweditor');
      this.$toast.success('New Editor Config !');
    },
    isActive(name){
      return this.$route.name == name ? 'active' : '';
    },
  }
};
</script>
