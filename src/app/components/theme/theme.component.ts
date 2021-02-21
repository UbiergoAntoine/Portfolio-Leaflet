import { ThemeService } from './../../services/theme.service';
import { Theme } from './../../models/theme.model';
import { PostService } from './../../services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { computed } from 'mobx-angular';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input() theme: Theme;

  // theme: Theme;
  constructor(
    public postService: PostService,
    public themeService: ThemeService,

    private router: Router) { }

  ngOnInit() {
  }
  @computed get firstPost() {
    return this.postService.getFilteredPosts[0];
  }
  @computed get secondPost() {
    return this.postService.getFilteredPosts[1];
  }
  @computed get thirdPost() {
    return this.postService.getFilteredPosts[2];
  }
  @computed get otherPosts() {
    return this.postService.getFilteredPosts.slice(3);
  }

  // @computed get themeList() {
  //   this.themeService.getThemeList
  // }
}
