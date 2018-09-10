export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.auth) {
    return redirect('/');
  }else{
    return store.dispatch('token').then().catch(function(){
      store.dispatch('logout');
      return redirect('/');
    });
  }
}