import './App.css'
import {useEffect, useState} from 'react';

export default function Game() {

  function handleClick(e) {
    const dino = document.querySelector(".dino");
    if (e.type === "mousedown" || e.code === "Space" || e.code === "Enter") {
      dino.classList.remove("jump");
      void dino.offsetWidth;
      dino.classList.add("jump");
    }
  }
  // const [rando,setRando] = useState(0);
  useEffect(() => {

    const gaps = [30,30,3000,2000];
    function createCactus() {
      const cactusHeight = ( 1 + Math.floor(Math.random()*4))*1.5;
      const actualPlayArea = document.querySelector(".play-area-actual");
      // setRando(value);
      console.log(cactusHeight);
      const cactus = document.createElement("div");
      cactus.classList.add("cactus","slide-cactus");
  
      cactus.style.height = `${cactusHeight}vh`;
      cactus.style.width = `${(cactusHeight)/2}vw`;

      actualPlayArea.appendChild(cactus)
      setTimeout(()=> actualPlayArea.removeChild(cactus),3950);
      setTimeout(createCactus, gaps[Math.floor(Math.random()*4)])
    }
    createCactus();
    // return () => clearTimeout(interval);
  },[]);
  // setInterval(()=>{setRando(Math.floor(Math.randon()*5));console.log(rando)},1000);

  document.addEventListener("mousedown",handleClick);
  document.addEventListener("keypress",handleClick);
  document.addEventListener("touchstart",handleClick)
  return(
    <>
      <div class="play-area">
        <div class="play-area-actual">
          <div class="dino" />
          <div class="cactus slide-cactus" />
        </div>
      </div>
    </>
  )
}
