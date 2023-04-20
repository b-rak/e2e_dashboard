// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            meta: [
                // <meta name="viewport" content="width=device-width, initial-scale=1">
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ],
            /* evtl brauchbar
            script: [
                // <script src="https://myawesome-lib.js"></script>
                { src: 'https://awesome-lib.js' }
            ],*/
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'stylesheet', href: 'http://fonts.googleapis.com/css?family=Lato:400,700' },
            ],
            /* evtl brauchbar, oder doch nicht wegen scoped css?
            // please note that this is an area that is likely to change
            style: [
                // <style type="text/css">:root { color: red }</style>
                { children: ':root { color: red }', type: 'text/css' }
            ]
            */
            htmlAttrs: {
                lang: 'de'
            },
            title: 'App Monitoring'
        }
    },
    imports: {
        autoImport: true,
    },
    modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
})
