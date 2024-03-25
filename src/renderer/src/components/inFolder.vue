<template>
    <button class="flex mb-2 px-2.5 py-2 w-full rounded-xl hover:bg-hover duration-200" :class="{'bg-hover': is_current_folder}">
        <img src="../assets/material_symbols/pen_size_2.svg" class="opacity-80" v-if="type === 'root'">
        <img src="../assets/material_symbols/folder.svg" class="opacity-80" v-if="type === 'folder'">
        <div class="text-[#ffffffdd] ml-1.5 text-left break-all flex-grow">
            {{ name }}
        </div>
        <button v-if="is_current_folder && type === 'folder'" class="group" @click="this.$emit('delete')">
            <img src="../assets/material_symbols/delete.svg" class="group-hover:hidden w-4 h-4 opacity-60 mt-1">
            <img src="../assets/material_symbols/delete_red.svg" class="hidden group-hover:block w-4 h-4 opacity-60 mt-1">
        </button>
    </button>
</template>

<script>
export default {
    props: [
        "type", // 'root' or 'folder'
        "name",
        "is_current_folder"
    ]
}
</script>