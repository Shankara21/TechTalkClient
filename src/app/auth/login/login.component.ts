import { ControlService } from 'src/app/Service/control.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  show = false;
  constructor(private router: Router, private ControlService: ControlService, private cookieService: CookieService) { }
  form!: FormGroup
  errorMsg: any;
  ngOnInit(): void {
    if (this.cookieService.get('techTalkToken')) {
      this.router.navigate(['/dashboard']);
    }
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  submit() {
    if (this.form.invalid) {
      this.errorMsg = 'Please enter valid email and password';
      setTimeout(() => {
        this.errorMsg = null;
      }, 2000);
      return;
    }
    this.ControlService.login(this.form.value).subscribe((res: any) => {
      this.cookieService.set('techTalkToken', res.token, 4 / 24);
      this.router.navigate(['/dashboard']);
    }, (err: any) => {
      this.errorMsg = err.error.message;
    });

  }
}
