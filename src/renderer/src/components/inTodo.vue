<template>
  <div class="h-[calc(100%-50px)] flex flex-col">
    <div class="min-w-0 w-full bg-[#353535] h-6 rounded-full mb-3 border border-[#424242]" v-if="list.length !== 0">
      <div class="h-full bg-green-500 rounded-full text-right pr-3 font-bold duration-200" :style="`width: ${progress}%`">{{ progress }}%<span v-if="progress === 100">🎉</span></div>
    </div>

    <div>
      <div v-for="i in list" class="flex rounded-lg text- py-1">
        <div class="flex-grow text-white flex">
          <input
            type="checkbox"
            @change="save"
            v-model="i.checked"
            class="w-6 h-6"
          />
          <div class="ml-3 flex flex-grow flex-col justify-center text">
            {{ i.text }}
          </div>
          <button @click="remove(i.text)">
            <img src="../assets/material_symbols/delete.svg" class="w-5 h-5 opacity-70 hover:opacity-90 duration-200">
          </button>
        </div>
      </div>
    </div>
    <form
      @submit.prevent="addText"
      class="flex items-end bg-[#262626] mt-4 rounded-lg border border-[#3a3a3a]"
    >
      <input
        v-model="input"
        class="rounded-lg text-white flex-grow p-2 bg-transparent"
        style="outline: none !important; resize: none; caret-color: white"
        placeholder="Type here..."
      />
      <button
        type="submit"
        class="rounded-lg w-10 h-10 flex justify-center flex-col text-center bg-[#2F497D]"
      >
        <div class="flex justify-center w-full flex-row">
          <img src="../assets/material_symbols/add.svg">
        </div>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data: () => {
    return {
      list: [],
      input: "",
      progress: 0
    };
  },
  mounted() {
    if (this.text != "") {
      this.list = JSON.parse(this.text);
      this.calcProgress()
    }

    document.body.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        this.addText();
      }
    });
  },
  methods: {
    addText() {
      this.list.push({ checked: false, text: this.input });
      this.input = "";
      this.calcProgress()
      this.$emit("save", JSON.stringify(this.list));
    },
    save() {
      this.calcProgress()
      this.$emit("save", JSON.stringify(this.list));
    },
    calcProgress(){
      const checkedCount = this.list.filter(item => item.checked).length;
      const totalCount = this.list.length;
      this.progress = Math.round((checkedCount / totalCount) * 100);
    },
    remove(text) {
      this.list = this.list.filter((item) => item.text !== text);
      this.calcProgress()
      this.$emit("save", JSON.stringify(this.list));
    },
  },
};
</script>
