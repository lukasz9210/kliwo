import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header.js'
import Footer from './Footer.js'
import deleteImg from './images/delete.png'


const App = () => {
  const [units, setUnits] = useState([])
  const [allRooms0, setallRooms0] = useState([])
  const [allRooms1, setallRooms1] = useState([])
  const [allRooms2, setallRooms2] = useState([])
  const [allRooms3, setallRooms3] = useState([])

  useEffect(() => {
    let localStorageData = JSON.parse(window.localStorage.getItem('kliwoUnits'))
    console.log('localStorageData', localStorageData)
    if (!localStorageData) {
      return
    }
    setUnits(localStorageData)
    window.addEventListener('storage', () => {

      localStorageData = JSON.parse(window.localStorage.getItem('kliwoUnits'))
      console.log('EVENT LISTENER localStorageData', localStorageData)
      setUnits(localStorageData)
    })
  }, [])

  useEffect(() => {
    console.log('U2', units)
    if (units.length > 0) {
      findAllRooms0()
      if (units[1]) {
        findAllRooms1()
      }
      if (units[2]) {
        findAllRooms2()
      }
      if (units[3]) {
        findAllRooms3()
      }
    }
  }, [units])


  const findAllRooms0 = () => {
    let arr = []
    for (let i = 1; i <= 15; i++) {
      let propName = `room_type${i}`
      if (units[0][propName] == '2') {
        //console.log(`found number ${number} its: ${i}`)
        arr = [...arr, i]
      }
    }
    console.log("WSZYTSKIE POKOJE", arr)
    setallRooms0([...arr])
    return arr
  }

  const findAllRooms1 = () => {
    let arr = []
    for (let i = 1; i <= 15; i++) {
      let propName = `room_type${i}`
      if (units[1][propName] == '2') {
        //console.log(`found number ${number} its: ${i}`)
        arr = [...arr, i]
      }
    }
    console.log("WSZYTSKIE POKOJE", arr)
    setallRooms1([...arr])
    return arr
  }

  const findAllRooms2 = () => {
    let arr = []
    for (let i = 1; i <= 15; i++) {
      let propName = `room_type${i}`
      if (units[2][propName] == '2') {
        //console.log(`found number ${number} its: ${i}`)
        arr = [...arr, i]
      }
    }
    console.log("WSZYTSKIE POKOJE", arr)
    setallRooms2([...arr])
    return arr
  }

  const findAllRooms3 = () => {
    let arr = []
    for (let i = 1; i <= 15; i++) {
      let propName = `room_type${i}`
      if (units[3][propName] == '2') {
        //console.log(`found number ${number} its: ${i}`)
        arr = [...arr, i]
      }
    }
    console.log("WSZYTSKIE POKOJE", arr)
    setallRooms3([...arr])
    return arr
  }

  const roomsRow0 = () => {
    if (units.length) {
      if (allRooms0[0] || allRooms1[0] || allRooms2[0] || allRooms3[0]) {
        return true
      }
    }
    return false
  }

  const roomsRow1 = () => {
    if (units.length) {
      if (allRooms0[1] || allRooms1[1] || allRooms2[1] || allRooms3[1]) {
        return true
      }
    }
    return false
  }

  const roomsRow2 = () => {
    if (units.length) {
      if (allRooms0[2] || allRooms1[2] || allRooms2[2] || allRooms3[2]) {
        return true
      }
    }
    return false
  }

  const roomsRow3 = () => {
    if (units.length) {
      if (allRooms0[3] || allRooms1[3] || allRooms2[3] || allRooms3[3]) {
        return true
      }
    }
    return false
  }


  const roomsExists = room => {

    if (units.length > 0) {
      let unit1
      let unit2
      let unit3
      let unit4
      if (units[0][findRoom(room, 0, 'space')] == 0 || units[0][findRoom(room, 0, 'space')] == null || units[0][findRoom(room, 0, 'space')] == 'undefined') {
        unit1 = false
      } else {
        unit1 = true
      }

      if (units[1]) {
        //console.log('jest UNIT 2')
        if (units[1][findRoom(room, 1, 'space')] == 0 || units[1][findRoom(room, 1, 'space')] == null || units[1][findRoom(room, 1, 'space')] == 'undefined') {
          unit2 = false
        } else {
          unit2 = true
        }
      }

      if (units[2]) {
        //console.log('jest UNIT 3')
        if (units[2][findRoom(room, 2, 'space')] == 0 || units[2][findRoom(room, 2, 'space')] == null || units[2][findRoom(room, 2, 'space')] == 'undefined') {
          unit3 = false
        } else {
          unit3 = true
        }
      }

      if (units[3]) {
        //console.log('jest UNIT 4')
        if (units[3][findRoom(room, 3, 'space')] == 0 || units[3][findRoom(room, 3, 'space')] == null || units[3][findRoom(room, 3, 'space')] == 'undefined') {
          unit4 = false
        } else {
          unit4 = true
        }
      }

      if (units.length === 1) {
        if (unit1 === true) {
          return true
        }
        if (unit1 === false) {
          return false
        }
      }

      if (units.length === 2) {
        if (unit1 === true && unit2 === true) {
          return true
        }
        if (unit1 === false && unit2 === false) {
          return false
        }
      }

      if (units.length === 3) {
        if (unit1 === true && unit2 === true || unit3 === true) {
          return true
        }
        if (unit1 === false && unit2 === false || unit3 === false) {
          return false
        }
      }

      if (units.length === 4) {
        if (unit1 === true && unit2 === true || unit3 === true || unit4 === true) {
          return true
        }
        if (unit1 === false && unit2 === false || unit3 === false || unit4 === false) {
          return false
        }
      }
    }
    return true
  }

  const findRoom = (number, Cnumber, type) => {
    for (let i = 1; i <= 15; i++) {
      const propName = `room_type${i}`
      if (units[Cnumber][propName] == number) {
        //console.log(`found number ${number} its: ${i}`)
        if (type === 'space') {
          return `room${i}_m2`
        }
        if (type === 'floor') {
          return `room${i}_floor`
        }
        return i
      }
    }
    return false
  }

  const roomspace0 = n => {
    if (n == 0) {
      if (units[0][`room${allRooms0[0]}_m2`]) {
        return units[0][`room${allRooms0[0]}_m2`]
      }
    }
    if (n == 1) {
      if (units[1][`room${allRooms1[0]}_m2`]) {
        return units[1][`room${allRooms1[0]}_m2`]
      }
    }
    if (n == 2) {
      if (units[2][`room${allRooms2[0]}_m2`]) {
        return units[2][`room${allRooms2[0]}_m2`]
      }
    }
    if (n == 3) {
      if (units[3][`room${allRooms3[0]}_m2`]) {
        return units[3][`room${allRooms3[0]}_m2`]
      }
    }
  }

  const roomspace0_row2 = n => {
    if (n == 0) {
      if (units[0][`room${allRooms0[1]}_m2`]) {
        return units[0][`room${allRooms0[1]}_m2`]
      }
    }
    if (n == 1) {
      if (units[1][`room${allRooms1[1]}_m2`]) {
        return units[1][`room${allRooms1[1]}_m2`]
      }
    }
    if (n == 2) {
      if (units[2][`room${allRooms2[1]}_m2`]) {
        return units[2][`room${allRooms2[1]}_m2`]
      }
    }
    if (n == 3) {
      if (units[3][`room${allRooms3[1]}_m2`]) {
        return units[3][`room${allRooms3[1]}_m2`]
      }
    }
  }

  const roomspace0_row3 = n => {
    if (n == 0) {
      if (units[0][`room${allRooms0[2]}_m2`]) {
        return units[0][`room${allRooms0[2]}_m2`]
      }
    }
    if (n == 1) {
      if (units[1][`room${allRooms1[2]}_m2`]) {
        return units[1][`room${allRooms1[2]}_m2`]
      }
    }
    if (n == 2) {
      if (units[2][`room${allRooms2[2]}_m2`]) {
        return units[2][`room${allRooms2[2]}_m2`]
      }
    }
    if (n == 3) {
      if (units[3][`room${allRooms3[2]}_m2`]) {
        return units[3][`room${allRooms3[2]}_m2`]
      }
    }
  }

  const roomspace0_row4 = n => {
    if (n == 0) {
      if (units[0][`room${allRooms0[3]}_m2`]) {
        return units[0][`room${allRooms0[3]}_m2`]
      }
    }
    if (n == 1) {
      if (units[1][`room${allRooms1[3]}_m2`]) {
        return units[1][`room${allRooms1[3]}_m2`]
      }
    }
    if (n == 2) {
      if (units[2][`room${allRooms2[3]}_m2`]) {
        return units[2][`room${allRooms2[3]}_m2`]
      }
    }
    if (n == 3) {
      if (units[3][`room${allRooms3[3]}_m2`]) {
        return units[3][`room${allRooms3[3]}_m2`]
      }
    }
  }

  const roomspace0_floor = n => {
    if (n == 0) {
      if (units[0][`room${allRooms0[0]}_m2`]) {
        if (units[0][`room${allRooms0[0]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[0][`room${allRooms0[0]}_floor`]
      }
    }
    if (n == 1) {
      if (units[1][`room${allRooms1[0]}_m2`]) {
        if (units[1][`room${allRooms1[0]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[1][`room${allRooms1[0]}_floor`]
      }
    }
    if (n == 2) {
      if (units[2][`room${allRooms2[0]}_m2`]) {
        if (units[2][`room${allRooms2[0]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[2][`room${allRooms2[0]}_floor`]
      }
    }
    if (n == 3) {
      if (units[3][`room${allRooms3[0]}_m2`]) {
        if (units[3][`room${allRooms3[0]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[3][`room${allRooms3[0]}_floor`]
      }
    }
  }

  const roomspace0_row2_floor = n => {
    if (n == 0) {
      if (units[0][`room${allRooms0[1]}_m2`]) {
        if (units[0][`room${allRooms0[1]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[0][`room${allRooms0[1]}_floor`]
      }
    }
    if (n == 1) {
      if (units[1][`room${allRooms1[1]}_m2`]) {
        if (units[1][`room${allRooms1[1]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[1][`room${allRooms1[1]}_floor`]
      }
    }
    if (n == 2) {
      if (units[2][`room${allRooms2[1]}_m2`]) {
        if (units[2][`room${allRooms2[1]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[2][`room${allRooms2[1]}_floor`]
      }
    }
    if (n == 3) {
      if (units[3][`room${allRooms3[1]}_m2`]) {
        if (units[3][`room${allRooms3[1]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[3][`room${allRooms3[1]}_floor`]
      }
    }
  }

  const roomspace0_row3_floor = n => {
    if (n == 0) {
      if (units[0][`room${allRooms0[2]}_m2`]) {
        if (units[0][`room${allRooms0[2]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[0][`room${allRooms0[2]}_floor`]
      }
    }
    if (n == 1) {
      if (units[1][`room${allRooms1[2]}_m2`]) {
        if (units[1][`room${allRooms1[2]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[1][`room${allRooms1[2]}_floor`]
      }
    }
    if (n == 2) {
      if (units[2][`room${allRooms2[2]}_m2`]) {
        if (units[2][`room${allRooms2[2]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[2][`room${allRooms2[2]}_floor`]
      }
    }
    if (n == 3) {
      if (units[3][`room${allRooms3[2]}_m2`]) {
        if (units[3][`room${allRooms3[2]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[3][`room${allRooms3[2]}_floor`]
      }
    }
  }

  const roomspace0_row4_floor = n => {
    if (n == 0) {
      if (units[0][`room${allRooms0[3]}_m2`]) {
        if (units[0][`room${allRooms0[3]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[0][`room${allRooms0[3]}_floor`]
      }
    }
    if (n == 1) {
      if (units[1][`room${allRooms1[3]}_m2`]) {
        if (units[1][`room${allRooms1[3]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[1][`room${allRooms1[3]}_floor`]
      }
    }
    if (n == 2) {
      if (units[2][`room${allRooms2[3]}_m2`]) {
        if (units[2][`room${allRooms2[3]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[2][`room${allRooms2[3]}_floor`]
      }
    }
    if (n == 3) {
      if (units[3][`room${allRooms3[3]}_m2`]) {
        if (units[3][`room${allRooms3[3]}_floor`] == 0) {
          return (
            <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
          )
        }
        return units[3][`room${allRooms3[3]}_floor`]
      }
    }
  }

  const removeItem = unitId => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('kliwoUnits')) {
        cart = JSON.parse(localStorage.getItem('kliwoUnits'));
      }
      cart.map((unit, i) => {
        if (unit.id === unitId) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem('kliwoUnits', JSON.stringify(cart));
    }
    let localStorageData = JSON.parse(window.localStorage.getItem('kliwoUnits'))
    console.log('DELETE FUNCTION localStorageData', localStorageData)
    setUnits([...localStorageData])
    return cart;
  };


  const printStatus = data => {
    let statusClass = ''
    let statusName = ''
    switch (data.status) {
      case "1":
        statusName = 'sprzedane'
        statusClass = 'unit-status-sold'
        break;
      case "2": statusName = 'zarezerwowane'
        statusClass = 'unit-status-reserved'
        break;
      case "3": statusName = 'wolne'
        statusClass = 'unit-status-avaliable'
        break;
    }
    return (
      <div className={`${statusClass} unit-status flex ai-c`}>
        <span></span>
        <p>{statusName}</p>
      </div>
    )
  }

  return (
    <div className="comparison">
      <Header />
      {/* {JSON.stringify(units)} */}
      {units.length > 0 && (<div className="container comparison-container">
        <table className="c-table c-table-imgs">
          <tr>
            <th></th>
            <td className="c-table-imgs-mail-cell flex">
              {units.length > 0 && units.map((u, i) => {
                return <div className="c-table-imgs-mail-cell-item"><span onClick={() => removeItem(u.id)} className="c-table-delete"><img src={deleteImg} />Usuń</span><img className="c-table-imgs-mail-cell-item-img" src={u.img} />
                  <div className="c-table-imgs-mail-cell-item-mainData">
                    <p className="c-table-imgs-mail-cell-item-mainData-name">{u.name}</p>
                    <p>Osiedle Czereśniowe - Trzebnica</p>
                    {printStatus(u)}
                  </div>
                </div>
              })}
            </td>
          </tr>
        </table>
        <p className="c-table-title">Cena</p>
        <table className="c-table">
          <tr>
            <th>Cena</th>
            <td className="c-table-mail-cell flex">
              {units.length > 0 && units.map((u, i) => {
                return <div className="c-table-mail-cell-item">{u.price}</div>
              })}
            </td>
          </tr>
          <tr>
            <th>Cena za m <sup>2</sup></th>
            <td className="c-table-mail-cell flex">
              {units.length > 0 && units.map((u, i) => {
                return <div className="c-table-mail-cell-item">{u.priceperm2}</div>
              })}
            </td>
          </tr>
        </table>
        <p className="c-table-title">Dane podstawowe</p>
        <table className="c-table">
          <tr>
            <th>Piętro</th>
            <td className="c-table-mail-cell flex">
              {units.length > 0 && units.map((u, i) => {
                return <div className="c-table-mail-cell-item">{u.level}</div>
              })}
            </td>
          </tr>
          <tr>
            <th>Powierzchnia</th>
            <td className="c-table-mail-cell flex">
              {units.length > 0 && units.map((u, i) => {
                return <div className="c-table-mail-cell-item">{u.space}</div>
              })}
            </td>
          </tr>
          <tr>
            <th>Liczba pokoi</th>
            <td className="c-table-mail-cell flex">
              {units.length > 0 && units.map((u, i) => {
                return <div className="c-table-mail-cell-item">{u.rooms}</div>
              })}
            </td>
          </tr>
        </table>
        <p className="c-table-title space-table-title">Pow. użytkowa</p>
        <table className="c-table space-table">
          {
            roomsExists('1') && (<tr>
              <th>Korytarz</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('1', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }
          {
            roomsRow0() && (<tr>
              <th>Pokój</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && (
                  <div className="c-table-mail-cell-item">{roomspace0(0)}</div>
                )}
                {units.length > 1 && (
                  <div className="c-table-mail-cell-item">{roomspace0(1)}</div>
                )}
                {units.length > 2 && (
                  <div className="c-table-mail-cell-item">{roomspace0(2)}</div>
                )}
                {units.length > 3 && (
                  <div className="c-table-mail-cell-item">{roomspace0(3)}</div>
                )}
              </td>
            </tr>)
          }

          {
            roomsRow1() && (<tr>
              <th>Pokój 2</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row2(0)}</div>
                )}
                {units.length > 1 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row2(1)}</div>
                )}
                {units.length > 2 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row2(2)}</div>
                )}
                {units.length > 3 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row2(3)}</div>
                )}
              </td>
            </tr>)
          }

          {
            roomsRow2() && (<tr>
              <th>Pokój 3</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row3(0)}</div>
                )}
                {units.length > 1 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row3(1)}</div>
                )}
                {units.length > 2 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row3(2)}</div>
                )}
                {units.length > 3 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row3(3)}</div>
                )}
              </td>
            </tr>)
          }

          {
            roomsRow3() && (<tr>
              <th>Pokój 4</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row4(0)}</div>
                )}
                {units.length > 1 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row4(1)}</div>
                )}
                {units.length > 2 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row4(2)}</div>
                )}
                {units.length > 3 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row4(3)}</div>
                )}
              </td>
            </tr>)
          }

          {
            roomsExists('3') && (<tr>
              <th>Pokój + aneks kuchenny</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('3', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('4') && (<tr>
              <th>Łazienka</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('4', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('5') && (<tr>
              <th>WC</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('5', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('6') && (<tr>
              <th>Kuchnia</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('6', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('7') && (<tr>
              <th>Garderoba</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('7', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('8') && (<tr>
              <th>Ścianki działowe</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('8', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('9') && (<tr>
              <th>Balkon</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('9', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('10') && (<tr>
              <th>Taras</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('10', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('11') && (<tr>
              <th>Wiatrołap</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('11', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('12') && (<tr>
              <th>Zaplecze</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('12', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('13') && (<tr>
              <th>Pomieszczenie socjalne</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('13', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('14') && (<tr>
              <th>Sala sprzedarzy</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('14', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('15') && (<tr>
              <th>Przedsionek</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('15', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }


          {
            roomsExists('16') && (<tr>
              <th>Biuro</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('16', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('17') && (<tr>
              <th>Sala zabaw</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('17', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('18') && (<tr>
              <th>Pomieszczenie</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('18', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('19') && (<tr>
              <th>Pomieszczenie I</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('19', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('20') && (<tr>
              <th>Pomieszczenie II</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('20', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('21') && (<tr>
              <th>Pomieszczenie III</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('21', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('22') && (<tr>
              <th>Pomieszczenie IV</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('22', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('23') && (<tr>
              <th>Pom. gospodarcze</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('23', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('24') && (<tr>
              <th>Pom. gospodarcze 2</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('24', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('25') && (<tr>
              <th>Pom. gospodarcze 3</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('25', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('26') && (<tr>
              <th>Pom. gospodarcze</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('26', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('27') && (<tr>
              <th>Pom. porządkowe</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('27', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('28') && (<tr>
              <th>Komórka lokatorska</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('28', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('29') && (<tr>
              <th>Balkon 1</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('29', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('30') && (<tr>
              <th>Balkon 2</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('30', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('31') && (<tr>
              <th>Salon + aneks kuchenny</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('31', i, 'space')]}</div>
                })}
              </td>
            </tr>)
          }

        </table>
        <p className="c-table-title space-table-title">Pow. podłogi</p>
        <table className="c-table space-table">
          {
            roomsExists('1') && (<tr>
              <th>Korytarz</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('1', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('1', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsRow0() && (<tr>
              <th>Pokój</th>

              <td className="c-table-mail-cell flex">
                {units.length > 0 && (
                  <div className="c-table-mail-cell-item">{roomspace0_floor(0)}</div>
                )}
                {units.length > 1 && (
                  <div className="c-table-mail-cell-item">{roomspace0_floor(1)}</div>
                )}
                {units.length > 2 && (
                  <div className="c-table-mail-cell-item">{roomspace0_floor(2)}</div>
                )}
                {units.length > 3 && (
                  <div className="c-table-mail-cell-item">{roomspace0_floor(3)}</div>
                )}
              </td>
            </tr>)
          }

          {
            roomsRow1() && (<tr>
              <th>Pokój 2</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row2_floor(0)}</div>
                )}
                {units.length > 1 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row2_floor(1)}</div>
                )}
                {units.length > 2 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row2_floor(2)}</div>
                )}
                {units.length > 3 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row2_floor(3)}</div>
                )}
              </td>
            </tr>)
          }

          {
            roomsRow2() && (<tr>
              <th>Pokój 3</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row3_floor(0)}</div>
                )}
                {units.length > 1 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row3_floor(1)}</div>
                )}
                {units.length > 2 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row3_floor(2)}</div>
                )}
                {units.length > 3 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row3_floor(3)}</div>
                )}
              </td>
            </tr>)
          }

          {
            roomsRow3() && (<tr>
              <th>Pokój 4</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row4_floor(0)}</div>
                )}
                {units.length > 1 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row4_floor(1)}</div>
                )}
                {units.length > 2 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row4_floor(2)}</div>
                )}
                {units.length > 3 && (
                  <div className="c-table-mail-cell-item">{roomspace0_row4_floor(3)}</div>
                )}
              </td>
            </tr>)
          }

          {
            roomsExists('3') && (<tr>
              <th>Pokój + aneks kuchenny</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('3', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('3', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('4') && (<tr>
              <th>Łazienka</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('4', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('4', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('5') && (<tr>
              <th>WC</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('5', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('5', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('6') && (<tr>
              <th>Kuchnia</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('6', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('6', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('7') && (<tr>
              <th>Garderoba</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('7', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('7', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('8') && (<tr>
              <th>Ścianki działowe</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('8', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('8', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('9') && (<tr>
              <th>Balkon</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('9', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('9', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('10') && (<tr>
              <th>Taras</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('10', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('10', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('11') && (<tr>
              <th>Wiatrołap</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('11', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('11', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('12') && (<tr>
              <th>Zaplecze</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('12', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('12', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('13') && (<tr>
              <th>Pomieszczenie socjalne</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('13', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('13', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('14') && (<tr>
              <th>Sala sprzedarzy</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('14', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('14', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('15') && (<tr>
              <th>Przedsionek</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('15', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('15', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('16') && (<tr>
              <th>Biuro</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('16', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('16', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('17') && (<tr>
              <th>Sala zabaw</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('17', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('17', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('18') && (<tr>
              <th>Pomieszczenie</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('18', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('18', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('19') && (<tr>
              <th>Pomieszczenie I</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('19', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('19', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('20') && (<tr>
              <th>Pomieszczenie II</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('20', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('20', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('21') && (<tr>
              <th>Pomieszczenie III</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('21', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('21', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('22') && (<tr>
              <th>Pomieszczenie IV</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('22', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('22', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('23') && (<tr>
              <th>Pom. gospodarcze</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('23', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('23', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('24') && (<tr>
              <th>Pom. gospodarcze 2</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('24', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('24', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('25') && (<tr>
              <th>Pom. gospodarcze 3</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('25', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('25', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('26') && (<tr>
              <th>Pom. gospodarcze</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('26', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('26', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('27') && (<tr>
              <th>Pom. porządkowe</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('27', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('27', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('28') && (<tr>
              <th>Komórka lokatorska</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('28', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('28', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('29') && (<tr>
              <th>Balkon 1</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('29', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('29', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('30') && (<tr>
              <th>Balkon 2</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('30', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('30', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

          {
            roomsExists('31') && (<tr>
              <th>Salon + aneks kuchenny</th>
              <td className="c-table-mail-cell flex">
                {units.length > 0 && units.map((u, i) => {
                  if (units[i][findRoom('31', i, 'floor')]) {
                    return <div className="c-table-mail-cell-item">
                      <div class="info-box"><span>i</span><div class="info-box-data"><p>Ten parametr jest niedostępny</p></div></div>
                    </div>
                  }
                  return <div className="c-table-mail-cell-item">{units[i][findRoom('31', i, 'floor')]}</div>
                })}
              </td>
            </tr>)
          }

        </table>

        <table className="c-table c-table-btns">
          <tr>
            <th></th>
            <td className="c-table-btns-mail-cell flex">
              {units.length > 0 && units.map((u, i) => {
                return <div className="c-table-btns-mail-cell-item" ><a target="_blank" href={`http://inwestycje.kliwo.pl/mieszkanie/${u.id}`} className="btn">Dowiedz się więcej</a></div>
              })}
            </td>
          </tr>
        </table>
      </div>)}
      {units.length === 0 && (
        <p className="warning-msg">Nie wybrano żadnych lokali do porównania.</p>
      )}
      <Footer />
    </div>
  )
}

export default App;
