import { ControlService } from 'src/app/Service/control.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';


@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  constructor(public ControlService: ControlService, private router: Router, private cookieService: CookieService) { }

  article: any;
  id: any;
  msg: any;
  diffTime: any;

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

    this.id = this.router.url.split('/')[2];
    this.ControlService.showArticles(this.id).subscribe((data: any) => {
      this.article = data;
      // membuat waktu yang sudah berlalu
      setTimeout(() => {
        this.diffTime = moment(this.article.createdAt).fromNow();
      }, 1000);
      console.log(this.diffTime);
    })
  }

}
