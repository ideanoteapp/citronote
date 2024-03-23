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
                設定
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
                <div class="mb-1">テーマ</div>
                <select
                  v-model="theme"
                  @change='this.$emit("getPreferences");'
                  class="bg-header text-white rounded-lg px-3 py-2 min-w-32 border border-border"
                >
                  <option value="dark">Dark</option>
                  <option value="dracula">Dracula</option>
                  <option value="monokai-classic">Monokai Classic</option>
                  <option value="solarized-dark">Solarized Dark</option>
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
      "openPreferences"
  ],
  emits: [
    "close",
    "getPreferences"
  ],
  data: () => {
    return {
      preferences: {},
      theme: ""
    }
  },
  mounted(){
    window.api.getPreferences()
      .then(result => {
        this.preferences = result

        this.theme = result.theme
      }).catch(error => {
        console.error(error)
      })
    
      if (this.preferences.theme){
        this.theme = this.preferences.theme
      }
  },
  methods: {
    close(){
      this.preferences.theme = this.theme

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