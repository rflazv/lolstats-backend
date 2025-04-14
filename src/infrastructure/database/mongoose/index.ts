import MongoDBService from "./connection/MongoDBService";

new MongoDBService().connectWithRetry();

export * from "./models/users";
