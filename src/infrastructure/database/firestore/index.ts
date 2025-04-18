
import { firestore } from "@infrastructure/firebase";

export class Firestore {
    private static instance: Firestore;
    private db: FirebaseFirestore.Firestore;

    private constructor() {
        this.db = firestore;
    }

    public static getInstance(): Firestore {
        if (!Firestore.instance) {
            Firestore.instance = new Firestore();
        }

        return Firestore.instance;
    }

    public getDb(): FirebaseFirestore.Firestore {
        return this.db;
    }

    public async getCollection(collectionName: string): Promise<FirebaseFirestore.QuerySnapshot> {
        const collectionRef = this.db.collection(collectionName);
        return await collectionRef.get();
    }

    public async getDocument(collectionName: string, documentId: string): Promise<FirebaseFirestore.DocumentSnapshot> {
        const docRef = this.db.collection(collectionName).doc(documentId);
        return await docRef.get();
    }

    public async addDocument(collectionName: string, data: object): Promise<FirebaseFirestore.DocumentReference> {
        const collectionRef = this.db.collection(collectionName);
        return await collectionRef.add(data);
    }

    public async updateDocument(collectionName: string, documentId: string, data: object): Promise<void> {
        const docRef = this.db.collection(collectionName).doc(documentId);
        await docRef.update(data);
    }

    public async deleteDocument(collectionName: string, documentId: string): Promise<void> {
        const docRef = this.db.collection(collectionName).doc(documentId);
        await docRef.delete();
    }
}

export default Firestore;