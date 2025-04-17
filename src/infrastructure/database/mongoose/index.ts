import MongoDBService from "./connection/MongoDBService";
import '../mongoose/models/Champion';

new MongoDBService().connectWithRetry();

export * from "./models/users";