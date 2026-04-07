require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

// ❌ Removed MongoDB requirement (temporary)
const requiredEnvVars = ["GEMINI_API_KEY"];

for (let i = 0; i < requiredEnvVars.length; i++) {
    const envVarName = requiredEnvVars[i];

    if (!process.env[envVarName]) {
        console.error(`Missing required environment variable: ${envVarName}`);
        process.exit(1);
    }
}

const startServer = async () => {
    // ❌ Disabled DB connection (temporary)
    // await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();