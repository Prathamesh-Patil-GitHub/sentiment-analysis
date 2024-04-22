import { useState } from "react";
import "./App.css";
import fetchRequest from "./utils/apiCall";
import angryEmoji from "./img/n-angry-emoji.png";
import cryingEmoji from "./img/n-crying-emoji.png";
import fearfulEmoji from "./img/n-fearful-emoji.png";
import angelEmoji from "./img/p-angel-emoji.png";
import sunglassesEmoji from "./img/p-sunglasses-emoji.png";
import smileyEmoji from "./img/p-smiley-emoji.png";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState({ text: "", sentiment: "" });

  const getSentiment = (sentimentValue) => {
    if (sentimentValue <= 0.5) {
      return "Negative";
    } else {
      return "Positive";
    }
  };

  const getProbability = (sentimentValue) => {
    if (sentimentValue <= 0.5) {
      sentimentValue = 0.5 - sentimentValue;
      return sentimentValue*200;
    } else {
      return (sentimentValue-0.5)*200;
    }
  };

  const handleTextInput = (event) => {
    setText(event.target.value);
  };

  const evaluateText = async () => {
    if (text.length == 0) {
      alert("Please enter some text before submitting!");
      return;
    }

    fetchRequest("post", "http://127.0.0.1:5000/evaluate-sentiment", {
      text: text,
    })
      .then((responseData) => {
        setResult({
          text: text,
          sentiment: getSentiment(responseData.sentiment),
          probability: getProbability(responseData.sentiment)
        });
        console.log(responseData);
      })
      .catch((err) => {
        alert(responseData["error"]);
      });
  };

  return (
    <>
      <div
        className={`hero-section ${result.sentiment == "" && "normal"} ${
          result.sentiment == "Positive" && "green"
        }
        ${result.sentiment == "Negative" && "red"}`}
        style={{ height: "100vh", width: "100vw" }}
      >
        <div className="card">
          <div className="text-center">
            <h3 htmlFor="exampleFormControlTextarea1" className="form-label">
              Enter Text Here
            </h3>
            <textarea
              className="form-control mt-4"
              id="exampleFormControlTextarea1"
              rows="3"
              value={text}
              onChange={handleTextInput}
              style={{ minWidth: "50%" }}
            ></textarea>
            <button
              type="button"
              onClick={evaluateText}
              className="button mt-4"
            >
              Evaluate Text
            </button>
          </div>
          {result.sentiment != "" && (
            <div className="text-center mt-4 text-light">
              <h3>Result:</h3>
              <h4>Text: {result.text}</h4>
              <h4>Sentiment: {result.sentiment}</h4>
              <h4>Probability: {result.probability.toPrecision(4)}%</h4>
            </div>
          )}
        </div>
        <img src={fearfulEmoji} className={`emoji ${result.sentiment == "Negative"? "big-emoji" : "small-emoji"}`} style={{left: "20vw", top: "5vh"}}/>
        <img src={cryingEmoji} className={`emoji ${result.sentiment == "Negative"? "big-emoji" : "small-emoji"}`} style={{left: "90vw", top: "40vh"}}/>
        <img src={angryEmoji} className={`emoji ${result.sentiment == "Negative"? "big-emoji" : "small-emoji"}`} style={{left: "70vw", top: "3vh"}}/>
        <img src={smileyEmoji} className={`emoji ${result.sentiment == "Positive"? "big-emoji" : "small-emoji"}`} style={{left: "80vw", top: "80vh"}}/>
        <img src={sunglassesEmoji} className={`emoji ${result.sentiment == "Positive"? "big-emoji" : "small-emoji"}`} style={{left: "10vw", top: "70vh"}}/>
        <img src={angelEmoji} className={`emoji ${result.sentiment == "Positive"? "big-emoji" : "small-emoji"}`} style={{left: "20vw", top: "80vh"}}/>
      </div>
    </>
  );
}

export default App;
