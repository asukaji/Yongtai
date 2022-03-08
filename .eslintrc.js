// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
        ecmaVersion: 2017
    },

    env: {
        browser: true,
        mocha: true,
        node: true
    },

    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/recommended',

        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'eslint:recommended'

        // https://github.com/dwightjack/eslint-plugin-vue-types
        // 'plugin:vue-types/strongly-recommended',
    ],

    // required to lint *.vue files
    plugins: [
        // 'html',
        'vue'
    ],

    globals: {
        UPDATE_TIME: false,
        VERSION: false,
        MAIN_VERSION: false,
        BUILD_VERSION: false,
        I18N_LANGUAGES: false,
        setImmediate: false,
        API_ORIGIN: false,
        NODE_ENV: false,
        process: false,
        require: false,
        module: false,
        exports: false,
        RAVEN_DSN: false,
        ADHOC_ORIGIN: false,
        LATEST_CHANGELOG: false,
        WEB_SDK_KEY: false,
        AMap: false
    },
    // add your custom rules here
    rules: {
        // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-indent.md
        'vue/html-indent': ['error', 2],

        'vue/max-attributes-per-line': [
            'warn',
            {
                singleline: 20,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],

        'vue/html-self-closing': [
            'warn',
            {
                html: {
                    void: 'any',
                    normal: 'always'
                }
            }
        ],

        'vue/attributes-order': 'warn',
        'vue/order-in-components': 'warn',

        'vue/singleline-html-element-content-newline': 'off',

        // 强制使用一致的缩进
        // http://eslint.cn/docs/rules/indent
        indent: ['error', 2, { SwitchCase: 1 }],

        // 要求或禁止使用分号代替 ASI
        // http://eslint.cn/docs/rules/semi
        semi: ['error', 'always'],

        // 要求或禁止使用拖尾逗号
        // http://eslint.cn/docs/rules/comma-dangle
        // 'comma-dangle': ['error', {
        //     'arrays': 'always-multiline',
        //     'objects': 'always-multiline',
        //     'imports': 'always-multiline',
        //     'exports': 'always-multiline',
        //     'functions': 'ignore',
        // }],

        // 禁止未使用过的变量
        // http://eslint.cn/docs/rules/no-unused-vars
        'no-unused-vars': ['warn', { ignoreRestSiblings: true }],

        // 要求或禁止函数圆括号之前有一个空格
        // http://eslint.cn/docs/rules/space-before-function-paren
        'space-before-function-paren': ['off'],

        // 要求箭头函数的参数使用圆括号
        // http://eslint.cn/docs/rules/arrow-parens
        'arrow-parens': ['off'],

        // allow async-await
        // 'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // allow console during development
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },

    settings: {
        'import/resolver': {
            'babel-module': {}
        }
    }
};
