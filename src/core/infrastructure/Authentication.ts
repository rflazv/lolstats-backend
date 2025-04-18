


export abstract class Authentication {
    abstract signIn(email: string, password: string): Promise<string | null>;
    abstract createUser(email: string, password: string): Promise<string>;
    abstract deleteUser(uid: string): Promise<void>;
    abstract getUser(uid: string): Promise<any>;
    abstract updateUser(uid: string, email: string, password: string): Promise<void>;
    abstract verifyIdToken(idToken: string): Promise<any>;
    abstract getUserByEmail(email: string): Promise<any>;
    abstract sendPasswordResetEmail(email: string): Promise<void>;
}