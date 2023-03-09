import { ControlService } from './../../../Service/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.css']
})
export class IndexCategoryComponent implements OnInit {

  constructor(public ControlService: ControlService, private router: Router, private cookieService: CookieService) { }
  // pagination
  p: number = 1;
  itemsPerPage: number = 10;
  totalProduct: any;
  // search
  term: any;

  // auth
  decoded: any;
  refreshToken: any;

  categories: any[] = [];

  ngOnInit(): void {

    const token = this.cookieService.get('techTalkToken');

    if (!token) {
      this.router.navigate(['/login']);
    }
    this.refreshToken = new FormGroup({
      refreshToken: new FormControl(token)
    })
    this.ControlService.refreshToken(this.refreshToken.value).subscribe((res: any) => {
      this.decoded = jwt_decode(res.accessToken);
      this.ControlService.data = {
        username: this.decoded.username,
        email: this.decoded.email,
        fullname: this.decoded.fullname,
        userLevel: this.decoded.userLevel,
        id: this.decoded.id
      }
    });

    this.ControlService.getCategories().subscribe((data: any) => {
      this.categories = data;
      this.categories.map((item: any) => {
        item.index = this.categories.indexOf(item) + 1;
      })
    })
  }
  deleteCategory(id: any) {
    this.ControlService.deleteCategory(id).subscribe((data: any) => {
      this.ControlService.getCategories().subscribe((data: any) => {
        this.categories = data;
        this.categories.map((item: any) => {
          item.index = this.categories.indexOf(item) + 1;
        })
      })
    })
  }
}
