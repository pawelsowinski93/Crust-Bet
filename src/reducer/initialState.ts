import { IBetList } from "../components/Dashboard";

interface AppInitialState {
	games: IGame[];
	participants: IParticipants[];
	bets: IBetList[]
}

export interface IParticipants {
    body: string;
    id: number
}

export interface IBets {
    game: string;
    places: IPlaces[];
    date: string
}

interface IPlaces {
    first: string;
    second: string;
    third: string
}

export interface IGame {
    active: boolean;
    id: number;
    name: string;
    participants: number[]
}

const betsData = localStorage.getItem("bets")

export const initialState: AppInitialState = {
	games: [],
	participants: [],
	bets: betsData ? JSON.parse(betsData) : []
};
