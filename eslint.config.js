// eslint.config.js
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    ...tseslint.configs.recommended,

    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                ecmaVersion: 2021,
                sourceType: 'module',
            },
        },
        plugins: {
            vue,
        },
        rules: {
            ...vue.configs['vue3-recommended'].rules,
        },
    },
    eslintConfigPrettier,
];