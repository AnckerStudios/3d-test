import Cell from "./Cell";

function Row(props) {
    const {cellX} =  props;
    let cells = [];
    for(let i = 0; i < 16; i++){
        cells.push(<Cell key={i} cellPos={[cellX, i, 0]}/>)
    }
    return (
        {cells}
    );
}
  
export default Row;