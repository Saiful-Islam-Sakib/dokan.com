import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import SmallCard from "./SmallCard";
import { Button, CardActions, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function OutlinedCard() {
    const classes = useStyles();

    return (
        <div style={{ marginBottom: 50 }}>
            <Typography variant="h5" gutterBottom component="p">
                {"Health & Care"}
            </Typography>
            <Card>
                <Card className={classes.root} variant="outlined">
                    {/* 7 ta eliment show hobe er beshi na */}
                    <SmallCard></SmallCard>
                    <SmallCard></SmallCard>
                    <SmallCard></SmallCard>
                    <SmallCard></SmallCard>
                    <SmallCard></SmallCard>
                    <SmallCard></SmallCard>
                    <SmallCard></SmallCard>
                </Card>
                <CardActions
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button size="small">more</Button>
                </CardActions>
            </Card>
        </div>
    );
}
