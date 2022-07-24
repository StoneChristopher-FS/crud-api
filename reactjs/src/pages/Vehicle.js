import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function Vehicle() {
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

    const { id } = useParams();
    const navigate = useNavigate();

    const API_BASE = process.env.NODE_ENV === 'development'
        ? `http://localhost:8000/api/v1`
        : process.env.REACT_APP_BASE_URL;

    let ignore = false;
    useEffect(() => {
        if(!ignore) {
            getInventory();
        }

        return () => {
            ignore = true;
        }
    }, []);

    const getInventory = async () => {
        setLoading(true)
        try {
            await fetch(`${API_BASE}/inventory/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log({data})
                        setInfo({
                            year: data.year,
                            make: data.make,
                            model: data.model,
                            color: data.color,
                            vin: data.vin,
                            price: data.price
                        })
                    })
        } catch(error) {
            setError(error.message || 'Unexpected Error')
        } finally {
            setLoading(false)
        }
    };

    const deleteVehicle = async () => {
        try {
            await fetch(`${API_BASE}/inventory/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                setVehicles(data)
                navigate('/inventory', { replace: true })
            })
        } catch(error) {
            setError(error.message || 'Unexpected Error')
        } finally {
            setLoading(false)
        }
    };

    const udpateVehicle = async () => {
        try {
            await fetch(`${API_BASE}/inventory/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
            .then(res => res.json())
            .then(data => {
                console.log({data})
            })
        } catch(error) {
            setError(error.message || 'Unexpected Error')
        } finally {
            setLoading(false)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        udpateVehicle();
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
                <h1>Vehicle Info</h1>
                <Link to='/'>Home</Link>
                <Link to='/inventory'>Inventory</Link>
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
                        <input type='text' name='vin' value={info.vin} onChange={handInputChanges} />
                    </label>
                    <label>
                        Price:
                        <input type='number' name='price' value={info.price} onChange={handInputChanges} />
                    </label>
                    <button type='submit' className='submit'>Confirm Edit</button>
                </form>

                <div className='card'>
                    <ul>
                        <li>
                            VIN: {info.vin}
                        </li>
                        <li>
                            {info.year}
                        </li>
                        <li>
                            {info.make} {info.model}
                        </li>
                        <li>
                            {info.color}
                        </li>
                        <li>
                            ${info.price}
                        </li>
                    </ul>
                </div>
                <button onClick={() => deleteVehicle()} className="remove">Remove from Inventory</button>
            </header>
        </div>
    )
}

export default Vehicle;