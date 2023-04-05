import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ADMIN_ROLE, USER_ROLE } from 'src/app/constant/utilities';
import { Auth } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';
import { mustMatch } from '../../helpers/must-match.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  auth: Auth = new Auth();
  authResponse: Auth = new Auth();
  message: string;
  roles: Array<any> = [];
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        roles: this.fb.array([this.fb.control('user')]),
      },
      {
        validator: mustMatch('password', 'confirmPassword'),
      }
    );
  }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.doPostRegisterAccount(this.registerForm.value).subscribe({
      next: (data) => {
        this.message = data.message;
      },
      error: (e) => {
        this.message = e.error.message;
      },
    });
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  goAdmin() {
    this.router.navigate(['/', 'admin', 'item'], { relativeTo: this.route });
  }

  goHome() {
    this.router.navigate([''], { relativeTo: this.route });
  }

  get f() {
    return this.registerForm.controls;
  }

  get Username() {
    return this.registerForm.get('username');
  }

  get Password() {
    return this.registerForm.get('password');
  }

  addRoles() {
    this.Roles.push(this.fb.control(''));
  }

  removeRoles() {
    this.Roles.removeAt(0);
  }

  setRoles(role: string, value: any) {
    const checkRole = this.roles.filter((r) => {
      return r === ADMIN_ROLE || r === USER_ROLE;
    });

    if (value.target.checked) {
      if (!checkRole.includes(ADMIN_ROLE) || !checkRole.includes(USER_ROLE)) {
        this.addRoles();
        this.roles.push(role);
      }
    } else {
      this.roles = this.roles.filter((r) => {
        return r !== role;
      });
      this.removeRoles();
    }
    this.registerForm.patchValue({
      roles: this.roles,
    });
  }

  get Email() {
    return this.registerForm.get('email');
  }

  get Roles(): FormArray {
    return this.registerForm.get('roles') as FormArray;
  }
}
