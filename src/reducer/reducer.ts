import { initialState } from "./initialState";

type initialStateType = typeof initialState;

export type AppActions = 
| {	type: "set-games-data" | "set-participants-data" | "add-bet-to-list"; payload: any }
| { type: "clear-bets" };

const reducer = (state: initialStateType, action: AppActions) => {
	switch (action.type) {
		case "set-games-data": {
			return {
				...state,
				games: action.payload
			};
		}
		case "set-participants-data": {
			return {
				...state,
				participants: action.payload
			};
		}
		case "add-bet-to-list": {
			const { payload } = action;
			return {
				...state,
				bets: [
					...state.bets,
					...payload
				]
			}
		}
		case "clear-bets": {
			return {
				...state,
				bets: []
			}
		}

		default:
			return state;
	}
};

export default reducer;
