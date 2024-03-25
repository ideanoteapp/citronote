<template>
  <div :class="{'theme-dracula': preferences.theme === 'dracula', 'theme-blueprint': preferences.theme === 'blueprint'}">
  <div class="flex h-screen">

    <!-- Sidebar 1 -->
    <div class="max-w-[100vw] h-screen min-w-[180px] lg:min-w-[200px] w-[180px] bg-sidebar1 border-r border-border select-none" v-if="!hideSidebar">
      <div class="bg-header h-[52px] w-full border-b border-border flex">
        <button class="min-w-[51px] w-[51px] h-[51px] border-r border-border  duration-200 hover:bg-hover2" @click="openMenu = true">
          <div class="flex flex-col justify-center">
            <div class="flex justify-center">
              <img src="./assets/icon.png" alt="Menu" class="h-7 rounded-full">
            </div>
          </div>
        </button>

        <Transition name="fade">
            <div class="absolute w-screen h-screen left-0 top-0 bg-black opacity-40 z-20" v-if="this.openMenu" @click="this.openMenu = false"></div>
        </Transition>
        <Transition name="slide-up">
            <div class="absolute py-1.5 left-2.5 bg-sidebar1 z-50 w-48 rounded-lg top-10 shadow-md border border-border" v-if="this.openMenu">
              <div>
                <button class="flex py-2 px-3 hover:bg-hover w-full duration-200" @click="openPreferences = true; openMenu = false;">
                  <img src="./assets/material_symbols/settings.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ i18n.preferences.title }}
                  </div>
                </button>
              </div>
            </div>
        </Transition>

        <button class="flex flex-col justify-center px-3 text-white w-full duration-200 hover:bg-hover2" @click="this.openSwitchNotebookMenu = true">
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
            <div class="absolute py-1.5 left-14 bg-sidebar1 z-50 w-48 rounded-lg top-10 shadow-md border border-border" v-if="this.openSwitchNotebookMenu">
              <div>
                <div class="flex py-2 px-3 w-full">
                  <img src="./assets/material_symbols/book_2.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ currentNotebook.replace(/^.*[\\/]/, "") }}
                  </div>
                </div>
              </div>

              <div>
                <button class="flex py-2 px-3 hover:bg-hover w-full duration-200" @click="removeNotebook()">
                  <img src="./assets/material_symbols/delete_red.svg" class="h-5">
                  <div class="text-sm flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ i18n.notebook_menu.delete_notebook }}
                  </div>
                </button>
              </div>

              <div class="my-1 border-b border-border"></div>

              <div v-for="i in notebooks">
                <button class="flex py-2 px-3 hover:bg-hover w-full duration-200" v-if="i != currentNotebook" @click="switchNotebook(i)">
                  <img src="./assets/material_symbols/book_2.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ i.replace(/^.*[\\/]/, "") }}
                  </div>
                </button>
              </div>

              <div>
                <button class="flex py-2 px-3 hover:bg-hover w-full duration-200" @click="addNotebook()">
                  <img src="./assets/material_symbols/add.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ i18n.notebook_menu.add_notebook }}
                  </div>
                </button>
              </div>
            </div>
          </Transition>
      </div>

      <div class="flex flex-col h-[calc(100vh-52px)]">
        <div class="px-2.5 my-3 overflow-y-scroll flex-grow max-h-[calc(100vh-64px)]">
          <inFolder type="root" :name="i18n.root" :is_current_folder="currentFolder === currentNotebook" @click="switchFolder(currentNotebook)" />
          <inFolder v-for="i in folders" type="folder" :name="i.replace(/^.*[\\/]/, '')" @click="switchFolder(i)" :is_current_folder="currentFolder === i" @delete="deleteFolder(i)" />
          <button class="flex mb-2 px-2.5 pt-1 w-full rounded-xl opacity-90 hover:opacity-100 duration-200" @click="openCreateFolderForm = true; this.createFolderName = '';">
            <img src="./assets/material_symbols/add.svg" class="opacity-80 w-5 h-5">
            <div class="text-[#ffffffdd] ml-1.5 text-left break-all text-sm">
              {{ i18n.new_folder }}
            </div>
          </button>

          <Transition name="fade">
            <div class="absolute w-screen h-screen left-0 top-0 bg-black opacity-40 z-20" v-if="this.openCreateFolderForm" @click="this.openCreateFolderForm = false"></div>
          </Transition>
          <Transition name="slide-up">
            <div class="absolute bg-sidebar1 z-50 w-[13rem] rounded-lg shadow-md border border-border px-4 py-3" v-if="this.openCreateFolderForm">
              <div class="text-white text-sm">{{ i18n.create_folder.name }}</div>
              <input type="text" class="w-full rounded-lg mt-1 px-3 py-1.5 bg-header border border-border text-white" v-model="createFolderName">
              <button class="py-1.5 px-3 bg-primary rounded-lg text-white mt-2 w-full text-center" @click="newFolder">{{ i18n.create_folder.create }}</button>
            </div>
          </Transition>
        </div>
        <a href="https://wv5swdgqa69.typeform.com/to/ec8tXVs7">
          <div class="border-t border-t-border flex py-2.5 px-2.5 hover:bg-hover2 duration-200">
            <img src="./assets/material_symbols/mail.svg">
            <div class="text-white ml-1.5 no-underline">
              {{ i18n.send_feedback }}
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- Sidebar 2 -->
    <div class="bg-sidebar2 border-r border-border min-w-[286px] w-[286px] select-none" v-if="!hideSidebar" ref="sidebar2">
      <div class="bg-header h-[52px] w-full border-b border-border flex flex-col justify-center">
        <div class="flex justify-end mx-3">
          <button class="mx-1.5 hover-light" @click="createNote('scrap')">
            <img src="./assets/material_symbols/contract_white.svg" alt="Scrap" class="opacity-80">
          </button>

          <button class="mx-1.5 hover-light" @click="createNote('md')">
            <img src="./assets/material_symbols/markdown_white.svg" alt="Markdown" class="opacity-80">
          </button>

          <button class="mx-1.5 hover-light" @click="openCreateNoteMenu = true">
            <img src="./assets/material_symbols/edit_square.svg" alt="Markdown" class="opacity-80">
          </button>
          <Transition name="fade">
            <div class="absolute w-screen h-screen left-0 top-0 bg-black opacity-30 z-20" v-if="this.openCreateNoteMenu" @click="this.openCreateNoteMenu = false"></div>
          </Transition>
          <Transition name="slide-up">
            <div class="absolute py-1.5 mt-8 bg-sidebar1 z-50 rounded-lg shadow-md border border-border" v-if="this.openCreateNoteMenu">
              <button class="flex py-2 pr-7 px-3 hover:bg-hover w-full duration-200" @click="createNote('md')">
                <img src="./assets/material_symbols/markdown.svg">
                <div class="flex flex-col justify-center text-white ml-1.5">
                  Markdown
                </div>
              </button>
              <button class="flex py-2 pr-7 px-3 hover:bg-hover w-full duration-200" @click="createNote('txt')">
                <img src="./assets/material_symbols/notes.svg">
                <div class="flex flex-col justify-center text-white ml-1.5">
                  Plaintext
                </div>
              </button>
              <button class="flex py-2 pr-7 px-3 hover:bg-hover w-full duration-200" @click="createNote('scrap')">
                <img src="./assets/material_symbols/contract.svg">
                <div class="flex flex-col justify-center text-white ml-1.5">
                  Scrap
                </div>
              </button>
              <button class="flex py-2 pr-7 px-3 hover:bg-hover w-full duration-200" @click="createNote('todo')">
                <img src="./assets/material_symbols/check_box.svg">
                <div class="flex flex-col justify-center text-white ml-1.5">
                  Todo
                </div>
              </button>
              <button class="flex py-2 pr-7 px-3 hover:bg-hover w-full duration-200" @click="upload()">
                <img src="./assets/material_symbols/upload.svg">
                <div class="flex flex-col justify-center text-white ml-1.5">
                  Upload
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
          :class="{'bg-hover': currentFile === i.name}"
        />
      </div>
    </div>

    <!-- Main Pane -->
    <div class="bg-main-pane flex-grow">
      <div class="bg-header h-[52px] w-full border-b border-border flex flex-col justify-center select-none">
        <div class="mx-4">
          <button class="float-left hover-light" @click="hideSidebar = !hideSidebar">
            <img src="./assets/material_symbols/dock_to_right.svg" alt="Note menu" class="opacity-80">
          </button>

          <button class="float-right hover-light" @click="openNoteMenu = true">
            <img src="./assets/material_symbols/more_horiz.svg" alt="Note menu" class="opacity-80 w-5 h-5 border-2 rounded-full">
          </button>

          <Transition name="fade">
            <div class="absolute w-screen h-screen left-0 top-0 bg-black opacity-40 z-20" v-if="this.openNoteMenu" @click="this.openNoteMenu = false"></div>
          </Transition>
          <Transition name="slide-up">
            <div class="absolute py-1.5 right-3.5 bg-sidebar1 z-50 min-w-48 rounded-lg top-10 shadow-md border border-border" v-if="this.openNoteMenu">
              <div v-if="currentFile.replace(/^.*[\\/]/, '').includes('#pin')">
                <button class="flex py-2 px-3 hover:bg-hover w-full duration-200" @click="unpin()">
                  <img src="./assets/material_symbols/keep_off.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ i18n.note_menu.unpin }}
                  </div>
                </button>
              </div>
              <div v-else>
                <button class="flex py-2 px-3 hover:bg-hover w-full duration-200" @click="pin()">
                  <img src="./assets/material_symbols/keep.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ i18n.note_menu.pin }}
                  </div>
                </button>
              </div>
              <div>
                <button class="flex py-2 px-3 hover:bg-hover w-full duration-200" @click="copyEmbedCode()" v-if="
                    currentFile.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'png' ||
                    currentFile.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'jpg' ||
                    currentFile.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'jpeg' ||
                    currentFile.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'webp' ||
                    currentFile.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] === 'gif'">
                  <img src="./assets/material_symbols/code.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ i18n.note_menu.copy_embed_code }}
                  </div>
                </button>
              </div>
              <div>
                <button class="flex py-2 px-3 hover:bg-hover w-full duration-200" @click="deleteNote()">
                  <img src="./assets/material_symbols/delete_red.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5 text-left">
                    {{ i18n.note_menu.delete_note }}
                  </div>
                </button>
              </div>
            </div>
          </Transition>

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
          <inEditor v-if="currentFile" :path="currentFile" :text="currentFileData" :key="currentFile" @save="saveFile" @changeNoteTitle="changeNoteTitle" ref="editor" :i18n="i18n" />
        </div>
      </div>
    </div>

  </div>

  <inPreferences :openPreferences="openPreferences" @close="this.getPreferences(); openPreferences = false" @getPreferences="this.getPreferences();" />
  </div>
</template>

<script>
import inTurorialBalloon from './components/inTutorialBalloon.vue';
import inFolder from './components/inFolder.vue'
import inNote from './components/inNote.vue'
import inEditor from './components/inEditor.vue'
import inPreferences from './components/inPreferences.vue'

export default {
  components: {
    inTurorialBalloon,
    inFolder,
    inNote,
    inEditor,
    inPreferences
  },
  data: () => {
    return {
      // Locale
      i18n: {},

      // Menu opens
      openSwitchNotebookMenu: false,
      openCreateNoteMenu: false,
      openNoteMenu: false,
      openMenu: false,
      openPreferences: false,
      openCreateFolderForm: false,

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
      MdPreview: false,
      hideSidebar: false,
      preferences: {},

      // Form Data
      createFolderName: ""
    }
  },
  mounted(){
    // Get Preferences
    this.getPreferences()
    
    // Get locales
    window.api.getLocales()
      .then(result => {
        this.i18n = result;
      }).catch(error => {
        console.error(error)
      })

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
    
    // Set ContextMenu
    window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      window.api.rightClick()
    }, false);

    // Drag and drop
    this.$refs.sidebar2.addEventListener('drop', (event) => {
      event.preventDefault();
      event.stopPropagation();
 
      for (const f of event.dataTransfer.files) {
        window.api.upload(this.currentFolder, f.path)
          .then(result => {
            this.getFiles();
            this.openCreateNoteMenu = false;
          }).catch(error => {
            console.error(error)
          })
      }
    });
 
    this.$refs.sidebar2.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
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
    },
    deleteNote() {
      this.openNoteMenu = false
      
      window.api.deleteNote(this.currentFile)
        .then(res => {
          this.getFiles()
          this.currentFile = undefined
        }).catch((error) => {
          console.log(error)
        })
    },
    getPreferences(){
      window.api.getPreferences()
      .then(result => {
        this.preferences = result
      }).catch(error => {
        console.error(error)
      })
    },
    upload(){
      window.api.upload(this.currentFolder)
        .then(result => {
          this.getFiles();
          this.openCreateNoteMenu = false;
        }).catch(error => {
          console.error(error)
        })
    },
    copyEmbedCode(){
      navigator.clipboard.writeText(`![](${"media:///" + this.currentFile.replace(/ /g, "%20").replace(/\\/g, "/")})`);
      this.openNoteMenu = false;
    },
    newFolder(){
      this.openCreateFolderForm = false;
      window.api.newFolder(this.currentNotebook + "/" + this.createFolderName)
        .then(result => {
          this.getFolders()
        }).catch(error => {
          console.error(error)
        })
    },
    pin(){
      this.openNoteMenu = false;
      this.$refs.editor.pin()
    },
    unpin(){
      this.openNoteMenu = false;
      this.$refs.editor.unpin()
    },
    deleteFolder(i){
      window.api.deleteFolder(i)
        .then(result => {
          this.getFolders()
        }).catch(error => {
          console.error(error)
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
    @apply before:opacity-0 before:hover:opacity-100 before:absolute before:content-[''] before:bg-hover before:p-4 before:rounded-full before:-ml-4 before:-mt-1 before:duration-200
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
   background-color: var(--color-scrollbar);
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
  color: var(--color-link);
}

/* Theme */
:root {
  --color-primary: #3250b9;
  --color-red: #b93232;
  --color-border: #424242;
  --color-header: #212121;
  --color-sidebar1: #262626;
  --color-sidebar2: #2e2e2e;
  --color-main-pane: #1f1f1f;
  --color-hover: #353535;
  --color-hover2: #2d2d2d;
  --color-white: #ffffff;

  --color-link: #84a4f0;
  --color-scrollbar: #515151;
}

.theme-dracula {
  --color-primary: #6272A4;
  --color-red: #FF5555;
  --color-border: #44475A;
  --color-header: #282A36;
  --color-sidebar1: #282A36;
  --color-sidebar2: #282A36;
  --color-main-pane: #282A36;
  --color-hover: #44475A;
  --color-hover2: #44475A;
  --color-white: #F8F8F2;

  --color-link: #84a4f0;
  --color-scrollbar: #44475A;
}

.theme-monokai-classic {
  --color-primary: #cec469;
  --color-red: #cec469;
  --color-border: #161613;
  --color-header: #161613;
  --color-sidebar1: #161613;
  --color-sidebar2: #1d1e19;
  --color-main-pane: #272822;
  --color-hover: #32332c;
  --color-hover2: #32332c;
  --color-white: #fdffe4;

  --color-link: #66d9ef;
  --color-scrollbar: #474841;
}

.theme-solarized-dark {
  --color-primary: #007acc;
  --color-red: #cb4b16;
  --color-border: #00212b;
  --color-header: #0e2931;
  --color-sidebar1: #003847;
  --color-sidebar2: #00212b;
  --color-main-pane: #002b36;
  --color-hover: #003440;
  --color-hover2: #003440;
  --color-white: #cdcdc3;

  --color-link: #268bb7;
  --color-scrollbar: #304a50;
}

.theme-blueprint {
  --color-primary: #ffb608;
  --color-red: #ffb608;
  --color-border: #505b73;
  --color-header: #1a2234;
  --color-sidebar1: #293449;
  --color-sidebar2: #2e3a50;
  --color-main-pane: #364259;
  --color-hover: #434e62;
  --color-hover2: #434e62;
  --color-white: #ffffff;

  --color-link: #ffb608;
  --color-scrollbar: #c8c9cc;
}
</style>