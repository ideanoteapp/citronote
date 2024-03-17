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
        <div class="flex flex-col justify-center px-3 text-white w-full duration-200 hover:bg-[#2d2d2d]">
          <div class="flex w-full">
            <div class="flex-grow">
              Main
            </div>
            <div class="flex flex-col justify-center">
              <img src="./assets/material_symbols/arrow_drop_down.svg">
            </div>
          </div>
        </div>
      </div>

      <div class="mx-3 my-3">
        <inFolder type="root" name="ルート" is_current_folder="true" />
        <inFolder type="folder" name="新しいフォルダ" />
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
</style>