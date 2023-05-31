import './App.css';
import Menu from './Components/Menu';
import React, {useEffect, useState} from 'react';
import Questions from './Components/Questions';
import {nanoid} from "nanoid"

function App() {

  const [menu,setMenu] = useState(true);

  const [allQuestions,setAllQuestions] = useState([]);


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


// Click να αλλάζει χρώμα η συγκεκριμένη απάντηση

const questionsArray = allQuestions.map((item) => {
  return (
    <Questions 
    key = {item.id}
    question = {item.question}
    correct = {item.correct_answer}
    allAnswers={item.allAnswers}
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
      {!menu  && <button className='check' type='text'>Check Answers</button>}

      
    </div>
  );
}

export default App;
