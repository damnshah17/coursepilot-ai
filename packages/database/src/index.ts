export { database, type DatabaseClient } from "./client.js";

export {
  checkDatabaseHealth,
  disconnectDatabase,
  type DatabaseHealthResult,
} from "./health.js";

export { UserRole, UserStatus, type User } from "./generated/prisma/client.js";
