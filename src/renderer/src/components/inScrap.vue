<template>
  <div class="flex flex-col h-[calc(100%-50px)]">
    <div class="flex-grow overflow-y-scroll" ref="list">
      <VueDraggable ref="el" v-model="list" handle="#handle" @end="save()">
        <div class="bg-[#262626] border border-[#424242] rounded-lg px-4 py-2 w-full justify-between mb-2.5 duration-200" :class="{'bg-[#26334b]': index == editing}" v-for="i, index in list" :key="i">
          <div class="mt-0.5 float-right">
            <div class="flex">
              <button @click="startEdit(index)" class="opacity-70 hover:opacity-90 duration-200 w-5 h-5">
                <img src="../assets/material_symbols/edit.svg" alt="Edit" class="mr-0.5 min-w-5 w-5 h-5">
              </button>
              <button @click="remove(i)" class="opacity-70 hover:opacity-90 duration-200 w-5 h-5">
                <img src="../assets/material_symbols/delete.svg" alt="Delete" class="min-w-5 w-5 h-5">
              </button>
            </div>
          </div>
      
          <div>
            <div class="flex">
              <img src="../assets/material_symbols/list.svg" class="select-none opacity-70 mb-px -mr-0.5 w-[1rem] -translate-x-1.5" id="handle">
              <div class="text-xs opacity-70 mb-px">{{ i.date }}</div>
            </div>
            <div class="break-all whitespace-pre-line" v-html="parseURL(i.text)"></div>
          </div>
        </div>
      </VueDraggable>
    </div>

    <div class="my-4">
      <form
      @submit.prevent="addText"
      class="flex items-end bg-[#262626] rounded-lg border border-[#3a3a3a]"
    >
      <textarea
        v-model="input"
        class="rounded-lg text-white px-4 py-2 flex-grow bg-transparent"
        style="outline: none !important; resize: none; caret-color: white"
        rows="4"
        placeholder="Type something..."
        @keydown.enter="keydown"
      ></textarea>
      <button
        type="submit"
        class="mx-3 mb-3 rounded-lg w-10 h-10 flex justify-center flex-col text-center bg-[#2F497D]"
      >
        <div class="flex justify-center w-full flex-row">
          <img src="../assets/material_symbols/edit.svg" alt="Edit" v-if="ifEditing">
          <img src="../assets/material_symbols/add.svg" alt="Add" v-else>
        </div>
      </button>
    </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

export default {
    props: [
        "data"
    ],
    components: {
      VueDraggable,
    },
    data: () => {
      return {
        list: [],
        input: "",
        toReplace: "",
        editing: -1,
        ifEditing: false
      }
    },
    emits: ['save'],
    mounted(){
      if (this.data !== "") {
        this.list = JSON.parse(this.data);
      }

      setTimeout(() => {
        this.$refs.list.scrollBy(0, 9999999999);
      }, 0);
    },
    methods: {
      toHtmlEntities(text) {
        return text.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
          return '&#'+i.charCodeAt(0)+';';
        });
      },
      addText() {
        var d = new Date();
        if (this.ifEditing) {
          this.list.splice(this.editing, 1, {
            text: this.input,
            date: this.list[this.editing].date,
          });
          this.input = "";
          this.$emit("save", JSON.stringify(this.list));
          this.ifEditing = false;
          this.editing = -1;
        } else {
          this.list.push({
            text: this.input,
            date: `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`,
          });
          this.input = "";
          this.$emit("save", JSON.stringify(this.list));

          setTimeout(() => {
            this.$refs.list.scrollBy(0, 9999999999);
          }, 0);
        }
      },
      parseURL(string) {
        string = this.toHtmlEntities(string)
        return string.replace(
          /\bhttps?:\/\/\S+/gi,
          (match) => `<a href="${match}">${match}</a>`,
        );
      },
      remove(text) {
        this.list = this.list.filter((item) => item !== text);
        this.$emit("save", JSON.stringify(this.list));
      },
      startEdit(index = 0) {
        this.editing = index;
        this.ifEditing = true;
        this.input = this.list[index].text;
      },
      keydown(e) {
        if (e.ctrlKey) {
          this.addText();
        }
      },
      save(event){
        this.$emit("save", JSON.stringify(this.list));
      }
    }
}
</script>

<style>
.sortable-ghost{
  background-color: #26334b !important;
}
</style>