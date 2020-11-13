import { createConnection, ConnectionOptions } from "typeorm";
import dbConfig from "./ormconfig";

class DatabaseConnectionManager {

  public static async connect() {
    const connection = await createConnection(
      dbConfig as ConnectionOptions
    );
    return connection;
  }
}

export default DatabaseConnectionManager;
