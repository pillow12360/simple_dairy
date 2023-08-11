import {useRef,useState} from "react"

const DiaryEditor = ({onCreate}) => {

  const authorInput = useRef();
  const contentInput = useRef();

  const [state,setState] = useState({
    author : "",
    content : "",
    emotion : 1,
  });

  // const [author, setAuthor] = useState("");
  // const [content, setContent] = useState("");

  const handleChangeState = (e) =>{
    console.log(e.target.name);
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name] : e.target.value,
    });
  }

  const handleSubmit = () => {
    if(state.author.length < 1){
      authorInput.current.focus();
      return;
    }
    if(state.content.length < 5){
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert('저장 성공');

    setState({
      author: "",
      content: "",
      emotion : 1,
    });

  }

  return <div className='DirayEditor'>
    <h2>오늘의 일기</h2>
    <div>
      <input 
      ref = {authorInput}
      name="author"
      value={state.author} 
      onChange={handleChangeState
        // 이벤트 input에 입력이 되었을때 이벤트 발생 (값이 바뀌었을 때 : onChange)
        // setState({
        //   ...state,
          // 스프레드 연산자로 값의 변경이 없는 컴포넌트를 유지 시켜줌
          // 스프레드 먼저 써야함 바뀌면 안됨 (순서대로 업데이트 되기 때문)
          // author: e.target.value,
        // });
      }/>
    </div>
    <div>
      <textarea 
      ref={contentInput}
      name='content'
      value={state.content} 
      onChange={handleChangeState}/>
    </div>


    <div>

      <span>오늘의 감정점수 : </span>
      <select 
      name='emotion' 
      value={state.emotion} 
      onChange={handleChangeState}>

        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>

      </select>
      
    </div>

    <div>
      <button
      onClick={handleSubmit}
      >일기 저장하기</button>
    </div>
  </div>
}

export default DiaryEditor;