
const getRandomCoordBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomSpinnerPosition = (x: number, y: number) => {
    const x2 = getRandomCoordBetween(x - 300, x + 300);
    const y2 = getRandomCoordBetween(y - 300, y + 300);

    return { x: x2, y: y2 }
}

export { getRandomSpinnerPosition, getRandomCoordBetween }
