<template>
    <div>
        <Navigation />
        <main>
            <!-- This is where the content of each page will go -->
            <slot />
        </main>
    </div>
</template>
        

<script setup>
import { onBeforeMount } from "vue";


    let ismobile;
onBeforeMount(() => {
    document.addEventListener("DOMContentLoaded", (event) => {
        const target = event.currentTarget
        if (target instanceof Document) {
            console.log("MOBILE?", target.defaultView.innerWidth < 1000)
            if(target.defaultView && target.defaultView.innerWidth < 1000) {
                ismobile = true
            } else {
                ismobile = false
            }
        }
    })
})
</script>

<style scoped>
    main {
        margin-top: 80px;
        z-index: -1;
        position: relative;
    }
</style>
