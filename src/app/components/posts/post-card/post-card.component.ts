import { Post } from './../../../models/post.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;
  @Input() elevation = '8';
  test: number;
  constructor() { }

  ngOnInit() {
  }

}
