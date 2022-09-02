
function randomArray(diceCount){
    return new Array(diceCount).fill(0).map(function(){
        return Math.floor(Math.random() * 6) + 1
    }) 
}

const getPercentage = (value, maxValue) => value * 100 / maxValue

export {randomArray, getPercentage}