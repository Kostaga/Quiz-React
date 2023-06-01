import React, { useEffect } from 'react';

const Questions = ({question,allAnswers,correct,check,onCorrectAnswersUpdate}) => {

	const [shuffleQuestions] = React.useState(() => {
	return shuffleArray(allAnswers);
});


const [isSelected, setIsSelected] = React.useState(-1);

const [correctAnswers, setCorrectAnswers] = React.useState(0);


useEffect(() => {
	if (check && isSelected !== -1) {
		if (shuffleQuestions[isSelected] === correct) {
			setCorrectAnswers(previous => previous + 1);
		}

	}
}, [check,isSelected,shuffleQuestions,correct])



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
		
			if (index !== isSelected)
				styles = {backgroundColor: null}
				
			else if (index === isSelected && answer === correct) {
				styles = {backgroundColor: '#94D7A2'}
			}
			else
				styles = {backgroundColor: '#F8BCBC'}

		}
		else {
			if (index === isSelected)
				styles = {backgroundColor: '#D6DBF5'}
			else {
				styles = {backgroundColor: null};
			}
		}
	 
		return (
			<button onClick={() => clickQuestion(index)} style={styles} type='text' className='answer'>{answer}</button>
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