import React from 'react';
// import {nanoid} from "nanoid"

const Questions = ({question,allAnswers,correct}) => {

	const [shuffleQuestions] = React.useState(() => {
	return shuffleArray(allAnswers);
});



const [isSelected, setIsSelected] = React.useState(-1);

const clickQuestion = (index) => {
	setIsSelected(index);
   };



function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }


	const answers = shuffleQuestions.map((answer,index) => {

		const styles = {
			backgroundColor: index === isSelected ? '#D6DBF5' : null,
			outlineStyle: 'none'
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