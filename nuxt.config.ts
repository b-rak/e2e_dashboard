// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Lato:400,700",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lora",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/jquery/latest/jquery.min.js",
          type: "text/javascript",
        },
        {
          src: "https://cdn.jsdelivr.net/momentjs/latest/moment.min.js",
          type: "text/javascript",
        },
        {
          src: "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js",
          type: "text/javascript",
        },
      ],
      /* evtl brauchbar, oder doch nicht wegen scoped css?
            // please note that this is an area that is likely to change
            style: [
                // <style type="text/css">:root { color: red }</style>
                { children: ':root { color: red }', type: 'text/css' }
            ]
            */
      htmlAttrs: {
        lang: "de",
      },
      title: "App Monitoring",
    },
  },

  build: {
    transpile: [
      "@fortawesome/fontawesome-free",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/vue-fontawesome",
    ],
  },

  components: [
    "~/components/",
    "~/components/common",
    "~/components/dashboard",
    "~/components/details",
    "~/components/export",
    "~/components/icons",
    "~/components/layout",
    "~/components/login",
    "~/components/shared",
    "~/components/testfaelle",
  ],

  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "@/assets/css/global.css",
  ],

  imports: {
    autoImport: true,
    dirs: [
      "composables",
      "composables/charts",
      "composables/api/**",
      "composables/utils",
      "stores",
    ],
  },

  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@pinia/nuxt"],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || "some fallback url",
    },
  },
  ssr: false,
});
