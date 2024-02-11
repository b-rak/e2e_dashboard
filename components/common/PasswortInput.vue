<template>
  <label
    for="password"
    class="h3_medium_18 mx-2 block mt-8"
    :class="[errorMessage ? 'f_text_secondary_00' : 'f_text_neutral_900']"
    >{{ label }}</label
  >
  <div class="relative">
    <input
      :id="id"
      class="basic_white border_medium border border-[#DFE4E7] block text_regular_16 basic_text_grey p-4 w-full focus:outline-none"
      :class="[
        errorMessage ? 'f_border_secondary_00' : 'focus:border-[#222F34]',
      ]"
      :type="passwordVisible ? 'text' : 'password'"
      name="password"
      placeholder="Passwort"
      required
    />
    <div
      @click="() => (passwordVisible = !passwordVisible)"
      class="absolute top-1/2 right-4 transform -translate-y-1/2"
    >
      <font-awesome-icon
        :icon="['far', !passwordVisible ? 'eye-slash' : 'eye']"
        class="h-6 w-6 cursor-pointer basic_text_grey"
      />
    </div>
  </div>
  <ErrorMessage :message="errorMessage" />
</template>

<script lang="ts" setup>
const passwordVisible = ref(false);
const props = defineProps<{
  id: string;
  label: string;
  errorMessage: string;
}>();
</script>
