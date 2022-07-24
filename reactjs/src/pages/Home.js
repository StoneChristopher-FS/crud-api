import { Link } from 'react-router-dom';
import '../App.css';
import '../Custom.css';


function Home() {
	return(
		<div className='App'>
			<header className='App-header'>
				<h1>The Auto Haus</h1>
				<Link to='/inventory'>See our inventory!</Link>     
			</header>
		</div>
	);
}

export default Home;