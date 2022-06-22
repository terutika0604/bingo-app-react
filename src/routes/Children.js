// children表示用

import React from 'react';
import { useState, useEffect } from 'react'
import axios from "axios";
import Bingo from "./Bingo";


export default function Children() {
  // 抽選配列
  const [squares,setSquares ] = useState(Array(75).fill(0));
  // 抽選中配列→childrenでは使用しないがエラー対策
  const [choosings, setChoosings] = useState(Array(75).fill(0));

    function get() {
      axios.get( 'http://' + window.location.host + '/test1').then((response) => {
        setSquares(response.data);
        console.log('GET');
      });
    }

    useEffect(() => {
 
      const intervalId = setInterval(() => {
          
          // 定期実行する関数
          get();

          
      }, 2000);
      return () => {
          clearInterval(intervalId)
      };

  }, []);
  
  return (
    <div className="App-box">
      <p className="title">ビンゴ抽選機(Children)</p>
      <Bingo 
        squares={squares} 
        choosings={choosings} 
      />
    </div>
  );

}



