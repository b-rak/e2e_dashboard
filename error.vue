<template>
  <NuxtLayout>
    <div class="flex flex-col items-center justify-center h-full gap-8">
      <template v-if="error.statusCode === 404 || error.statusCode === 403">
        <h1 class="display_semibold_48">{{ error.statusCode }}</h1>
        <img
          src="/img/CatAndPortal.svg"
          alt="'Katze steht vor einem Portal'"
          class="w-[26rem]"
        />
        <div class="text-center">
          <p class="text_regular_18">Hey, wohin gehst du?</p>
          <p class="text_regular_18">
            Die von dir gewünschte Seite scheint nicht zu existieren!
          </p>
        </div>
        <p class="text_regular_18">
          Zurück zum
          <a class="font-bold underline cursor-pointer" @click="handleError">
            {{ loggedIn ? "Dashboard" : "Login" }}
          </a>
        </p>
      </template>
      <template
        v-else-if="error.statusCode === 500 || error.statusCode === 503"
      >
        <h1 class="display_semibold_48">500</h1>
        <p>
          <strong>{{ error.message }}</strong>
        </p>
        <img
          src="/img/CatOnRobotVacuumCleaner.svg"
          alt="'Katze steht auf einem Roboter Staubsauger'"
          class="w-[26rem]"
        />
        <div class="text-center">
          <p class="text_regular_18">
            Sieht aus, als wäre etwas kaputt gegangen.
          </p>
          <p class="text_regular_18">Das tut uns leid.</p>
        </div>
        <button
          class="py-2 px-6 border_medium h-[3.375rem] whitespace-nowrap button_bold_16 text-center"
          @click="refresh"
        >
          Neu laden
        </button>
      </template>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const router = useRouter();

const loggedIn = localStorage.getItem("loggedIn") === "true";

const error = useError();
console.log("ERROR", error.value);
const handleError = async () => {
  if (loggedIn) {
    clearError({
      redirect: "/dashboard",
    });
  } else {
    console.log("not logged in, navigate to login");
    await router.replace("/login");
    await navigateTo("/login", { replace: true });
  }
};

const refresh = () => {
  location.reload();
};
</script>
