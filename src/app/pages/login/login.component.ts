import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id = null;
  constructor() { }

  ngOnInit() {
    console.log("id", this.id);
  }
  getId() {
    console.log("id", this.id);

  }
}
