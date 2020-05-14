import React, { useState, useEffect } from 'react'
import UnitBox from './UnitBox.js'
import UnitListItem from './UnitListItem.js'
import boxImg from './images/miniatury.png'
import listImg from './images/lista.png'
import sort from 'fast-sort';


const SearchBoxes = ({ units }) => {
    const [view, setView] = useState('box')
    const [unitsState, setUnitsState] = useState([])

    useEffect(() => {
        setUnitsState(units)
    }, [units])

    const handleView = view => {
        setView(view)
    }

    const sortByPrice = e => {
        let sortedUnits = []
        switch (e.target.value) {
            case 'priceDesc':
                sortedUnits = sort(unitsState).desc(u => u.price);
                console.log('desc', sortedUnits)
                break;
            case 'priceAsc':
                sortedUnits = sort(unitsState).asc(u => u.price);
                console.log('asc', sortedUnits)
                break;
            case 'priceperm2Desc':
                sortedUnits = sort(unitsState).desc(u => u.priceperm2);
                console.log('asc', sortedUnits)
                break;
            case 'pricePerm2Asc':
                sortedUnits = sort(unitsState).asc(u => u.priceperm2);
                console.log('asc', sortedUnits)
                break;
            case 'spaceDesc':
                sortedUnits = sort(unitsState).desc(u => u.space);
                console.log('asc', sortedUnits)
                break;
            case 'spaceAsc':
                sortedUnits = sort(unitsState).asc(u => u.space);
                console.log('asc', sortedUnits)
                break;
            case 'roomsDesc':
                sortedUnits = sort(unitsState).desc(u => u.rooms);
                console.log('asc', sortedUnits)
                break;
            case 'roomsAsc':
                sortedUnits = sort(unitsState).asc(u => u.rooms);
                console.log('asc', sortedUnits)
                break;
        }
        setUnitsState([...sortedUnits])
    }

    return (
        <div className="search-content">
            <div className="unitBoxes-topBar flex jc-spb">
                <div className="search-sort arrow-after">
                    <select onChange={sortByPrice}>
                        <option value="0">Sortuj według</option>
                        <option value="priceDesc">Cena malejąco</option>
                        <option value="priceAsc">Cena rosnąco</option>
                        <option value="priceperm2Desc">Cena za m<sup>2</sup> malejąco</option>
                        <option value="pricePerm2Asc">Cena za m<sup>2</sup> rosnąco</option>
                        <option value="spaceDesc">Powierzchnia malejąco</option>
                        <option value="spaceAsc">Powierzchnia rosnąco</option>
                        <option value="roomsDesc">Liczba pokoi malejąco</option>
                        <option value="roomsAsc">Liczba pokoi rosnąco</option>
                    </select>
                </div>
                <p className="bold">Wyszukano {units.length} mieszkań</p>
                <div className="unitBoxes-topBar-view">
                    <button onClick={() => { handleView('box') }} style={{ background: view === 'box' ? '#fff' : '#F5F5F5' }}>Miniatury<img src={boxImg} alt="Widok mianatur" /></button>
                    <button onClick={() => { handleView('list') }} style={{ background: view === 'list' ? '#fff' : '#F5F5F5' }} >Widok listy<img src={listImg} alt="Widok listy" /></button>
                </div>
            </div>
            <div className="unitBoxes-main flex" style={{ display: view === 'box' ? '' : 'none' }}>
                {unitsState.map((u, i) => {
                    return <UnitBox key={i} unit={u} />
                })}
            </div>
            <div className="unitList-main" style={{ display: view === 'list' ? '' : 'none' }}>
                <table className="unitList-table">
                    <thead>
                        <tr>
                            <th>Nazwa Lokalu</th>
                            <th>Osiedle</th>
                            <th>Budynek</th>
                            <th>Piętro</th>
                            <th>l. pokoi</th>
                            <th>Cena za m<sup>2</sup></th>
                            <th>Cena</th>
                            <th>Powierzchnia</th>
                            <th>Dostępność</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {unitsState.map((u, i) => {
                            return <UnitListItem key={i} index={i} unit={u} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SearchBoxes