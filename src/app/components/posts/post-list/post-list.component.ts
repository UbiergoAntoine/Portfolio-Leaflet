import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { computed } from 'mobx-angular';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  post: Post;
  constructor(
    public postService: PostService,
    private router: Router) { }
  ngOnInit() {
  }
  @computed get postsComputed() {
    if (this.postService.posts) {
      return this.postService.posts.filter(post => {
        return this.postService.themeFilter ? post.theme === this.postService.themeFilter : true;
      }).filter(post => {
        return this.postService.keyWordsFilter ? post.getKeyWords.includes(this.postService.keyWordsFilter.toLowerCase()) : true;
      }).filter(post => {
        return this.postService.titreFilter ? post.titre.toLowerCase() === this.postService.titreFilter.toLowerCase() : true;
      });
    }
  }
  onViewPost(id: string) {
    this.router.navigate(['/posts', 'view', id]);
  }
}
