<template>
    <div class="w-screen h-screen pt-8">
        <!-- Übersicht oben -->
        <div id="overview" class="bg-[#DFE4E7] h-[232px] w-auto mx-[120px] rounded-[20px] shadow-[0px_0px_4px_#C2CED6] flex flex-col items-center py-9">

            <!-- Top Row -->
            <div id="top-row" class="flex flex-row justify-between items-start p-0 w-full px-6">
                <div id="customer" class="w-[341px] h-24 flex flex-row items-center gap-6 p-0">
                    <img src="~/assets/images/icon.png" alt="Kundenlogo" id="Kundenlogo">
                    <div class="flex flex-col items-start w-[235px] h-24">
                        <p class="not-italic font-semibold text-5xl leading-[64px] font-lora">Testfälle</p>
                        <p class="not-italic font-medium text-lg leading-8 font-lato text-[#3A4F57]">Appmatics</p>
                    </div>
                </div>
                <div id="filter-export" class="h-14 w-auto flex flex-row gap-8">
                    <ClientOnly>
                    <div class=" pl-2 h-14 flex flex-row items-center bg-white border rounded-2xl border-solid border-[#EEF1F2] shadow-[0px_0px_4px_rgba(0,0,0,0.08)]">
                        <font-awesome-icon :icon="{prefix: 'fas', iconName: 'calendar-day'}" class="fa-flip-horizontal text-[#4A6570] w-[18px] h-5"/>
                        <input type="text" name="daterange" class="h-[18px] w-[200px] text-center text-base leading-[18px]"/>
                    </div>
                        <button id="export" class="flex flex-row items-center h-[54px] py-2 px-4 gap-2 rounded-2xl bg-[#516F7B] font-roboto not-italic font-semibold text-base leading-[18px] text-center text-white">
                            <font-awesome-icon :icon="{prefix: 'fas', iconName: 'arrow-up-right-from-square'}" class="text-white w-4 h-4"/>
                            Export CSV
                        </button>
                    </ClientOnly>
                </div>
            </div>
            <!-- Bottom Row -->
            <div id="bottom-row" class="flex flex-row justify-center gap-x-[33px] items-start w-full mt-6 px-[138px]">
                <!-- KACHEL ALL OS -->
                <div id="os-all" class="grow max-w-[400px] bg-[#222F34] rounded-2xl text-white flex flex-col flex-shrink items-center p-0 gap-3 justify-start">
                    <div class="flex flex-row gap-2 p-0 items-center my-2">
                        <font-awesome-icon :icon="{prefix: 'fas', iconName: 'shrimp'}" class="text-white fa-xl"/>
                        <span class="font-lato not-italic font-bold text-lg leading-[32px] text-white">Gesamt</span>
                    </div>
                    <div class="h-[108px] w-60 flex flex-col justify-center items-center">
                        <div class="flex flex-row justify-center items-center gap-2">
                            <font-awesome-icon :icon="{prefix: 'fas', iconName: 'arrow-up'}" class="text-[#1BB398] h-[15px] w-[11px]"/>
                            <span class="font-lato not-italic font-bold text-4xl leading-[32px] text-white">80%</span>
                        </div>
                        <span class="font-lato not-italic font-normal text-sm leading-6 text-white">Success Rate</span>
                    </div>
                </div>

                <!--OS-Kachel v-bind="config"/-->
                <!-- EINZELNE OS KACHELN -> Vue Component?? -->
                <div id="os-1" class="grow max-w-[400px] bg-white rounded-2xl shadow-[2px_-2px_8px_rgba(0,0,0,0.08),-2px_2px_4px_rgba(0,0,0,0.08)] my-auto flex flex-col flex-shrink gap-3">
                    <div class="flex flex-row justify-between items-center mx-4 my-2">
                        <span class="font-lato not-italic font-bold text-lg leading-8">
                            <font-awesome-icon :icon="{prefix: 'fas', iconName: 'desktop'}" class="text-[#222F34] h-[18px] w-[22px]"/>
                            Web
                        </span>
                        <div class="bg-[#DFE4E7] rounded-lg text-center h-7 w-[101px] p-[2px] font-lato not-italic font-bold text-sm leading-6">
                            4 Cases 
                        </div>
                    </div>
                    <div class="h-[91px] flex flex-row justify-between items-center mx-4">
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

                <!-- Kachel 2 -->
                <div id="os-2" class="grow max-w-[400px] bg-white rounded-2xl shadow-[2px_-2px_8px_rgba(0,0,0,0.08),-2px_2px_4px_rgba(0,0,0,0.08)] my-auto flex flex-col gap-3">
                    <div class="flex flex-row justify-between items-center mx-4 my-2">
                        <span class="font-lato not-italic font-bold text-lg leading-8">
                            <font-awesome-icon :icon="{prefix: 'fab', iconName: 'apple'}" class="text-[#053240] h-[19px] w-[16px]"/>
                            iOS
                        </span>
                        <div class="bg-[#DFE4E7] rounded-lg text-center h-7 w-[101px] p-[2px] font-lato not-italic font-bold text-sm leading-6">
                            4 Cases 
                        </div>
                    </div>
                    <div class="h-[91px] flex flex-row justify-between items-center mx-4">
                        <div class="h-full w-[165px] bg-slate-200 text-center flex flex-row justify-center items-center">Chart JS</div>

                        <div class="h-14 w-[104px] flex flex-col justify-center items-center">
                            <div class="flex flex-row justify-center items-center gap-2">
                                <font-awesome-icon :icon="{prefix: 'fas', iconName: 'arrow-down'}" class="text-[#FF6246] h-[15px] w-[11px] "/>
                                <span class="font-lato not-italic font-bold text-4xl leading-[32px] text-[#222F34]">30%</span>
                            </div>
                            <span class="font-lato not-italic font-normal text-sm leading-6 text-[#222F34]">Success Rate</span>
                        </div>
                    </div>
                </div>
                
                <!-- Kachel 3 -->
                <div id="os-3" class="grow max-w-[400px] bg-white rounded-2xl shadow-[2px_-2px_8px_rgba(0,0,0,0.08),-2px_2px_4px_rgba(0,0,0,0.08)] my-auto flex flex-col flex-shrink gap-3">
                    <div class="flex flex-row justify-between items-center mx-4 my-2">
                        <span class="font-lato not-italic font-bold text-lg leading-8">
                            <font-awesome-icon :icon="{prefix: 'fab', iconName: 'android'}" class="text-[#053240] h-[16px] w-[14px]"/>
                            Android
                        </span>
                        <div class="bg-[#DFE4E7] rounded-lg text-center h-7 w-[101px] p-[2px] font-lato not-italic font-bold text-sm leading-6">
                            4 Cases 
                        </div>
                    </div>
                    <div class="h-[91px] flex flex-row justify-between items-center mx-4">
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
            </div>
        </div>

        <!-- Testfall Übersicht nach OS -->
        <OS-Testcases />
    </div>
</template>

<script lang="ts" setup>
import DateRangePicker from 'daterangepicker'

onMounted(() => {
    setTimeout(() => {
        const input = document.querySelector('input[name="daterange"]') as HTMLElement
        let daterangepicker = new DateRangePicker(input, {
            opens: 'center',
            locale: {
                "format": "DD.MM.YYYY",
                "separator": " - ",
                "applyLabel": "OK",
                "cancelLabel": "Abbrechen",
                "fromLabel": "Von",
                "toLabel": "Bis",
                "customRangeLabel": "Custom",
                "daysOfWeek": [
                    "So",
                    "Mo",
                    "Di",
                    "Mi",
                    "Do",
                    "Fr",
                    "Sa"
                ],
                "monthNames": [
                    "Januar",
                    "Februar",
                    "März",
                    "April",
                    "Mai",
                    "Juni",
                    "Juli",
                    "August",
                    "September",
                    "Oktober",
                    "November",
                    "Dezember"
                ],
                "firstDay": 1
            }
        })

        document.getElementById('export')?.addEventListener('click', () => {
            console.log("Clicked :)")
        })
    }, 1)
})

const config = {
    id: 2,
    iconName: 'desktop',
    os_name: 'Web YEAH',
    numberOfCases: 7
}
</script>


<style scoped>
#Kundenlogo {
    width: 82px;
    height: 82px;
    border-radius: 16px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
}
</style>