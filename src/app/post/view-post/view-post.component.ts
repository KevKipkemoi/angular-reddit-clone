import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];

  constructor(
    // private postService: PostService,
    // private activeRoute: ActivatedRoute,
    // private commentService: CommentService,
    // private router: Router
  ) {
    // this.postId = this.activeRoute.snapshot.params.id;
    // this.postService.getPost(this.postId).subscribe(data => {
    //   this.post = data;
    // }, error => {
    //   throwError(error);
    // });
  }

  ngOnInit(): void {
  }

}
