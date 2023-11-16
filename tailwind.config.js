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
        screens: {
            'xs': '0px',
            'sm': '576px',
            'md': '768px',
            'lg': '992px',
            'xl': '1200px',
            'xxl': '1400px',
        }
    },
    plugins: [require('@tailwindcss/typography')],
};
