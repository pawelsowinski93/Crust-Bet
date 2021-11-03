import { IGame, IParticipants } from "../../reducer/initialState"
import { IBetList } from "../Dashboard";

export const filterActiveGames = (array: IGame[]): IGame[] => (
    array.filter(({ active }) => active)
);

export const filterParticipantsForSelectedGame = (
    games: IGame[],
    participants: IParticipants[],
    selectedGame: number
): IParticipants[] => {
    const participantsForGame = games
        .filter(({ id }) => id === selectedGame)
        .map(({ participants }) => participants)        
        
    return participantsForGame.length > 0
        ? participants.filter(({ id }) => participantsForGame[0].includes(id))
        : []
};

export const prepareGameTitle = (games: IGame[], selectedGame?: number): string => {
    console.log(games);
    
    return (
    selectedGame && games.length
        ? games.filter(({ id }) => selectedGame === id)[0].name
        : ""
)}

export const reorderList = (list: IParticipants[], startIndex: number, endIndex: number | undefined): IParticipants[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1)
    endIndex && result.splice(endIndex, 0, removed);

    return result;
}

export const preparePlaces = (list: IParticipants[], gameName: string): IBetList[] | [] => {
    if (list.length > 2) {
        const result = [];
        result.push({
            raceName: gameName,
            first: list[0].body,
            second: list[1].body,
            third: list[2].body,
        })
        return result
    }
    return []
}