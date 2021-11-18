import { Developer } from 'src/app/developer/developer.model';

export class Game {
  id: Number | undefined;
  name: String = '';
  description: String = '';
  tags: String[] = [];
  releaseDate: Date = new Date();
  developer: Developer = new Developer();

  constructor(
    name = '',
    description = '',
    tags = [],
    releaseDate = new Date(),
    developer = new Developer()
  ) {
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.releaseDate = releaseDate;
    this.developer = developer;
  }
}
