export function cellFree(cell, mtrx, tool) {
    let arr = createMtrx(mtrx.length,mtrx[1].length);
    let x = cell.x;
    let y = cell.y;
    let scroll = cell.scroll;
    console.log('saaaaaaa', scroll)
    let err = checkPlace(cell, mtrx, tool.name, scroll);
    console.log('err = '+ err)
    switch(tool.name){
        case 'rail':
            arr[cell.x][cell.y].type = tool.name;
            arr[cell.x][cell.y].state = scroll ? {x: true} : {y: true};
            return {arr: arr, err: err};
        case 'plate':
            let xMin = x - (scroll ? 1 : 0); 
            let xMax = x + (scroll ? 1 : 0);
            let yMin = y - (!scroll ? 1 : 0);
            let yMax = y + (!scroll ? 1 : 0);
            
            arr[x][y].type = tool.name;
            arr[x][y].state = {dir: scroll ? true : false};
           
            if(xMin >= 0 && yMin >= 0 && xMax < arr.length && yMax < arr[x].length){
                arr[xMin][yMin].type = "plate edge";
                arr[xMax][yMax].type = "plate edge";
            }
            return {arr: arr, err: err};
        case 3:

        default:
            return {arr: arr, err: err};
    }
    
}

export function setCell(cell, mtrx, tool, clickedCell){
    let arr = createMtrx(mtrx.length,mtrx[1].length);
    if(isFirstClick(clickedCell)){
        return cellFree(cell, mtrx, tool);
    }
    else if(tool.doubleClick){
        let change = createWay(clickedCell.first, cell);
        let obj = addChanges(arr,change, mtrx);
        return {arr: obj.arr, err: obj.err};
    }

    return {arr: arr, err: false};
}

function isFirstClick(clickedCell){
    return (clickedCell.second != undefined || clickedCell.first == undefined);
}

export function createMtrx(x, y){
    let arr = [];
    for(let i = 0; i < x; i++){
      arr.push([])
      for(let j = 0; j < y; j++){
        arr[i].push({id: y*i+j, x: i, y: j, type: 'none',state: {}})
      }
    }
    return arr
}

export function checkPlace(cell, arr, tool, scroll) {
    let x = cell.x;
    let y = cell.y;
    switch(tool){
        case 'rail':
            if(arr[x][y].type !== 'none' && arr[x][y].type !== 'rail'){
                return true;
            }
            return false;
        case 'plate':
            let xMin = x - (scroll ? 1 : 0);
            let xMax = x + (scroll ? 1 : 0);
            let yMin = y - (!scroll ? 1 : 0);
            let yMax = y + (!scroll ? 1 : 0);
            if(xMin < 0 || yMin < 0 || xMax >= arr.length || yMax >= arr[0].length){
                return true;
            }
            if(arr[x][y].type !== 'none' || arr[xMin][yMin].type !== 'none' || arr[xMax][yMax].type !== 'none'){
                return true;
            }
            let r1 = false;
            let r2 = false;
            let r3 = false;
            let r4 = false;
            let r5 = false;
            let r6 = false;
            if(xMin-(!scroll ? 1 : 0) >= 0 && yMin-(scroll ? 1 : 0) >= 0){
              r1 = arr[xMin-(!scroll ? 1 : 0)][yMin-(scroll ? 1 : 0)].state[(scroll ? 'x' : 'y')];
              r2 = arr[x-(!scroll ? 1 : 0)][y-(scroll ? 1 : 0)].state[(scroll ? 'x' : 'y')];
              r3 = arr[xMax-(!scroll ? 1 : 0)][yMax-(scroll ? 1 : 0)].state[(scroll ? 'x' : 'y')];
            }
            if(xMin+(!scroll ? 1 : 0) < arr.length && yMin+(scroll ? 1 : 0) < arr[0].length){
              r4 = arr[xMin+(!scroll ? 1 : 0)][yMin+(scroll ? 1 : 0)].state[(scroll ? 'x' : 'y')];
              r5 = arr[x+(!scroll ? 1 : 0)][y+(scroll ? 1 : 0)].state[(scroll ? 'x' : 'y')];
              r6 = arr[xMax+(!scroll ? 1 : 0)][yMax+(scroll ? 1 : 0)].state[(scroll ? 'x' : 'y')];
            }
            if(!(r1 && r2 && r3) && !(r4 && r5 && r6))
                return true;
            return false;
        case 3:
        default:
            return false;
    }
    
}
function createWay(first, second){
    let arr = [];
    
    let deltaX = second.x - first.x; //проверки добавь
    let deltaY = second.y - first.y;
    let ix = Math.sign(deltaX);
    let iy = Math.sign(deltaY);
    let curX = first.x;
    let curY = first.y;
    let fscroll = first.scroll;
    let sscroll = second.scroll;
    arr.push({x: curX, y: curY, state: fscroll ? 'x' : 'y'});
    if(fscroll === sscroll){
      if(fscroll ? Math.abs(deltaX) > Math.abs(deltaY) : Math.abs(deltaX) < Math.abs(deltaY)){
        if(fscroll ? deltaY === 0 : deltaX === 0){
          while(fscroll ? (curX != second.x) : (curY != second.y)){
            curX = fscroll ? curX + ix : curX;
            curY = fscroll ? curY : curY + iy;
            arr.push({x: curX, y: curY, state: fscroll ? 'x' : 'y'});
          }
        }else{
          curX = fscroll ? curX + ix : curX;
          curY = fscroll ? curY : curY + iy;
          arr.push({x: curX, y: curY, state: testSwich(ix, iy, fscroll)});
          curX = curX + ix;
          curY = curY + iy;
      
          while((curX != second.x) && (curY != second.y)){
            arr.push({x: curX, y: curY, state: ix === iy ? 'dy' : 'dx'});
            curX = curX + ix;
            curY = curY + iy;
          }
          arr.push({x: curX, y: curY, state: testSwich(-ix, -iy, sscroll)});
          while((curX != second.x) || (curY != second.y)){
            curX = sscroll ? curX + ix : curX;
            curY = sscroll ? curY : curY + iy;
            arr.push({x: curX, y: curY, state: sscroll ? 'x' : 'y'});
          }
        }
      }
    }else{
      if(fscroll ? Math.abs(deltaY) > 1 && Math.abs(deltaX) > 1 : Math.abs(deltaX) > 1 && Math.abs(deltaY) > 1){
        if(fscroll ? Math.abs(deltaX) > Math.abs(deltaY) : Math.abs(deltaX) < Math.abs(deltaY)){
          for(let i = 0; i < Math.abs(Math.abs(deltaX) - Math.abs(deltaY)); i++){
            curX = fscroll ? curX + ix : curX;
            curY = fscroll ? curY : curY + iy;
            arr.push({x: curX, y: curY, state: fscroll ? 'x' : 'y'});
          }
        }
        curX = fscroll ? curX + ix : curX;
        curY = fscroll ? curY : curY + iy;
        arr.push({x: curX, y: curY, state: testSwich(ix, iy, fscroll)});
        curX = curX + ix;
        curY = curY + iy;
      
        while((curX != second.x) && (curY != second.y)){
          arr.push({x: curX, y: curY, state: ix === iy ? 'dy' : 'dx'});
          curX = curX + ix;
          curY = curY + iy;
        }
          arr.push({x: curX, y: curY, state: testSwich(-ix, -iy, sscroll)});
          while((curX != second.x) || (curY != second.y)){
              curX = sscroll ? curX + ix : curX;
              curY = sscroll ? curY : curY + iy;
              arr.push({x: curX, y: curY, state: sscroll ? 'x' : 'y'});
          }
      }
    } 
    return arr;
}

function testSwich(i, j, dir){
    if(i > 0 && j > 0 ){
      return dir == true ? 'rx_right' : 'ry_right';
    } else if(i < 0 && j < 0 ){
      return dir == true ? 'rx_left' : 'ry_left';
    } else if(i > 0 && j < 0 ){
      return dir == true ? 'rx_down' : 'ry_top';
    } else if(i < 0 && j > 0 ){
      return dir == true ? 'rx_top' : 'ry_down';
    }
  }

function addChanges(arr, change, mtrx){
    let err = false;
    let copy = Object.assign([], arr);
    for(let item of change){
      copy[item.x][item.y].state[item.state] = true;
      copy[item.x][item.y].type = 'rail';
      err = err || checkPlace({x: item.x, y: item.y}, mtrx, 'rail', false);
    }
    //console.log("dsdasdasdasdasdasdada")
    //console.log(copy)
    return {arr: copy, err: err};
    //setFieldMtrx(copy);
}

export function updatePlate(plates, mtrx){
  let copy = Object.assign([], mtrx);
  if(plates.length !== 0){
    for(let plt of plates){
      let dir = copy[plt.x][plt.y].state.dir;
      let dx = dir ? 0 : 1;
      let dy = dir ? 1 : 0;
      let arr = [];
      if(plt.x-dx > 0 && plt.y-dy > 0){
        if(copy[plt.x-dx][plt.y-dy].type === "rail" && copy[plt.x-dx][plt.y-dy].state[dir ? "x" : "y"] === true){
          arr.push({x: plt.x-dx, y: plt.y-dy, number: plt.number+1});
        }
      }
      if(plt.x+dx < copy.length && plt.y+dy < copy[plt.x].length){
        if(copy[plt.x+dx][plt.y+dy].type === "rail" && copy[plt.x+dx][plt.y+dy].state[dir ? "x" : "y"] === true){
          arr.push({x: plt.x+dx, y: plt.y+dy, number: plt.number+2});
        }
      }
      copy[plt.x][plt.y].state = {...copy[plt.x][plt.y].state, number: plt.number, lines: arr}
    }
  }
  return copy;
}