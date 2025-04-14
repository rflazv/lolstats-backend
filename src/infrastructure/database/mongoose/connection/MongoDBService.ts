import mongoose, { ConnectOptions } from "mongoose";

export default class MongoDBService {
    private count = 0;
    private readonly maxRetries = 5;
    private readonly retryIntervalMs = 5000;

    private mongooseOptions: ConnectOptions = {
        dbName: process.env.DB_NAME,
        serverSelectionTimeoutMS: 15000,
        maxPoolSize: 50,
        minPoolSize: 5,
    };

    constructor() {}

    public connectWithRetry = async (): Promise<void> => {
        try {
            await mongoose.connect(process.env.MONGO_URI as string, this.mongooseOptions);
            console.log("✅ MongoDB connected successfully");
        } catch (err) {
            this.count += 1;
            console.error(`❌ MongoDB connection failed (attempt ${this.count}). Retrying in 5s...`, err);

            if (this.count < this.maxRetries) {
                setTimeout(this.connectWithRetry, this.retryIntervalMs);
            } else {
                console.error("❌ Max retries reached. Could not connect to MongoDB.");
            }
        }
    };
}
