import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IGame, IParticipants } from "../reducer/initialState";
import { Header } from "./index";
import { prepareGameTitle, reorderList, preparePlaces } from "./helpers/bettingHelpers";
import { Button, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { Info, CheckCircle } from '@material-ui/icons';
import { IBetList } from "./Dashboard";

interface IParticipantsProps {
	classes?: Partial<string>;
    participants: IParticipants[];
    setIsOrderSet: (bool: boolean) => void;
    setAcviveStep: (num: number) => void;
    setBetList: (list: IBetList[]) => void;
    games: IGame[];
    selectedGame: number;
    isOrderSet: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
	container: {
        textAlign: "left",
        position: "relative",
        height: "100%"
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
    orderSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: 2,
        backdropFilter: "blur(10px)",
        borderRadius: "10px"
    },
    checkIcon: {
        fontSize: "10rem !important",
        color: "green"
    }
}));

const ParticipantsTyping: React.FC<IParticipantsProps> = ({
	classes: propsClasses,
    isOrderSet,
    participants,
    setIsOrderSet,
    setAcviveStep,
    setBetList,
    games,
    selectedGame
}) => {
	const classes = useStyles({ classes: propsClasses });

    React.useEffect((): void => {
        setBetList(preparePlaces(participants, prepareGameTitle(games, selectedGame)));
        // eslint-disable-next-line
    }, [])

    const onEnd = (result: DropResult): any => {
        const orderedList = reorderList(participants, result.source.index, result.destination?.index);
        setBetList(preparePlaces(orderedList, prepareGameTitle(games, selectedGame)));
        return;
    }

    const handleBetSubmit = () => {
        setIsOrderSet(true);
        setAcviveStep(2);
    }

	return (
		<div className={classes.container}>
            <Header
                title="Select places..."
                subtitle={prepareGameTitle(games, selectedGame)}
            />
            <div className={classes.infoWrapper}>
                <FormControlLabel
                    control={<Info classes={{ root: classes.icon }}/>}
                    label="Drag and drop for selecting places and then"
                />
                <Button onClick={handleBetSubmit} classes={{ root: classes.button }} variant="outlined">BET</Button>
            </div>
            <Divider />
            <DragDropContext onDragEnd={onEnd}>
                <Droppable droppableId="123">
                    {(provided, snapShot) => (
                        <List
                            component="nav"
                            className={classes.root}
                            aria-label="contacts"
                            ref={provided.innerRef}
                        >
                            {participants.map(({ body, id }, index) => (
                                <Draggable
                                    draggableId={`${id}`}
                                    key={id}
                                    index={index}
                                >
                                    {(provided, snapShot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div>
                                                <ListItem button key={id}>
                                                    <ListItemText primary={body} />
                                                    {index === 0 && (
                                                        <ListItemIcon>
                                                            {"1 place"}
                                                        </ListItemIcon>
                                                    )}
                                                    {index === 1 && (
                                                        <ListItemIcon>
                                                            {"2 place"}
                                                        </ListItemIcon>
                                                    )}
                                                    {index === 2 && (
                                                        <ListItemIcon>
                                                            {"3 place"}
                                                        </ListItemIcon>
                                                    )}
                                                </ListItem>
                                                {index === 2 && <Divider />}
                                            </div>
                                        </div>
                                        )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
            {isOrderSet && (
                <div className={classes.orderSet}>
                    <CheckCircle classes={{ root: classes.checkIcon }}/>
                </div>
            )}
		</div>
	);
};

export default ParticipantsTyping;
