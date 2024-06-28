import '../styles/Home.module.css';
import React, { useRef, useState, useEffect } from 'react';
import WaveForm from './WaveForm';
// use https://dev.to/ssk14/visualizing-audio-as-a-waveform-in-react-o67 for audio visualization

var curFile;

function Home() {

  const [buttonName, setButtonName] = useState("Play");

  const [audioFile, setAudioFile] = useState();

  const [analyzerData, setAnalyzerData] = useState(null);
  const audioElmRef = useRef(null);


  const audioAnalyzer = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 2048;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const source = audioCtx.createMediaElementSource(audioElmRef.current);
    source.connect(analyzer);
    source.connect(audioCtx.destination);
    source.onended = () => {
      source.disconnect();
    }

    setAnalyzerData({ analyzer, bufferLength, dataArray });
  }


  useEffect(() => {
    if (curFile) {
      curFile.pause();
      curFile = null;
      setButtonName("Play");
    }
    if (audioFile) {
      curFile = new Audio(audioFile);
      curFile.onended = () => {
        setButtonName("Play");
      };
    }
  }, [audioFile]);

  const handleClick = () => {
    if (buttonName === "Play") {
      curFile.play();
      setButtonName("Pause");
    } else {
      curFile.pause();
      setButtonName("Play");
    }
  }

  const uploadFile = (e) => {
    if (e.target.files[0]) {
      setAudioFile(URL.createObjectURL(e.target.files[0]));
      audioAnalyzer();
    }
  }



  return (
    <div>
      <h1>New Page Beginning!</h1>
      <button onClick={handleClick}>{buttonName}</button>

      {analyzerData && <WaveForm analyzerData={analyzerData} />}
      <div
        style={{
          height: 80,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <input type="file" accept="audio/*" onChange={uploadFile} />
        <audio src={audioFile ?? ""} controls ref={audioElmRef} />
      </div>
    </div>
  );
}

export default Home;