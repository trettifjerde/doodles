

function solution(points) {

    const memo = {};
    let skiCall = 0;
    let skiCalc = 0;
    let memoCall = 0;

    function getNextPointIndexes(startIndex, turnsLeft) {

        const nextPointIndexes = [];

        if (turnsLeft >= 0) {

            const goingLeft = turnsLeft % 2 === 0;
            const startPosition = points[startIndex] || -1;
            const isValidNextPoint = goingLeft ? (pos1, pos2) => pos2 > pos1 : (pos1, pos2) => pos1 > pos2;

            for (let i = startIndex + 1; i < points.length; i++) {
                const nextPosition = points[i];
                if (isValidNextPoint(startPosition, nextPosition))
                    nextPointIndexes.push(i);
            }
        }
        return nextPointIndexes;
    }

    function ski(turnsLeft, startIndex = -1) {

        skiCall++;

        if (startIndex >= points.length) 
            return {path: [], score: 0};

        const key = `${turnsLeft}-${startIndex}`;

        if (key in memo) {
            memoCall++;
            return memo[key];
        }

        skiCalc++;

        let bestRoute = {path: [], score: 0};

        for (const turnOption of [turnsLeft, turnsLeft -1]) {
            const nextPointIndexes = getNextPointIndexes(startIndex, turnOption);

            for (const nextPointIndex of nextPointIndexes) {
                if (points.length - nextPointIndex <= bestRoute.score)
                    break;

                const result = ski(turnOption, nextPointIndex);

                if (result.score > bestRoute.score)
                    bestRoute = result;
            }
        }

        if (startIndex >= 0) {
            bestRoute = {path: [startIndex, ...bestRoute.path], score: 1 + bestRoute.score};
            memo[key] = bestRoute;
        }

        return bestRoute;
    }

    const bestRoute = ski(2);

    console.log('memo size', Object.keys(memo).length);
    console.log('memo called', memoCall, 'times');
    console.log('ski called', skiCall, 'times');
    console.log('ski calculated', skiCalc, 'times');
    return bestRoute;
}

const array = [15, 13, 5, 7, 4, 10, 12, 8, 2, 11, 6, 9, 3];
// const array = [5, 2, 6, 3, 4, 8, 10, 13, 7, 11, 10, 9, 3];

console.log(solution(array));