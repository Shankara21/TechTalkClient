import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IndexArticleComponent } from './pages/article/index-article/index-article.component';
import { EditArticleComponent } from './pages/article/edit-article/edit-article.component';
import { CreateArticleComponent } from './pages/article/create-article/create-article.component';
import { IndexCategoryComponent } from './pages/category/index-category/index-category.component';
import { CreateCategoryComponent } from './pages/category/create-category/create-category.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetailArticleComponent } from './pages/detail-article/detail-article.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IndexArticleComponent,
    EditArticleComponent,
    CreateArticleComponent,
    IndexCategoryComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    DetailArticleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
