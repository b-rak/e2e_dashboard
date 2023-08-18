<template>
  <div
    class="flex flex-col justify-center items-center p-1"
    :class="[!selected ? 'f_text_neutral_900' : 'basic_text_white']"
  >
    <div class="flex justify-center items-center gap-2">
      <font-awesome-icon
        :icon="{ prefix: 'far', iconName: iconName }"
        class="h-[1.5rem] w-[1.5rem] text-[1.5rem]"
        :class="[
          iconName === 'arrow-up'
            ? 'status_text_pass_100'
            : 'status_text_fail_100',
        ]"
      />
      <span class="rate_bold_36 uppercase">30%</span>
    </div>
    <span class="text_regular_14">Success Rate</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  selected: Boolean;
}>();

const iconName = ref("");
onMounted(() => {
  setTimeout(() => {
    if (false) {
      iconName.value = "arrow-up";
    } else {
      iconName.value = "arrow-down";
    }
  }, 1);
});
</script>
