<template>
  <div>
    <Transition name="fade">
      <div class="absolute w-screen h-screen left-0 top-0 bg-black opacity-40" v-if="this.openPreferences"></div>
    </Transition>
    <Transition name="slide-up">
      <div class="absolute left-0 top-0 w-screen h-screen flex flex-col justify-center" v-if="this.openPreferences">
        <div class="flex justify-center">
          <div class="bg-sidebar2 w-[80vw] h-[80vh] border border-border rounded-xl px-5 py-4">
            <div class="flex justify-between">
              <div class="text-white text-2xl flex font-bold mb-2">
                {{ i18n.preferences.title }}
              </div>
              <button
                class="w-9 h-9 text-left text-white bg-dark-red rounded-lg"
                @click="close"
              >
                <div class="flex justify-center">
                  <div class="flex flex-col justify-center">
                    <img src="../assets/material_symbols/close.svg">
                  </div>
                </div>
              </button>
            </div>
            <div class="flex">
              <!--<div class="w-[24%] bg-red-500 mr-3">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>-->
              <div class="flex-grow text-white">
                <div class="mb-1">{{ i18n.preferences.theme }}</div>
                <select
                  v-model="theme"
                  @change='this.$emit("getPreferences");'
                  class="bg-header text-white rounded-lg px-3 py-2 min-w-32 border border-border"
                >
                  <option value="dark">Dark</option>
                  <option value="dracula">Dracula</option>
                  <option value="blueprint">Blueprint</option>
                </select>

                <div class="mt-4">{{ i18n.preferences.enable_hide_all }}</div>
                <div class="mb-1 opacity-80 text-sm w-[32rem]">{{ i18n.preferences.enable_hide_all_description }}</div>
                <select
                  v-model="hide_all"
                  @change='this.$emit("getPreferences");'
                  class="bg-header text-white rounded-lg px-3 py-2 min-w-32 border border-border"
                >
                  <option value="enabled">有効</option>
                  <option value="disabled">無効</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default{
  props: [
      "openPreferences",
      "i18n"
  ],
  emits: [
    "close",
    "getPreferences"
  ],
  data: () => {
    return {
      preferences: {},
      theme: "",
      hide_all: false
    }
  },
  mounted(){
    window.api.getPreferences()
      .then(result => {
        this.preferences = result
      }).catch(error => {
        console.error(error)
      })
    
      if (this.preferences.theme){
        this.theme = this.preferences.theme
      }

      if (this.preferences.hide_all){
        this.hide_all = this.preferences.hide_all
      }else{
        this.hide_all = "disabled"
      }
  },
  methods: {
    close(){
      this.preferences.theme = this.theme
      this.preferences.hide_all = this.hide_all

      window.api.setPreferences(JSON.stringify(this.preferences))
      .then(result => {
        this.$emit("close");
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>