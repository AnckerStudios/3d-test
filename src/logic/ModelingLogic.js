export function dirSwich(dir) {
    switch (dir){
        case 0: return Math.PI/2;
        case 1: return Math.PI/4;
        case 2: return 0;
        case 3: return -Math.PI/4;
        case 4: return -Math.PI/2;
        case 5: return -3*Math.PI/4;
        case 6: return Math.PI;
        case 7: return 3*Math.PI/4;
    }
}

export function dirCoord(dir) {
    switch (dir){
        case 0: return {x: 0, y: 1};
        case 1: return {x: 1, y: 1};
        case 2: return {x: 1, y: 0};
        case 3: return {x: 1, y: -1};
        case 4: return {x: 0, y: -1};
        case 5: return {x: -1, y: -1};
        case 6: return {x: -1, y: 0};
        case 7: return {x: -1, y: 1};
    }
}

export function centerCell(c1, c2){
    let dc = dirCoord(c2.dir);
    let c3 = {x: c2.x + dc.x, y: c2.y + dc.y};
    return {x: c1.x + (c3.x - c1.x)/2, y: c1.y + (c3.y - c1.y)/2};
}
export function centerDir(c1, c2){
    console.log("------",c1,c2);
    if(c2 === c1) return dirSwich(c1);
    return Math.min(dirSwich(c1),dirSwich(c2)) + Math.PI/6
}
export function createTrain(size){
    let arrWagons = [];
    for(let i = 0; i < size; i++){
        arrWagons.push({pos:{x: 0,y: 0}, rot: 0});
    }
    return arrWagons;
}