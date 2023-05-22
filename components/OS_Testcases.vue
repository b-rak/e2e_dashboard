<template>
    <div class="bg-[#DFE4E7] mt-36 rounded-xl shadow-[0px_0px_4px_rgba(0,0,0,0.08)] pb-9 mx-[120px] w-auto">
        <div class="flex flex-row justify-between items-center px-6 pt-6 pb-3">
            <span class="font-lato not-italic font-medium text-[28px] leading-8">
                <font-awesome-icon :icon="{prefix: 'fas', iconName: 'desktop'}" class="text-[#222F34] h-[38px] w-[39px]"/>
                Web
            </span>
            <div class="bg-[#FCFCFC] rounded-xl text-center h-[37px] w-[136px] py-3 px-6 font-lato not-italic font-bold text-[18px] leading-[13px] text-[#222F34]">
                12 Cases
            </div>
        </div>
        <!--div class="py-0 px-6 mt-6 flex flex-row justify-center max-md:justify-start flex-wrap gap-x-[26px] gap-y-6"-->
        <!--div class="py-0 px-6 mt-6 grid gap-x-[26px] gap-y-6 w-auto justify-around" style="grid-template-columns: repeat(auto-fill, 386px);">   Grod Lösung: funktioniert, aber verteilt den freien Space gleichmäßig wobei die Elemente gleich groß bleiben -->
        <div class="py-0 px-6 mt-6 grid gap-x-[26px] gap-y-6 w-auto justify-center" style="grid-template-columns: repeat(auto-fill, minmax(386px, 1fr));">
            <Testcase-Kachel v-for="index in 10" :key="index" :id="index"/>
        </div>
    </div>
</template>