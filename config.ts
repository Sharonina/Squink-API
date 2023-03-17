exports.port = process.argv[2] || process.env.PORT || 3000;
const config = {
  PORT: process.argv[2] || 3000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/test",
  JWT_SECRET: process.env.JWT_SECRET || "esta-es-la-api-de-burger-queen",
  HASH_STEPS: process.env.HASH_STEPS || "10",
};

export default config;
