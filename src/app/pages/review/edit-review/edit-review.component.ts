import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Developer } from '../../developer/developer.model';
import { Game } from '../../game/game.model';
import { GameService } from '../../game/game.service';
import { Review } from '../review.model';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css'],
})
export class EditReviewComponent implements OnInit {
  reviewId: Number = 0;
  gameId: Number = 0;
  header: String = '';
  game: Game = new Game();
  review: Review = new Review();
  developer: String = '';
  plusPointInput: any;
  minusPointInput: any;
  rating: Number = 0;
  stars: boolean[] = Array(5).fill(false);
  plusPointList: String[] = [];
  minusPointList: String[] = [];

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.reviewId = Number(params.get('reviewid'));
      this.gameId = Number(params.get('id'));
      this.header = !this.reviewId ? 'Add Review' : 'Edit Review';
      this.game = this.gameService.getGameById(this.gameId);
      if (this.reviewId) {
        this.review = this.reviewService.getReviewById(
          this.game,
          this.reviewId
        );
      } else {
        this.review = new Review();
      }
    });
  }

  onSubmit(form: NgForm) {
    let review: Review = {
      id: form.value.id,
      rating: this.rating,
      oneliner: form.value.oneliner,
      experience: form.value.experience,
      plusPoints: this.plusPointList,
      minusPoints: this.minusPointList,
      postDate: new Date(),
    };
    if (!this.reviewId || form.value.id === '') {
      let lastReview =
        this.gameService.getReviews()[this.gameService.getReviews().length - 1];
      if (lastReview) {
        review.id = +lastReview.id! + 1;
      } else {
        review.id = 0;
      }
      this.game.reviews.push(review);
      this.gameService.updateGame(this.game);
    } else {
      review.id = this.reviewId;
      this.reviewService.updateReview(review, this.game);
      this.gameService.updateGame(this.game);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  rate(rating: Number) {
    console.log('rating', rating);
    this.rating = rating;
    this.stars = this.stars.map((_, i) => rating > i);
    console.log('stars', this.stars);
  }

  addPlusPoint() {
    this.plusPointList.push(this.plusPointInput);
    this.plusPointInput = '';
  }

  deletePlusPoint(plusPoint: String) {
    this.plusPointList = this.plusPointList.filter((item) => item != plusPoint);
  }

  addMinusPoint() {
    this.minusPointList.push(this.minusPointInput);
    this.minusPointInput = '';
  }

  deleteMinusPoint(minusPoint: String) {
    this.minusPointList = this.minusPointList.filter(
      (item) => item != minusPoint
    );
  }
}
