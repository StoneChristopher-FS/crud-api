import { Link } from 'react-router-dom';
import '../App.css';
import '../Custom.css';


function Home() {
	return(
		<div className='App'>
			<header className='App-header'>
				<h1>The Auto Haus</h1>
				<Link to='/inventory'>See our inventory!</Link>
				<Link to='/login'>Login</Link>  
				<Link to='/signup'>SignUp</Link>    
			</header>
		</div>
	);
}

export default Home;