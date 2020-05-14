import React, { useState, useEffect } from 'react'
import plusImg from './images/ico_plus.png'
import { addToComparison } from './helpers.js'

const UnitListItem = ({ unit }) => {
  const [investment, setInvestment] = useState({})
  const [building, setBuilding] = useState({})
  const [level, setLevel] = useState({})
  const [status, setStatus] = useState({ class: '', text: '' })

  useEffect(() => {
    //fetchInvestment()
    fetchLevel()
    showStatus()
  }, [unit])

  useEffect(() => {
    if (Object.keys(level).length === 0) {
    } else {
      fetchBuilding()
    }
  }, [level])

  const showStatus = () => {
    switch (unit.status) {
      case '1':
        setStatus({ class: 'unitBox-sold', text: 'Sprzedane' })
        break;
      case '2':
        setStatus({ class: 'unitBox-reserved', text: 'Zarezerwowane' })
        break;
      case '3':
        setStatus({ class: 'unitBox-free', text: 'Dostępne' })
    }
  }

  const addToComparison = () => {
    let comparedUnits = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('kliwoUnits')) {
        comparedUnits = JSON.parse(localStorage.getItem('kliwoUnits'))
      }
      if (comparedUnits.length >= 4) {
        alert("Nie mona porównać więcej niz 4 mieszkania!")
        return
      }
      let unitDoubled
      if (comparedUnits.length > 0) {
        unitDoubled = comparedUnits.find(el => {
          return unit.id === el.id
        })
      }
      if (unitDoubled) {
        alert("To mieszkanie jest ju dodane do porównywarki!")
        return
      }
      console.log('unit1', unit)
      comparedUnits.push({
        ...unit,
        level: level.number
      })
      comparedUnits = Array.from(new Set(comparedUnits.map(u => u.id))).map(id => {
        return comparedUnits.find(u => u.id === id)
      })
      localStorage.setItem('kliwoUnits', JSON.stringify(comparedUnits))
      alert(`Dodałeś mieszkanie ${unit.name} do porównywarki`)
      // next()
    }
  }

  const fetchLevel = () => {
    const details = {
      'id': unit.level_id
    };

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    //console.log('formBody', formBody)

    fetch('http://kliwo.pl/api/levels-show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(r => {
      return r.json()
    }).then(j => {
      setLevel(j.data.levels)
    })
  }


  // fetch BUILDING
  const fetchBuilding = () => {
    const details = {
      'id': level.building_id
    };

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    //console.log('formBody', formBody)

    fetch('http://kliwo.pl/api/buildings-show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(r => {
      return r.json()
    }).then(j => {
      //console.log("budynek", j.data.building)
      setBuilding(j.data.building)
    })
  }


  // const fetchInvestment = () => {
  //   const details = {
  //     'id': unit.investment_id
  //   };

  //   let formBody = [];
  //   for (let property in details) {
  //     let encodedKey = encodeURIComponent(property);
  //     let encodedValue = encodeURIComponent(details[property]);
  //     formBody.push(encodedKey + "=" + encodedValue);
  //   }

  //   formBody = formBody.join("&");
  //   //console.log('formBody', formBody)

  //   fetch('http://kliwo.pl/api/investments-show', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  //     },
  //     body: formBody
  //   }).then(r => {
  //     return r.json()
  //   }).then(j => {
  //     setInvestment(j.data.investments)
  //     //console.log('this investment', j.data.investments)
  //   })
  // }


  return (
    <tr>
      <td>{unit.name}</td>
      <td>Osiedle Czereśniowe</td>
      <td>{building.name}</td>
      <td>{level.number}</td>
      <td>{unit.rooms}</td>
      <td>{unit.priceperm2}</td>
      <td>{unit.price}</td>
      <td>{unit.space}</td>
      <td>{status.text}</td>
      <td><button className="unitList-compare-btn" onClick={addToComparison}><img src={plusImg} alt="Proównaj" />Porównaj</button></td>
    </tr>
  )
}

export default UnitListItem