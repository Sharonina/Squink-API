exports.port = process.argv[2] || process.env.PORT || 3000;
exports.dbUrl = process.env.DB_URL || "mongodb://localhost:27017/test";
exports.secret = process.env.JWT_SECRET || "esta-es-la-api-de-burger-queen";
exports.adminEmail = process.env.ADMIN_EMAIL || "admin@localhost";
exports.hashSteps = process.env.HASH_STEPS || 10;
exports.adminPassword = process.env.ADMIN_PASSWORD || "changeme";
exports.adminId = process.env.ADMIN_ID || "5faf1b9e1c9d440000ale1f1";
