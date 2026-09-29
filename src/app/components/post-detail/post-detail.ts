import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './post-detail.html',
  styleUrl: 'post-detail.css'
})
export class PostDetail implements OnInit {

  id: number = 0;
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Post ID:', this.id);

    this.initData();
  }

  initData(): void {
    this.http.get<Post>(
      'https://localhost:7162/api/post/' + this.id
    ).subscribe({
      next: (data: Post) => {
        this.post = data;

        console.log('Post data:', this.post);

        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        console.log('Error loading post:', error);
      }
    });
  }
}