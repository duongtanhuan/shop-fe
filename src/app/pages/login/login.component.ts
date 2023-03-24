import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Auth } from "src/app/models/auth";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  auth: Auth = new Auth();
  authResponse: Auth = new Auth();
  invalidMessage: string;
  roles: string[];

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.auth = new Auth();
    this.auth.username = this.Username.value;
    this.auth.password = this.Password.value;

    this.authService.doPostCredentials(this.auth).subscribe({
      next: (data) => {
        this.authResponse = data;
        this.invalidMessage = null;
        this.roles = data.roles;
        var role = this.roles.find((s: string) => {
          return s == "admin";
        });
        if (role == "admin") {
          this.goAdmin();
        } else {
          this.goHome();
        }
      },
      error: (err) => {
        (this.invalidMessage = err.error.message),
          console.log("error", this.invalidMessage);
      },
    });
  }

  goAdmin() {
    this.router.navigate(["/", "admin", "item"], { relativeTo: this.route });
  }

  goHome() {
    this.router.navigate([""], { relativeTo: this.route });
  }

  get Username() {
    return this.loginForm.get("username");
  }

  get Password() {
    return this.loginForm.get("password");
  }
}
