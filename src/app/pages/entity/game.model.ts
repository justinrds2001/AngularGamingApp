import { Developer } from './developer.model';

export class Game {
  id: number = 0;
  name: string = '';
  description: String = '';
  tags: string[] = [];
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
