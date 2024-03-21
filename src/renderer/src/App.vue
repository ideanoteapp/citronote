<template>
  <div class="flex h-screen">

    <!-- Sidebar 1 -->
    <div class="max-w-[100vw] h-screen min-w-[180px] lg:min-w-[200px] w-[180px] bg-[#262626] border-r border-[#424242]">
      <div class="bg-[#202020] h-[52px] w-full border-b border-[#424242] flex">
        <div class="min-w-[51px] w-[51px] h-[51px] border-r border-[#424242] flex flex-col justify-center duration-200 hover:bg-[#2d2d2d]">
          <div class="flex justify-center">
            <img src="./assets/icon.png" alt="Menu" class="h-7 rounded-full">
          </div>
        </div>
        <button class="flex flex-col justify-center px-3 text-white w-full duration-200 hover:bg-[#2d2d2d]" @click="this.openSwitchNotebookMenu = true">
          <div class="flex w-full">
            <div class="flex-grow text-left">
              {{ currentNotebook.replace(/^.*[\\/]/, "") }}
            </div>
            <div class="flex flex-col justify-center">
              <img src="./assets/material_symbols/arrow_drop_down.svg">
            </div>
          </div>
        </button>
          <Transition name="fade">
            <div class="absolute w-screen h-screen left-0 top-0 bg-black opacity-40 z-20" v-if="this.openSwitchNotebookMenu" @click="this.openSwitchNotebookMenu = false"></div>
          </Transition>
          <Transition name="slide-up">
            <div class="absolute py-1.5 left-14 bg-[#262626] z-50 w-48 rounded-lg top-10 shadow-md border border-[#5f5f5f]" v-if="this.openSwitchNotebookMenu">
              <div>
                <button class="flex py-2 px-3 hover:bg-[#353535] w-full duration-200" @click="switchNotebook(i)">
                  <img src="./assets/material_symbols/book_2.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ currentNotebook.replace(/^.*[\\/]/, "") }}
                  </div>
                </button>
              </div>

              <div>
                <button class="flex py-2 px-3 hover:bg-[#353535] w-full duration-200" @click="removeNotebook()">
                  <img src="./assets/material_symbols/delete_red.svg" class="h-5">
                  <div class="text-sm flex flex-col justify-center text-white ml-1.5 text-left">
                    ノートブックを削除
                  </div>
                </button>
              </div>

              <div class="my-1 border-b border-[#5f5f5f]"></div>

              <div v-for="i in notebooks">
                <button class="flex py-2 px-3 hover:bg-[#353535] w-full duration-200" v-if="i != currentNotebook" @click="switchNotebook(i)">
                  <img src="./assets/material_symbols/book_2.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ i.replace(/^.*[\\/]/, "") }}
                  </div>
                </button>
              </div>

              <div>
                <button class="flex py-2 px-3 hover:bg-[#353535] w-full duration-200" @click="addNotebook()">
                  <img src="./assets/material_symbols/add.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    ノートブックを追加
                  </div>
                </button>
              </div>
            </div>
          </Transition>
      </div>

      <div class="px-3 my-3 overflow-y-scroll max-h-[calc(100vh-64px)]">
        <inFolder type="root" name="ルート" :is_current_folder="currentFolder === currentNotebook" @click="switchFolder(currentNotebook)" />
        <inFolder v-for="i in folders" type="folder" :name="i.replace(/^.*[\\/]/, '')" @click="switchFolder(i)" :is_current_folder="currentFolder === i" />
      </div>

    </div>

    <!-- Sidebar 2 -->
    <div class="bg-[#2e2e2e] border-r border-[#424242] min-w-[286px] w-[286px]">
      <div class="bg-[#212121] h-[52px] w-full border-b border-[#424242] flex flex-col justify-center">
        <div class="flex justify-end mx-3">
          <button class="mx-1.5 hover-light">
            <img src="./assets/material_symbols/contract_white.svg" alt="Markdown" class="opacity-80">
          </button>

          <button class="mx-1.5 hover-light">
            <img src="./assets/material_symbols/markdown_white.svg" alt="Markdown" class="opacity-80">
          </button>

          <button class="mx-1.5 hover-light" @click="openCreateNoteMenu = true">
            <img src="./assets/material_symbols/edit_square.svg" alt="Markdown" class="opacity-80">
          </button>
          <Transition name="fade">
            <div class="absolute w-screen h-screen left-0 top-0 bg-black opacity-30 z-20" v-if="this.openCreateNoteMenu" @click="this.openCreateNoteMenu = false"></div>
          </Transition>
          <Transition name="slide-up">
            <div class="absolute py-1.5 mt-8 bg-[#262626] z-50 rounded-lg shadow-md border border-[#5f5f5f]" v-if="this.openCreateNoteMenu">
              <button class="flex py-2 pr-7 px-3 hover:bg-[#353535] w-full duration-200" @click="createNote('md')">
                <img src="./assets/material_symbols/markdown.svg">
                <div class="flex flex-col justify-center text-white ml-1.5">
                  Markdown
                </div>
              </button>
              <button class="flex py-2 pr-7 px-3 hover:bg-[#353535] w-full duration-200" @click="createNote('txt')">
                <img src="./assets/material_symbols/notes.svg">
                <div class="flex flex-col justify-center text-white ml-1.5">
                  Plaintext
                </div>
              </button>
              <button class="flex py-2 pr-7 px-3 hover:bg-[#353535] w-full duration-200" @click="createNote('scrap')">
                <img src="./assets/material_symbols/contract.svg">
                <div class="flex flex-col justify-center text-white ml-1.5">
                  Scrap
                </div>
              </button>
              <button class="flex py-2 pr-7 px-3 hover:bg-[#353535] w-full duration-200" @click="createNote('todo')">
                <img src="./assets/material_symbols/check_box.svg">
                <div class="flex flex-col justify-center text-white ml-1.5">
                  Todo
                </div>
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <div class="overflow-y-scroll h-[calc(100vh-52px)] max-h-[calc(100vh-52px)]">
        <inNote 
          :type="i.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0]"
          :name="i.name.replace(/^.*[\\/]/, '').split('.').slice(0, -1).join('.')"
          :info="i.info.replace('\n', ' ')"
          v-for="i in files"
          @click="openFile(i.name)"
          :class="{'bg-[#353535]': currentFile === i.name}"
        />
      </div>
    </div>

    <!-- Main Pane -->
    <div class="bg-[#1f1f1f] flex-grow">
      <div class="bg-[#202020] h-[52px] w-full border-b border-[#424242] flex flex-col justify-center">
        <div class="mx-4">
          <button class="float-left hover-light">
            <img src="./assets/material_symbols/dock_to_right.svg" alt="Note menu" class="opacity-80">
          </button>

          <button class="float-right hover-light">
            <img src="./assets/material_symbols/more_horiz.svg" alt="Note menu" class="opacity-80 w-5 h-5 border-2 rounded-full">
          </button>

          <button class="float-right hover-light" @click="previewMd()" v-if="currentFile && currentFile.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'md' && !MdPreview">
            <img src="./assets/material_symbols/visibility.svg" alt="Preview" class="opacity-80 mr-3">
          </button>

          <button class="float-right hover-light" @click="exitPreview()" v-if="currentFile && currentFile.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'md' && MdPreview">
            <img src="./assets/material_symbols/visibility_off.svg" alt="Exit Preview" class="opacity-80 mr-3">
          </button>
        </div>
      </div>
      <div class="flex justify-center h-[calc(100%-52px)] overflow-hidden">
        <div class="w-full max-w-[45rem] mx-[2rem] mt-6 h-[calc(100%-24px)] border-none focus:outline-0 text-white">
          <inEditor v-if="currentFile" :path="currentFile" :text="currentFileData" :key="currentFile" @save="saveFile" @changeNoteTitle="changeNoteTitle" ref="editor" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import inTurorialBalloon from './components/inTutorialBalloon.vue';
import inFolder from './components/inFolder.vue'
import inNote from './components/inNote.vue'
import inEditor from './components/inEditor.vue'

export default {
  components: {
    inTurorialBalloon,
    inFolder,
    inNote,
    inEditor
  },
  data: () => {
    return {
      // Menu opens
      openSwitchNotebookMenu: false,
      openCreateNoteMenu: false,

      // Paths
      currentNotebook: "",
      currentFolder: "",
      currentFile: undefined,

      // Files
      notebooks: [],
      folders: [],
      files: [],

      // Data
      currentFileData: "",
      MdPreview: false
    }
  },
  mounted(){
    // Get current notebook
    window.api.getCurrentNotebook()
      .then(result => {
        this.currentNotebook = result;
        this.currentFolder = this.currentNotebook;
        this.getFolders();
        this.getFiles();
      })
    
    // Get Notebooks
    window.api.listNotebooks()
      .then(result => {
        this.notebooks = result;
      })
  },
  methods: {
    switchNotebook(i){
      this.currentNotebook = i
      this.currentFolder = this.currentNotebook
      this.openSwitchNotebookMenu = false

      // Reload files and folders
      this.getFolders()
      this.getFiles()

      // setCurrentNotebook
      window.api.setCurrentNotebook(this.currentNotebook)

      this.currentFile = undefined
    },
    switchFolder(i){
      this.currentFolder = i
      this.getFiles()
    },
    getFolders(){
      window.api.listFolders(this.currentNotebook)
        .then(result => {
          this.folders = result;
        })
    },
    getFiles(){
      window.api.listFiles(this.currentFolder)
        .then(result => {
          this.files = result;
        }).catch(error => {
          console.log(error)
        })
    },
    openFile(path){
      window.api.getFile(path)
        .then(result => {
          this.currentFileData = result
          this.currentFile = path
        }).catch(error => {
          console.log(error)
        })
    },
    saveFile(text){
      window.api.saveFile(this.currentFile, text)
        .then(result => {
          this.getFiles()
        })
        .catch(error => {
          console.log(error)
        })
    },
    previewMd(){
      this.MdPreview = true
      this.$refs.editor.previewMd()
    },
    exitPreview(){
      this.MdPreview = false
      this.$refs.editor.exitPreview()
    },
    createNote(extension){
      const path = `$untitled-${Math.random()
        .toString(36)
        .slice(-8)}.${extension}`;
      
      window.api.createNote(this.currentFolder + "\\" + path)
        .then(result => {
          this.getFiles()
          this.openFile(this.currentFolder + "\\" + path)
        })
        .catch(error => {
          console.log(error)
        })
      
        this.openCreateNoteMenu = false;
    },
    changeNoteTitle(notetitle) {
      document.activeElement.blur();

      window.api.changeNoteTitle(this.currentFile, notetitle + "." + this.currentFile.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0])
        .then((res) => {
          this.getFiles();
          this.openFile(res)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addNotebook() {
      window.api.addNotebook()
        .then(res => {
          this.openSwitchNotebookMenu = false

          if(res){
            window.api.listNotebooks()
              .then(result => {
                this.notebooks = result;
              })
            this.switchNotebook(res)
          }
        }).catch((error) => {
          console.log(error)
        })
    },
    removeNotebook() {
      window.api.removeNotebook(this.currentNotebook)
        .then(res => {
          this.openSwitchNotebookMenu = false

          window.api.listNotebooks()
            .then(result => {
              this.notebooks = result;
            })
          
          this.switchNotebook(this.notebooks[0])
        }).catch((error) => {
          console.log(error)
        })
    }
}}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .hover-light {
    @apply before:opacity-0 before:hover:opacity-100 before:absolute before:content-[''] before:bg-[#353535] before:p-4 before:rounded-full before:-ml-4 before:-mt-1 before:duration-200
  }
}

/* Scrollbar */
::-webkit-scrollbar{
   width: 8px;
}
::-webkit-scrollbar-track{
   background-color: transparent;
}
::-webkit-scrollbar-thumb{
   background-color: #515151;
}

/* Transition */
.slide-up-enter-active {
  transition: all 0.15s ease-out;
}

.slide-up-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

a {
  color: #84a4f0;
  text-decoration: underline;
}
</style>