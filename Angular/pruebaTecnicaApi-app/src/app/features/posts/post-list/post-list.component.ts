import { CommonModule } from '@angular/common';//habilita directivas estándar como *ngIf, *ngFor.
import { Component, OnInit } from '@angular/core';//Component, OnInit: para crear un componente Angular y usar su ciclo de vida.
import { RouterLink } from '@angular/router';//RouterLink: para poder navegar entre rutas desde el HTML.
import { PostService } from '../../../core/services/post.service';
import { Post } from '../../../core/models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  apiState = {
    loading: true,
    error: ''
  };

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.apiState = { loading: true, error: '' };
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.apiState = { loading: false, error: '' };
      },
      error: (err) => {
        this.apiState = { loading: false, error: err.message };
      }
    });
  }


  trackByPostId(index: number, post: Post): number {
    return post.id; // Mejora performance en listas grandes
  }

}
