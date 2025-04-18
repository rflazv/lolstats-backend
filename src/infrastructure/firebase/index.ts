import path from 'path';
import admin from 'firebase-admin';

import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';    
import { getFirestore } from 'firebase-admin/firestore';

// Caminho para o arquivo de credenciais na raiz do projeto
const serviceAccountPath = path.resolve('./firebase.json');

// Inicializar o Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        storageBucket: 'cosmos-cabin.appspot.com',
    });
}

// Exportar os serviços do Firebase
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore();