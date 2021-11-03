import React from "react"
import { makeStyles } from "@material-ui/core/styles";

interface IRightDwarerProps {
	classes?: Partial<string>;
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
            height: "15rem",
            width: "30rem",
            fontSize: "1.2rem"
          },
    }
}));

const RightDrawer: React.FC<IRightDwarerProps> = ({
    classes: propsClasses
}) => {
    const classes = useStyles({ classes: propsClasses })
    return (
        <div className={classes.container}>
            <div>Drawer</div>
        </div>
    )
};

export default RightDrawer;
