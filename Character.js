
import { randomArray, getPercentage} from "./utils.js"

function Character(data){
    Object.assign(this, data) 

    this.getDicePlaceholderHtml = function(diceCount){
        return new Array(diceCount).fill(0).map(function(){
            return `<div class="placeholder-dice"></div>`
        }).join('')
    }
    
    this.diceArray = this.getDicePlaceholderHtml(this.diceCount)

    this.maxHealth = this.health

    

    this.getPercentageHtml = function(){
        const precentage = getPercentage(this.health, this.maxHealth)
        return `
            <div class="health-bar-outer">
                <div class="health-bar-inner ${precentage < 25 ? 'danger' : ''}
                " style="width: ${precentage}%;"></div>
            </div>
        `
    }

    this.getRollHtml=function(diceCount){
        this.currentDiceScore = randomArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map(function(num){
            return  `<div class="dice">${num}</div>`
        }).join('')    
    }

    this.takeDamage = function(damageArray){
        const totalDamage = damageArray.reduce(function(total, current){
            return total + current
        })
        this.health -= totalDamage
        if(this.health <= 0){
            this.health = 0
            this.dead = true
        }
    }

    this.getCharacterHtml=function(){
        const {name, avatar, health, diceCount, diceArray} = this
        const percentageHtml = this.getPercentageHtml()
        return `
        <div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src=${avatar} />
            <div class="health">health: <b> ${health} </b></div>
            ${percentageHtml}
            <div class="dice-container">    
                ${diceArray}
            </div>
        </div>
        
        `
    }
}



export default Character