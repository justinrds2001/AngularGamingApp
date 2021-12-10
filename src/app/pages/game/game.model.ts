import { Developer } from 'src/app/pages/developer/developer.model';
import { User } from '../auth/user.model';

export class Game {
  _id: any;
  name: String = '';
  description: String = '';
  tags: String[] = [];
  releaseDate: Date | undefined;
  developer: Developer = new Developer();
  createdBy: User = new User();
}
