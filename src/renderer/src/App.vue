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
              <div v-for="i in notebooks">
                <button class="flex py-2 px-3 hover:bg-[#353535] w-full duration-200" v-if="i != currentNotebook" @click="switchNotebook(i)">
                  <img src="./assets/material_symbols/book_2.svg">
                  <div class="flex flex-col justify-center text-white ml-1.5">
                    {{ i.replace(/^.*[\\/]/, "") }}
                  </div>
                </button>
              </div>
            </div>
          </Transition>
      </div>

      <div class="mx-3 my-3">
        <inFolder type="root" name="ルート" :is_current_folder="currentFolder === currentNotebook" @click="currentFolder = currentNotebook" />
        <inFolder v-for="i in folders" type="folder" :name="i.replace(/^.*[\\/]/, '')" @click="currentFolder = i" :is_current_folder="currentFolder === i" />
      </div>

    </div>

    <!-- Sidebar 2 -->
    <div class="bg-[#2e2e2e] border-r border-[#424242] w-[286px]">
      <div class="bg-[#212121] h-[52px] w-full border-b border-[#424242] flex flex-col justify-center">
        <div class="flex justify-end mx-3">
          <button class="mx-1.5 hover-light">
            <img src="./assets/material_symbols/contract_white.svg" alt="Markdown" class="opacity-80">
          </button>

          <button class="mx-1.5 hover-light">
            <img src="./assets/material_symbols/markdown_white.svg" alt="Markdown" class="opacity-80">
          </button>

          <button class="mx-1.5 hover-light">
            <img src="./assets/material_symbols/edit_square.svg" alt="Markdown" class="opacity-80">
          </button>
        </div>
      </div>

      <div>
        <inNote type="scrap" name="ノート1" />
        <inNote type="scrap" name="ノート2" />
        <inNote type="scrap" name="ノート3" />
      </div>
    </div>

    <!-- Main Pane -->
    <div class="bg-[#1f1f1f] flex-grow">
      <div class="bg-[#202020] h-[52px] w-full border-b border-[#424242] flex flex-col justify-center">
        <div class="mx-4">
          <button class="float-left">
            <img src="./assets/material_symbols/dock_to_right.svg" alt="Note menu" class="opacity-80">
          </button>

          <button class="float-right">
            <img src="./assets/material_symbols/more_horiz.svg" alt="Note menu" class="opacity-80 w-5 h-5 border-2 rounded-full">
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import inTurorialBalloon from './components/inTutorialBalloon.vue';
import inFolder from './components/inFolder.vue'
import inNote from './components/inNote.vue'

export default {
  components: {
    inTurorialBalloon,
    inFolder,
    inNote
  },
  data: () => {
    return {
      // Menu opens
      openSwitchNotebookMenu: false,

      // Paths
      currentNotebook: "",
      currentFolder: "",

      // Data
      notebooks: [],
      folders: []
    }
  },
  mounted(){
    // Get current notebook
    window.api.getCurrentNotebook()
      .then(result => {
        this.currentNotebook = result;
        this.currentFolder = this.currentNotebook;
        this.getFolders()
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
    },
    getFolders(){
      window.api.listFolders(this.currentNotebook)
        .then(result => {
          this.folders = result;
        })
    }
  }
}
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
</style>