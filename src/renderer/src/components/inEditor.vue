<template>
  <div class="font-bold mb-1 pb-0.5 mr-2 text-white" >
    <input
      type="text"
      @change="changeNoteTitle"
      v-model="notetitle"
      style="outline: none !important; caret-color: white"
      class="bg-transparent pb-1 text-2xl flex-grow w-full focus:bg-hover focus:mb-1.5 focus:text-[1.4rem] focus:rounded-xl focus:py-2 focus:pl-4 focus:pr-[-1rem]"
      placeholder="Note Name"
    />
  </div>

  <div id="md-preview" v-html="parsedMd" v-show="isPreviewMd" class="mdcontent whitespace-pre-line flex flex-col"></div>

  <textarea id="markdown-editor" v-if="path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'md'" v-show="!previewMd" placeholder="Type here..."  v-focus></textarea>

  <textarea class="w-full h-full bg-transparent" v-else-if="path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'txt'" style="outline: none !important; caret-color: white" @input="update(textarea)" v-model="textarea" placeholder="Type here..." v-focus></textarea>
  
  <inScrap v-else-if="path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'scrap'" :data="textarea" :key="textarea" @save="update" />

  <inTodo v-else-if="path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'todo'" :text="textarea" :key="textarea" @save="update" />

  <img v-else-if="
    path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'png' ||
    path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'jpg' ||
    path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'jpeg' ||
    path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'webp' ||
    path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'gif'"
  :src="`data:image/${path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0]};base64,${textarea}`" class="w-full">

  <video controls v-else-if="path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'mp4'"
  :src="`data:video/${path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0]};base64,${textarea}`" class="w-full"></video>

  <audio controls v-else-if="path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'mp3' || path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'wav'"
  :src="`data:audio/${path.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0]};base64,${textarea}`" class="w-full"></audio>

  <div class="bg-sidebar2 border border-border rounded-xl text-center py-4" v-else>
    <div>{{ i18n.editor.cannot_open }}</div>
    <button class="bg-primary rounded-lg px-4 py-1.5 mt-2" @click="openInExternal">
      {{ i18n.editor.open_in_external }}
    </button>
  </div>
</template>

<script>
import inScrap from "./inScrap.vue";
import inTodo from "./inTodo.vue";

import EasyMDE from "easymde";
import marked from "marked/marked.min.js";
import hljs from "highlight.js"

const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    focus
  },
  props: [
      "path",
      "text",
      "i18n"
  ],
  components: {
    inScrap,
    inTodo
  },
  emits: ['save', 'changeNoteTitle'],
  data: () => {
    return {
      notetitle: "",
      easyMDE: null,
      textarea: "",
      parsedMd: "",
      isPreviewMd: false
    }
  },
  methods: {
    update(data){
      this.$emit("save", data);
    },
    previewMd(){
      this.parsedMd = marked.parse(this.textarea)

      this.easyMDE = undefined;
      const elements = document.querySelectorAll(".EasyMDEContainer");
      elements.forEach((element) => {
        element.remove();
      });

      this.isPreviewMd = true

      setTimeout(() => {
        hljs.highlightAll();
      }, 1);
    },
    exitPreview(){
      this.isPreviewMd = false

      this.easyMDE = new EasyMDE({
        element: document.getElementById("markdown-editor"),
        autoDownloadFontAwesome: false,
        spellChecker: false,
        lineWrapping: true,
        toolbar: false,
        status: false,
        forceSync: true,
        autofocus: true,
        initialValue: this.textarea,
        placeholder: "Type here...",
        shortcuts: {
          togglePreview: null,
          toggleFullScreen: null,
          toggleSideBySide: null,
        }
      });

      this.easyMDE.codemirror.on("change", () => {
        this.$emit("save", this.easyMDE.value());
        this.textarea = this.easyMDE.value()
      });
    },
    changeNoteTitle() {
      this.$emit("changeNoteTitle", this.notetitle);
    },
    openInExternal(){
      window.api.openInExternal(this.path)
        .catch(error => {
          console.error(error)
        })
    },
    pin(){
      this.notetitle = this.notetitle + " #pin";
      this.changeNoteTitle();
    },
    unpin() {
      this.notetitle = this.notetitle.replace(" #pin", "");
      this.notetitle = this.notetitle.replace("#pin", "");
      this.changeNoteTitle();
    }
  },
  mounted(){
    this.textarea = this.text

    if (this.path.replace(/^.*[\\/]/, '').split('.').slice(0, -1).join('.').startsWith('$untitled-')){
      this.notetitle = ""
    }else{
      this.notetitle = this.path.replace(/^.*[\\/]/, '').split('.').slice(0, -1).join('.')
    }

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
        autofocus: true,
        placeholder: "Type here...",
        shortcuts: {
          togglePreview: null,
          toggleFullScreen: null,
          toggleSideBySide: null,
        }
      });

      
      this.easyMDE.codemirror.on("change", () => {
        this.$emit("save", this.easyMDE.value());
        this.textarea = this.easyMDE.value();
      });
    }
  }
}
</script>

<style>
@import "../../../../node_modules/easymde/dist/easymde.min.css";
@import "../../../../node_modules/highlight.js/styles/atom-one-dark.css";

/* EasyMDE */
.editor-toolbar {
  background-color: #262626;
  border: none;
  margin-bottom: 16px;
  margin-top: 12px;
  padding: 0px;
  border-radius: 9999px;
}

div.CodeMirror.cm-s-easymde.CodeMirror-wrap {
  background-color: var(--color-main-pane);
  color: var(--color-white);
  border: none;
  padding: 0px;
}

.cm-header-1 {
  font-size: calc(1.325rem + 0.9vw) !important;
}

.cm-header-2 {
  font-size: calc(1.3rem + 0.6vw) !important;
}

.cm-string{
  word-break: break-all;
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

.CodeMirror-line span{
  word-break: break-all;
}

/* Preview */

.mdcontent h1 {
  font-size: calc(1.325rem + 0.9vw);
  font-weight: bold;
}

.mdcontent h2 {
  font-size: calc(1.3rem + 0.6vw) !important;
  font-weight: bold;
}

.mdcontent h3 {
  font-size: calc(1.2rem + 0.3vw) !important;
  font-weight: bold;
}

.mdcontent h4 {
  font-size: calc(1.1rem + 0.2vw) !important;
  font-weight: bold;
}

.mdcontent h5 {
  font-size: calc(1.05rem + 0.1vw) !important;
  font-weight: bold;
}

.mdcontent h6 {
  font-size: calc(1rem) !important;
  font-weight: bold;
}

.mdcontent strong {
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 230, 0, 0.5); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
  font-weight: bold;
}

.mdcontent blockquote {
  border-left: 6px solid #ffffff50;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  margin: 6px;
}

.mdcontent a {
  color: #84a4f0;
  text-decoration: underline;
}

.mdcontent ul,
ol {
  display: flex;
  flex-direction: column;
}

.mdcontent ul li {
  list-style: disc;
  list-style-position: inside;
}

.mdcontent ol li {
  list-style: decimal;
  list-style-position: inside;
}

.mdcontent pre code {
  word-break: break-all;
}
</style>