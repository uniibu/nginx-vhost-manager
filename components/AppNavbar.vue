<template>
  <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div 
          ref ="lNav"
          class="navbar-toggle">
          <button 
            type="button" 
            class="navbar-toggler"
            aria-label="Toggle navigation"
            @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"/>
            <span class="navbar-toggler-bar bar2"/>
            <span class="navbar-toggler-bar bar3"/>
          </button>
        </div>
        <a 
          class="navbar-brand" 
          href="#">{{ title }}</a>
      </div>
      <button
        ref="rNav"
        class="navbar-toggler collapsed"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
        type="button"
        @click="toggleCollapse">
        <span class="navbar-toggler-bar navbar-kebab"/>
        <span class="navbar-toggler-bar navbar-kebab"/>
        <span class="navbar-toggler-bar navbar-kebab"/>
      </button>
      <div
        ref="checkEl"
        :class="rClass"
        :style="rHeight"
        class="navbar-collapse justify-content-end">
        <a 
          href="#"
          class="btn btn-default btn-sm"
          @click="logout">
          <i class="nc-icon nc-button-power"/>
          <span>Logout</span>
        </a>
        <slot/>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rClass: 'collapse',
      rHeight: '',
      rStatus: false,
      rightNav: false,
      lStatus: false
    };
  },
  mounted(){
    if(!this.$refs.checkEl.childNodes.length) {
      this.toggleClass(this.$refs.rNav, 'd-none');
    }
  },
  methods: {
    toggleClass(el, cname){
      el.classList.toggle(cname);
    },
    toggleCollapse() {
      if(this.rStatus){
        return;
      }
      this.rStatus = true;
      const el = this.$refs.rNav;
      if(!this.rightNav){
        this.rightNav = true;
        this.toggleClass(el, 'collapsed');
        el.setAttribute('aria-expanded', true);
        this.rClass = 'collapsing';
        setTimeout(() => {
          this.rHeight = 'height: 48px';
        }, 100);
        setTimeout(() => {
          this.rClass = 'collapse show';
          this.rStatus = false;
        }, 580);
      }else {
        this.rightNav = false;
        this.toggleClass(el, 'collapsed');
        el.setAttribute('aria-expanded', false);
        this.rClass = 'collapsing';
        setTimeout(() => {
          this.rHeight = '';
        }, 100);
        setTimeout(() => {
          this.rClass = 'collapse';
          this.rStatus = false;
        }, 580);
      }
    },
    toggleSidebar() {
      if(this.lStatus){
        return;
      }
      this.lStatus = true;
      const el = this.$refs.lNav;
      const wrapper = document.getElementById('wrapper');
      this.leftNav = false;
      this.toggleClass(wrapper, 'nav-open');
      setTimeout(() => {
        this.toggleClass(el, 'toggled');
        this.lStatus = false;
      }, 580);
    },
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>
