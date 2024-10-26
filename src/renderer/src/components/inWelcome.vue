<template>
  <div class="fixed w-screen h-screen top-0 left-0 bg-header flex flex-col justify-center">
    <div class="flex justify-center">
      <div class="min-w-[20rem] max-w-[24rem] min-h-64 rounded-xl bg-sidebar2 border border-border text-center px-8 py-8 text-white animate-show">
        <img
          src="../assets/icon.png"
          class="inline mb-2.5 rounded-full"
          width="42"
          height="42"
        />
        
        <div v-if="slide === 0">

        <div class="text-2xl mb-2.5">
          {{ i18n.welcome.welcome }}
        </div>
        <div class="animate-button">
          <button class="bg-sidebar1 border border-border flex text-left rounded-xl w-full py-2.5 pl-2 pr-4" @click="createNotebook">
            <div class="text-4xl">
              ✨️
            </div>
            <div>
              <div class="text-lg">
                {{ i18n.welcome.create_notebook }}
              </div>
              <div class="text-sm">
                {{ i18n.welcome.create_notebook_description }}
              </div>
            </div>
          </button>

          <div class="text-sm my-3 opacity-80">
            {{ i18n.welcome.or }}
          </div>

          <button class="bg-sidebar1 border border-border flex text-left rounded-xl w-full py-2.5 pl-3 pr-4" @click="loadFolder">
            <div class="text-3xl">
              🔽
            </div>
            <div>
              <div class="text-md">
                {{ i18n.welcome.load_folder }}
              </div>
              <div class="text-xs">
                {{ i18n.welcome.load_folder_description }}
              </div>
            </div>
          </button>
        </div>

        </div>

        <div v-if="slide === 1">
        
        <div class="text-2xl mb-2.5">
          {{ i18n.welcome.create_notebook }}
        </div>
        <div class="text-sm mt-3 mb-1 opacity-80">{{ i18n.welcome.notebook_name }}</div>
        <input type="text" class="py-1.5 px-4 bg-sidebar1 rounded-lg text-center w-full" v-model="folderName">
        
        <div class="text-sm mt-3 mb-1 opacity-80">{{ i18n.welcome.location }}</div>
        <button type="text" class="py-1.5 px-4 bg-sidebar1 rounded-lg text-center w-full min-h-9 break-all" @click="selectLocation">
          <span v-if="location">{{ location }}</span>
          <span v-else>{{ i18n.welcome.select }}</span>
        </button>

        <button class="bg-primary w-full py-1.5 rounded-lg mt-8" @click="createNotebookFolder" v-if="location && folderName">{{ i18n.welcome.create }}</button>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { createElementBlock } from 'vue';

export default{
  props: [
      "i18n"
  ],
  data: () => {
    return {
      slide: 0,
      location: undefined,
      folderName: ""
    }
  },
  methods: {
    createNotebook(){
      this.slide = 1
    },
    selectLocation(){
      window.api.askFolder()
        .then(result => {
          this.location = result
        })
    },
    createNotebookFolder(){
      window.api.createNotebook(this.location + "/" + this.folderName)
        .then(result => {
          window.api.setCurrentNotebook(this.location + "/" + this.folderName)
            .then(result => {
              window.api.reloadNotebooks()
                .then(result => {
                  location.reload()
                }).catch(error => {
                  console.error(error)
                })
            }).catch(error => {
              console.error(error)
            })
        }).catch(error => {
          console.error(error)
        })
    },
    loadFolder(){
      window.api.addNotebook()
        .then(res => {
          location.reload()
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.animate-show{
  animation: show 2s forwards;
}

.animate-button{
  animation: button 3s forwards;
}

@keyframes show {
  0% {
    opacity: 0;
    display: none;
  }
  20% {
    transform: translateY(15px);
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes button {
  0% {
    opacity: 0;
    display: none;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>