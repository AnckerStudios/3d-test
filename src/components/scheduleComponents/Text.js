import { useMemo } from "react";

function Text({ children, position, opacity, color = 'black', fontSize = 35 }) {

  

    const canvas = useMemo(() => {
      var fontface = "Arial";
      var fontsize = fontSize;
      var borderThickness =  0;
  
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      context.textBaseline = 'middle'
      context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`
  
      var metrics = context.measureText( children );
    var textWidth = metrics.width;
    
      context.lineWidth = borderThickness;
  
      context.fillStyle = color
      context.fillText( children, textWidth - (textWidth*0.5), fontsize);    
      return canvas
    }, [children])
  
  
    return (
      <sprite 
      scale={[5, 3, 3]} position={position}>
        <spriteMaterial attach="material" transparent alphaTest={0.5} >
          <canvasTexture attach="map" image={canvas} />
        </spriteMaterial>
      </sprite>
    )
  }
  
  export default Text
  