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
  categories: any[] = [];

  cover!: File;
  infografis!: File;

  coverSrc: any;
  infografisSrc: any;

  // auth
  decoded: any;
  refreshToken: any;

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

    this.controlService.getCategories().subscribe((data: any) => {
      this.categories = data;
    })

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      userId: new FormControl(this.controlService.data.id, [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      infografis: new FormControl(''),
      cover: new FormControl('', [Validators.required]),
    });
  }
  processCover(event: any) {
    this.cover = event.target.files[0];
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);

      reader.onload = () => {
        this.coverSrc = reader.result as string;
        this.form.patchValue({
          image: reader.result,
          url: reader.result
        })
      }
    }
  }
  processInfografis(event: any) {
    this.infografis = event.target.files[0];
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);

      reader.onload = () => {
        this.infografisSrc = reader.result as string;
        this.form.patchValue({
          image: reader.result,
          url: reader.result
        })
      }
    }
  }

  makeOptional() {
    this.form.get('infografis')?.setValidators(null);
    this.form.get('infografis')?.updateValueAndValidity();
  }

  submit() {
    if (this.form.invalid) {
      this.errorMsg = 'Please fill all the fields';
      setTimeout(() => {
        this.errorMsg = null;
      }, 2000);
      return;
    }
    this.form.value.categoryId = Number(this.form.value.categoryId);
    this.form.value.userId = Number(this.form.value.userId);

    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('userId', this.form.value.userId);
    formData.append('categoryId', this.form.value.categoryId);
    formData.append('desc', this.form.value.desc);
    formData.append('cover', this.cover, this.cover.name);
    formData.append('infografis', this.infografis, this.infografis.name);

    this.controlService.createArticle(formData).subscribe((data: any) => {
      this.router.navigate(['/articles']);
    })
  }

}
