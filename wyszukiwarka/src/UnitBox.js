import React, { useState, useEffect } from 'react';
import Message from './Message.js'


const UnitBox = ({ unit }) => {
  // const [investment, setInvestment] = useState({})
  const [building, setBuilding] = useState({})
  const [level, setLevel] = useState({})
  const [status, setStatus] = useState({ class: '', text: '' })
  const [showMessage, setShowMessage] = useState('translateY-500px')
  const [msgText, setMsgText] = useState('')
  const [messageStatus, setMessageStatus] = useState('')

  useEffect(() => {
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

  const fetchLevel = (levelId) => {
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

  const formatBigNumber = x => {
    //console.log('X LICZBA', x)
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
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

  const addToComparison = () => {
    let comparedUnits = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('kliwoUnits')) {
        comparedUnits = JSON.parse(localStorage.getItem('kliwoUnits'))
      }
      if (comparedUnits.length >= 4) {
        handleShowMessage('Nie można porównać więcej niz 4 mieszkania!', 'danger')
        return
      }
      let unitDoubled
      if (comparedUnits.length > 0) {
        unitDoubled = comparedUnits.find(el => {
          return unit.id === el.id
        })
      }
      if (unitDoubled) {
        handleShowMessage('To mieszkanie jest już dodane do porównywarki!', 'danger')
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
      handleShowMessage(`Dodałeś mieszkanie ${unit.name} do porównywarki`, 'success')
      // next()
    }
  }


  const handleShowMessage = (msg, status) => {
    setShowMessage('translateY0')
    setMessageStatus(status)
    setMsgText(msg)

    setTimeout(() => {
      setShowMessage('translateY-500px')
    }, 4000)
  }

  return (
    <div className="unitBox">
      <Message show={showMessage} msg={msgText} status={messageStatus} />
      <button className="btn add-to-compare-btn" onClick={addToComparison} >Dodaj do porównania</button>
      <div className="unitBox-main flex">
        <div className="unitBox-img w-50">
          <img src={unit.img} />
          <p className={`unitBox-status ${status.class}`}>
            <span className="unitBox-status-square"></span>{status.text}
          </p>
        </div>
        <div className="unitBox-data w-50">

          <p className="bold">Osiedle Czereśniowe</p>
          <p>ul. Zielonego Dębu, Trzebnica</p>
          <p className="unitBox-building-name">{building.name}</p>
          <p className="bold">{unit.name}</p>
          <div className="unitBox-data-details">
            <p><span>Powierzchnia</span><span>{`${unit.space} m`}<sup>2</sup></span></p>
            <p><span>Liczba pokoi</span><span>{unit.rooms}</span></p>
            <p><span>Cena</span><span>{formatBigNumber(unit.price)} zł</span></p>
            <p><span>Cena za m<sup>2</sup></span><span>{formatBigNumber(unit.priceperm2)} zł</span></p>
            <p><span>Piętro</span><span>{level.number}</span></p>
          </div>
        </div>
      </div>
      <a target="_blank" href={`http://inwestycje.kliwo.pl/mieszkanie/${unit.id}`} className="btn unitBox-learn-more">Dowiedz się więcej</a>
      {/* <p>Nazwa: <b>{unit.base.name}</b></p>
            <p>Cena: {unit.base.price}</p>
            <p>Cena za m<sup>2</sup> {unit.base.priceperm2}</p>
            <p>Liczba pokoi: {unit.base.rooms}</p>
            <p>Powierzchnia: {unit.base.space}</p>
            <p>Status: {unit.base.status}</p> */}
    </div>
  )
}

export default UnitBox

