import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-posts',
  imports: [CommonModule],
  templateUrl: './list-posts.html',
  styleUrl: './list-posts.css'
})
export class ListPosts implements OnInit {

  posts?: Post[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.http.get<Post[]>('https://localhost:7162/api/post').subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        this.changeDetectorRef.markForCheck();
        console.log(this.posts);
      }
    });
  }
}