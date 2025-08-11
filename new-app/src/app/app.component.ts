import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'new-app';

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http
      .get(
        'https://project-angular-48822-default-rtdb.firebaseio.com/.json'
      )
      .subscribe((x:any)=>{
        console.log(x.post)
      })
  }


}
