import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { IBetList } from "./Dashboard";

interface INavbarProps {
	classes?: Partial<string>;
    setIsBetActionOpen: (number: boolean) => void
    bets: IBetList[]
}

const useStyles = makeStyles((theme: any) => ({
    container : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100vw",
        height: "100%",
        top: "0",
        left: "0",
        backdropFilter: "blur(10px)",
        '& > *': {
            margin: theme.spacing(1),
            height: "5rem",
            width: "15rem",
            fontSize: "1.2rem"
          },
    }
}));

const BetAction: React.FC<INavbarProps> = ({
    classes: propsClasses,
    setIsBetActionOpen,
    bets
}) => {
    const classes = useStyles({ classes: propsClasses })
    return (
        <div className={classes.container}>
            <Button onClick={() => setIsBetActionOpen(false)} variant="outlined">
                {bets.length > 0 ? "NEXT BET" : "MAKE A BET"}
            </Button>
        </div>
    )
};

export default BetAction;
