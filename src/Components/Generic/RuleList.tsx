import React from "react";
import { Card, CardActions, CardContent, CardHeader, Paper, List, ListItem, ListItemText, makeStyles, createStyles } from "@material-ui/core";
import { v4 as uuidV4 } from "uuid";

import { usePagination } from "../../customHooks/usePagination";
import { Pagination } from "./Pagination";

interface RuleListProps {
    ruleList: string[];
    ruleChapter?: string;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",

        },
        ruleTitle: {
            alignSelf: "center"
        }
    }),
);

export const RuleList: React.FC<RuleListProps> = ({ ruleList, ruleChapter }) => {
    const { root, ruleTitle } = useStyles();
    const { page, itemsPerPage, handleChangeItemsPerPage, handleChangePage } =
        usePagination();


    return (
        <Card className={root} component={Paper}>
            <CardHeader
                className={ruleTitle}
                title={ruleChapter}
            />
            <CardContent>
                <List>
                    {!ruleList.length && "No rule found"}
                    {(itemsPerPage > 0
                        ? ruleList.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
                        : ruleList
                    ).map((rule) => (
                        <ListItem key={uuidV4()}>
                            <ListItemText>
                                <div>{rule}</div>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions disableSpacing>
                <Pagination
                    count={ruleList.length}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeItemsPerPage={handleChangeItemsPerPage}
                />
            </CardActions>
        </Card>
    );
}