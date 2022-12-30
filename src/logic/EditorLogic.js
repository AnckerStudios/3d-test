export function cellFree(cell, mtrx, tool, plates) {
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
            arr[x][y].state = {dir: scroll ? true : false, number: plates};
           
            if(xMin >= 0 && yMin >= 0 && xMax < arr.length && yMax < arr[x].length){
                arr[xMin][yMin].type = "plate edge";
                arr[xMax][yMax].type = "plate edge";
            }
            return {arr: arr, err: err};
        case 'traffic lights':
          arr[cell.x][cell.y].type = tool.name;
          arr[cell.x][cell.y].state = {light: true};
          return {arr: arr, err: err};
        case 'eraser':
          arr[cell.x][cell.y].type = tool.name;
          return {arr: arr, err: err};
        default:
            return {arr: arr, err: err};
    }
    
}

export function setCell(cell, mtrx, tool, clickedCell, plates){
    
    let arr = createMtrx(mtrx.length,mtrx[1].length);
    if(isFirstClick(clickedCell)){
        return cellFree(cell, mtrx, tool);
    }
    else if(tool.doubleClick){
      let change;
      if(tool.name === 'rail'){
        change = createWay(clickedCell.first, cell);
      }else if(tool.name === 'plate'){
        change = createPlate(clickedCell.first, cell, plates);
      }
        
        let obj = addChanges(arr,change, mtrx, clickedCell.first.scroll);
        return {arr: obj.arr, err: obj.err,};
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
          console.log('mmmm',scroll )
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
            return false;
        case 'neplatel':
          
              if(x-1 < 0 || x+1 >= arr.length){
                  return true;
              }
              if(arr[x][y].type !== 'none' || arr[x-1][y].type !== 'none' || arr[x+1][y].type !== 'none'){
                  return true;
              }
              return false;
        case 'neplater':
                if(y-1 < 0 || y+1 >= arr[0].length){
                    return true;
                }
                if(arr[x][y].type !== 'none' || arr[x][y-1].type !== 'none' || arr[x][y+1].type !== 'none'){
                    return true;
                }
                return false;
        case 'traffic lights':
          if(arr[x][y].type !== 'rail'){
            return true;
          }
          let count = 0;
          for (let key in arr[x][y].state){
            if(arr[x][y].state[key] === true){
              count++;
            }
          }
          if(count < 2){
            return true;
          }
          return false;
        default:
            return false;
    }
    
}
function createPlate(first, second, plates){
  let arr = [];
  let deltaX = second.x - first.x; //проверки добавь
  let deltaY = second.y - first.y;

  let fscroll = first.scroll;
  let sign = fscroll ? Math.sign(deltaX): Math.sign(deltaY);
  let delta = fscroll ? second.x - first.x : second.y - first.y; 
  //arr.push({x: first.x, y: first.y, state: {dir: fscroll, number: 2}, type: type});
  for(let i = 0; i <= Math.floor(Math.abs(delta/3)); i++){

    arr.push({x: fscroll ? first.x + i*3*sign - 1: first.x, y: fscroll ? first.y : first.y + i*3*sign - 1, state: {}, type: 'plate edge'});
    arr.push({x: fscroll ? first.x + i*3*sign + 1: first.x, y: fscroll ? first.y : first.y + i*3*sign + 1, state: {}, type: 'plate edge'});
    if(i === Math.floor(Math.abs(delta/3)/2)){
      arr.push({x: fscroll ? first.x + i*3*sign : first.x, y: fscroll ? first.y : first.y + i*3*sign, state: {dir: fscroll, number: plates}, type: 'plate'});
    }else{
      arr.push({x: fscroll ? first.x + i*3*sign : first.x, y: fscroll ? first.y : first.y + i*3*sign, state: {},type: fscroll ? 'neplatel' : 'neplater'});
    }  
  }
  
  return arr;
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
    arr.push({x: curX, y: curY, state: fscroll ? {'x':true} : {'y':true}, type: 'rail'});
    if(fscroll === sscroll){
      if(fscroll ? Math.abs(deltaX) > Math.abs(deltaY) : Math.abs(deltaX) < Math.abs(deltaY)){
        if(fscroll ? deltaY === 0 : deltaX === 0){
          while(fscroll ? (curX != second.x) : (curY != second.y)){
            curX = fscroll ? curX + ix : curX;
            curY = fscroll ? curY : curY + iy;
            arr.push({x: curX, y: curY, state: fscroll ? {'x':true} : {'y':true}, type: 'rail'});
          }
        }else{
          curX = fscroll ? curX + ix : curX;
          curY = fscroll ? curY : curY + iy;
          arr.push({x: curX, y: curY, state: testSwich(ix, iy, fscroll), type: 'rail'});
          curX = curX + ix;
          curY = curY + iy;
      
          while((curX != second.x) && (curY != second.y)){
            arr.push({x: curX, y: curY, state: ix === iy ? {'dy':true} : {'dx':true}, type: 'rail'});
            curX = curX + ix;
            curY = curY + iy;
          }
          arr.push({x: curX, y: curY, state: testSwich(-ix, -iy, sscroll), type: 'rail'});
          while((curX != second.x) || (curY != second.y)){
            curX = sscroll ? curX + ix : curX;
            curY = sscroll ? curY : curY + iy;
            arr.push({x: curX, y: curY, state: sscroll ? {'x':true} : {'y':true}, type: 'rail'});
          }
        }
      }
    }else{
      if(fscroll ? Math.abs(deltaY) > 1 && Math.abs(deltaX) > 1 : Math.abs(deltaX) > 1 && Math.abs(deltaY) > 1){
        if(fscroll ? Math.abs(deltaX) > Math.abs(deltaY) : Math.abs(deltaX) < Math.abs(deltaY)){
          for(let i = 0; i < Math.abs(Math.abs(deltaX) - Math.abs(deltaY)); i++){
            curX = fscroll ? curX + ix : curX;
            curY = fscroll ? curY : curY + iy;
            arr.push({x: curX, y: curY, state: fscroll ? {'x':true} : {'y':true}, type: 'rail'});
          }
        }
        curX = fscroll ? curX + ix : curX;
        curY = fscroll ? curY : curY + iy;
        arr.push({x: curX, y: curY, state: testSwich(ix, iy, fscroll), type: 'rail'});
        curX = curX + ix;
        curY = curY + iy;
      
        while((curX != second.x) && (curY != second.y)){
          arr.push({x: curX, y: curY, state: ix === iy ? {'dy':true} : {'dx':true}, type: 'rail'});
          curX = curX + ix;
          curY = curY + iy;
        }
          arr.push({x: curX, y: curY, state: testSwich(-ix, -iy, sscroll), type: 'rail'});
          while((curX != second.x) || (curY != second.y)){
              curX = sscroll ? curX + ix : curX;
              curY = sscroll ? curY : curY + iy;
              arr.push({x: curX, y: curY, state: sscroll ? {'x':true} : {'y':true}, type: 'rail'});
          }
      }
    } 
    return arr;
}

function testSwich(i, j, dir){
    if(i > 0 && j > 0 ){
      return dir == true ? {'rx_right' : true} : {'ry_right' : true};
    } else if(i < 0 && j < 0 ){
      return dir == true ? {'rx_left' : true} : {'ry_left' : true};
    } else if(i > 0 && j < 0 ){
      return dir == true ? {'rx_down' : true} : {'ry_top' : true};
    } else if(i < 0 && j > 0 ){
      return dir == true ? {'rx_top' : true} : {'ry_down' : true};
    }
  }

function addChanges(arr, change, mtrx, scroll){
  console.log("==--------------------",scroll)
    let err = false;
    let copy = Object.assign([], arr);
    for(let item of change){
      if(item.x >= 0 && item.x < mtrx.length && item.y >= 0 && item.y < mtrx[0].length ){
      copy[item.x][item.y].state = item.state;
      copy[item.x][item.y].type = item.type;
      }
      err = err || checkPlace({x: item.x, y: item.y}, mtrx, item.type, scroll); //cell, arr, tool, scroll
      
    }
    //console.log("dsdasdasdasdasdasdada")
    //console.log(copy)
    return {arr: copy, err: err};
    //setFieldMtrx(copy);
}

export function updatePlate(plates, mtrx){
  let copy = Object.assign([], mtrx);

  return copy;
}