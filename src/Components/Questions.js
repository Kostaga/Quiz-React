import React, { useEffect } from 'react';
import {nanoid} from "nanoid"
const Questions = ({question,allAnswers,correct,check,onCorrectAnswersUpdate,correctAnswers,setCorrectAnswers}) => {

	const shuffleQuestions = React.useMemo(() => {
		return shuffleArray(allAnswers);
	  }, [allAnswers]);


const [isSelected, setIsSelected] = React.useState(-1);


useEffect(() => {
	if (isSelected !== -1) {
	  if (shuffleQuestions[isSelected] === correct) {
		setCorrectAnswers((previous) => previous + 1);
	  }
	}
  }, [isSelected, shuffleQuestions, correct, setCorrectAnswers]);
  


useEffect(() => {
    onCorrectAnswersUpdate(correctAnswers);
  }, [correctAnswers, onCorrectAnswersUpdate]);


const clickQuestion = (index) => {
	if (!check)
		setIsSelected(index);
   }



function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  

	const answers = shuffleQuestions.map((answer,index) => {
		let styles = {}
		if (check) {


			if (index !== isSelected && answer === correct) {
				styles = {backgroundColor: '#94D7A2'}
			}
		
			else if (index !== isSelected)
				styles = {backgroundColor: null}

			
			else if (index === isSelected && answer === correct) {
				styles = {backgroundColor: '#94D7A2'}
			}
			else
				styles = {backgroundColor: 'rgba(248, 188, 188, 0.45)'}

		}
		else {
			if (index === isSelected)
				styles = {backgroundColor: '#D6DBF5'}
			else {
				styles = {backgroundColor: null};
			}
		}
	 
		return (
			<button key={nanoid()} onClick={() => clickQuestion(index)} style={styles} type='text' className='answer'>{answer}</button>
		)
	})

	return (
		<div className='question'>
			<h2>{question}</h2>	
			{answers}
			<hr/>
		</div>
	)
}

export default Questions;