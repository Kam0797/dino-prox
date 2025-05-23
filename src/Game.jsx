import './App.css'
import {useEffect, useState} from 'react';

export default function Game() {

  function handleClick(e) {
    const dino = document.querySelector(".dino");
    if (e.type === "click" || e.code === "Space" || e.code === "Enter") {
      dino.classList.remove("jump");
      void dino.offsetWidth;
      dino.classList.add("jump");
    }
  }
  // const [rando,setRando] = useState(0);
  useEffect(() => {

    const gaps = [50,1000,1200,2000];
    const interval = setTimeout(() => {
      const cactusHeight = Math.floor(Math.random()*4)*10;
      const actualPlayArea = document.querySelector(".play-area-actual");
      // setRando(value);
      console.log(cactusHeight);
      const cactus = document.createElement("div");
      cactus.classList.add("cactus","slide-cactus");

      cactus.style.height = `${cactusHeight}px`;
      cactus.style.width = `${(cactusHeight)/2}px`;

      actualPlayArea.appendChild(cactus)
      setTimeout(()=> actualPlayArea.removeChild(cactus),3900);
    },gaps[Math.floor(Math.random()*4)]);
    return () => clearTimeout(interval);
  },[]);
  // setInterval(()=>{setRando(Math.floor(Math.randon()*5));console.log(rando)},1000);

  document.addEventListener("click",handleClick);
  document.addEventListener("keydown",handleClick);
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
