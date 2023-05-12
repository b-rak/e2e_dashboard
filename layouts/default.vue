<template>
    <div>
        <Navigation />
        <main>
            <!-- This is where the content of each page will go -->
            <slot />
        </main>
        <Footer/>
    </div>
</template>
        

<style scoped>
    main {
        margin-top: 80px;
        position: relative;
    }
</style>
