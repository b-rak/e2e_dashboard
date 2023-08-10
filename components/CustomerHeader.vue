<template>
  <div class="flex items-center gap-6">
    <img
      :src="imagePath"
      alt="Kundenlogo"
      class="w-[5.5rem] h-[5.5rem] border_medium shadow_light_1"
    />
    <div class="flex flex-col items-start justify-between">
      <div class="flex items-center gap-4">
        <p class="display_semibold_48">{{ pageTitle }}</p>
        <font-awesome-icon
          :icon="{ prefix: 'far', iconName: 'circle-info' }"
          class="fa-xl cursor-pointer f_text_neutral_900"
        />
      </div>
      <p class="h3_medium_18 f_text_neutral_900">{{ customerName }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  customerName: String;
  pageTitle: String;
  imagePath: String;
}>();
</script>
