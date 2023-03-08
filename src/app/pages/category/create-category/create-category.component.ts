
import { ControlService } from './../../../Service/control.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, public controlService: ControlService) { }

  form!: FormGroup;
  errorMsg: any;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  submit() {
    if (this.form.invalid) {
      this.errorMsg = 'Please fill all the fields';
      setTimeout(() => {
        this.errorMsg = null;
      }, 2000);
      return;
    }
    this.controlService.createCategory(this.form.value).subscribe((data: any) => { 
      this.router.navigate(['/categories']);
    })
  }
}
