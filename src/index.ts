import App, { setupServer } from "./app";
import DatabaseConnectionManager from "./database";

DatabaseConnectionManager.connect().then(() => {
    const app: App = setupServer();
    app.start();
});
