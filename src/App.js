import {useRef, useState, useEffect, useMemo} from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id:1,
//     author:"한동찬",
//     content:"안녕",
//     emotion:5,
//     created_date : new Date().getTime()
//   },
//   {
//     id:2,
//     author:"아무개",
//     content:"안녕1",
//     emotion:4,
//     created_date : new Date().getTime()
//   },
//   {
//     id:3,
//     author:"아무개2",
//     content:"안녕2",
//     emotion:3,
//     created_date : new Date().getTime()
//   },
// ]

function App() {
  // https://jsonplaceholder.typicode.com/comments

  const [data, setData] = useState([]);

  const dataId = useRef(0)

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res)=> res.json());
    const initData = res.slice(0,20).map((it)=>{
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random()*5)+1, // 1부터 5까지 랜덤한 숫자 반환
        created_date : new Date().getTime(),
        id : dataId.current++
      }
    });
    setData(initData);
  };
  // api 호출 하는 함수 정의

  useEffect(()=>{
    getData();
  },[])

  const onCreate = (author, content, emotion ) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current,
    };
    dataId.current += 1;

    setData([newItem, ...data])
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it)=>it.id !== targetId);
    console.log(newDiaryList);
    setData(newDiaryList);
  };
  // Delete 는 취소 remove는 삭제

  const onEdit = (targetId, newContent) =>{
    setData(
      data.map((it)=>it.id===targetId ? {...it, content : newContent}: it));
    };
    // map 내장함수를 이용하여 모든 데이터를 순회한다 순회하면서 삼항연산자로 인해 같은 id 값의 객체가 나올 경우 그 객체를 newContent로 바꿔주고 다른 id 일 경우 그대로 반환 

    const getDiaryAnalysis = useMemo(
      () => {
      console.log("일기 분석 시작");

      const goodCount = data.filter((it)=>it.emotion >=3).length;
      // emotion props의 값이 3이상인 프롭의 개수를 읽어오는 기능
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount/data.length) * 100;
      return {goodCount,badCount,goodRatio};
      },[data.length]
      );
      // 0811 useMemo 연산 최적화 : 리엑트가 리렌더 하면서 발생하는 불필요한 연산을 최소화 해주는 역할 getDiaryAnalysis는 data.length 가 변하지 않는 이상 재연산할 필요가 없으므로 data.length의 값이 변할때만 연산 및 호출하도록 최적화 시켜줌 

    const {goodCount,badCount,goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  ); 
}

export default App;
