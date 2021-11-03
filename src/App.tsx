import React, { useState, useReducer } from "react";
import { initialState } from "./reducer/initialState";
import { Navbar, Dashboard, BetsList } from "./components";
import { SwipeableDrawer } from "@material-ui/core";
import reducer from "./reducer/reducer";
import "./App.css"

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
	const { bets } = state;
	console.log({ state });

	React.useEffect(() => {
		const gamesApiCall = () => {
			fetch("https://my-json-server.typicode.com/hdjfye/bet-api/races")
				.then((res) => res.json())
				.then((data) =>
					dispatch({ type: "set-games-data", payload: data })
				)
				.catch((error) => console.log(error.message));
		};
		const participantsApiCall = () => {
			fetch(
				"https://my-json-server.typicode.com/hdjfye/bet-api/participants"
			)
				.then((res) => res.json())
				.then((data) =>
					dispatch({
						type: "set-participants-data",
						payload: data
					})
				)
				.catch((error) => console.log(error.message));
		};

		gamesApiCall();
		participantsApiCall();
	}, []);

	return (
			<div className="App">
				<Navbar {...{
					setIsDrawerOpen,
					bets
				}}/>
				<Dashboard
					{...{
						dispatch,
						...state
					}}
				/>
				<SwipeableDrawer
					anchor={"right"}
					open={isDrawerOpen}
					onClose={() => setIsDrawerOpen(false)}
					onOpen={() => setIsDrawerOpen(true)}
				>
					{bets.length > 0 && <BetsList {...{ dispatch, bets }} />}
            	</SwipeableDrawer>
			</div>
	);
}
