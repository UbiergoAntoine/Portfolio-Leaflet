import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-bandeau',
  templateUrl: './bandeau.component.html',
  styleUrls: ['./bandeau.component.scss']
})
export class BandeauComponent implements OnInit {

  @Input() post: Post;

  @Input() showMore = false;
  constructor() { }

  ngOnInit() {
  }

}
