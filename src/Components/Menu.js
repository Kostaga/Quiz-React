import React from 'react';


const Menu = ({handleClick}) => {
	return (
		<div className='menu'>
			<h1>Quizzical</h1>
			<h2>Some description if needed</h2>
			<button onClick={handleClick} type='text'>Start Quiz!</button>
		</div>
	)
}

export default Menu;