import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { observable, computed } from 'mobx-angular';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {


  @observable postId: string;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params.id;
    });
  }

  @computed get post() {
    return this.postService.getSinglePost(this.postId);
  }


}
