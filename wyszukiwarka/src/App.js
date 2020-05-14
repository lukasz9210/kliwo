import React, { useState, useEffect } from 'react';
import './App.css';
import { Range } from 'rc-slider';
import Footer from './Footer.js'
import Header from './Header.js'
import 'rc-slider/assets/index.css';
import SearchBoxes from './SearchBoxes.js'
import checkImg from './images/check.png'
import unCheckedImg from './images/Rectangle.png'

const App = (props) => {
  const [unitsArray, setUnitsArray] = useState([])
  const [price, setPrice] = useState([0, 800000])
  const [pricePerM, setPricePricePerM] = useState([0, 15000])
  const [space, setSpace] = useState([0, 200])
  const [rooms, setRooms] = useState(-1)
  const [buildings, setBuildings] = useState([])
  const [selectedBuilding, setSelectedBuilding] = useState(0)
  const [selectedLevel, setSelectedLevel] = useState(-1)
  const [allUnitsInLevel, setAllUnitsInLevel] = useState([])
  const [finalResoults, setFinalResults] = useState([])
  const [allUnitsInBuilding, setAllUnitsInBuilding] = useState([])
  const [selectedInvestment, setSelectedInvestment] = useState(0)
  const [allInvestments, setAllInvestments] = useState([])
  const [status, setStatus] = useState(2)
  const [selectedBuildStatus, setSelectedBuildStatus] = useState(0)
  const [statusImg, setStatusImg] = useState(checkImg)
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)
  const [pricePerMMin, setpricePerMMin] = useState(0)
  const [pricePerMMax, setpricePerMMax] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPriceMin(price[0])
    setPriceMax(price[1])
  }, [price])

  useEffect(() => {
    setpricePerMMin(pricePerM[0])
    setpricePerMMax(pricePerM[1])
  }, [pricePerM])


  const min_price = price[0]
  const max_price = price[1]
  const min_priceperm2 = pricePerM[0]
  const max_priceperm2 = pricePerM[1]
  const min_space = space[0]
  const max_space = space[1]

  const fetchAllUnitsInLevel = () => {
    const details = {
      'number': selectedLevel
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log('formBody', formBody)
    fetch('http://kliwo.pl/api/levels-units-number-show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(r => {
      return r.json()
    }).then(j => {
      //console.log('all units in this level', j.data.units)
      createBuildingsArray(j.data.units).then(arr => {
        setAllUnitsInLevel(arr)
      })
    })
  }

  const fetchBuildings = () => {
    return fetch('http://kliwo.pl/api/buildings')
      .then(response => response.json())
      .then(json => {
        //setBuildings(json.data.unit)
        createBuildingsArray(json.data.buildings).then(b => {
          setBuildings(b)
          //console.log('budynki', b)
        })
      })
  }

  const createBuildingsArray = async data => {
    let array = []
    for (let d in data) {
      array.push(data[d])
    }
    return array
  }

  const fetchAllInvestments = () => {
    fetch('http://kliwo.pl/api/investments')
      .then(response => response.json())
      .then(res => {
        createBuildingsArray(res.data.investments).then(r => {
          setAllInvestments(r)
        })
      })
  }


  useEffect(() => {
    fetchBuildings()
    fetchAllInvestments()
    setStateParams()

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('rooms') == null) {
      handlePost()
    }
  }, [])

  const setStateParams = () => {
    let urlParams = new URLSearchParams(window.location.search);
    setTimeout(() => {
      if (urlParams.get('rooms')) {
        setRooms(urlParams.get('rooms'))
        setPrice([urlParams.get('min_price'), urlParams.get('max_price')])
        setSpace([urlParams.get('min_space'), urlParams.get('max_space')])
        setSelectedLevel(urlParams.get('level'))
      }
    }, 2000);
  }

  useEffect(() => {
    console.log("useEffect")
    let urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('rooms') != null) {
      if (urlParams.get('rooms') == rooms) {
        if (urlParams.get('min_space') == space[0] && urlParams.get('max_space') == space[1]) {
          if (urlParams.get('min_price') == price[0] && urlParams.get('max_price') == price[1]) {
            if (urlParams.get('level') == selectedLevel) {
              handlePost()
            }
          }
        }
      }
    }
  }, [rooms, price, space, selectedLevel])



  useEffect(() => {
    createFinalResults()
  }, [allUnitsInBuilding, unitsArray, allUnitsInLevel])

  const createFinalResults = () => {
    setTimeout(() => {
      let result;
      if (allUnitsInBuilding.length > 0) {
        console.log('wszystkie mieszkania w budynku', allUnitsInBuilding)
        result = unitsArray.filter(uA => allUnitsInBuilding.some(aUIB => uA.id === aUIB.id));
      } else {
        result = unitsArray
      }
      if (selectedLevel != -1) {
        console.log('wszytskie mieszkania na piętrze', allUnitsInLevel)
        result = result.filter(r => allUnitsInLevel.some(aUIL => r.id === aUIL.id));
      }
      //console.log('FINAL RESULTS', result)
      setFinalResults(result)
    }, 1)
  }

  const findUnits = () => {
    setLoading(true)
    handlePost().then(() => {
    })
  }

  const handlePost = async () => {

    if (selectedLevel != -1) {
      fetchAllUnitsInLevel()
    }

    if (selectedBuilding !== 0) {
      console.log('wybrano budynek')
      const details = {
        'id': selectedBuilding
      };

      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }

      formBody = formBody.join("&");
      console.log('formBody', formBody)

      fetch('http://kliwo.pl/api/buildings-units-show', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(r => {
        return r.json()
      }).then(j => {
        //console.log('all units in this building', j.data.units)
        createBuildingsArray(j.data.units).then(arr => {
          setAllUnitsInBuilding(arr)
          setLoading(false)
        })
      })
    }

    let details = {}
    if (selectedInvestment == '0') {
      details = {
        'min_price': min_price,
        'max_price': max_price,
        'min_priceperm2': min_priceperm2,
        'max_priceperm2': max_priceperm2,
        'min_space': min_space,
        'max_space': max_space,
        'rooms': rooms,
        'status': status,
        'build_status': selectedBuildStatus,
      };
    } else {
      details = {
        'investment_id': selectedInvestment,
        'min_price': min_price,
        'max_price': max_price,
        'min_priceperm2': min_priceperm2,
        'max_priceperm2': max_priceperm2,
        'min_space': min_space,
        'max_space': max_space,
        'rooms': rooms,
        'status': status,
        'build_status': selectedBuildStatus,
      };
    }


    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    console.log('formBody', formBody)

    fetch('http://kliwo.pl/api/units/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(r => {
      return r.json()
    }).then(j => {
      createBuildingsArray(j.data.unit).then(r => {
        setUnitsArray(r)
        setLoading(false)
        // console.log('allUnitsInBuilding', allUnitsInBuilding)
      })
    })
  }

  const handleRangeChangePrice = price => {
    console.log('price', price)
    setPrice([...price]);
  };

  const handleRangeChangePricePerM = pricePerM => {
    console.log('pricePerM', pricePerM)
    setPricePricePerM([...pricePerM]);
  }

  const handleRangeChangeSpace = space => {
    console.log('sppace', space)
    setSpace([...space]);
  }

  const handleSelectRooms = e => {
    console.log("Liczba pokoi", e.target.value)
    setRooms(e.target.value)
  }

  const handleSelectBuilding = e => {
    console.log("Budynek", e.target.value)
    setSelectedBuilding(e.target.value)
  }

  const handleSelectInvestment = e => {
    setSelectedInvestment(e.target.value)
  }

  const handleSelectLevel = e => {
    console.log("Piętro", e.target.value)
    setSelectedLevel(e.target.value)
  }

  const handleSelectBuildStatus = e => {
    console.log("Build status", e.target.value)
    setSelectedBuildStatus(e.target.value)
  }

  const handleStatusCheckboxChange = e => {
    if (e.target.checked) {
      setStatusImg(checkImg)
      setStatus(2)
    } else {
      setStatusImg(unCheckedImg)
      setStatus(3)
    }
  }


  return (
    <div className="search">
      <Header />
      <div className="search-form">
        <div className="container">
          <div className="search-form-select-fields">
            <div className="search-form-select-fields-container flex jc-spb">
              <div className="filter-group filter-group-investment arrow-after">
                <select onChange={handleSelectInvestment}>
                  <option selected="true" disabled="disabled" value="0">Inwestycja:</option>
                  <option value="0">Wszystkie</option>
                  {
                    allInvestments.map((b, i) => (
                      <option key={i} value={b.id}>{b.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="filter-group filter-group-building arrow-after">
                <select onChange={handleSelectBuilding}>
                  <option selected="true" disabled="disabled" value="0">Budynek:</option>
                  <option value="0">Wszystkie</option>
                  {
                    buildings.map((b, i) => (
                      <option key={i} value={b.id}>{b.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="filter-group arrow-after">
                <select onChange={handleSelectLevel}>
                  <option selected="true" disabled="disabled" value="-1">Piętro:</option>
                  <option value="-1">Wszystkie</option>
                  <option value="0">Parter</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="filter-group arrow-after">
                <select onChange={handleSelectRooms}>
                  <option selected="true" disabled="disabled" value="-1">Liczba pokoi:</option>
                  <option value="-1">Wszystkie</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="filter-group arrow-after">
                <select onChange={handleSelectBuildStatus}>
                  <option value="0">Wszystkie</option>
                  <option value="1">Wybudowane</option>
                </select>
              </div>
            </div>
          </div>
          <div className="earch-form-slide-fields-">
            <div className="search-form-slide-fields-container flex jc-spb">
              <div className="filter-group">
                <label>Cena:</label>
                <Range
                  min={0}
                  max={800000}
                  step={10000}
                  onChange={handleRangeChangePrice}
                  defaultValue={price}
                  tipFormatter={value => <span className="tooltip">{value}€</span>}
                />
                <div className="search-form-extremes flex jc-spb"><p>od:<span>{priceMin / 1000} tys. zł</span></p> - <p>do:<span>{priceMax / 1000} tys. zł</span></p></div>
              </div>
              <div className="filter-group">
                <label>Cena za m<sup>2</sup>:</label>
                <Range
                  min={0}
                  max={15000}
                  step={500}
                  onChange={handleRangeChangePricePerM}
                  defaultValue={pricePerM}
                  tipFormatter={value => <span className="tooltip">{value}€</span>}
                />
                <div className="search-form-extremes flex jc-spb"><p>od:<span>{pricePerMMin / 1000} tys. zł</span></p> - <p>do:<span>{pricePerMMax / 1000} tys. zł</span></p></div>
              </div>
              <div className="filter-group">
                <label>Powierzchnia mieszkania:</label>
                <Range
                  min={0}
                  max={200}
                  step={5}
                  onChange={handleRangeChangeSpace}
                  defaultValue={space}
                  tipFormatter={value => <span className="tooltip">{value}€</span>}
                />
                <div className="search-form-extremes flex jc-spb"><p>od:<span>{space[0]} m<sup>2</sup></span></p> - <p>do:<span>{space[1]} m<sup>2</sup></span></p></div>
              </div>
            </div>
          </div>
          <div className="filter-group filter-group-status-checkbox select-box flex jc-c">
            <span>
              <img src={statusImg} />
              <input type="checkbox" defaultChecked onChange={handleStatusCheckboxChange} />
            </span>
            <label>Pokaż zarezerwowane lokale</label>
          </div>
          <button id="filters-search-btn" className="btn" onClick={findUnits}>WYSZUKAJ MIESZKANIE</button>
          {/* <button onClick={testhandle}>set state</button>
      <button id="testId" onClick={logState}>log state</button> */}
        </div>
      </div>
      <div className="search-results">
        <div className="container">
          <div className="earch-results-topBar">
          </div>
          {loading && (
            <p className="loading-text">Ładowanie ... </p>
          )}
          {loading || (
            <SearchBoxes units={finalResoults} />
          )}
          {/* {JSON.stringify(finalResoults)} */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App;
