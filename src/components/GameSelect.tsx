import React, { useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { filterActiveGames } from "./helpers/bettingHelpers";
import { IGame } from "../reducer/initialState";
import { IBetList } from "./Dashboard";
import { Header } from "./index";
import { FormControlLabel, Checkbox, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { RadioButtonChecked } from "@material-ui/icons";

interface IGameSelectProps {
	classes?: Partial<string>;
    games: IGame[];
    selectedGame: number | null;
    setIsOrderSet: (bool: boolean) => void;
    setBetList: (list: IBetList[]) => void;
    setSelectedGame: (number: number | null) => void;
}

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        textAlign: "left"
    },
	gamesWrapper: {
        display: "flex",
        flexDirection: "column"
    },
    label: {
        margin: "1rem 0 1rem .2rem"
    }
}));

const GameSelect: React.FC<IGameSelectProps> = ({
    classes: propsClasses,
    games,
    selectedGame,
    setBetList,
    setSelectedGame,
    setIsOrderSet
}) => {
    const [filterActive, setFilterActive] = useState<boolean>(false);
	const classes = useStyles({ classes: propsClasses });

    const handleCheckFilter = (): any => {
        setFilterActive(!filterActive);
    }

	return (
		<div className={classes.container}>
            <Header
                title="Select race"
                subtitle={moment().format("LL")}
            />
            <FormControlLabel
            classes={{ root: classes.label }}
            control={
                <Checkbox checked={filterActive} onChange={handleCheckFilter} />
            }
            label="Filter active games"
            />
            <Divider />
            <List component="nav" className={classes.root} aria-label="contacts">
                {(filterActive ? filterActiveGames(games) : games).map(({ id, active, name}) => (
                    <ListItem
                        button
                        onClick={
                            (): void => {
                                setSelectedGame(selectedGame === id ? null : id);
                                setIsOrderSet(false);
                                setBetList([]);
                            }
                        }>
                        <ListItemText primary={name} />
                        {id === selectedGame && (
                            <ListItemIcon>
                                <RadioButtonChecked />
                            </ListItemIcon>
                        )}
                    </ListItem>
                ))}
            </List>
		</div>
	);
};

export default GameSelect;
