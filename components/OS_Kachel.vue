<template>
    <div id="os-1" class="w-[355px] h-[151px] bg-white rounded-2xl shadow-[2px_-2px_8px_rgba(0,0,0,0.08),-2px_2px_4px_rgba(0,0,0,0.08)] my-auto flex flex-col gap-3">
        <div class="flex flex-row justify-between items-center mx-4 my-2">
            <span class="font-lato not-italic font-bold text-lg leading-8">
                <font-awesome-icon :icon="{prefix: 'fas', iconName: 'desktop'}" class="text-[#222F34] h-[18px] w-[22px]"/>
                {{os_name}}
            </span>
            <div class="bg-[#DFE4E7] rounded-lg text-center h-7 w-[101px] p-[2px] font-lato not-italic font-bold text-sm leading-6">
                {{numberOfCases > 1 ? numberOfCases + ' Cases' : '1 Case'}}
            </div>
        </div>
        <div class="h-3/5 flex flex-row justify-between items-center mx-4">
            <div class="h-full w-[165px] bg-slate-200 text-center flex flex-row justify-center items-center">Chart JS</div>

            <div class="h-14 w-[104px] flex flex-col justify-center items-center">
                <div class="flex flex-row justify-center items-center gap-2">
                    <font-awesome-icon :icon="{prefix: 'fas', iconName: 'arrow-up'}" class="text-[#1BB398] h-[15px] w-[11px] "/>
                    <span class="font-lato not-italic font-bold text-4xl leading-[32px] text-[#222F34]">30%</span>
                </div>
                <span class="font-lato not-italic font-normal text-sm leading-6 text-[#222F34]">Success Rate</span>
            </div>
        </div>
    </div>
</template>

<!-- params
line 2: id-number 
line 5: iconName and classes?
line 6: OS Name 
line 9: #cases -> line 2-9: depends on OS config; set only once and update if config gets updated
line 13: chart -> depends on success rate
line 17: iconName and classes? -> depends on success rate
line 18: pass percentage  -> api request
-->

<script lang="ts" setup>
defineProps({
    id: Number,
    iconName: String,
    os_name: String,
    numberOfCases: Number
})


</script>
