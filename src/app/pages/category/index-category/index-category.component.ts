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

  categories:any[] = [];

  ngOnInit(): void {


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
