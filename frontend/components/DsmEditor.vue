<template>
  <div id="app">
    <vue-editor v-model="content" :editor-options="editorSettings" />
  </div>
</template>
  
  <script>
  import { VueEditor, Quill } from 'vue2-editor';
  import DateInsertModule from '../modules/dateinsert'; // Adjust the path accordingly
  
  Quill.register('modules/dateInsertModule', DateInsertModule);
  
  export default {
    components: {
      VueEditor,
    },
    data() {
      return {
        content: '<h1>Initial Content</h1>',
        editorSettings: {
          modules: {
            dateInsertModule: true,
            
          },
        },
      };
    },
    mounted() {
      const icons = Quill.import("ui/icons");
      icons.date = '<i class="fa fa-italic" aria-hidden="true"></i>';
    },
  };
  </script>