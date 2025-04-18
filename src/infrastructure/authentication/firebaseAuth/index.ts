import { auth } from "@infrastructure/firebase";
import { Auth, UserRecord } from "firebase-admin/auth";
import { Authentication } from "../../../core/infrastructure/Authentication";


class FirebaseAuth implements Authentication {
    private static instance: FirebaseAuth;
    private auth: Auth;


    constructor() {
        this.auth = auth;
    }

    public static getInstance(): FirebaseAuth {
        if (!FirebaseAuth.instance) {
            FirebaseAuth.instance = new FirebaseAuth();
        }

        return FirebaseAuth.instance;
    }

    public async createUser(email: string, password: string): Promise<string> {
        const userRecord = await this.auth.createUser({
            email,
            password,
        });
        return userRecord.uid;
    }

    public async deleteUser(uid: string): Promise<void> {
        await this.auth.deleteUser(uid);
    }

    public async getUser(uid: string): Promise<UserRecord | null> {
        return await this.auth.getUser(uid);
    }

    public async updateUser(uid: string, email: string, password: string): Promise<void> {
        await this.auth.updateUser(uid, {
            email,
            password,
        });
    }

    verifyIdToken(idToken: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    sendPasswordResetEmail(email: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default FirebaseAuth;