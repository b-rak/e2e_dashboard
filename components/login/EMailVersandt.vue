<template>
  <div class="w-[35rem] text-center flex flex-col">
    <div class="flex justify-center">
      <font-awesome-icon
        :icon="['far', 'circle-check']"
        class="status_text_pass_100 text-[3.5rem]"
      />
    </div>
    <span class="display_semibold_48 my-6">E-Mail versandt!</span>
    <span class="h2_medium_28 basic_text_grey mb-[4.5rem]"
      >Wir haben eine E-Mail versandt an:</span
    >
    <span class="h2_bold_28 basic_text_grey mb-6">{{ email }}</span>
    <div class="text_regular_16 basic_text_grey p-2">
      Keine E-Mail erhalten?
      <span class="cursor-pointer status_text_fail_100 pl-2"
        >Erneut Senden?</span
      >
    </div>
    <span
      class="text_regular_16 cursor-pointer f_text_neutral_500 mt-[4.5rem]"
      @click="goToLogin"
      >Zurück zum Login</span
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  email: String;
}>();

const emits = defineEmits(["goTo:login"]);
const goToLogin = () => {
  emits("goTo:login");
};
</script>
