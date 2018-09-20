<template>
  <section class="LoginWrapper section-lg my-0">
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <div class="card border-0 shadow bg-light">
            <div class="card-body  px-lg-4 pt-lg-4">
              <div class="text-muted text-center mb-3">
                <small>Login</small>
              </div>
              <form @submit.prevent="login">
                <div class="form-group input-group input-group-alternative">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="nc-icon nc-lock-circle-open"/>
                    </span>
                  </div>
                  <input
                    id="InputPassword"
                    v-model="loginPassword" 
                    aria-describedby="addon-right addon-left"
                    type="password"
                    class="form-control" 
                    placeholder="Password">
                </div>
                <div class="text-center">
                  <button 
                    type="submit" 
                    class="btn mt-4 btn-primary">Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default{
  data() {
    return {
      loginPassword: '',
      loginError: null      
    };
  },
  methods: {
    async login() {
      try {
        this.$toast.success('Signing in...');
        await this.$store.dispatch('login', {
          password: this.loginPassword
        });
        this.$toast.success('Successfully authenticated !');
        this.$router.push('/dashboard');
        this.loginPassword = '';
        this.loginError = null;    
      } catch(e){
        this.$toast.error(e);
      }
    }
  }
};
</script>