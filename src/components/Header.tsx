import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader  } from '@material-ui/core';
import { DirectionsCar } from '@material-ui/icons';

interface IHeader {
    classes?: Partial<string>;
    title: string;
    subtitle: string;
}

const useStyles = makeStyles(() => ({
    root: {
        display: "fex"
      },
	container: {
        padding: "1.5rem",
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "bold",
        background: "#fcfcfc",
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px"
	},
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    avatar: {
      backgroundColor: "red",
    },
}));

const Header: React.FC<IHeader> = ({
    classes: propsClasses,
    title,
    subtitle
}) => {
    const classes = useStyles({ classes: propsClasses })
    return (
        <Card className={classes.root}>
        <CardHeader
        classes={{ content: classes.header }}
        avatar={
            <DirectionsCar fontSize="large"/>
        }
        title={title}
        subheader={subtitle}
      />
      </Card>
    )
};

export default Header;
