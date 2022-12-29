import React from "react";
import close from "../../images/closeGray.png";

function TrainsListItem({ train, del, index }) {
  function getImage(type) {
    switch (type) {
      case 'Пасажирский':
        return "train1";
      case 'Грузовой':
        return "train2";
      case 'Скоростной':
        return "train3";
    }
  }

  return (
    <div className="  flex w-full p-2 relative">
      <div className=" flex justify-around p-1 px-5 w-full">
        <div className="  w-1/4 font-bold text-2xl  flex items-center justify-center">
          {train?.nameTrain}
        </div>
        <div className=" w-3/4 font-bold text-2xl text-orange-900 flex items-center justify-center">
          {train?.typeTrain?.typeTrain}
        </div>
        <div className=" w-1/4 font-bold text-2xl text-slate-900 flex items-center justify-center">
          {train?.numberOfWagons}
        </div>
        <img
          src={`./picture/${getImage(train?.typeTrain?.typeTrain)}.png`}
          className=" w-1/6"
        />
      </div>
      <div className=" absolute top-2 right-2 z-10" onClick={() => del(index)}>
        <img src={close} className=" w-7 h-7"></img>
      </div>
    </div>
  );
}

export default TrainsListItem;
