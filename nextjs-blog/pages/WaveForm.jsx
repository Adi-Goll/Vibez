import { useRef, useEffect } from "react";
import useSize from "./useSize";

function animateBars(analyzer, canvas, canvasCtx, dataArray, bufferLength) {
    analyzer.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = '#000';

    const HEIGHT = canvas.height;
    var barWidth = Math.ceil(canvas.width / bufferLength) * 3;

    let barHeight;
    let x = 0;

    for (var i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * HEIGHT;


        const max = 10;
        const min = -10;
        var r = 242 + Math.floor(Math.random() * (max - min + 1)) + min;
        var g = 104 + Math.floor(Math.random() * (max - min + 1)) + min;
        var b = 65 + Math.floor(Math.random() * (max - min + 1)) + min;


        canvasCtx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';

        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

const WaveForm = ({ analyzerData }) => {
    const canvasRef = useRef(null);
    const { dataArray, analyzer, bufferLength } = analyzerData;

    const draw = (dataArray, analyzer, bufferLength) => {
        const canvas = canvasRef.current;
        if (!canvas || !analyzer) return;
        const canvasCtx = canvas.getContext("2d");


        const animate = () => {
            requestAnimationFrame(animate);
            canvas.width = canvas.width;
            animateBars(analyzer, canvas, canvasCtx, dataArray, bufferLength);
        }

        animate();
    }

    useEffect(() => {
        draw(dataArray, analyzer, bufferLength);

    }, [dataArray, analyzer, bufferLength]);

    return (
        <canvas
            style={{
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: "-10"
            }}
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );

};

export default WaveForm;