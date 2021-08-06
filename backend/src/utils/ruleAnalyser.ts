import _ from "lodash";

const ruleAnalyser = (ruleBook: string) => {
  const ruleBookSplitByLineBreak = ruleBook.split(`\r\n`);

  const chapters = _.uniq(
    ruleBookSplitByLineBreak.filter((rule) =>
      rule.match(/(?<!\s|\.)\d{3}\. [A-Z]\w.*/g)
    )
  );

  const chapterList = chapters.map((chapter) => {
    const chapterSplit = chapter.split(".");
    return {
      chapterId: chapterSplit[0],
      chapterTitle: chapterSplit[1].slice(1),
    };
  });

  const rules = _.uniq(
    ruleBookSplitByLineBreak.filter((rule) =>
      rule.match(/(?<!\s|\.)\d{3}\.[1-9].*/g)
    )
  );
  const ruleList = rules.map((rule) => {
    const ruleNumber = rule.match(
      /(?<!\s|\.)\d{3}((\.(\d{3}\w|\d{3}\.|\d{2}\w|\d{2}\.|\d{1}\w|\d{1}\.)|)|)/g
    );
    if (ruleNumber) {
      const ruleContent = rule.split(ruleNumber[0])[1];
      const ruleNumberSplit = ruleNumber[0].split(".");
      return {
        chapterId: ruleNumberSplit[0],
        ruleId: ruleNumberSplit[1],
        ruleContent: ruleContent.slice(1),
      };
    }
    return rule;
  });

  return {
    chapters: chapterList,
    rules: ruleList,
  };
};
export { ruleAnalyser };
