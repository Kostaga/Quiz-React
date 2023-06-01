import './App.css';
import Menu from './Components/Menu';
import React, {useEffect, useState} from 'react';
import Questions from './Components/Questions';
import {nanoid} from "nanoid"

function App() {

  // Score na ginetai epitelous
  // play again na ta kanei reset ola
  // formatting ligo ta dedomena na mh fainotnai etsi

  const [menu,setMenu] = useState(true);

  const [allQuestions,setAllQuestions] = useState([]);

  const [checkAnswers,setcheckAnswers] = useState(false);

  const [correctAnswers, setCorrectAnswers] = React.useState(0);

//Use Effect to call the data from the API and store them to allQuestions variable

  useEffect(() => {
    if (!menu) {
      fetch('https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple')
        .then((res) => res.json())
        .then((data) => {
          const updatedQuestions = data.results.map((item) => ({
            ...item,
            id: nanoid(),
            isClicked: false,
            allAnswers: [item.correct_answer, ...item.incorrect_answers]
          }));
          setAllQuestions(updatedQuestions);
        });

        
    }
  }, [menu]);


  const handleClick = () => {
    setMenu(false)
  }


  const handleCheck = () => {
    setcheckAnswers(previous => 
      !previous)
  }


  const handleCorrectAnswersUpdate = (value) => {
    setCorrectAnswers(value);
  };


//Blob conditional styles
const blobStyles = {
  width: '500px',
  height: '500px',
  right: '0%'
}

const blobStyles2 = {
  width: '500px',
  height: '500px',
  left: '0%'
}


const questionsArray = allQuestions.map((item) => {
  return (
    <Questions 
    key = {item.id}
    question = {item.question}
    correct = {item.correct_answer}
    allAnswers={item.allAnswers}
    check = {checkAnswers}
    onCorrectAnswersUpdate={(value) => handleCorrectAnswersUpdate(value)}
    id = {item.id}
    />
  )
});

  return (
    <div className="App">
      <div style={menu ? null : blobStyles2} className='blob1'></div>
			<div style={menu ? null : blobStyles} className='blob2'></div>
      {menu && <Menu key={nanoid()} handleClick = {handleClick} />}
      {!menu && questionsArray}
      {!menu  && <button onClick={handleCheck} className='check' type='text'>{checkAnswers ? 'Play again' : 'Check Answers'}</button>}
      <div className='results'>
      {checkAnswers && <h2 className='score'>You scored {correctAnswers}/{allQuestions.length} correct answers</h2> }
      </div>

      
    </div>
  );
}

export default App;
