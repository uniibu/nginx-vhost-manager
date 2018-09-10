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
        <ul class="nav">
          <li 
            v-for="(model, index) in model.children"
            :class="isActive(model.name)"
            :key="index"
            class="item">
            <a
              :href="model.path"
              class="nuxt-link-exact-active nuxt-link-active">
              <i 
                :class="model.icon" 
                class="nc-icon"/>
              {{ model.name }}
            </a>
          </li>
        </ul>
        <li class="add">
          <a 
            href="#"
            @click="addChild">
            <i class="nc-icon nc-simple-add"/>
            ADD
          </a>
        </li>
      </ul>

      <ul class="nav sticky-bottom">
        <li>
          <button 
            class="btn btn-info btn-sm" 
            @click="nginxRestart">Restart NGINX</button>
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
      model: {
        children: [{ name: 'dashboard', path: '/dashboard', icon: 'nc-globe' }]
      }
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
          this.items.push({ name: k, icon: v == true ? 'nc-globe':'nc-alert-circle-i', site: k });
        }
      });
    },
    getSite(name){
      this.$store.dispatch('getsite', name);
    },
    nginxRestart(){
      this.$store.dispatch('nginxrestart');
    },
    isActive(name){
      return this.$route.name == name ? 'active' : '';
    },
    addChild(){
      this.model.children.push({
        name: 'new nginx',
        icon: 'nc-bullet-list-67',
        path: '#'
      });
    }
  }
};
</script>
