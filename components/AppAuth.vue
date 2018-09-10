<template>
  <div class="LoginWrapper">
    <div class="container pt-5">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="login">
                <p 
                  v-if="loginError" 
                  class="error">{{ loginError }}</p>
                <div class="form-group">
                  <label for="InputPassword1">Login</label>
                  <input 
                    id="InputPassword" 
                    v-model="loginPassword"
                    type="password"
                    class="form-control" 
                    placeholder="Password">
                </div>
                <button 
                  type="submit" 
                  class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    async login () {
      try{
        
        await this.$store.dispatch('login', {
          password: this.loginPassword
        });
        console.log('test');
        this.loginPassword = '';
        this.loginError = null;    
      }catch(e){
        this.formError = e.message;
      }
    }
  }
};
</script>