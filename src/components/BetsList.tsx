import React, { Dispatch } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Typography } from "@material-ui/core";
import { IBetList } from "./Dashboard";
import { AppActions } from "../reducer/reducer";

interface IBetsList {
	classes?: Partial<string>;
	bets: IBetList[]
    dispatch: Dispatch<AppActions>
}

const useStyles = makeStyles((theme: any) => ({
    root: {
        display: "flex",
		flexWrap: "wrap",
        justifyContent: "center",
		"& > *": {
			margin: "1rem 2rem",
			width: theme.spacing(60),
			height: theme.spacing(25),
            borderRadius: "10px"
		}
    },
    paper: {
        padding: "1rem",
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
    },
    button: {
        minWidth: "10rem",
        marginLeft: "2rem"
    }
}));

const BetsList: React.FC<IBetsList> = ({
    classes: propsClasses,
    dispatch,
    bets
}) => {
	const classes = useStyles({ classes: propsClasses });

    const handleClear = (): void => {
        dispatch({ type: "clear-bets" })
    } 

    return (
        <div>
            {bets.map(({ raceName, first, second, third }) => (
                <div className={classes.root}>
                    <Paper classes={{ root: classes.paper }} elevation={4} >
                        <div className={classes.wrapper}>
                            <Typography gutterBottom variant="h5" component="h2">
                                CUPON:
                            </Typography>
                            <Typography gutterBottom variant="h6" component="span">
                                {`RACE: ${raceName}`}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="span">
                                {`First place: ${first}`}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="span">
                                {`Second place: ${second}`}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="span">
                                {`Third place: ${third}`}
                            </Typography>
                        </div>
                    </Paper>
                </div>
            ))}
            <Button onClick={handleClear} classes={{ root: classes.button }} variant="outlined">CLEAR</Button>
        </div>
    )
};

export default BetsList;