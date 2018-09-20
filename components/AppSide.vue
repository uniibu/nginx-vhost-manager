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

    <div 
      id="style-3" 
      class="sidebar-wrapper">
      <ul class="nav">
        <li
          v-for="(item, index) in items"
          :class="isActive(item.name)"
          :key="index"
          class="nav-item">
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
        <li class="nav-item">
          <a 
            href="#" 
            class="text-success"
            @click="newNginx">
            <i class="nc-icon nc-ruler-pencil text-success"/>
            New Nginx Config
          </a>
        </li>
        <li class="nav-item">
          <a 
            href="#" 
            class="text-success"
            @click="nginxRestart">
            <i class="nc-icon nc-spaceship text-success"/>
            Restart Nginx
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default{
  data() {
    return {
      items: []
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
        const vname = await this.$store.dispatch('getsite', name);
        return vname;
      } catch(e){
        this.$toast.error(e);
      }
    },
    isActive(name){
      return this.$store.state.configname == name ? 'active' : '';
    },
    async nginxRestart(){
      try {
        this.$toast.info('Restarting...');
        await this.$store.dispatch('nginxrestart');
        this.$toast.success('Nginx Restarted');
      } catch(e){
        this.$toast.error(e);
      }
    },
    newNginx() {
      this.$store.dispatch('neweditor');
      this.$toast.success('New Editor Config !');
    }
  }
};
</script>
