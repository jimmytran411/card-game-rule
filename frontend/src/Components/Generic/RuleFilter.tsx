import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import Highlighter from "react-highlight-words";

import { useRuleSearch } from "../../Contexts/RuleSearchContext";

interface RuleFilter {
  rule: string;
  chapters: string[];
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

export const RuleFilter: React.FC<RuleFilter> = ({ rule, chapters }) => {
  const { link } = useStyles();
  const { searchParam } = useRuleSearch();

  const inlineRules = getInlineRule(rule);

  if (inlineRules) {
    let splitRegexpString = "";
    inlineRules.forEach((inlineRule) => {
      splitRegexpString += `(${inlineRule})`;
    });
    splitRegexpString = splitRegexpString.replaceAll(")(", ")|(");
    const splitRegexp = new RegExp(splitRegexpString, "gi");
    const ruleSplit = rule.split(splitRegexp);

    const chapterLink = inlineRules.reduce((chapterLink: string[], rule: string) => {
      const isRule = rule.match(/\d{3}/g) ?? "see rule";
      const chapter = chapters.find((chapter) => chapter.includes(isRule[0]));
      chapter && chapterLink.push(chapter.replace(/\s|\./g, "-"));
      return chapterLink;
    }, []);

    return (
      <>
        {ruleSplit.map((fragment) => {
          if (fragment) {
            const ruleLink = inlineRules.find((rule) => fragment.includes(rule));

            return !ruleLink ? (
              <Highlighter
                key={v4()}
                searchWords={[searchParam]}
                textToHighlight={fragment}
              />
            ) : (
              <React.Fragment key={v4()}>
                {ruleLink.split(" ")[0] + " "}
                <Link
                  className={link}
                  to={`/rules/${chapterLink[inlineRules.indexOf(ruleLink)]}`}
                >
                  {ruleLink.split(" ")[1]}
                </Link>
              </React.Fragment>
            );
          }
          return;
        })}
      </>
    );
  } else {
    return <Highlighter searchWords={[searchParam]} textToHighlight={rule} />;
  }
};

function getInlineRule(rule: string) {
  const inlineRules = rule.match(
    /(rule|see|rules|and) \d{3}((\.(\d{3}|\d{3}\w|\d{2}\w|\d{2}|\d{1}\w|\d{1})|)|)/gi
  );

  return inlineRules;
}
