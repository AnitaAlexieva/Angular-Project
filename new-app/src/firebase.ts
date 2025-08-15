import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { environment } from './app/environments/environment';

const app = initializeApp(environment.firebase);

export const auth = getAuth(app);
export const db = getDatabase(app);
