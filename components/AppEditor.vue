<template>
  <div class="col-md-12">
    <div 
      v-if="$store.state.action == 'new' || $store.state.action == ''">
      <a
        href="#"
        class="btn btn-success btn-sm"
        @click="saveConfig">
        <i class="tm-icon tm-save"/> 
        <span>SAVE NGINX CONFIG</span>
      </a>
    </div>
    <div 
      v-if="$store.state.action == 'edit'">
      <a 
        href="#"
        class="btn btn-danger btn-sm"
        @click="deleteConfig">
        <i class="tm-icon tm-trash"/> 
        <span>DELETE NGINX CONFIG</span>
      </a>
      <a 
        href="#"
        class="btn btn-default btn-sm"
        @click="editConfig">
        <i class="nc-icon nc-refresh-69"/> 
        <span>UPDATE NGINX CONFIG</span>
      </a>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="input-group no-border mx-auto">
          <input
            v-model="$store.state.confname"
            type="text" 
            placeholder="Nginx Config Name..." 
            class="form-control"
            @change="onConfNameChange">
        </div>
      </div>
    </div>

    <div class="cm-topbar"><div class="cm-topone"/> <div class="cm-toptwo"/> <div class="cm-topthree"/></div>
    <codemirror 
      v-model="$store.state.code"
      :options="cmOption" 
      class="mb-4" 
      @ready="onCmReady" 
      @input="onCmChange"/> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      cmOption: {
        tabSize: 4,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        lineWrapping: true,
        mode: 'text/x-nginx-conf',
        keyMap: 'sublime',
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: 'panda-syntax',
        extraKeys: {
          Ctrl: 'autocomplete'
        },
        hintOptions: {
          completeSingle: false
        }
      },
    };
  },
  methods: {
    onCmReady(cm) {
      console.log('Ready', cm);
    },
    onCmChange(newCm) {
      console.log('new code', newCm);
      this.$store.commit('CHANGE_CODE', newCm);
    },
    onConfNameChange(newConfName) {
      this.$store.commit('CHANGE_CONFNAME', newConfName.target.value);
    },
    saveConfig() {
      this.$store.dispatch('saveconfig').then(() => {
        this.$router.go();
      });
    },
    deleteConfig() {
      this.$store.dispatch('deleteconfig').then(() => {
        this.$store.dispatch('neweditor');
        this.$router.go();
      });
    },
    editConfig() {
      this.$store.dispatch('editconfig');
      console.log('updated..!');
    }
  }
};
</script>