import { EditArticleComponent } from './pages/article/edit-article/edit-article.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';
import { CreateCategoryComponent } from './pages/category/create-category/create-category.component';
import { CreateArticleComponent } from './pages/article/create-article/create-article.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { IndexCategoryComponent } from './pages/category/index-category/index-category.component';
import { IndexArticleComponent } from './pages/article/index-article/index-article.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'articles', component: IndexArticleComponent },
  { path: 'articlesCreate', component: CreateArticleComponent },
  { path: 'articles/:id', component: EditArticleComponent },
  { path: 'categories', component: IndexCategoryComponent },
  { path: 'categoriesCreate', component: CreateCategoryComponent },
  { path: 'categories/:id', component: EditCategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
