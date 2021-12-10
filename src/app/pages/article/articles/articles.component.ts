import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  subscription?: Subscription;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit() called');
    this.subscription = this.articleService
      .getArticles()
      .subscribe((articles) => {
        this.articles = articles;
        console.log('component articles: ' + this.articles);
      });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.subscription?.unsubscribe();
  }

  onDelete(id: any) {
    console.log('onDelete() called');
    if (confirm('Are you sure you want to delete this article?')) {
      console.log(id);
      this.articleService.removeArticle(id).subscribe(() => {
        console.log('Article was deleted');
        this.subscription = this.articleService
          .getArticles()
          .subscribe((articles) => {
            this.articles = articles;
            console.log('component articles: ' + this.articles);
          });
      });
    }
  }

  canEdit(userId: any) {
    console.log('can edit developers: ' + userId);
    return this.authService.userMayEditSync(userId);
  }
}
