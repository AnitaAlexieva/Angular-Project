import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { set, ref, get, update } from 'firebase/database';
import { db, auth } from 'src/firebase';
import { from, Observable, switchMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  USER_KEY = '[user]';
  user: User | null = null;

  constructor() {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY);
      this.user = lsUser ? JSON.parse(lsUser) : null;
    } catch {
      this.user = null;
    }
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  register(email: string, password: string, username: string): Observable<User> {
    return from(createUserWithEmailAndPassword(auth, email, password)).pipe(
      switchMap(res => 
        from(set(ref(db, 'users/' + res.user.uid), {
          uid: res.user.uid,
          email,
          username,
          imageUrl: 'https://cdn3.vectorstock.com/i/1000x1000/54/17/person-gray-photo-placeholder-man-vector-24005417.jpg' // дефолтна снимка
        })).pipe(
          map(() => {
            this.user = { uid: res.user.uid, email, username, imageUrl: 'https://cdn3.vectorstock.com/i/1000x1000/54/17/person-gray-photo-placeholder-man-vector-24005417.jpg' };
            localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
            return this.user;
          })
        )
      )
    );
  }

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(auth, email, password)).pipe(
      switchMap(res =>
        from(get(ref(db, 'users/' + res.user.uid))).pipe(
          map(snapshot => {
            const data = snapshot.val();
            this.user = {
              uid: res.user.uid,
              email: data?.email || '',
              username: data?.username || '',
              imageUrl: data?.imageUrl || 'https://cdn3.vectorstock.com/i/1000x1000/54/17/person-gray-photo-placeholder-man-vector-24005417.jpg'
            };
            localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
            return this.user;
          })
        )
      )
    );
  }

  getUserData(uid: string): Observable<User> {
    return from(get(ref(db, 'users/' + uid))).pipe(
      map(snapshot => snapshot.val() as User)
    );
  }

  updateUser(uid: string, updatedData: Partial<User>): Observable<void> {
    return from(update(ref(db, 'users/' + uid), updatedData)).pipe(
      map(() => {
        // Обновяваме и локално
        this.user = { ...this.user, ...updatedData } as User;
        localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
      })
    );
  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.USER_KEY);
  }
}
