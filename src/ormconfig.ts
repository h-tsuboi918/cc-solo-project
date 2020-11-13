export = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || "db_user",
  password: process.env.DB_PASSWORD || "db_password",
  database: process.env.DB_NAME || "db_name",
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  seeds: ["src/seeds/**/*.ts"],
  logging: false,
  migrationsRun: false,
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
  },
};
