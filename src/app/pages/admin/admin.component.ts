import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.goLogin();
  }
  
  goLogin() {
    this.router.navigate(["/login"], { relativeTo: this.route });
  }

  goHome() {
    this.router.navigate([""], { relativeTo: this.route });
  }
}
