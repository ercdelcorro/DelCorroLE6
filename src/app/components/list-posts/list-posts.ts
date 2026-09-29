import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-list-posts',
  styleUrl: 'list-posts.css',
  templateUrl: 'list-posts.html',
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