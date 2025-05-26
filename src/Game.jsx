import './App.css'
import {useEffect, useState, useRef} from 'react';

export default function Game() {
  const [score, setScore] = useState(0);
  const [gameRuns, setGameRuns] = useState(true);

  const gameRunsRef = useRef(gameRuns);
  const scoreIntervalRef = useRef(null);


  useEffect(()=> {
    gameRunsRef.current = gameRuns;
  },[gameRuns])

  useEffect (()=> {
    const score_area = document.querySelector(".score-area");

    if(!gameRuns){
      clearInterval(scoreIntervalRef.current);
      scoreIntervalRef.current = null;

      if(score_area) {
        score_area.style.paddingLeft = "15vw";
      }  
      return;
    }
    else {
      if (score_area.style.paddingLeft != "75%") score_area.style.paddingLeft = "75%";
      console.log("#1",gameRunsRef.current)
      scoreIntervalRef.current = setInterval(()=> {
        setScore(prev => prev+2);
      },300);
    }
    

    return () => {
        clearInterval(scoreIntervalRef.current);
        scoreIntervalRef.current = null;
    }
  },[gameRuns]);


  
  
  function handleClick(e) {
    const dino = document.querySelector(".dino");
    if (e.type === "mousedown" || e.code === "Space" /* || e.code === "Enter" */) {
      dino.classList.remove("jump");
      void dino.offsetWidth;
      dino.classList.add("jump");
    }
    else if (e.code === "Enter") {
      setGameRuns(game_state => !game_state);
    }
  }


  useEffect(() => {
    const gaps = [30,30,3000,2000];
    const actualPlayArea = document.querySelector(".play-area-actual");
    let cactusTimeOut;
    function createCactus() {
      if(!gameRuns) return;
      // if(gameRunsRef.current) {
         console.log("#2",gameRunsRef) 
        const cactusHeight = ( 1 + Math.floor(Math.random()*4))*1.5;
        // setRando(value);
        console.log(cactusHeight);
        const cactus = document.createElement("div");
        cactus.classList.add("cactus","slide-cactus");
    
        cactus.style.height = `${cactusHeight}vh`;
        cactus.style.width = `${(cactusHeight)/2}vw`;

        actualPlayArea.appendChild(cactus)
        setTimeout(()=> {
          if(actualPlayArea.contains(cactus)) {
            actualPlayArea.removeChild(cactus);
          }
        },3950);

        cactusTimeOut = setTimeout(createCactus, gaps[Math.floor(Math.random()*4)])
      // }
    }
    createCactus();

    return () => {
      if(cactusTimeOut) clearTimeout(cactusTimeOut)
    }

  },[gameRuns]);

useEffect(() => {
  document.addEventListener("mousedown", handleClick);
  document.addEventListener("keypress", handleClick);
  document.addEventListener("touchstart", handleClick);

  return () => {
    document.removeEventListener("mousedown", handleClick);
    document.removeEventListener("keypress", handleClick);
    document.removeEventListener("touchstart", handleClick);
  };
}, []);

  return(
    <>
      <div class="play-area">
        <div class="score-area" >{gameRuns ? score.toString().padStart(6,'0'):`Your Score:${score}`}</div>
        <div class="play-area-actual">
          <div class="dino" />
          <div class="cactus slide-cactus" />
        </div>
      </div>
    </>
  )
}
