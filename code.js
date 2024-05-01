function tsp_ls(distance_matrix) {
    let choice = [0,0];
    let n = distance_matrix.length;
    let path = Array.from(Array(n).keys());
    shuffleArray(path);
    let pathVal = traversePath(path, distance_matrix);
    if(distance_matrix.length < 3) return 0;
    // I'm going to stop when I've run n! times because it 
    // seems to be more than enough times to run this algorithm for the size of the graphs.
    for(iter = 0; iter < factorial(n); iter++){ 
        randList = Array.from(Array(n-1).keys());
        randList.splice(choice[0]-1,1);
        choice[0] = randList[Math.floor(Math.random() * n-2)];
        randList = ascendList(choice[0] + 1, distance_matrix[n]);
        choice[1] = randList[Math.floor(Math.random() * (randList.length))];
        // I'm just picking my i and k to be completely random and ensuring they aren't equal to the last i because
        // it ensures we will try many different i and k, not try the same case consecutively,
        // and not prevent the same i and k to be tried later.
        twoOptSwap(choice[0], choice[1], path);
        newVal = traversePath(path, distance_matrix);
        (newVal < pathVal) ? pathVal = newVal : twoOptSwap(choice[0], choice[1], path);
    }
    return pathVal;
}

function twoOptSwap(i,k,array) {
    while(i < k){
        [array[i], array[k]] = [array[k], array[i]];
        i += 1;
        k -= 1;
    }
    return array;
}

function traversePath(path, distance_matrix) {
    let sum = 0;
    let start = path[0];
    for(let i = 1; i < path.length; i++){
        sum += distance_matrix[start][path[i]];
        start = path[i];
    }
    return sum;
}

// I pulled this function from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
// Since the point of this project is not to make a function like this I just wanted to save some time. 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// I pulled this fnction from https://stackoverflow.com/questions/8069315/create-array-of-all-integers-between-two-numbers-inclusive-in-javascript-jquer
// for the same reason above.
function ascendList(lowEnd, highEnd){
    let list = [];
    for (let i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
    return list;
}

// Wrote this here because it's stupid that javascript doesn't have a factorial function
function factorial(n, fact = 1){
    if (n <= 0){
        return fact;
    }
    else{
        return factorial(n-1, fact*n);
    }
}