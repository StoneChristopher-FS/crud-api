import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthService from '../services/auth.service';
import InventoryService from '../services/inventory.service';

import '../App.css';
import '../Custom.css';

function Inventory() {
    const [vehicles, setVehicles] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState({
        year: '',
        make: '',
        model: '',
        color: '',
        vin: '',
        price: ''
    });

    const navigate = useNavigate();

    const API_BASE = process.env.NODE_ENV === 'development'
        ? `http://localhost:8000/api/v1`
        : process.env.REACT_APP_BASE_URL;

    let ignore = false;
    useEffect(() => {

        InventoryService.getAllPrivateInventory().then(
            res => {
                setVehicles(res.data)
            },
            (err) => {
                console.log('Secured Page Error: ', error.response)
                if(err.res && err.res.status == 403) {
                    AuthService.logout()
                    navigate('/login')
                }
            }
        )
    }, []);

    const getInventory = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/inventory`)
                    .then(res => res.json())
                    .then(data => {
                        console.log({data})
                        setVehicles(data)
                    })
        } catch(error) {
            setError(error.message || 'Unexpected Error')
        } finally {
            setLoading(false)
        }
    };

    const createVehicle = async () => {
        try {
            await fetch(`${API_BASE}/inventory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            }).then(() => getInventory())
        } catch(error) {
            setError(error.message || 'Unexpected Error')
        } finally {
            setLoading(false)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createVehicle();
    };

    const handInputChanges = (event) => {
        event.persist();
        setInfo((info) => ({
            ...info,
            [event.target.name]: event.target.value
        }))
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Inventory:</h1>
                <Link to='/'>Home</Link>
                <form onSubmit={(event) => handleSubmit(event)} className="form">
                    <label>
                        Year:
                        <input type='number' name='year' value={info.year} onChange={handInputChanges} />
                    </label>
                    <label>
                        Make:
                        <input type='text' name='make' value={info.make} onChange={handInputChanges} />
                    </label>
                    <label>
                        Model:
                        <input type='text' name='model' value={info.model} onChange={handInputChanges} />
                    </label>
                    <label>
                        Color:
                        <input type='text' name='color' value={info.color} onChange={handInputChanges} />
                    </label>
                    <label>
                        VIN:
                        <input type='text' name='vin' value={info.vin} onChange={handInputChanges} placeholder='Leave blank to generate VIN' />
                    </label>
                    <label>
                        Price:
                        <input type='number' name='price' value={info.price} onChange={handInputChanges} />
                    </label>
                    <button type='submit' className='submit'>Add to Inventory</button>
                </form>
                <div className='inventory'>
                    {
                        vehicles && vehicles.map(car => (
                            <Link to={`/inventory/${car.vin}`} key={car.vin} className="card">
                                <div>
                                    <ul>
                                        <li>
                                            VIN: {car.vin}
                                        </li>
                                        <li>
                                            {car.year}
                                        </li>
                                        <li>
                                            {car.make} {car.model}
                                        </li>
                                        <li>
                                            {car.color}
                                        </li>
                                        <li>
                                            ${car.price}
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </header>
        </div>
    )
}

export default Inventory;

