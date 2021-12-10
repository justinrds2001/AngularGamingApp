import { Game } from 'src/app/pages/game/game.model';
import { User } from '../auth/user.model';

export class Article {
  _id: any;
  title: String = '';
  content: String = '';
  subjects: String[] = [];
  postDate: Date | undefined;
  game: Game = new Game();
  createdBy: User = new User();
}
