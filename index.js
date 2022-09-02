import characterData from "./data.js"
import Character from "./Character.js"

let monsterArray = ["orc", "demon", "goblin"]
let isWaiting = false
function getNextMonster(){
    const nextMonster = characterData[monsterArray.shift()]
    return nextMonster ? new Character(nextMonster) : {}
}

let wizard = new Character(characterData.hero)
let monster = getNextMonster()

document.getElementById("attack-button").addEventListener("click", attack)


function attack(){
    if(!isWaiting){
        wizard.getRollHtml()
        monster.getRollHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)        
        reload()

        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monsterArray.length > 0){
                setTimeout(() => {
                    monster = getNextMonster()
                    wizard.diceArray = wizard.getDicePlaceholderHtml(wizard.diceCount)
                    reload() 
                    isWaiting = false 
                }, 1500);
            }
            else{
                endGame()
            }        
        }
    }
}  

function reload(){
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
    document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

function endGame(){
    const endMessage = wizard.health === 0 && monster.health === 0 && monster.name === "Goblin" ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
        `The ${monster.name} is Victorious`
    isWaiting = true
    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
    setTimeout(() => {
        document.body.innerHTML = `
        <div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
            <button id="reload-button">Reload</button>
        </div> `
        
        document.getElementById("reload-button").addEventListener("click", startGame)
    }, 1500);
}

function startGame(){
    window.location.reload(true)   
}

reload()
