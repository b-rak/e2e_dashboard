<template>
  <div
    class="w-12 h-12 p-2 border border_xxsmall flex items-center justify-center"
    :class="[
      active
        ? 'f_neutral_500 f_border_neutral_500 cursor-pointer'
        : 'f_neutral_90 f_border_neutral_90',
    ]"
  >
    <font-awesome-icon
      :icon="{ prefix: type, iconName: iconName }"
      class="text-[1.5rem]"
      :class="[active ? 'basic_text_white' : 'f_text_neutral_400']"
    />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    iconName: String;
    type: String;
    active: Boolean;
  }>(),
  {
    active: () => true,
  }
);
</script>
