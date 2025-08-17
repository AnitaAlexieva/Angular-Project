import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _errorMessage = new BehaviorSubject<string>('');
  errorMessage$ = this._errorMessage.asObservable();

  showError(message: string) {
    this._errorMessage.next(message);
    setTimeout(() => this.clearError(), 5000); 
  }

  clearError() {
    this._errorMessage.next('');
  }
}
