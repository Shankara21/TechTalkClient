import { ControlService } from './../../../Service/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-index-article',
  templateUrl: './index-article.component.html',
  styleUrls: ['./index-article.component.css']
})
export class IndexArticleComponent implements OnInit {

  constructor(public ControlService: ControlService, private router: Router, private cookieService: CookieService, private spinner: NgxSpinnerService) { }

  // pagination
  p: number = 1;
  itemsPerPage: number = 10;
  totalProduct: any;
  // search
  term: any;

  articles: any[] = [];

  msg: any;

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

    this.ControlService.getArticles().subscribe((data: any) => {
      this.spinner.show()
      this.articles = data;
      this.articles.map((item: any) => {
        item.index = this.articles.indexOf(item) + 1;
      })
      this.spinner.hide()
    })
  }

  deleteArticle(id: any) {
    this.msg = "Article Deleted Successfully"
    setTimeout(() => {
      this.msg = null;
    }, 2000);
    this.ControlService.deleteArticle(id).subscribe((data: any) => {
      this.ControlService.getArticles().subscribe((data: any) => {
        this.articles = data;
        this.articles.map((item: any) => {
          item.index = this.articles.indexOf(item) + 1;
        })
      })
    })
  }
}
