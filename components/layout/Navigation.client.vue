<template>
  <div
    v-if="!isMobile"
    id="nav"
    class="h-20 flex justify-between items-center basic_white px-[7.5rem] min-[1920px]:px-[6.25%]"
  >
    <div id="part-1" class="flex justify-around items-center gap-x-[9.188rem]">
      <a href="/" id="appmatics">
        <img
          src="~/assets/images/logo-appmatics-2.png"
          alt="Appmatics Logo"
          id="appmatics-logo"
          class="cursor-pointer h-6 w-[8.75rem]"
        />
      </a>
      <div id="cont-1" class="flex gap-x-14">
        <NavigationLink to="/dashboard" id="dashboard" text="Dashboard" />
        <NavigationLink to="/testfaelle" id="testfaelle" text="Testfälle" />
      </div>
    </div>
    <div id="part-2" class="flex justify-around items-center gap-x-[3.75rem]">
      <div id="cont-2" class="flex gap-x-14">
        <NavigationLink
          to="/mitteilungen"
          id="mitteilungen"
          text="Mitteilungen"
        />
        <NavigationLink to="/support" id="support" text="Support" />
        <NavigationLink to="/faq" id="faq" text="FAQ" />
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
  const t: HTMLElement = event.currentTarget as HTMLElement;
  t.classList.toggle("open");

  const a: HTMLElement = document.getElementById("nav") as HTMLElement;
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

const active = ref(true);
const route = useRoute();

/*
  console.log("ROUTE", route.path);
  if (route.path.includes("/testfaelle")) {
    const elems = document.querySelectorAll("a[href]");
    const elem = document.querySelector(".router-link-active");
    console.log(elems);
    console.log(elem);

    elem?.classList.add("after:scale-x-100");
    elem?.classList.add("after:origin-[0%_50%]");
    elem?.classList.add("!font-bold");
    elem?.classList.add("!text-[#303436]");
  }
  //active.value = route.path.includes("/testfaelle");
});*/
const isRouteActive = (id: String) => {
  //path.value.includes(id as string) ? true : false;
};
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
