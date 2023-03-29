import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Auth } from "src/app/models/auth";
import { AuthService } from "../../services/auth.service";
import { CommonService } from "../../services/common.service";

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
  submitted = false;
  loginForm: FormGroup;
  isRole: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.auth = new Auth();
    this.auth.username = this.Username.value;
    this.auth.password = this.Password.value;

    this.authService.doPostCredentials(this.auth).subscribe({
      next: (data) => {
        this.commonService.setCustomerId(data.id);
        this.commonService.setToken(data.token)

        this.authResponse = data;
        this.invalidMessage = null;
        this.roles = data.roles;
        this.roles.filter((s: string) => {
          return s == "admin";
        });
        if (this.roles.includes("admin") && this.roles.includes("user")) {
          this.isRole = "user_admin";
          this.goAdmin();
        } else if (this.roles.includes("admin")) {
          this.isRole = "admin";
          this.goAdmin();
        } else {
          this.isRole = "user";
          this.goHome();
        }
        this.commonService.setIsRole(this.isRole);
      },
      error: (err) => {
        this.invalidMessage = err.error.message;
      },
    });
    this.onReset();
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
