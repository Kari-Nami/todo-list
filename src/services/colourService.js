const DEFAULT_PALETTE = [
    // "#ffa8a8", "#ffcfa8", "#fff5a8", "#a8ffb0",
    // "#a8fff9", "#a8c1ff", "#d9a8ff", "#ffabe1",
    // "#ff3333", "#ff8f33", "#ffdd33", "#33ff3d",
    // "#33fff5", "#3385ff", "#8f33ff", "#ff33e1",
    // "#7d0d0d", "#7d470d", "#7d6f0d", "#3d7d0d",
    // "#0d7d7d", "#0d477d", "#470d7d", "#7d0d47",
    // "#ffffff", "#a8a8a8", "#7e7e7e", "#545454",
    // "#2a2a2a", "#000000", "#5c3c29", "#3e2819"
    "#ff7eb9",
    "#ff65a3",
    "#7afcff",
    "#feff9c",
    "#fff740",
    "#50514f",
    "#f25f5c",
    "#ffe066",
    "#247ba0",
    "#70c1b3"
]

export function loadColours() {
    return DEFAULT_PALETTE
}

export function addColour(colours, newColourHex) {
    return [...colours, newColourHex]
}

export function deleteColour(colours, colourHex) {
    return colours.filter((colour) => colour !== colourHex)
}