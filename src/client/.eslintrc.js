module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ["eslint:recommended", "plugin:vue/essential"],
    parserOptions: {
        ecmaVersion: 12
    },
    plugins: ["vue"],
    rules: {
        "indent": ["error", 4],
        "quotes": ["error", "double"],
        "semi": ["error", "never"],
        "linebreak-style": ["error", "windows"],
        "comma-dangle": ["error", "never"],
        "comma-spacing": ["error", {"before": false, "after": true}],
        "comma-style": ["error", "last"],
        "array-bracket-newline": ["error", "never"],
        "array-bracket-spacing": ["error", "never"],
        "array-element-newline": ["error", "never"],
        "func-call-spacing": ["error", "never"],
        "func-style": ["error", "expression"],
        "brace-style": ["warn", "1tbs", {"allowSingleLine": false}],
        "function-call-argument-newline": ["error", "never"],
        "function-paren-newline": ["error", "never"],
        "implicit-arrow-linebreak": ["error", "beside"],
        "no-var": "error",
        "max-len": ["warn", {"code": 140, "comments": 140, "tabWidth": 4}],
        "curly": ["warn", "multi-line", "consistent"],
        "no-else-return": "warn",
        "key-spacing": ["warn", {"mode": "strict"}],
        "object-curly-spacing": ["warn", "never"],
        "space-before-blocks": ["warn", "always"],
        "space-in-parens": ["warn", "never"],
        "space-before-function-paren": ["warn", "never"],
        "require-atomic-updates": "off",
        "no-duplicate-imports": "error",
        "no-confusing-arrow": "error",
        "prefer-const": "error",
        "vue/comment-directive": 0
    }
}
