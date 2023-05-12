<template>
    <div class="p-3 bg-white flex flex-col justify-between items-end w-[386px] rounded-xl">
        <div class="flex flex-row w-full justify-between items-center h-8">
            <span class="font-lato not-italic font-bold text-lg leading-8">
                <font-awesome-icon :icon="{prefix: 'fas', iconName: 'desktop'}" class="text-[#222F34] h-[18px] w-[22px]"/>
                Testcase {{id}}
            </span>
            <div :class="{'bg-[#FF6246]': !result, 'bg-[#1BB298]': result}" class="rounded-lg text-center h-[24px] w-[57px] py-0 px-2 font-lato not-italic font-bold text-xs leading-6 text-[#FFFFFF]">
                {{result ? 'PASSED' : 'FAILED'}}
            </div>
        </div>
        <div class="text-center h-14 my-[21px] w-full">
            Chart JS
        </div>
        <div>
            <span class="font-lato not-italic font-normal text-sm leading-6 text-[#677076]">
                Details
                <font-awesome-icon :icon="{prefix: 'fas', iconName: 'chevron-right'}" class="text-[#677076] h-3 w-2"/>
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = withDefaults(defineProps<{
    id: Number,
    result?: Boolean
}>(), {
    result: () => Math.random() < 0.5
});
</script>
