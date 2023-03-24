import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Auth } from "src/app/models/auth";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  auth: Auth = new Auth();
  authResponse: Auth = new Auth();
  invalidMessage: string;
  roles: Array<any> = [""];

  loginForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
    roles: new FormArray([]),
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.loginForm);
  }

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
  
  setRoles(role: string, value: any) {
    if (value.target.checked) {
      this.roles.push(role);
    } else {
      this.roles.filter((r) => {
        return r !== role;
      });
    }
    console.log("rolet", this.roles);
    this.loginForm.patchValue({});
  }

  get Email() {
    return this.loginForm.get("email");
  }

  get Roles(): FormArray {
    return this.loginForm.get("roles") as FormArray;
  }
}
