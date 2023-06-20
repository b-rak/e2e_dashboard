<template>
  <div class="w-[35.375rem]">
    <span class="display_semibold_48 mb-4">Willkommen!</span>
    <span class="h2_bold_28 mb-14 text-[#707070]"
      >⚙️ Monitoring in progress...</span
    >
    <form action="/login" method="POST" class="w-full">
      <label for="e-mail" class="h3_medium_18 mx-2">E-Mail</label>
      <input
        id="e-mail"
        class="basic_white border_medium border border-[#DFE4E7] block text_regular_16 text-[#707070] p-4 w-full mb-8"
        type="text"
        name="e-mail"
        placeholder="E-Mail-Adresse"
        required
      />

      <label for="password" class="h3_medium_18 mx-2">Passwort</label>
      <div class="relative">
        <input
          id="password"
          class="basic_white border_medium border border-[#DFE4E7] block text_regular_16 text-[#707070] p-4 w-full"
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
            v-if="!passwordVisible"
            :icon="['far', 'eye-slash']"
            class="h-6 w-6 cursor-pointer text-[#707070]"
          />
          <font-awesome-icon
            v-else
            :icon="['far', 'eye']"
            class="h-6 w-6 cursor-pointer text-[#707070]"
          />
        </div>
      </div>
      <span
        class="cursor-pointer text_regular_16 f_text_secondary_00 py-2 pr-2 mt-2 block text-right"
        >Passwort vergessen?</span
      >
      <button
        type="submit"
        class="mt-12 border_medium f_secondary_00 w-full py-[15px] button_semibold_16 text-white"
      >
        Einloggen
        <font-awesome-icon
          :icon="['fas', 'arrow-right-to-bracket']"
          class="h-6 w-6"
        />
      </button>
    </form>
    <!--div class="error-message">This is an error 🤖</div-->
  </div>
</template>

<style scoped>
/* Add CSS styles for error message */
.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>

<script lang="ts" setup>
let passwordVisible = ref(false);
//const togglePasswordVisibility = () => {
//  passwordVisible = !passwordVisible;
//  console.log(passwordVisible);
//};
</script>
