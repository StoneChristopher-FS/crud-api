import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Vehicle from './pages/Vehicle';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/inventory/:id' exact element={<Vehicle />} />
				<Route path='/inventory' exact element={<Inventory />} />
				<Route path='/' exact element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
