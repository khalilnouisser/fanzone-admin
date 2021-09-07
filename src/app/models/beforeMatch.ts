export interface BeforeMatch {
  homeHeartComposition: Composition;
  homeBetComposition: Composition;
  awayHeartComposition: Composition;
  awayBetComposition: Composition;
  pronoScore: number;
  pronoValidated: boolean;
  totalScore: number;
  _id: string;
  matchId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  formated_date: string;
  __v: number;
  prono: number;
}

interface Composition {
  lineups: CompositionLineup[];
  formation: string;
}

interface CompositionLineup {
  score?: any;
  _id?: string;
  playerId?: string;
  name?: string;
  position: number;
}
