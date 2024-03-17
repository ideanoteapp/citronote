<template>
    <button class="flex mb-2 px-2.5 py-2 w-full rounded-xl hover:bg-[#353535] duration-200" :class="{'bg-[#353535]': is_current_folder}">
        <img src="../assets/material_symbols/pen_size_2.svg" class="opacity-80" v-if="type === 'root'">
        <img src="../assets/material_symbols/folder.svg" class="opacity-80" v-if="type === 'folder'">
        <div class="text-[#ffffffdd] ml-1.5">
            {{ name }}
        </div>
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