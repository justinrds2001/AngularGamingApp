export class Developer {
  id: number = 0;
  name: string = '';
  foundedInLocation: String = '';
  foundedAtDate: Date = new Date();

  constructor(name = '', foundedInLocation = '', foundedAtDate = new Date()) {
    this.name = name;
    this.foundedInLocation = foundedInLocation;
    this.foundedAtDate = foundedAtDate;
  }
}