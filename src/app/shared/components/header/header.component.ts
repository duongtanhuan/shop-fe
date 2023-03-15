import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  goMyOrder() {
    this.router.navigate(['my-order'], { relativeTo: this.route });
  }
  
  goHome() {
    this.router.navigate(['home'], { relativeTo: this.route });
  }

  goCart() {
    this.router.navigate(['cart'], { relativeTo: this.route });
  }
}
