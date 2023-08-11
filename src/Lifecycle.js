import React, {useEffect, useState} from 'react'

const UnmountTest = () => {
  useEffect(()=>{
    console.log('Mount!');
    return ()=>{
      console.log('Unmount!');
    }
    // 콜백함수 안에 콜백함수는 언마운트 때 실행됨!
  },[]);
  // 컴포넌트가 언마운트되는 순간 콜백함수 실행
  return <div>Unmount Testing component</div>
};




const LifeCycle = () =>{

  

  // const [count, setCount] = useState(0);
  // const [text, setText] = useState(0);

  // useEffect(()=>{
  //   console.log('Mount!')
  // },[]);
  // // 마운트 될 때 콜백함수 실행!
  // useEffect(()=>{
  //   console.log('Update!')
  // })
  // // 업데이트 될 때 콜백함수 실행!

  // useEffect(()=>{
  //   console.log(`count is update :l ${count}`);
  //   if(count > 5) {
  //     alert("count가 5를 넘었습니다. 따라서 1로 초기화 합니다.");
  //     setCount(1);
  //   }
  // },[count]);
  
  // useEffect(()=>{
  //   console.log(`text is update :l ${text}`);
  // },[text]);
  // // defandancy array에 있는 값이 변하게 된다면, 콜백함수 실행!


  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return <div style={{padding : 20}}>
    <button onClick={toggle}>ON/OFF</button> 
    {isVisible && <UnmountTest/>}
    {/* isVisivle이 True이면 UnmountTest 실행*/}
  </div>;
};

export default LifeCycle;