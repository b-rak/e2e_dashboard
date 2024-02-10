<template>
  <label
    for="e-mail"
    class="h3_medium_18 mx-2"
    :class="[errorMessage ? 'f_text_secondary_00' : 'f_text_neutral_900']"
    >E-Mail</label
  >
  <input
    id="e-mail"
    class="basic_white border_medium border block text_regular_16 basic_text_grey p-4 w-full focus:outline-none"
    :class="[
      errorMessage
        ? 'f_border_secondary_00'
        : 'f_border_neutral_80 !focus:f_border_neutral_900',
    ]"
    type="email"
    name="e-mail"
    placeholder="E-Mail-Adresse"
    required
  />
  <ErrorMessage :message="errorMessage" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  errorMessage: String;
}>();
</script>
