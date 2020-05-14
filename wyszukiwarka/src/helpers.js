export const addToComparison = (unit) => {
    let comparedUnits = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('kliwoUnits')) {
            comparedUnits = JSON.parse(localStorage.getItem('kliwoUnits'))
        }
        console.log('unit1', unit)
        comparedUnits.push({
            ...unit
        })
        comparedUnits = Array.from(new Set(comparedUnits.map(u => u.base.id))).map(id => {
            return comparedUnits.find(u => u.base.id === id)
        })
        localStorage.setItem('kliwoUnits', JSON.stringify(comparedUnits))
        // next()
    }
}