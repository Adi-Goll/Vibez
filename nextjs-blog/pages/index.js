import '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';


var curFile;

function Home() {

  const [buttonName, setButtonName] = useState("Play");

  const [audioFile, setAudioFile] = useState();


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
    }
  }



  return (
    <div>
      <h1>New Page Beginning!</h1>
      <button onClick={handleClick}>{buttonName}</button>
      <input type="file" onChange={uploadFile} />
    </div>
  );
}

export default Home;