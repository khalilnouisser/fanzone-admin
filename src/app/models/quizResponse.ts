export interface QuizResponse {
  totalScore: number;
  _id: string;
  answers: Answer[];
  numberMaxAnswers: number;
  quiz: string;
  type: number;
  userId: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  formated_date: string;
  __v: number;
}

interface Answer {
  _id: string;
  value: string;
  isCorrect: boolean;
  originalValue?: string;
}
