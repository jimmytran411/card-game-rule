import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import Highlighter from "react-highlight-words";

import { useRuleSearch } from "../../Contexts/RuleSearchContext";
import { Chapter, Rule } from "../../common/interfaces";
import { useRuleBook } from "../../Contexts/RuleBookContext";

interface RuleFilterProps {
  rule: Rule;
  chapters: Chapter[];
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  highlight: {
    fontWeight: 800,
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  },
}));

export const RuleFilter: React.FC<RuleFilterProps> = ({ rule, chapters }) => {
  const { link, highlight } = useStyles();
  const { searchParam } = useRuleSearch();
  const { chapterId, ruleId, ruleContent } = rule;

  const inlineRules = getInlineRule(ruleContent);

  if (inlineRules) {
    let splitRegexpString = "";
    inlineRules.forEach((inlineRule) => {
      splitRegexpString += `(${inlineRule})`;
    });
    splitRegexpString = splitRegexpString.replaceAll(")(", ")|(");
    const splitRegexp = new RegExp(splitRegexpString, "gi");
    const ruleSplit = ruleContent.split(splitRegexp);

    const chapterLink = inlineRules.reduce(
      (chapterLink: string[], rule: string) => {
        const isRule = rule.match(/\d{3}/g) ?? "see rule";
        const chapter = chapters.find(({ chapterId }) =>
          chapterId.includes(isRule[0])
        );
        chapter &&
          chapterLink.push(
            `${chapter.chapterId}-${chapter.chapterTitle.replace(
              /\s|\./g,
              "-"
            )}`
          );
        return chapterLink;
      },
      []
    );

    return (
      <>
        <HyperLinkChapter
          searchParam={searchParam}
          chapterIdFromRule={chapterId}
          ruleId={ruleId}
        />
        {ruleSplit.map((fragment) => {
          if (fragment) {
            const ruleLink = inlineRules.find((rule) =>
              fragment.includes(rule)
            );

            return !ruleLink ? (
              <Highlighter
                key={v4()}
                searchWords={[searchParam]}
                textToHighlight={fragment}
                highlightClassName={highlight}
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
    return (
      <>
        <HyperLinkChapter
          searchParam={searchParam}
          chapterIdFromRule={chapterId}
          ruleId={ruleId}
        />
        <Highlighter
          searchWords={[searchParam]}
          textToHighlight={ruleContent}
          highlightClassName={highlight}
        />
      </>
    );
  }
};

function getInlineRule(rule: string) {
  const inlineRules = rule.match(
    /(rule|see|rules|and) \d{3}((\.(\d{3}\w|\d{3}|\d{2}\w|\d{2}|\d{1}\w|\d{1})|)|)/gi
  );

  return inlineRules;
}

interface HyperLinkChapterProps {
  searchParam: string;
  chapterIdFromRule: string;
  ruleId: string;
}

const HyperLinkChapter: React.FC<HyperLinkChapterProps> = ({
  searchParam,
  chapterIdFromRule,
  ruleId,
}) => {
  const { chapters } = useRuleBook().ruleBook;
  const { link } = useStyles();

  const getChapterLink = (chapterId: string) => {
    const matchChapter = chapters.find(
      (chapter) => chapter.chapterId === chapterId
    );
    if (matchChapter) {
      return `${matchChapter.chapterId}-${matchChapter.chapterTitle.replace(
        /\s|\./g,
        "-"
      )}`;
    }
  };
  return (
    <>
      {searchParam.length ? (
        <Link
          className={link}
          to={`/rules/${getChapterLink(chapterIdFromRule)}`}
        >
          {`${chapterIdFromRule}.${ruleId}  `}
        </Link>
      ) : (
        `${ruleId}. `
      )}
    </>
  );
};
