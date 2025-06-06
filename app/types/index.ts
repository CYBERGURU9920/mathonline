export interface ChapterData {
  subject: string;
  chapter: string;
  class: string;
  unit: string;
  yearWiseQuestionCount: {
    [key: string]: number;
  };
  questionSolved: number;
  status: "Not Started" | "In Progress" | "Completed";
  isWeakChapter: boolean;
  icon?: string; 
}

export interface YearStats {
  year2025: string;
  year2024: string;
  trend: "up" | "down" | "none";
  progress: string;
}
