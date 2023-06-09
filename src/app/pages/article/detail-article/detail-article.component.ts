import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css'],
})
export class DetailArticleComponent implements OnInit {
  article: Article = new Article();
  id: any;
  routeSubscription?: Subscription;
  articleSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.articleSubscription = this.articleService
        .getArticleById(this.id)
        .subscribe((article) => {
          this.article = article;
          console.log('component article: ' + this.article);
        });
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.routeSubscription?.unsubscribe();
    this.articleSubscription?.unsubscribe();
  }
}
