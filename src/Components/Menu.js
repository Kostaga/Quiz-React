import React from 'react';


const Menu = ({handleClick}) => {
	return (
		<div className='menu'>
			<h1>Quizzical</h1>
			<h2>See if you can answer the questions</h2>
			<button onClick={handleClick} type='text'>Start Quiz!</button>
		</div>
	)
}

export default Menu;