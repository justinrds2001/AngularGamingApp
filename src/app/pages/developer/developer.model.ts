import { User } from '../auth/user.model';

export class Developer {
  _id: any;
  name: String = '';
  headquartersLocation: String = '';
  dateOfEstablishment: Date | undefined;
  founders: String[] = [];
  website: URL | undefined;
  createdBy: User = new User();
}
