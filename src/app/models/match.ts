import {BeforeMatch} from '@app/models/beforeMatch';

export interface Match {
  formated_date: string;
  favoriteTeamsLineups: FavoriteTeamsLineups;
  liveRatingAverage: LiveRatingAverage;
  prono: Prono;
  extraExplain: ExtraExplain;
  liveRatings: LiveRating[];
  beforeMatchPlayes: BeforeMatch[];
  isMatchEnded: boolean;
  isRatingEnded: boolean;
  isStatsCalculated: boolean;
  liveRatingsPlays: number;
  compoPlays: number;
  pronoPlays: number;
  _id: string;
  matchId: string;
  leagueType: number;
  leagueId: string;
  leagueName: string;
  leagueShortName: string;
  subLeagueId: string;
  subLeagueName: string;
  matchTime: number;
  halfStartTime: number;
  status: number;
  homeId: string;
  homeName: string;
  awayId: string;
  awayName: string;
  homeScore: number;
  awayScore: number;
  season: string;
  round: string;
  group: string;
  location: string;
  weather: string;
  temperature: string;
  hasLineup: boolean;
  events: Event[];
  homeLineup: HomeLineup[];
  awayLineup: AwayLineup[];
  homeBackup: HomeBackup[];
  awayBackup: AwayBackup[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  awayLeagueRank: number;
  homeLeagueRank: number;
  stats: Stat[];
  awayFormation: string;
  homeFormation: string;
  lastSeenMessages: any[];
  matchEndTime: number;
  matchEndVoteTime: number;
}

export interface FavoriteTeamsLineups {
  homeLineup: any[];
  awayLineup: any[];
  homeBackup: any[];
  awayBackup: any[];
}

export interface LiveRatingAverage {
  matchRating: number;
  arbitratorRating: number;
  coachARating: number;
  coachBRating: number;
  playersRating: PlayersRating[];
}

export interface PlayersRating {
  rate: number;
  new_rate: number;
  _id: string;
  playerId: string;
}

export interface Prono {
  numberHome: number;
  numberDraw: number;
  numberAway: number;
}

export interface ExtraExplain {
  kickOff: number;
  minute: number;
  homeScore: number;
  awayScore: number;
  extraTimeStatus: number;
  extraHomeScore: number;
  extraAwayScore: number;
  penHomeScore: number;
  penAwayScore: number;
  twoRoundsHomeScore: number;
  twoRoundsAwayScore: number;
  winner: number;
}

export interface LiveRating {
  lastScore: number;
  hasDisplayedLineUpQuestion: boolean;
  hasDisplayedWinnerQuestion: boolean;
  hasDisplayedFavoriteLineUpQuestion: boolean;
  isTheTopUser: boolean;
  _id: string;
  matchId: string;
  team: number;
  userId: UserId;
  homeId: string;
  awayId: string;
  playersRating: any[];
  questions_response: any[];
  createdAt: string;
  updatedAt: string;
  isHomeValidated: boolean;
  isAwayValidated: boolean;
  __v: number;
}

export interface UserId {
  avatar_options: AvatarOptions;
  favorite_team: FavoriteTeam;
  favorite_euro_team: FavoriteEuroTeam;
  stats: Stats;
  businesses: any[];
  groups: any[];
  friends: string[];
  img_type: string;
  img_url: string;
  avatar: string;
  leagues: string[];
  status: number;
  level: number;
  status_level: number;
  previous_status_level: number;
  community_visibility: number;
  total_score: number;
  beforeMatchsScore: number;
  fantazyScore: number;
  battleScore: number;
  wallScore: number;
  compoScore: number;
  pronoScore: number;
  liveRatingsScore: number;
  compoFavoriteTeamScore: number;
  pronoFavoriteTeamScore: number;
  liveFavoriteTeamRatingsScore: number;
  quizScore: number;
  followedTeams: any[];
  followedUsers: any[];
  language: string;
  languageFilter: number;
  cguAccepted: boolean;
  deleted: boolean;
  devices: any[];
  state: number;
  _id: string;
  full_name: string;
  pseudo: string;
  email: string;
  password: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  code: string;
  governorate: Governorate;
  region: Region;
  lastConnectionDate: string;
  status_level_change_date: string;
  alerts: any[];
}

export interface AvatarOptions {
  topType: number;
  accessoriesType: number;
  hairColor: number;
  facialHairType: number;
  facialHairColor: number;
  clotheType: number;
  eyeType: number;
  eyebrowType: number;
  mouthType: number;
  skinColor: number;
  clotheColor: number;
  style: number;
  graphicType: number;
}

export interface FavoriteTeam {
  teamId: string;
  leagueId: string;
  name: string;
  logo: string;
}

export interface FavoriteEuroTeam {
  teamId: string;
  leagueId: string;
  name: string;
  logo: string;
}

export interface Stats {
  totalScore: number;
  lastThreeMonthsPoints: number;
  totalWallPoints: number;
  lastThreeMonthsWallPoints: number;
  wallReactions: number;
  numberFantazyHistories: number;
  friends: number;
  liveRatingScores: number;
  followers: number;
  favTeamAvgRating: number;
  userQuizzes: number;
  winQuizzesAvg: number;
  userBattles: number;
  winBattleAvg: number;
  bestRatingPlayer: number;
  favTeamBestRating: number;
  knowledge: number;
  addiction: number;
  fidelity: number;
  contribution: number;
  reliability: number;
}

export interface Governorate {
  regions: string[];
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Region {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Event {
  _id: string;
  eventId: string;
  minute: string;
  type: number;
  playerId: string;
  playerName: string;
  assistPlayerId: string;
  homeEvent: boolean;
}

export interface HomeLineup {
  _id: string;
  playerId: string;
  name: string;
  number: number;
  position: number;
  played: boolean;
}

export interface AwayLineup {
  _id: string;
  playerId: string;
  name: string;
  number: number;
  position: number;
  played: boolean;
}

export interface HomeBackup {
  _id: string;
  playerId: string;
  name: string;
  number: number;
  position: number;
  played: boolean;
}

export interface AwayBackup {
  _id: string;
  playerId: string;
  name: string;
  number: number;
  position: number;
  played: boolean;
}

export interface Stat {
  type: number;
  _id: string;
  home: string;
  away: string;
}
