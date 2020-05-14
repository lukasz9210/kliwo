import React, { useState, useEffect } from 'react';


const Comparison = () => {
    const [comparingUnits, setComparingUnits] = useState([])

    const getCart = async () => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('kliwoUnits')) {
                return JSON.parse(localStorage.getItem('kliwoUnits'))
            }
        }
        return []
    }

    const removeItem = unitId => {
        let comparedUnits = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('kliwoUnits')) {
                comparedUnits = JSON.parse(localStorage.getItem('kliwoUnits'));
            }
            comparedUnits.map((unit, i) => {
                if (unit.id === unitId) {
                    comparedUnits.splice(i, 1);
                }
            });
            localStorage.setItem('kliwoUnits', JSON.stringify(comparedUnits));
        }
        return comparedUnits;
    };

    useEffect(() => {
        getCart().then((data) => {
            console.log('do porownywarki', data)
            setComparingUnits(data)
        })
    }, [])

    return (
        <div style={{ marginTop: 1200 }}>
            <h3>Porównywarka</h3>
            <div>
                <table>
                    <thead>
                        <th>Nazwa</th>
                        <th>Powierzchnia</th>
                        <th>Cena</th>
                        <th>Cena za m<sup>2</sup></th>
                        <th>Liczba pokoi</th>
                        <th></th>
                    </thead>
                    {
                        comparingUnits.map((u, i) => (
                            <tbody>
                                <td>{u.name}</td>
                                <td>{u.space}</td>
                                <td>{u.price}</td>
                                <td>{u.price.perm2}</td>
                                <td>{u.rooms}</td>
                                <td><span onClick={id => { removeItem(u.id) }}>Usuń</span></td>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        </div>
    )
}

export default Comparison

