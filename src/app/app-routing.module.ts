
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { PostNewComponent } from './modals/post-new/post-new.component';
import { PostEditComponent } from './pages/post-edit/post-edit.component';
import { PostSingleComponent } from './pages/post-single/post-single.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ThemePageComponent } from './pages/theme-page/theme-page.component';
import { MapsComponent } from './pages/maps/maps.component';

const routes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/edit/:id', component: PostEditComponent },
  { path: 'posts/view/:id', component: PostSingleComponent },
  { path: 'posts-list', component: HomeComponent },
  { path: 'home', component: ThemePageComponent },
  { path: 'maps', component: MapsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
