import { PostService } from './../../services/post.service';
import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { computed, observable } from 'mobx-angular';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ThemeFormComponent } from 'src/app/modals/theme-form/theme-form.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-theme-page',
  templateUrl: './theme-page.component.html',
  styleUrls: ['./theme-page.component.scss']
})
export class ThemePageComponent implements OnInit {
  defaultElevation = 2;
  raisedElevation = 8;
  // post: Post;
  constructor(
    private authGuardService: AuthGuardService,
    public dialog: MatDialog,
    public postService: PostService,
    public themeService: ThemeService,
    private router: Router) { }

  ngOnInit() {
  }
  @computed get userSigned(): boolean {
    return this.authGuardService.isSigned;
  }
  @computed get allThemes() {
    return this.themeService.themes;
  }
  selectTheme(themeName: string) {
    this.postService.themeFilter = themeName;
    console.log('VALUE DU THEME FILTER', this.postService.themeFilter);
    this.router.navigate(['/posts-list']);
  }

  openThemeForm(): void {
    this.dialog.open(ThemeFormComponent);
  }
  // @computed get firstPost() {
  //   return this.postService.getFilteredPosts[0];
  // }
  // @computed get secondPost() {
  //   return this.postService.getFilteredPosts[1];
  // }
  // @computed get thirdPost() {
  //   return this.postService.getFilteredPosts[2];
  // }
  // @computed get otherPosts() {
  //   return this.postService.getFilteredPosts.slice(3);
  // }
}
