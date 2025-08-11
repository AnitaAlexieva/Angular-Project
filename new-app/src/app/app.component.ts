import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `<h1>Firebase Data Test</h1>
             <pre>{{ data | json }}</pre>`,
})
export class AppComponent implements OnInit {
  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://project-angular-48822-default-rtdb.firebaseio.com/.json')
      .subscribe({
        next: (res) => {
          this.data = res;
          console.log('Данни от Firebase:', res);
        },
        error: (err) => {
          console.error('Грешка при зареждане:', err);
        }
      });
  }
}
