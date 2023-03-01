export interface Player {
  likes: number;
  disLikes: number;
  score: number;
  _id: string;
  voteId: string;
  name: string;
  photo: string;
}

export interface Goat {
  startDate: Date;
  endDate: Date;
  plays: any[];
  _id: string;
  name: string;
  icon: string;
  players: Player[];
  createdAt: Date;
  updatedAt: Date;
  formated_start_date: String;
  formated_end_date: String;
  formated_date: String;
  __v: number;
}
