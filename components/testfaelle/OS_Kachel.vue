<template>
  <div
    id="os-1"
    class="w-[22.188rem] h-[9.438rem] basic_white border_medium shadow_light_3 my-auto flex flex-col gap-3"
  >
    <div class="flex flex-row justify-between items-center mx-4 my-2">
      <span class="h3_bold_18">
        <font-awesome-icon
          :icon="getIcon(iconName)"
          class="f_text_neutral_900 h-[1.125rem] w-[1.375rem]"
        />
        {{ os_name }}
      </span>
      <div
        class="f_neutral_80 border_small text-center h-7 w-[6.313rem] p-[0.125rem]"
      >
        <span class="text_bold_14 f_text_neutral_900">
          {{ numberOfCases > 1 ? numberOfCases + " Cases" : "1 Case" }}
        </span>
      </div>
    </div>
    <div class="h-3/5 flex flex-row justify-between items-center mx-4">
      <div
        class="h-full w-[10.313rem] bg-slate-200 text-center flex flex-row justify-center items-center"
      >
        Chart JS
      </div>

      <div class="h-14 w-[6.5rem] flex flex-col justify-center items-center">
        <div class="flex flex-row justify-center items-center gap-2">
          <font-awesome-icon
            :icon="{ prefix: 'fas', iconName: 'arrow-up' }"
            class="status_text_pass_100 h-[0.938rem] w-[0.688rem]"
          />
          <span class="rate_bold_36 f_text_neutral_900 uppercase">30%</span>
        </div>
        <span class="text_regular_14 f_text_neutral_900">Success Rate</span>
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
  numberOfCases: Number,
});

const getIcon = (iconName: string) => {
  if (iconName === "desktop") {
    return {
      prefix: "fas",
      iconName: "desktop",
    };
  } else {
    return {
      prefix: "fab",
      iconName: iconName,
    };
  }
};
</script>
