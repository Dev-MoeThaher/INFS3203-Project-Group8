module.exports = [
    {
        files: ["src/public/**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "script",
            globals: {
                document: "readonly",
                window: "readonly",
                fetch: "readonly",
                console: "readonly"
            }
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^next$" }],
            "no-undef": "error",
            semi: ["error", "always"],
            quotes: ["error", "double"]
        }
    },
    {
        files: ["src/**/*.js"],
        ignores: ["src/public/**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                console: "readonly",
                process: "readonly",
                module: "readonly",
                require: "readonly",
                __dirname: "readonly"
            }
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^next$" }],
            "no-undef": "error",
            semi: ["error", "always"],
            quotes: ["error", "double"]
        }
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                console: "readonly",
                process: "readonly",
                module: "readonly",
                require: "readonly",
                jest: "readonly",
                describe: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeAll: "readonly",
                beforeEach: "readonly",
                afterAll: "readonly"
            }
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^next$" }],
            "no-undef": "error",
            semi: ["error", "always"],
            quotes: ["error", "double"]
        }
    }
];