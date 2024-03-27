<template>
    <div class="absolute left-0 top-0 z-10 bg-black w-screen h-screen opacity-20"></div>

    <div class="absolute -ml-2 mt-10 bg-[#3250b9] rounded-xl w-44 border border-[#263c8c] px-3 py-2 text-white z-50
                before:content-[''] before:left-3 before:w-3.5 before:h-3.5 before:absolute before:rotate-45 before:bottom-full before:border-l before:border-t before:bg-[#3250b9] before:border-[#263c8c] before:-top-[7px]">
        <div>{{ text }}</div>
        <button class="border border-white rounded-xl px-3 py-0.5 mt-1">わかった</button>
    </div>
</template>

<script>
export default {
    props: [
        "text"
    ]
}
</script>