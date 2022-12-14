import { useMemo } from "react";

function Text({ children, position, opacity, color = 'black', fontSize = 120 }) {



    const canvas = useMemo(() => {
      var fontface = "Arial";
      var fontsize = fontSize;
      var borderThickness =  4;

      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      context.textAlign = 'left';
      context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`

      var metrics = context.measureText( children );
    var textWidth = metrics.width;

      context.lineWidth = borderThickness;

      context.fillStyle = color
      context.fillText( children, textWidth*0.1, fontsize);
      return canvas
    }, [children])


    return (
      <sprite 
      scale={[2, 1.4, 2]} position={position}>
        <spriteMaterial attach="material" transparent alphaTest={0.5} >
          <canvasTexture attach="map" image={canvas} />
        </spriteMaterial>
      </sprite>
    )
  }

  export default Text
  