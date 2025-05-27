import './App.css'
import {useEffect, useState, useRef} from 'react';

export default function Game() {
  const [score, setScore] = useState(0);
  const [gameRuns, setGameRuns] = useState(true);

  const gameRunsRef = useRef(gameRuns);
  const scoreIntervalRef = useRef(null);
  const miss = useRef(1)


  useEffect(()=> {
    gameRunsRef.current = gameRuns;
  },[gameRuns])

  useEffect (()=> {
    const score_area = document.querySelector(".score-area");

    if(!gameRuns){
      clearInterval(scoreIntervalRef.current);
      scoreIntervalRef.current = null;

      if(score_area) {
        score_area.style.paddingLeft = "50vw";
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
    if (e.type === "mousedown" || e.code === "Space" || e.code === "Enter") {
      dino.classList.remove("jump");
      void dino.offsetWidth;
      dino.classList.add("jump");
      
      console.log("::",gameRunsRef.current,miss.current)
      if(miss.current <3 && !gameRunsRef.current) {
        setGameRuns(true);
        miss.current++;
        // console.log("::",gameRuns,miss.current)
      }
    }
  }


  useEffect(() => {
    const gaps = [30,30,3000,2000];
    const cactus_types = ["cactus1.png","cactus2.png"];
    const actualPlayArea = document.querySelector(".play-area-actual");
    let cactusTimeOut;
    function createCactus() {
      if(!gameRuns) return;
      // if(gameRunsRef.current) {
         console.log("#2",gameRunsRef) 
        const cactusHeight = ( 1 + Math.floor(Math.random()*3))*3;
        // setRando(value);
        console.log(cactusHeight);
        const cactus = document.createElement("img");
        cactus.src = `/dino-prox/${cactus_types[Math.floor(Math.random()*cactus_types.length)]}`;
        cactus.classList.add("cactus","slide-cactus");
    
        cactus.style.height = `${cactusHeight}vh`;
        cactus.style.width = `${(cactusHeight)/1.5}vw`;

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


const dinoRef = useRef(null);

  // const cactusRect = cactus.getBoundingClientRect();


  useEffect(()=> {
    // const actualPlayArea = document.querySelector(".play-area-actual");
    const isStruck = () => {
      if (!gameRuns) return;
      
      // console.log("pos:")
      const dinoRect = dinoRef.current.getBoundingClientRect();
      const cacti = document.querySelectorAll('.cactus');

      for (const cactus of cacti) {
        const cactusRect = cactus.getBoundingClientRect();

        const struck = (
          dinoRect.bottom > cactusRect.top &&
          dinoRect.right > cactusRect.left && 
          dinoRect.left < cactusRect.right
        );
        if(struck) {
        console.log("pos:",dinoRect.bottom,cactusRect.top,"//",dinoRect.right,cactusRect.left,"//",dinoRect.left,cactusRect.right);
        console.log(struck);}

        if (struck) {
          setGameRuns(false);
          for (const cactu of cacti) {
            cactu.remove();
          }
          // while (actualPlayArea.contains(cactus)) {
          //   actualPlayArea.removeChild(cactus);
          // }          
          break;
        }
      }
    };

    const interval = setInterval(isStruck,30);
    return() => clearInterval(interval)
  },[]);

useEffect(()=> {
  function manageLife() {
    const heartList = document.querySelectorAll(".heart");
    console.log("##########",miss.current)
    if (miss.current == 2) {
      heartList[2].style.background = "grey"
    }
    else if (miss.current == 3) {
      heartList[1].style.background = "grey";
    }
    else if (miss.current == 4) {
      heartList[0].style.background = "grey"
    }

  }
  manageLife()
},[miss])

  return(
    <>
      <div class="play-area">
        <div class="score-life">
          <div class="life">
            <div class="heart" id="h1"/>
            <div class="heart" id="h2"/>
            <div class="heart" id="h3"/>
          </div>
          <div class="score-area" >{gameRuns ? score.toString().padStart(6,'0'):`Your Score:${score}`}</div>
        </div>
        <div class="play-area-actual">
          <div class="dino" ref={dinoRef}><img class="dino-img" src="/dino-prox/dino.png" alt="din"  /></div>
        </div>
      </div>
    </>
  )
}
