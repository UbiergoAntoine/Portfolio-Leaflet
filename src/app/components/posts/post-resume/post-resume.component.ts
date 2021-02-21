import { Post } from './../../../models/post.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-resume',
  templateUrl: './post-resume.component.html',
  styleUrls: ['./post-resume.component.scss']
})
export class PostResumeComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }

}
