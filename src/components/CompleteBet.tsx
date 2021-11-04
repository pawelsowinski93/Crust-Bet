import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { AttachMoney, ArrowBackIos } from '@material-ui/icons';
import { Header } from "./index";
import { Button, FormControlLabel, Divider, Typography, CardContent } from "@material-ui/core";
import { IBetList } from "./Dashboard";

interface ICompleteBetProps {
	classes?: Partial<string>;
    betList: IBetList[];
    setAcviveStep: (num: number) => void;
    setIsOrderSet: (bool: boolean) => void;
    setIsConfirmationOpen: (bool: boolean) => void;
}

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
	container: {
        textAlign: "left"
	},
    icon: {
        width: "1.5rem",
        height: "1.5rem",
        padding: ".5rem"
    },
    infoWrapper: {
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 1rem"
    },
    button: {
        minWidth: "10rem"
    },
    backButton: {
        width: "6rem",
        height: "6rem",
        borderRadius: "4px",
        margin: ".2rem"
    },
    betInfo: {
        display: "flex",
        flexDirection: "column"
    }
}));

const CompleteBet: React.FC<ICompleteBetProps> = ({
    classes: propsClasses,
    setIsOrderSet,
    setAcviveStep,
    setIsConfirmationOpen,
    betList
}) => {
	const classes = useStyles({ classes: propsClasses });

	return (
		<div className={classes.container}>
            <Header
                title="Confirm Cupon"
                subtitle={moment().format("LL")}
            />
            <div className={classes.infoWrapper}>
                <FormControlLabel
                    control={<AttachMoney classes={{ root: classes.icon }}/>}
                    label="Check cupon details and pay"
                />
                <Button onClick={() => setIsConfirmationOpen(true)} classes={{ root: classes.button }} variant="outlined">PAY</Button>
            </div>
            <Divider />
            {betList.map(({ raceName, first, second, third }, index) => (
                <div className={classes.betInfo} key={index}>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h2">
                            GAME
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {raceName}
                        </Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            First Place
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {first}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            Second Place
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {second}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            Third Place
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {third}
                        </Typography>
                    </CardContent>
                    <CardContent>
                    <Divider />
                        <Typography gutterBottom variant="h5" component="h2">
                            Total Price: $48
                        </Typography>
                    </CardContent>
                </div>
            ))}
            <Button onClick={() => {setIsOrderSet(false); setAcviveStep(1)}} classes={{ root: classes.backButton }} variant="text" ><ArrowBackIos /></Button>
		</div>
	);
};

export default CompleteBet;
