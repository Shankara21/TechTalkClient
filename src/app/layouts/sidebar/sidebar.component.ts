import { CookieService } from 'ngx-cookie-service';
import { ControlService } from 'src/app/Service/control.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showCategory = false;
  showDropdwon = false;
  constructor(public router: Router, public ControlService: ControlService, private cookieService: CookieService) { }
  // auth
  decoded: any;
  refreshToken: any;
  id: any
  token: any;

  ngOnInit(): void {
     this.token = this.cookieService.get('techTalkToken');

    if (!this.token) {
      this.router.navigate(['/login']);
    }
    this.refreshToken = new FormGroup({
      refreshToken: new FormControl(this.token)
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
  }

  logout() {
    this.ControlService.logout(this.token).subscribe((res: any) => {
      this.cookieService.delete('techTalkToken');
      this.router.navigate(['/login']);
    })
  }
}
