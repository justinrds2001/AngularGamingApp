export class Review {
  id: Number | undefined;
  rating: Number = 0;
  oneliner: String = '';
  experience: String = '';
  plusPoints: String[] = [];
  minusPoints: String[] = [];
  postDate: Date = new Date();
}
