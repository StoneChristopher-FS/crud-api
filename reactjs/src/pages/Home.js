import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
	return(
		<div className='App'>
			<header className='App-header'>
				<h1>Dealership Name</h1>
				<Link to='/inventory'>See our inventory!</Link>     
			</header>
		</div>
	);
}

export default Home;