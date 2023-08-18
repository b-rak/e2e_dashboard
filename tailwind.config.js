/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [],
    theme: {
        extend: {
            fontFamily: {
                'lato': ['Lato', 'sans-serif'],
                'lora': ['Lora', 'serif'],
                'roboto': ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
