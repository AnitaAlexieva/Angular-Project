import { Injectable } from '@angular/core';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  USER_KEY = '[user]'
  user:User | null = null;

  get isLogged(): boolean{
    return !!this.user
  }
  constructor() {
    try{
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser)
    }catch(error){
      this.user = null
    }
   }

   login(){
    this.user = {
      uid: '123',         
      email: 'ani@gmail.com',
      username: 'Ani',
      imageUrl: '',   
  }
  localStorage.setItem(this.USER_KEY, JSON.stringify(this.user))
   }

   logout(){
    this.user = null;
    localStorage.removeItem(this.USER_KEY)
   }
}
