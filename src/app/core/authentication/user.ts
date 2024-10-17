import { User } from './interface';

export const admin: User = {
  id: 1,
  name: 'Guillermo',
  email: 'memo@caracol.com',
  avatar: 'images/avatar.jpg',
};

export const guest: User = {
  name: 'Daniel',
  email: 'unknown',
  avatar: 'images/avatar-default.jpg',
};
