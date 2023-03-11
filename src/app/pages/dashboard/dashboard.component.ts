import { ControlService } from './../../Service/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from "ngx-cookie-service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public ControlService: ControlService, private router: Router, private cookieService: CookieService) { }

  // pagination
  p: number = 1;
  itemsPerPage: number = 10;
  totalProduct: any;
  // search
  term: any;

  articles: any[] = [];
  categories: any[] = [];

  // auth
  decoded: any;
  refreshToken: any;

  category!: FormGroup;


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
    })
    this.ControlService.getArticles().subscribe((data: any) => {
      this.articles = data;
    })

    this.category = new FormGroup({
      name: new FormControl('', [Validators.required]),
    })
  }
  filterCategory() {
    this.ControlService.filterCategory(this.category.value.name).subscribe((data: any) => {
      this.articles = data;
    })
  }
  refresh() {
    this.ControlService.getArticles().subscribe((data: any) => {
      this.articles = data;
    })
  }

}
