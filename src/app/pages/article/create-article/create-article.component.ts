import { ControlService } from './../../../Service/control.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, public controlService: ControlService) { }

  form!: FormGroup;
  errorMsg: any;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      infografis: new FormControl(''),
      cover: new FormControl('', [Validators.required]),
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
    this.controlService.createArticle(this.form.value).subscribe((data: any) => {
      this.router.navigate(['/articles']);
    })
  }

}
