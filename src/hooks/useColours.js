import {useState} from "react";
import * as colourService from "../services/colourService.js";

export function useColours() {
    const [colours, setColours] = useState(() => colourService.loadColours())

    const addColour = (colourHex) => {
        setColours(colourService.addColour(colours, colourHex))
    }

    const deleteColour = (colourHex) => {
        setColours(colourService.deleteColour(colours, colourHex))
    }

    return { colours, addColour, deleteColour }
}