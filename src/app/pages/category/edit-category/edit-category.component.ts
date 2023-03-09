import { ControlService } from './../../../Service/control.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, public controlService: ControlService) { }
  // auth
  decoded: any;
  refreshToken: any;


  form!: FormGroup;
  errorMsg: any;
  id: any;
  category: any;

  ngOnInit(): void {
    const token = this.cookieService.get('techTalkToken');

    if (!token) {
      this.router.navigate(['/login']);
    }
    this.refreshToken = new FormGroup({
      refreshToken: new FormControl(token)
    })
    this.controlService.refreshToken(this.refreshToken.value).subscribe((res: any) => {
      this.decoded = jwt_decode(res.accessToken);
      this.controlService.data = {
        username: this.decoded.username,
        email: this.decoded.email,
        fullname: this.decoded.fullname,
        userLevel: this.decoded.userLevel,
        id: this.decoded.id
      }
    });

    this.id = this.router.url.split('/')[2];
    this.controlService.showCategories(this.id).subscribe((data: any) => {
      this.category = data;
      this.form = new FormGroup({
        name: new FormControl(this.category.name, [Validators.required]),
      });
    })
  }
  submit() {
    if (this.form.invalid) {
      this.errorMsg = 'Please fill all the fields';
      setTimeout(() => {
        this.errorMsg = null;
      }, 2000);
      return;
    }
    this.controlService.updateCategory(this.id, this.form.value).subscribe((data: any) => {
      this.router.navigate(['/categories']);
    })
  }

}
