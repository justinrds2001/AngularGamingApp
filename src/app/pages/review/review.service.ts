import { Injectable } from '@angular/core';
import { Game } from '../game/game.model';
import { Review } from './review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor() {}

  getReviewById(game: Game, id: Number) {
    return game.reviews.filter((review) => review.id === id)[0];
  }

  getReviewsByGame(game: Game) {
    return game.reviews;
  }

  updateReview(review: Review, game: Game) {
    let oldReview = game.reviews.find((x) => x.id === review.id)!;
    oldReview.rating = review.rating;
    oldReview.oneliner = review.oneliner;
    oldReview.experience = review.experience;
    oldReview.plusPoints = review.plusPoints;
    oldReview.minusPoints = review.minusPoints;
    oldReview.postDate = new Date();
  }
}
