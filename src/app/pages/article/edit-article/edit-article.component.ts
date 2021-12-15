import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Game } from '../../game/game.model';
import { GameService } from '../../game/game.service';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
  id: any;
  header: String = '';
  article: Article = new Article();
  subjectInput: any;
  subjectList: String[] = [];
  games: Game[] = [];
  routeSubscription?: Subscription;
  gamesSubscription?: Subscription;
  gameSubscription?: Subscription;
  userSubscription?: Subscription;
  articleSubscription?: Subscription;
  editArticleSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.header = !this.id ? 'Add Article' : 'Edit Article';
      this.gamesSubscription = this.gameService
        .getGames()
        .subscribe((games) => {
          this.games = games;
          if (this.id) {
            this.articleSubscription = this.articleService
              .getArticleById(this.id)
              .subscribe((article) => {
                this.article = article;
                this.subjectList = this.article.subjects.concat();
              });
          } else {
            this.article = new Article();
          }
        });
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.routeSubscription?.unsubscribe();
    this.gamesSubscription?.unsubscribe();
    this.gameSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.articleSubscription?.unsubscribe();
    this.editArticleSubscription?.unsubscribe();
  }

  onSubmit(form: NgForm) {
    let article: Article = {
      _id: undefined,
      title: form.value.title,
      content: form.value.content,
      postDate: new Date(),
      subjects: this.subjectList,
      game: form.value.game,
      createdBy: form.value.createdBy,
    };
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      article.createdBy = user!;
      this.gameSubscription = this.gameService
        .getGameById(form.value.game)
        .subscribe((game) => {
          article.game = game;
          console.log('OnSubmit: ' + form.value.game);
          console.log('OnSubmit: ' + article.game.name);
          if (!this.id || form.value.id === '') {
            this.editArticleSubscription = this.articleService
              .addArticle(article)
              .subscribe((article) => {
                console.log('added article' + article);
                this.router.navigate(['../'], { relativeTo: this.route });
              });
          } else {
            console.log(article);
            this.editArticleSubscription = this.articleService
              .updateArticle(this.id, article)
              .subscribe((updatedArticle) => {
                console.log('updated article' + updatedArticle);
                this.router.navigate(['../../'], { relativeTo: this.route });
              });
          }
        });
    });
  }

  addSubject() {
    this.subjectList.push(this.subjectInput);
    this.subjectInput = '';
  }

  deleteSubject(subject: String) {
    this.subjectList = this.subjectList.filter((item) => item != subject);
  }
}
