<template>
  <div class="col-md-12">
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
    }
  }
};
</script>