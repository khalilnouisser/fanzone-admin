import {User} from '@app/models/user';

export interface Fantazy {
  user: User;
  history: FantazyHistory[];
}

export interface FantazyHistory {
  createDate: string;
  playerId: string;
  type: number; // 0 -> Achat , 1 -> Vente
  value: number;
  agentValue: number;
}
