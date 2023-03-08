import { ControlService } from './../../../Service/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-index-article',
  templateUrl: './index-article.component.html',
  styleUrls: ['./index-article.component.css']
})
export class IndexArticleComponent implements OnInit {

  constructor(public ControlService: ControlService, private router: Router, private cookieService: CookieService) { }

  articles:any[] = [];

  ngOnInit(): void {

    this.ControlService.getArticles().subscribe((data: any) => { 
      this.articles = data;
      this.articles.map((item: any) => {
        item.index = this.articles.indexOf(item) + 1;
      })
    })
  }

  deleteArticle(id: any) {
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
