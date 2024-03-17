<template>
  <button class="flex py-3 px-3.5 border-b w-full border-b-[#424242]">
    <img src="../assets/material_symbols/contract.svg" alt="Scrap: " v-if="type === 'scrap'">
    <div class="text-white ml-2.5 text-[1.035rem]">
      {{ name }}
    </div>
  </button>
</template>

<script>
export default {
  props: [
      "type",
      "name"
  ]
}
</script>