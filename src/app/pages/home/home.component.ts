import { PostService } from './../../services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { computed, observable } from 'mobx-angular';
import { Post } from 'src/app/models/post.model';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() theme: Theme;
  @observable themes: Theme[] = [];
  @Input() post: Post;
  @observable darkMode;
  constructor(
    public postService: PostService,
    private router: Router) { }

  ngOnInit() { }
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

  @computed get postsWhithoutTheme() {
    return this.postService.postsWhithoutTheme;
  }
}
