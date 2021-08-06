export interface Chapter {
  chapterId: string;
  chapterTitle: string;
}

export interface Rule {
  chapterId: string;
  ruleId: string;
  ruleContent: string;
}

export interface RuleBook {
  chapters: Chapter[];
  rules: Rule[];
}
