import React, { useState, Dispatch } from "react";
import { AppActions } from "../reducer/reducer";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ConfirmationPopover, CompleteBet, StepperInfo, BetAction, GameSelect, ParticipantsTyping } from "./index"
import { filterParticipantsForSelectedGame } from "./helpers/bettingHelpers";
import { Paper } from "@material-ui/core";
import { IGame, IParticipants } from "../reducer/initialState";
import { SnackbarProvider } from "notistack";

interface INavigationProps {
	classes?: Partial<string>;
	dispatch: Dispatch<AppActions>;
	participants: IParticipants[];
	games: IGame[];
    bets: IBetList[];
}

export interface IBetList {
    raceName: string;
    first: string;
    second: string;
    third: string;
}

const useStyles = makeStyles((theme: Theme) => ({
	container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
		padding: theme.spacing(10),
        position: "relative"
	},
	root: {
		display: "flex",
		flexWrap: "wrap",
        justifyContent: "center",
		"& > *": {
			margin: theme.spacing(6),
			width: theme.spacing(70),
			height: theme.spacing(90),
            borderRadius: "10px"
		}
	}
}));

const getStorageValue = (variable: string): any => {
    const data = localStorage.getItem(variable)
    if (data) {
        return JSON.parse(data)
    }
    return null
}

const Dashboard: React.FC<INavigationProps> = ({
	classes: propsClasses,
    participants,
    dispatch,
    bets,
	games,
}) => {
	const [activeStep, setAcviveStep] = useState<number>(getStorageValue("active-step") || 0);
    const [selectedGame, setSelectedGame] = useState<number | null>(getStorageValue("selected-game") || null)
    const [betList, setBetList] = useState<IBetList[]>(getStorageValue("bet-list") || []);
    const [isBetActionOpen ,setIsBetActionOpen] = useState<boolean>(getStorageValue("is-bet-action-open") || false);
    const [isOrderSet, setIsOrderSet] = useState<boolean>(getStorageValue("is-order-set") || false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(getStorageValue("is-confirmation-open") || false);

	const classes = useStyles({ classes: propsClasses });

    React.useEffect(() => {
        localStorage.setItem("active-step", JSON.stringify(activeStep))
        localStorage.setItem("selected-game", JSON.stringify(selectedGame))
        localStorage.setItem("bet-list", JSON.stringify(betList))
        localStorage.setItem("is-bet-action-open", JSON.stringify(isBetActionOpen))
        localStorage.setItem("is-order-set", JSON.stringify(isOrderSet))
        localStorage.setItem("is-confirmation-open", JSON.stringify(isConfirmationOpen))
    }, [activeStep, selectedGame, betList, isBetActionOpen, isOrderSet, isConfirmationOpen])

    React.useEffect(() => {
        localStorage.setItem("bets", JSON.stringify(bets))
    }, [bets])

    React.useEffect(() => {
        setAcviveStep(selectedGame ? 1 : 0);
    }, [selectedGame])    

	return (
        <SnackbarProvider maxSnack={1}>
            <div className={classes.container}>
                <StepperInfo {...{ activeStep }} />
                <div className={classes.root}>
                    <Paper elevation={4} >
                        {!isBetActionOpen && <GameSelect {...{
                            games,
                            selectedGame,
                            setBetList,
                            setIsOrderSet,
                            setSelectedGame
                        }} />}
                    </Paper>
                    <Paper elevation={4}>
                        {selectedGame && <ParticipantsTyping
                            participants={filterParticipantsForSelectedGame(games, participants, selectedGame)}
                            {...{
                                games,
                                setIsOrderSet,
                                setAcviveStep,
                                setBetList,
                                betList,
                                dispatch,
                                isOrderSet,
                                selectedGame
                            }}
                        />}
                    </Paper>
                    <Paper elevation={4}>
                        {activeStep === 2 && <CompleteBet {...{
                            setAcviveStep,
                            setIsConfirmationOpen,
                            setIsOrderSet,
                            betList
                        }} />}
                    </Paper>
                </div>
                {isBetActionOpen && <BetAction {...{ setIsBetActionOpen, bets }} />}
                {isConfirmationOpen && <ConfirmationPopover
                    setIsOpen={setIsConfirmationOpen}
                    open={isConfirmationOpen}    
                    {...{
                        betList,
                        dispatch,
                        setSelectedGame,
                        setAcviveStep,
                        setBetList,
                        setIsOrderSet,
                        setIsBetActionOpen
                    }}
                />}
            </div>
        </SnackbarProvider>
	);
};

export default Dashboard;
