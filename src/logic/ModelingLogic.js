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
export function createTrainWay(way){
    let arrDir = [];
    for(let i = 0; i < way.way.length; i++){
        if(i !== 0){
            let coord = centerCell(way.way[i-1],way.way[i]);
            let dir = centerDir(way.way[i-1].dir,way.way[i].dir);
            arrDir.push({x: coord.x, y: coord.y, dir: dir});
            if(i === way.way.length-1){
                arrDir.push({x: coord.x + dirCoord(way.way[i].dir).x, y: coord.y + dirCoord(way.way[i].dir).y, dir: dir});
            }
        }else{
            arrDir.push({x: way.way[i].x - dirCoord(way.way[i].dir).x, y: way.way[i].y - dirCoord(way.way[i].dir).y, dir: dirSwich(way.way[i].dir)});
            arrDir.push({x: way.way[i].x - dirCoord(way.way[i].dir).x, y: way.way[i].y - dirCoord(way.way[i].dir).y, dir: dirSwich(way.way[i].dir)});
        }
    }
    console.log(arrDir);
    return arrDir;
}

export function createPaths(trains){
    let paths = [];
    for(let t = 0; t < trains.length; t++){
        let trainPath = [];
        for(let i = 0; i < trains[t].way.length; i++){
            if(i !== 0){
                let coord = centerCell(trains[t].way[i-1],trains[t].way[i]);
                let dir = centerDir(trains[t].way[i-1].dir,trains[t].way[i].dir);
                trainPath.push({x: coord.x, y: coord.y, dir: dir});
                if(i === trains[t].way.length-1){
                    trainPath.push({x: coord.x + (dirCoord(trains[t].way[i].dir).x * 2), y: coord.y + (dirCoord(trains[t].way[i].dir).y * 2), dir: dir});
                }
            }else{
                trainPath.push({x: trains[t].way[i].x - dirCoord(trains[t].way[i].dir).x, y: trains[t].way[i].y - dirCoord(trains[t].way[i].dir).y, dir: dirSwich(trains[t].way[i].dir)});
                trainPath.push({x: trains[t].way[i].x - dirCoord(trains[t].way[i].dir).x, y: trains[t].way[i].y - dirCoord(trains[t].way[i].dir).y, dir: dirSwich(trains[t].way[i].dir)});
            }
        }   
        paths.push(trainPath);
    }
    return paths;
}
export function centerCell(c1, c2){
    let dc = dirCoord(c2.dir);
    let c3 = {x: c2.x + dc.x, y: c2.y + dc.y};
    return {x: c1.x + (c3.x - c1.x)/2, y: c1.y + (c3.y - c1.y)/2};
}
export function centerDir(c1, c2){
    //console.log("------",c1,c2);
    if(c2 === c1) return dirSwich(c1);
    return Math.min(dirSwich(c1),dirSwich(c2)) + Math.PI/6
}
export function createTrain(size){
    let arrWagons = [];
    for(let i = 0; i < size; i++){
        arrWagons.push({pos:{x: 0,y: 0}, rot: 0, opacity: 0});
    }
    return arrWagons;
}

export function createWagonInfo(len,arrDir){
    let arr = [];
    let dir = dirCoord(arrDir[0].dir);
    console.log("dir",arrDir[0].dir)
    for(let i = 0; i < len; i++){
      arr.push({x: arrDir[0].x-(3*i*1), y: arrDir[0].y-(3*i*0), dir: arrDir[0].dir});
    }
    return arr;
}
export function createNextArr(len){
    let arr = [];
    for(let i = 0; i < len; i++){
      arr.push(1);
    }
    return arr;
}