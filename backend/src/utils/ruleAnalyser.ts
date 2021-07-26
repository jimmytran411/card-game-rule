import _ from 'lodash';

const ruleAnalyser = (ruleBook: string) => {
  const ruleSplitByLineBreak = ruleBook.split(`\r\n`);

  const sections = _.uniq(ruleSplitByLineBreak.filter((rule) => rule.match(/(?<!\s|\.)\d{1}\. [A-Z]\w.*/g)));
  const chapters = _.uniq(ruleSplitByLineBreak.filter((rule) => rule.match(/(?<!\s|\.)\d{3}\. [A-Z]\w.*/g)));
  const rules = _.uniq(ruleSplitByLineBreak.filter((rule) => rule.match(/(?<!\s|\.)\d{3}\.[1-9].*/g)));

  return {
    sections,
    chapters,
    rules,
  };
};
export { ruleAnalyser };
