import { Developer } from 'src/app/pages/developer/developer.model';
import { Review } from '../review/review.model';

export class Game {
  id: Number | undefined;
  name: String = '';
  description: String = '';
  tags: String[] = [];
  releaseDate: Date | undefined;
  developer: Developer = new Developer();
  reviews: Review[] = [];
}
