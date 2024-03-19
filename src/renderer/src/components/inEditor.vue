<template>
  <div class="font-bold mb-1 pb-0.5 mr-2 text-white" >
    <input
      type="text"
      @change="changeNoteTitle"
      v-model="notetitle"
      style="outline: none !important; caret-color: white"
      class="bg-transparent text-2xl flex-grow w-full focus:bg-[#303030] focus:mb-1.5 focus:text-[1.4rem] focus:rounded-xl focus:py-2 focus:pl-4 focus:pr-[-1rem]"
      placeholder="Note Name"
    />
  </div>
  <textarea id="markdown-editor" v-if="path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'md'"></textarea>
  <textarea class="w-full h-full bg-transparent" v-if="path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'txt'" style="outline: none !important; caret-color: white" @input="update" v-model="textarea"></textarea>
</template>

<script>
import EasyMDE from "easymde";

export default {
  props: [
      "path",
      "text"
  ],
  emits: ['save'],
  data: () => {
    return {
      notetitle: "",
      easyMDE: null,
      textarea: ""
    }
  },
  methods: {
    update(){
      this.$emit("save", this.textarea);
    }
  },
  mounted(){
    this.textarea = this.text

    this.notetitle = this.path.replace(/^.*[\\/]/, '').split('.').slice(0, -1).join('.')

    this.easyMDE = undefined;
    const elements = document.querySelectorAll(".EasyMDEContainer");
    elements.forEach((element) => {
      element.remove();
    });
    
    if ( this.path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'md' ){
      this.easyMDE = new EasyMDE({
        element: document.getElementById("markdown-editor"),
        autoDownloadFontAwesome: false,
        spellChecker: false,
        lineWrapping: true,
        toolbar: false,
        status: false,
        forceSync: true,
        initialValue: this.textarea,
        shortcuts: {
          togglePreview: null,
          toggleFullScreen: null,
          toggleSideBySide: null,
        }
      });

      
      this.easyMDE.codemirror.on("change", () => {
        this.$emit("save", this.easyMDE.value());
      });
    }
  }
}
</script>

<style>
@import "../../../../node_modules/easymde/dist/easymde.min.css";

.editor-toolbar {
  background-color: #262626;
  border: none;
  margin-bottom: 16px;
  margin-top: 12px;
  padding: 0px;
  border-radius: 9999px;
}

div.CodeMirror.cm-s-easymde.CodeMirror-wrap {
  background-color: #1f1f1f;
  color: white;
  border: none;
  padding: 0px;
}

.cm-header-1 {
  font-size: calc(1.325rem + 0.9vw) !important;
}

.cm-header-2 {
  font-size: calc(1.3rem + 0.6vw) !important;
}

.cm-strong:not(.cm-formatting) {
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 228, 0, 0.4); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
}

.cm-strong.cm-formatting {
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 228, 0, 0.6); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
}

.cm-formatting:not(.cm-quote) {
  opacity: 0.7;
}

.cm-quote {
  color: white !important;
  opacity: 0.9;
}

.CodeMirror-cursor {
  border-left: 1px solid #fff;
}

.cm-link {
  color: #84a4f0 !important;
}

.CodeMirror-line, .CodeMirror-lines{
  padding: 0px !important;
}
</style>