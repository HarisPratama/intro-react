import { useContext, useEffect, createContext } from 'react';

const colorContext = createContext({
	color: 'red'
});


const About = () => {
	const context = useContext(colorContext);


	useEffect(() => {
		console.log(context, '<< context');
	}, []);

	return (
		<div>

			<h1>About</h1>
		</div>
	);
};

export default About;

export {
	colorContext
};