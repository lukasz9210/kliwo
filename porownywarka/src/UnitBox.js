import React from 'react';

const UnitBox = ({ unit }) => {
    const addToComparison = (unit) => {
        let comparedUnits = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('kliwoUnits')) {
                comparedUnits = JSON.parse(localStorage.getItem('kliwoUnits'))
            }
            console.log('unit1', unit)
            comparedUnits.push({
                ...unit
            })
            comparedUnits = Array.from(new Set(comparedUnits.map(u => u.id))).map(id => {
                return comparedUnits.find(u => u.id === id)
            })
            localStorage.setItem('kliwoUnits', JSON.stringify(comparedUnits))
            // next()
        }
    }
    const handleAddToComparison = () => {
        addToComparison(unit)
    }

    return (
        <div className="unitBox" style={{ border: '1px solid red', display: 'inline-block', width: 200, textAlign: 'center', margin: 25 }}>
            <p>Nazwa: <b>{unit.name}</b></p>
            <p>Cena: {unit.price}</p>
            <p>Cena za m<sup>2</sup> {unit.priceperm2}</p>
            <p>Liczba pokoi: {unit.rooms}</p>
            <p>Powierzchnia: {unit.space}</p>
            <p>Status: {unit.status}</p>
            <button onClick={handleAddToComparison}>Dodaj do porównywarki</button>
        </div>
    )
}

export default UnitBox

