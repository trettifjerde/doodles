function solution(landscape) {
    function getHighestPoint(start, end) {
        let info = {height: 0, index: -1};
    
        for (let index = start; index < end; index++) {
            if (landscape[index] > info.height) 
                info = {height: landscape[index], index}
        }
        
        return info.height ? info : null;
    }

    function getMaxDepth(point1, point2) {
        let maxDepth = 0;

        const lowerHeight = Math.min(point1.height, point2.height);
        for (let i = point1.index + 1; i < point2.index; i++) {
            const depth = lowerHeight - landscape[i];
            if (depth > maxDepth)
                maxDepth = depth;
        }
        return maxDepth;
    }

    let maxDepth = 0;
    const highestPoint = getHighestPoint(0, landscape.length);

    if (highestPoint) {
        const leftHandHeight = getHighestPoint(0, highestPoint.index);
        const rightHandHeight = getHighestPoint(highestPoint.index + 1, landscape.length);

        if (leftHandHeight) {
            const leftHandDepth = getMaxDepth(leftHandHeight, highestPoint);
            const outerLeftDepth = solution(landscape.slice(0, leftHandHeight.index + 1));
            maxDepth = Math.max(maxDepth, leftHandDepth, outerLeftDepth);
        }

        if (rightHandHeight) {
            const rightHandDepth = getMaxDepth(highestPoint, rightHandHeight);
            const outerRightDepth = solution(landscape.slice(rightHandHeight.index, landscape.length));
            maxDepth = Math.max(maxDepth, rightHandDepth, outerRightDepth);
        }
    }
    
    return maxDepth;   
}

console.log(solution([1, 3, 2, 1, 2, 1, 6, 3, 3, 4, 2, 10]));
