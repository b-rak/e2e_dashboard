<template>
  <div v-if="!isMobile" id="nav" class="flex h-20 items-center">
    <div
      id="part-1"
      class="flex justify-around items-center left-[4%] absolute gap-x-[9.188rem]"
    >
      <a href="/" id="appmatics">
        <img
          src="~/assets/images/logo-appmatics-2.png"
          alt="Appmatics Logo"
          id="appmatics-logo"
          class="cursor-pointer h-6 w-[8.75rem]"
        />
      </a>
      <div id="cont-1" class="flex gap-x-14">
        <NuxtLink
          to="/dashboard"
          exactActiveClass="after:scale-x-100 after:origin-[0%_50%] !font-bold !text-[#303436]"
          class="tab_inactive_18 cursor-pointer text-[#707070] no-underline hover:font-bold hover:text-[#303436] after:block after:content-[''] after:border-b-[0.188rem] after:border-b-[#ff4220] after:scale-x-0 after:transition after:ease-in-out after:duration-[250ms]"
          >Dashboard</NuxtLink
        >
        <NuxtLink
          to="/testfaelle"
          exactActiveClass="after:scale-x-100 after:origin-[0%_50%] !font-bold !text-[#303436]"
          class="tab_inactive_18 cursor-pointer text-[#707070] no-underline hover:font-bold hover:text-[#303436] after:block after:content-[''] after:border-b-[0.188rem] after:border-b-[#ff4220] after:scale-x-0 after:transition after:ease-in-out after:duration-[250ms]"
          >Testfälle</NuxtLink
        >
      </div>
    </div>
    <div
      id="part-2"
      class="flex justify-around items-center right-[4%] absolute gap-x-[3.75rem]"
    >
      <div id="cont-2" class="flex gap-x-14">
        <NuxtLink
          to="/mitteilungen"
          exactActiveClass="after:scale-x-100 after:origin-[0%_50%] !font-bold !text-[#303436]"
          class="tab_inactive_18 cursor-pointer text-[#707070] no-underline hover:font-bold hover:text-[#303436] after:block after:content-[''] after:border-b-[0.188rem] after:border-b-[#ff4220] after:scale-x-0 after:transition after:ease-in-out after:duration-[250ms]"
          >Mitteilungen</NuxtLink
        >
        <NuxtLink
          to="/support"
          exactActiveClass="after:scale-x-100 after:origin-[0%_50%] !font-bold !text-[#303436]"
          class="tab_inactive_18 cursor-pointer text-[#707070] no-underline hover:font-bold hover:text-[#303436] after:block after:content-[''] after:border-b-[0.188rem] after:border-b-[#ff4220] after:scale-x-0 after:transition after:ease-in-out after:duration-[250ms]"
          >Support</NuxtLink
        >
        <NuxtLink
          to="/faq"
          exactActiveClass="after:scale-x-100 after:origin-[0%_50%] !font-bold !text-[#303436]"
          class="tab_inactive_18 cursor-pointer text-[#707070] no-underline hover:font-bold hover:text-[#303436] after:block after:content-[''] after:border-b-[0.188rem] after:border-b-[#ff4220] after:scale-x-0 after:transition after:ease-in-out after:duration-[250ms]"
          >FAQ</NuxtLink
        >
      </div>
      <a href="/login" id="profile">
        <img
          src="~/assets/images/profilicon.png"
          alt="Profil-Icon"
          id="profile-icon"
          class="cursor-pointer h-10 w-10"
        />
      </a>
    </div>
  </div>
  <div v-else id="nav" class="flex h-20 items-center">
    <div id="nav-mobile">
      <div id="wrapper">
        <button id="hamburger" @click="toggleMenu">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 35 30"
          >
            <path
              id="top"
              class="line"
              d="M166.18,102.56h25s7.52-.43,5-5.29c-2.89-5.65-8.7,2.07-8.7,2.07L169.84,117"
              transform="translate(-166.18 -94.7)"
            />
            <path
              id="bottom"
              class="line"
              d="M166.18,113.77h25s7.52.43,5,5.29c-2.89,5.64-8.7-2.07-8.7-2.07L169.84,99.31"
              transform="translate(-166.18 -94.7)"
            />
            <line
              id="middle"
              class="line"
              y1="13.48"
              x2="25"
              y2="13.48"
              x1="0"
            />
          </svg>
        </button>
      </div>
      <a href="/" id="appmatics">
        <img
          src="~/assets/images/logo-appmatics-2.png"
          alt="Appmatics Logo"
          id="appmatics-logo"
          class="cursor-pointer h-6 w-[8.75rem]"
        />
      </a>
      <a href="/login" id="profile">
        <img
          src="~/assets/images/profilicon.png"
          alt="Profil-Icon"
          id="profile-icon"
          class="cursor-pointer h-10 w-10"
        />
      </a>
    </div>
    <div class="navbar-menu">
      <a
        href="/dashboard"
        class="tab_inactive_18 cursor-pointer text-[#707070] no-underline"
        >Dashboard</a
      >
      <a
        href="/testfaelle"
        class="tab_inactive_18 cursor-pointer text-[#707070] no-underline"
        >Testfälle</a
      >
      <a class="tab_inactive_18 cursor-pointer text-[#707070] no-underline"
        >Mitteilungen</a
      >
      <a class="tab_inactive_18 cursor-pointer text-[#707070] no-underline"
        >Support</a
      >
      <a class="tab_inactive_18 cursor-pointer text-[#707070] no-underline"
        >FAQ</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
const isMobile = ref(useWindowSize().width.value < 1000);

const ismobile = function () {
  isMobile.value = useWindowSize().width.value < 1000;
};

const toggleMenu = function (event: MouseEvent) {
  const t: HTMLElement | null = event.currentTarget as HTMLElement;
  t.classList.toggle("open");

  const a: HTMLElement | null = document.getElementById("nav") as HTMLElement;
  a.classList.toggle("open");
};

onMounted(() => {
  setTimeout(() => {
    window.addEventListener("resize", ismobile);
  }, 1);
});

onUnmounted(() => {
  window.removeEventListener("resize", ismobile);
});
</script>

<style scoped>
/**
#nav {
  align-items: center;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  height: 80px;
}

#part-1 {
  align-items: center;
  display: flex;
  justify-content: space-around;
  left: 4%;
  position: absolute;
  column-gap: 147px;
}

#part-2 {
  align-items: center;
  display: flex;
  justify-content: space-around;
  position: absolute;
  right: 4%;
  column-gap: 60px;
}

:global(#nav a) {
  color: #707070;
  cursor: pointer;
  font-family: "Lato";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  text-decoration: none;
}

:global(#nav a:not([id]):hover) {
  color: #303436;
  font-weight: 700;
}

#profile-icon {
  cursor: pointer;
  height: 40px;
  width: 40px;
}

#appmatics-logo {
  cursor: pointer;
  height: 24px;
  width: 140px;
}

#cont-1,
#cont-2 {
  display: flex;
  column-gap: 56px;
}

:global(a:not([id]):after) {
  display: block;
  content: "";
  border-bottom: 3px solid #ff4220;
  transform: scaleX(0);
  transition: transform 250ms ease-in-out;
}

.selected:after {
  transform: scaleX(1);
  transform-origin: 0% 50%;
}
*/
:global(#nav a:not([id]).selected) {
  color: #303436;
  font-weight: 700;
}

.navbar-menu {
  position: absolute;
  top: 80px;
  border: solid 3px #303436;
  height: 100vh;
  width: 71vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  background-color: #f2f2f2;
  left: -73vw;
  transition: transform 0.5s ease-in-out;
}

#nav.open > .navbar-menu {
  transform: translateX(73vw);
  /*animation: slide 0.5s forwards;**/
}

#nav-mobile {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
}

#wrapper {
  position: absolute;
  left: 2%;
}

#nav-mobile > #profile {
  position: absolute;
  right: 2%;
}

.line {
  fill: none;
  stroke: #707070;
  stroke-width: 2px;
}

button {
  background: none;
  border: none;
}

path {
  stroke-dasharray: 25 45;
  stroke-dashoffset: 0;
}

#top,
#bottom {
  transition: stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

#middle {
  opacity: 1;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.open #middle {
  opacity: 0;
}

.open #top,
.open #bottom {
  stroke-dashoffset: -45;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(73vw);
  }
}
</style>
