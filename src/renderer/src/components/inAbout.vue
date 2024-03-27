<template>
  <div>
    <Transition name="fade">
      <div class="absolute w-screen h-screen left-0 top-0 bg-black opacity-40" v-if="this.openAboutPage"></div>
    </Transition>
    <Transition name="slide-up">
      <div class="absolute left-0 top-0 w-screen h-screen flex flex-col justify-center" v-if="this.openAboutPage">
        <div class="flex justify-center">
          <div class="bg-sidebar2 w-[20rem] min-h-[32vh] border border-border rounded-xl px-5 py-4">
            <div class="flex justify-end">
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
            <div class="text-center">
              <img src="../assets/icon.png" class="w-16 rounded-full inline">
              <div class="text-white text-2xl font-bold mt-2 mb-0.5">
                ideaNote
              </div>
              <div class="text-sm text-white opacity-80">
                {{ i18n.about.version }}{{version}}
              </div>
              <a href="https://github.com/ideanoteapp/ideanote-v2/">
                <div class="w-full bg-sidebar1 border-border border text-white py-2 rounded-lg mt-4">
                  {{ i18n.about.view_source_code }}
                </div>
              </a>
              <a href="https://wv5swdgqa69.typeform.com/to/ec8tXVs7">
                <div class="w-full bg-sidebar1 border-border border text-white py-2 rounded-lg mt-2">
                  {{ i18n.about.send_feedback }}
                </div>
              </a>
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
      "openAboutPage",
      "i18n"
  ],
  emits: [
    "close",
    "getPreferences"
  ],
  data: () => {
    return {
      version: ""
    }
  },
  mounted(){
    window.api.getVersion()
      .then(result => {
        this.version = result
      }).catch(error => {
        console.error(error)
      })
  },
  methods: {
    close(){
      this.$emit("close");
    }
  }
}
</script>