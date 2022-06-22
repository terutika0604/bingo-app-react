// master表示用

import React from 'react';
import { useState, useEffect  } from 'react'
import axios from "axios";
import Bingo from "./Bingo";
var timerId;


export default function Master() {
  // 抽選された数字
  const [randomNum, setRandomNum] = useState(0);
  // 表示用の数字
  const [displayNum, setDisplayNum] = useState(0);
  // 抽選配列
  const [squares,setSquares ] = useState(Array(75).fill(0));
  // 抽選中配列
  const [choosings, setChoosings] = useState(Array(75).fill(0));
   // ボタン制御用
   const [startBtn, setstartBtn] = useState('btnTrue');
   const [stopBtn, setstopBtn] = useState('btnFalse');

  // リロード時にjsonをGET 再ロード対策
  useEffect(() => {
    axios.get( 'http://' + window.location.host + '/test1').then((response) => {
        console.log('GET');
        setSquares(response.data);
      });
  }, []);


  const  randomChoose = () => {

    // スタートボタン無効化&ストップボタン有効化
    setstartBtn('btnFalse');
    setstopBtn('btnTrue');

    timerId = setInterval(() => {

      const ran = Math.floor(Math.random() * 75) + 1

      // 表示用の数字を変化させる
      setDisplayNum(ran);

      // 抽選中配列更新用の配列をリセット
      const tmp_choosings = Array(75).fill(0);
      // 抽選中配列更新用の配列にランダムに値をセット
      tmp_choosings[ran - 1] = 1;
      // 抽選中配列更新
      setChoosings(tmp_choosings);

    }, 200);

    // 抽選
    var tmp = Choose();

    // 抽選済みの場合は再度抽選
    while(squares[tmp - 1] === 1){
      console.log('再抽選');
      tmp = Choose();
    }

    // 抽選された数字として正式にステートへセット
    setRandomNum(tmp);
  }

  // 抽選関数
  function Choose() {
    var tmp = Math.floor(Math.random() * 75) + 1;
    console.log(tmp);

    return tmp;
  }


  // 抽選終了
  const randomChooseStop = () => {
    // 表示用の数字を変化を止める
    clearInterval(timerId);

    // ストップボタン無効化&スタートボタン有効化
    setstartBtn('btnTrue');
    setstopBtn('btnFalse');

    // 表示用の数字を配列変更用の数字と合わせる
    setDisplayNum(randomNum);
    // 抽選中配列をリセット
    setChoosings(Array(75).fill(0));
    
     // 配列更新
    // 更新前のsquaresを入れ、抽選状態をセットする
    const tmp_squares = squares;
    tmp_squares[randomNum - 1] = 1;
    // squaresへ反映する→実際に更新されるのはレンダリング後（関数が終わった後）
    setSquares(tmp_squares);
        
    // POST
    axios.post( 'http://' + window.location.host + '/test2', tmp_squares)
      .then(function (response) {
        // 送信成功時の処理
        console.log(response);
      })
      .catch(function (error) {
        // 送信失敗時の処理
        console.log(error);
      });
  }

// リセット
  const resetSquares = () => {

    if(window.confirm('リセットしますか？')){
      const rest_squares = Array(75).fill(0);
      setSquares(rest_squares);
      setDisplayNum(0);
      // POST
      axios.post( 'http://' + window.location.host + '/test2', rest_squares)
        .then(function (response) {
          // 送信成功時の処理
          console.log(response);
        })
        .catch(function (error) {
          // 送信失敗時の処理
          console.log(error);
        });
    }

  }
  


  return (
    <div className="App-box">
      <p className="title">ビンゴ抽選機(Master)</p>
      <p className="number">{displayNum}</p>
      <div className="btn-box">
        <button  className={'btn-start ' + startBtn}
          onClick={randomChoose}>
            Start</button>
        <button className={'btn-stop ' + stopBtn}
        onClick={randomChooseStop}>
          Stop</button>
        <button className="btn-reset"
        onClick={resetSquares}>
          Reset</button>
      </div>
      <Bingo 
        squares={squares} 
        choosings={choosings} 
      />
    </div>
  );

}



