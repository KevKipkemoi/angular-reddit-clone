import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostTileComponent implements OnInit {
  posts$: Array<any>;
  faComments = faComments;

  constructor(
    private router: Router,
    private postService: PostService
  ) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts$ = post;
    });
  }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
