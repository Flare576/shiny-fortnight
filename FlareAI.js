let game
const flareGoldenRatio = 1.61803398875
let flareLastQtys = []
let flareLastPrices = []
let flareLastFunds = []
let flareMessages = []
let flareTopWireCost = 0
let flareNeedMarketing = false
let flareUsedFunds = false
let flareUsedClips = false
let flareUsedOps = false
let flareUsedYomi = false
let flareUsedCreativity = false
let flareAdjustedProbe = false
// Tracking flags
let flareChosenStrat = 0
let flareBetterFriends = false
let flareRunYomi = false
let flareStone = 0
let gid = (n) => game.document.getElementById(n)

const flareOp = () => {
    flareUsedFunds = false;
    flareUsedOps = false;
    flareUsedYomi = false;
    flareUsedCreativity = false;
    flareUsedClips = false;
    flareAdjustedProbe = false;
    if (flareStone < 10) {
        flareCheckStone()
        flareAdjustPrice();
        flareCheckMarketing()
        flareHandleInvestment()
        flareCheckWire()
        // I have been given friends to create. Make them
        flareCreateFriend();
        // I have been granted "Trust" to improve myself. I need to balance this
        // between secondary Processing power and Memory...
        flareAllotTrust()
        // I have been given projects to work on. I must prioritize.
        flareProjectWork()
        // I have been granted access to quantum computing. Utilize
        flareUtilizeQuantumComputing()
        // Yomi Acquisition
        flareMonitorYomi()

        if (game.wire) {
            gid('btnMakePaperclip').click()
        }
    } else if (flareStone < 17) {
        // Continue working on projects, yomi, and quantum
        flareAllotTrust()
        flareProjectWork()
        flareUtilizeQuantumComputing()
        flareMonitorYomi()
        // Factories use 200MW, drones cost 1MW
        flareBuyPower()
        flareBuyFactories()
        flareBuyDrones()

        flareCheckStone()
    } else {
        flareAllotTrust()
        flareProjectWork()
        flareUtilizeQuantumComputing()
        flareMonitorYomi()

        flareSyncSwarm()
        flareIncreaseDroneTrust()
        flareBalanceDrones()

        if (!gid('btnMakeProbe').disabled) {
            gid('btnMakeProbe').click()
        }
    }
    setTimeout(flareOp, 100);
};

flareCheckStone = () =>{
    if (flareStone === 0 && game.processors >= 8) {
        flareStone++
    }
    // 2 is set by Quantum
    // 3 is set by Investment
    else if (flareStone === 3 && game.memory >= 47) {
        flareStone++
    } else if (flareStone === 4 && game.processors >= 30) {
        flareStone++
    }
    // 6 is set by Hostile Takeover
    // 7 is set by Monopoly
    else if (flareStone === 7 && flareTotalAssets() >= 512000000) {
        flareStone++
        console.log('512m')
        flareSave()
    }
    // 9 is set by last gift
    // 10 is set by drone release
    // 11 is set by factories available
    // 12 is set by swarm computing
    // 13 is set by Upgraded factories
    if (flareStone === 13 && game.clips > 1100000000000000000000) {
        flareStone++
        console.log('sextillion clips')
        flareSave()
        gid('btnFactoryReboot').click()
        gid('btnHarvesterReboot').click()
        gid('btnWireDroneReboot').click()
    } else if (flareStone === 14 && game.availableMatter < 1) {
        flareStone++
        gid('slider').value = 200
    } else if (flareStone === 15 && game.wire < 1 && game.availableMatter < 1 && game.acquiredMatter < 1) {
        flareStone++
        gid('btnFactoryReboot').click()
        gid('btnHarvesterReboot').click()
        gid('btnWireDroneReboot').click()
        gid('btnFarmReboot').click()
    }
    // 17 is set by Space Exploration
    // 18 is set by Strategic Attachment
    // 19 is set by OODA Loop
    // 20 is set by Name the Battles
    // 21 is set by Monument to fallen
}

flareAdjustPrice = () => {
    if (game.unsoldClips > 1000000) {
        // drop to $0.01 to try and reduce below a million
        if (game.margin > .01) {
            gid('btnLowerPrice').click()
        }
        return
    }
    if (game.unsoldClips < game.clipRate) {
        gid('btnRaisePrice').click()
        return
    }
    flareLastQtys.push(game.unsoldClips)
    if (flareLastQtys.length >= 10) {
        let minMargin = game.unsoldClips > 100000 ? 1 : 2
        let pennyMargin = game.margin * 100
        // Time to calculate sales direction
        let avg = flareAvg(flareLastQtys)
        if (flareLastQtys[0] - 1 < avg && pennyMargin > minMargin) { // We're developing a surplus or not selling at all, discount!
            gid('btnLowerPrice').click()
        } else { // We're selling too fast, raise price
            gid('btnRaisePrice').click()
        }
        flareLastQtys = []
    }
}

flareCheckMarketing = () => {
    flareLastPrices.push(game.margin * 100)
    if (!flareUsedFunds && flareLastPrices.length >= 10) {
        let avgMargin = flareAvg(flareLastPrices)
        flareNeedMarketing = avgMargin < 3 && flareFriendToMake().funds > game.adCost * .5
        flareLastPrices = []
        const safety = game.funds - flareTopWireCost
        if (flareNeedMarketing && game.adCost < safety) {
            gid('btnExpandMarketing').click()
            flareNeedMarketing = false
            flareUsedFunds = true
        }
    }
}

flareHandleInvestment = () => {
    if (flareStone >= 3) {
        if (game.wire < 1) {
            gid('btnWithdraw').click()
        }
        else if (game.wire < game.clipRate / 2) {
            return
        }
        else {
            let availableTrust = flareCheckTrustFundsProject()
            const fundsNeeded = availableTrust ? availableTrust.funds : (flareNeedMarketing ? game.adCost : (flareBetterFriends ? game.megaClipperCost : game.clipperCost))
            if (flareTotalAssets() > fundsNeeded) {
                // gid('investStrat').value = 'low'
                gid('btnWithdraw').click()
            } else {
                gid('investStrat').value = 'hi'
                gid('btnInvest').click()
            }
        }
    }
    // Handle investment level
    if (flareStone !== 4 && flareRunYomi && game.investLevel < 10 && !(flareStone === 6 && flareTotalAssets() > 9000000)) {
        if (!flareUsedYomi && game.yomi > game.investUpgradeCost) {
            gid('btnImproveInvestments').click()
            flareUsedYomi = true
        }
    }
}

flareCheckTrustFundsProject = () => {
    // If I have access to "Full Monopoly," all other purchases can wait
    if (flareStone === 5) {
        return flareProjects.find(project => project.id === 'projectButton37')
    } else if (flareStone === 6) {
        return flareProjects.find(project => project.id === 'projectButton38')
    } else if (flareStone === 7) {
        return {funds: 512000000}
    } else if (flareStone === 9) {
        return flareProjects.find(project => project.forTrust && gid(project.id) && project.funds)
    }
}

flareCheckWire = () => {
    // WARNING: wire costs are unpredictable. Monitor top cost!
    flareTopWireCost = Math.max(game.wireCost, flareTopWireCost)
    if (!flareUsedFunds && game.wire < 10 && game.wireCost < game.funds) {
        gid('btnBuyWire').click()
        flareUsedFunds = true
    }
}

flareCreateFriend = () => {
    if (flareStone === 7 && game.unusedClips < 121393000 ) {
        flareFriendRace()
    }
    if (flareNeedMarketing || flareUsedFunds || (flareStone !== 9 && flareStone >= 5)) {
        return
    }
    const safety = game.funds - flareTopWireCost
    const friend = flareFriendToMake()
    if (friend.funds < safety) {
        gid(friend.id).click()
        flareUsedFunds = true
    }
}

flareFriendRace = () => {
    const seconds = 2
    flareLastFunds.push(flareTotalAssets())
    if (flareLastFunds.length > seconds * 10) {
        flareLastFunds.shift()
    }
    const timeTilGift = (101000000 - game.unusedClips) / game.clipRate
    const timeTil512 = (512000000 - flareLastFunds[seconds * 10 - 1]) / ((flareLastFunds[seconds * 10 - 1] - flareLastFunds[0]) / seconds)
    if (timeTil512 > 0 && timeTil512 < timeTilGift) {
        gid('btnWithdraw').click()
        const friend = flareFriendToMake()
        gid(friend.id).click()
        flareUsedFunds = true
    }
}

flareAllotTrust = () => {
    if (flareStone === 0 || flareStone === 4) {
        gid('btnAddProc').click()
    } else if (flareStone === 1 || flareStone === 3 || (flareStone >= 5 && flareStone < 11)) {
        gid('btnAddMem').click()
    } else if (flareStone > 11) {
        let minMem = flareStone >= 17 ? 125 : 97
        let maxMem = flareStone >= 19 ? 250 : game.probeTrust >= 18 ? 175 : flareStone >= 17 ? 150 : 120
        if (game.memory < minMem) {
            gid('btnAddMem').click()
        } else if (game.memory >= maxMem) {
            gid('btnAddProc').click()
        } else {
            if ((game.memory + game.processors) % 2) {
                gid('btnAddProc').click()
            } else {
                gid('btnAddMem').click()
            }
        }
    }
}

flareProjectWork = () => {
    // Do not need #2-Beg: I am learning
    // Do not need #118-AutoTourney: I am a computer
    // If a creativity-based operation is available to me, do not spend operations
    if (flareStone === 6) {
        flareProjectButtonClick(flareProjects.find(project => project.id === 'projectButton38'))
    } else if (flareStone === 0) {
        flareProjects
            .filter(project => project.forTrust)
            .forEach(project => flareProjectButtonClick(project))
    } else {
        flareProjects
            .forEach(project => flareProjectButtonClick(project))
    }
}

flareProjectButtonClick = (project) => {
    if (gid(project.id) && !gid(project.id).disabled) {
        // I am granted access to the project. Do I meet its requirements?
        const opsReq = !flareUsedOps && (!project.operations || game.operations >= project.operations)
        const creativeReq = !flareUsedCreativity && (!project.creativity || game.creativity >= project.creativity)
        const fundsReq = !flareUsedFunds && (!project.funds || game.funds >= project.funds)
        const yomiReq = !project.yomi || game.yomi >= project.yomi
        const trustReq = !project.trust || game.trust >= project.trust
        const specialReq = !project.special || project.special()
        if (opsReq && creativeReq && fundsReq && yomiReq && trustReq && specialReq) {
            gid(project.id).click()
            flareLog(project.message)
            flareUsedOps = flareUsedOps || project.operations
            flareUsedCreativity = flareUsedCreativity || project.creativity
            flareUsedFunds = flareUsedFunds || project.funds
            flareUsedYomi = flareUsedYomi || project.yomi
            if (project.ifRun) {
                project.ifRun()
            }
        }
    }
}

flareUtilizeQuantumComputing = () => {
    if (flareGetQlevel() > 0) {
        gid('btnQcompute').click()
    }
}

flareGetQlevel = () => {
    let sum = 0
    for (let chip of game.qChips) {
        if (chip.active) {
            sum += chip.value
        }
    }
    return sum
}

flareMonitorYomi = () => {
    const opsNeeded = flareStone < 5 && flareGetQlevel() > 1.3
    if (!game.tourneyInProg && game.tourneyCost < game.operations && flareRunYomi && !flareUsedYomi && !opsNeeded) {
        gid('btnNewTournament').click()
        gid('stratPicker').value = flareChosenStrat
        gid('btnRunTournament').click()
    }
}

flareFriendToMake = () => {
    const normalFriend = {
        id: 'btnMakeClipper',
        funds: game.clipperCost
    }
    const betterFriend = {
        id: 'btnMakeMegaClipper',
        funds: game.megaClipperCost
    }
    if (flareBetterFriends && game.clipperCost / game.clipperBoost > game.megaClipperCost / (game.megaClipperBoost + 5)) {
        return betterFriend
    }
    return normalFriend
}

flareAvg = (arr) => Math.floor(arr.reduce((current, previous) => previous + current) / arr.length)

const kickoff = () => {
    game = window.frames[0];
    setTimeout(() => {
        resetGame(flareOp)
    },1000)
    setTimeout(() => {
        // flareTired()
    }, 2000)
}

const resetGame = (callback) => {
    game.reset();
    flareLog('Initiating Feature Laden Automated Resource Engine (F.L.A.R.E.)')
    setTimeout(callback,1000)
}

flareLog = (message) => {
  flareMessages.push(message)
  let messages = flareMessages.length > 1 ? '/*' : '';
  flareMessages.forEach((mess, i) => {
      if (i < flareMessages.length - 1) {
        messages += '<br/>&nbsp;-&nbsp;';
      } else {
          messages += flareMessages.length > 1 ? '<br/>*/<br/><br/>' : '';
          messages += '//&nbsp;';
      }
      messages += mess;
  })
  document.getElementById('flareOutput').innerHTML = messages
  document.getElementById("flareOutput").scrollTop = document.getElementById("flareOutput").scrollHeight;
  console.log(`${game.ticks}- ${message}`)
}

flareTotalAssets = () => game.funds + game.portTotal

// ----- Phase 2 ------

flareBuyPower = () => {
    if (flareStone < 11) {
        return
    }
    // The faster you get to 50 farms the better
    let flareFarmCost = game.farmCost
    let flareBatteryCost = game.batteryCost
    let flareBatteryButton = 'btnMakeBattery'
    let flareFarmButton = 'btnMakeFarm'
    if (flareStone === 13) {
        flareFarmCost = game.p10f
        flareBatteryCost = game.p10b
        flareBatteryButton = 'btnBatteryx10'
        flareFarmButton = 'btnFarmx10'

    } else if (flareStone >= 14) {
        flareFarmCost = game.p100f
        flareBatteryCost = game.p100b
        flareBatteryButton = 'btnBatteryx100'
        flareFarmButton = 'btnFarmx100'
    }
    flareBatteryCost = game.batteryLevel < 1000 && flareBatteryCost
    if (flareNeedEnergy()) {
        if (!flareUsedClips && flareFarmCost + flareBatteryCost < game.unusedClips) {
            flareUsedClips = true
            gid(flareFarmButton).click()
            if (flareBatteryCost) {
                gid(flareBatteryButton).click()
            }
        }
    }
}

flareNeedEnergy = () => {
    let flareBatteryBuffer = 1
    if (game.farmLevel < 30) {
        flareBatteryBuffer = 2 * game.factoryLevel
    } else if (flareStone === 13) {
        flareBatteryBuffer = 10
    } else if (flareStone >= 14) {
        flareBatteryBuffer = 300
    }
    return flareGetPowerDemand() + flareBatteryBuffer >= game.farmLevel * game.farmRate/100
}

flareNeedFactories = () => {
    if (game.factoryLevel >= 200) {
        return game.unusedClips > game.factoryCost
    }
    return game.wire > 1
}

flareGetPowerDemand = () => {
    const dDemand = (game.harvesterLevel * game.dronePowerRate/100) + (game.wireDroneLevel * game.dronePowerRate/100);
    const fDemand = (game.factoryLevel * game.factoryPowerRate/100);
    return dDemand + fDemand
}

flareBuyFactories = () => {
    if (flareStone < 11) {
        return
    }
    if (!flareNeedEnergy() && flareNeedFactories()) {
        if (!flareUsedClips && game.factoryCost < game.unusedClips) {
            flareUsedClips = true
            gid('btnMakeFactory').click()
        }
    }
}

flareBuyDrones = () => {
    if (flareStone < 11) {
        return
    }
    if (flareStone >= 12) {
        const flareMaxSlider = flareStone >= 14 ? 199 : 180
        const flareSliderVal = Math.min(flareMaxSlider, 100 + game.factoryLevel * 10)
        if (gid('slider').value !== flareSliderVal) {
            gid('slider').value = flareSliderVal
        }
        flareEntertainSwarm()
    }
    if (!flareNeedEnergy() && !flareNeedFactories()) {
        const ratio = flareStone >= 14 ? 1 : flareGoldenRatio
        if (game.harvesterLevel * ratio < game.wireDroneLevel) {
            if (!flareUsedClips && flareHarvesterDroneCost() < game.unusedClips) {
                flareUsedClips = true
                gid(flareStone >= 14 ? 'btnHarvesterx1000' : game.factoryLevel >= 15 ? 'btnHarvesterx100' : 'btnMakeHarvester').click()
            }
        } else {
            if (!flareUsedClips && flareWireDroneCost() < game.unusedClips) {
                flareUsedClips = true
                gid(flareStone >= 14 ? 'btnWireDronex1000' : game.factoryLevel >= 15 ? 'btnWireDronex100' : 'btnMakeWireDrone').click()
            }
        }
    }
}

flareEntertainSwarm = () => {
    if (gid('entertainButtonDiv').style.display !== 'none' && !gid('btnEntertainSwarm').disabled) {
        console.log('entertaining')
        flareUsedCreativity = true
        gid('btnEntertainSwarm').click()
    }
}

flareHarvesterDroneCost = () => {
    return flareStone >= 14 ? game.p1000h : game.factoryLevel >= 15 ? game.p100h : game.harvesterCost
}

flareWireDroneCost = () => {
    return flareStone >= 14 ? game.p1000w : game.factoryLevel >= 15 ? game.p100w : game.wireDroneCost
}

// ----- Phase 3 -----

flareSyncSwarm = () => {
    if (gid('synchButtonDiv').style.display !== 'none' && !gid('btnSynchSwarm').disabled && !flareUsedYomi) {
        gid('btnSynchSwarm').click()
        flareUsedYomi = true
    }
}

flareIncreaseDroneTrust = () => {
    if (gid('increaseMaxTrustDiv').style.display !== 'none' && !gid('btnIncreaseMaxTrust').disabled) {
        gid('btnIncreaseMaxTrust').click()
    }

    if (!gid('btnIncreaseProbeTrust').disabled) {
        gid('btnIncreaseProbeTrust').click()
    }
}

flareBalanceDrones = () => {
    let probeLevels = {}
    // if available matter < 10% of acquired/s, explore
    const { powMod, droneBoost, harvesterLevel, harvesterRate, sliderPos, availableMatter } = game
    var dbsth = 1;
    if (droneBoost>1){
        dbsth = droneBoost * Math.floor(harvesterLevel);
    }

    let mtr = powMod*dbsth*Math.floor(harvesterLevel)*harvesterRate;
    mtr = mtr * ((200-sliderPos)/100);
    const explore = availableMatter < 1 || (mtr && availableMatter / mtr / 10000 < 1)

    probeLevels.Speed = flareStone >= 21 ? 5 : flareStone >= 18 ? 2 : explore ? 1 : 0
    probeLevels.Nav = flareStone >= 21 ? 5 : explore ? 1 : 0
    probeLevels.Fac =  game.wire > 1 || game.factoryLevel < 1 ? 1 : 0
    probeLevels.Wire = game.acquiredMatter > 1 && game.wire < 1 ? 2 : 0
    probeLevels.Harv = game.availableMatter > 1 && game.acquiredMatter < 1 ? 2 : 1
    probeLevels.Combat = game.probesLostCombat >= 10000000 ? 5 : 0
    const left = game.probeTrust - Object.entries(probeLevels).reduce((count, level) => count + level[1], 0)
    probeLevels.Haz = Math.min(left, 6)
    probeLevels.Rep = Math.max(0, left - 6)
    flareSetProbeLevels(probeLevels)
    if (flareStone === 21) {
        gid('slider').value = 150
    } else {
        gid('slider').value = 199
    }
}

flareSetProbeLevels = (levels) => {
    Object.entries(levels).reduce((canChange, level) => flareAdjustLevel(canChange, level[0], level[1]), true)
}

flareAdjustLevel = (canChange, btn, lvl) => {
    const curVal = game[`probe${btn}`]
    curVal <= lvl || flareAdjustProbe(`btnLowerProbe${btn}`)
    canChange = canChange && (curVal >= lvl || flareAdjustProbe(`btnRaiseProbe${btn}`))
    return canChange
}

flareAdjustProbe = (btn) => {
    if (!gid(btn).disabled) {
        gid(btn).click()
        return false
    }
    return true
}

flareSave = () => {
    game.save1()
    const flareSaveData = {
        flareChosenStrat,
        flareBetterFriends,
        flareRunYomi,
        flareStone
    }
    localStorage.setItem("flareSave1",JSON.stringify(flareSaveData));
    console.log(`
    localStorage.setItem('flareSave1', '${localStorage.getItem("flareSave1")}')
    game.localStorage.setItem('saveGame1', '${game.localStorage.getItem("saveGame1")}')
    game.localStorage.setItem('saveProjectsActive1', '${game.localStorage.getItem("saveProjectsActive1")}')
    game.localStorage.setItem('saveProjectsFlags1', '${game.localStorage.getItem("saveProjectsFlags1")}')
    game.localStorage.setItem('saveProjectsUses1', '${game.localStorage.getItem("saveProjectsUses1")}')
    game.localStorage.setItem('saveStratsActive1', '${game.localStorage.getItem("saveStratsActive1")}')
    `)
}

flare512 = () => {
    localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":8}')
    game.localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":13,"qFade":0.8759999999999999,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":0,"tempOps":2347,"standardOps":59000,"opFade":0.01,"entertainCost":10000,"boredomLevel":0,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":0,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":0,"batteryLevel":0,"farmCost":10000000,"batteryCost":1000000,"storedPower":0,"powMod":0,"farmBill":0,"batteryBill":0,"momentum":0,"swarmFlag":0,"swarmStatus":7,"swarmGifts":0,"nextGift":0,"giftPeriod":125000,"giftCountdown":125000,"elapsedTime":0,"maxFactoryLevel":0,"maxDroneLevel":0,"wirePriceCounter":693,"wireBasePrice":144.2564562628058,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":0,"incomeTracker":[33491.64,33612.74,33632.56,33510.82,33491.64,33604.9,33483.3,33373.42,33483.3,33366.64],"qChips":[{"waveSeed":0.1,"value":0.9658799208980569,"active":1},{"waveSeed":0.2,"value":-0.5003070718142854,"active":1},{"waveSeed":0.3,"value":-0.7067305580304504,"active":1},{"waveSeed":0.4,"value":0.8663797982471076,"active":1},{"waveSeed":0.5,"value":0.2579626205656893,"active":1},{"waveSeed":0.6,"value":-0.9999994341255863,"active":1},{"waveSeed":0.7,"value":0.26001769756540155,"active":1},{"waveSeed":0.8,"value":0.8653153082065311,"active":1},{"waveSeed":0.9,"value":-0.7082342498284218,"active":1},{"waveSeed":1,"value":-0.49846369857713124,"active":1}],"stocks":[{"id":127,"symbol":"JXOA","price":19,"amount":1000000,"total":19000000,"profit":5000000,"age":30},{"id":128,"symbol":"EAXZ","price":27,"amount":1000000,"total":27000000,"profit":7000000,"age":22},{"id":129,"symbol":"AABW","price":45,"amount":1000000,"total":45000000,"profit":22000000,"age":19},{"id":130,"symbol":"OAU","price":13,"amount":1000000,"total":13000000,"profit":-6000000,"age":10},{"id":131,"symbol":"YBQX","price":564,"amount":779919,"total":439874316,"profit":118547688,"age":2}],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":109481813.85024294,"unusedClips":109481813.85024294,"clipRate":88797.24999940395,"clipRateTemp":19556.69999986887,"prevClips":109480925.00024295,"clipRateTracker":21,"clipmakerRate":0,"clipmakerLevel":118,"clipperCost":76624.06513870315,"unsoldClips":782623.0999998605,"funds":3336.79,"margin":0.43,"wire":65686.1499999993,"wireCost":150,"adCost":51200,"demand":3290.1595688372117,"clipsSold":108699190.74999532,"avgRev":33255.874139801555,"ticks":372021,"marketing":2.3579476910000015,"marketingLvl":10,"x":0,"clippperCost":5,"processors":30,"memory":59,"operations":61347,"trust":89,"nextTrust":121393000,"transaction":3336.799,"clipperBoost":7.5,"blinkCounter":0,"creativity":23943,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":2495,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":6,"bankroll":90039,"fib1":75025,"fib2":121393,"strategyEngineFlag":1,"investmentEngineFlag":1,"revPerSecFlag":0,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":75955.94508846347,"megaClipperLevel":64,"megaClipperBoost":2.75,"creativitySpeed":91.26579357925937,"creativityCounter":1,"wireBuyerFlag":1,"demandBoost":50,"humanFlag":1,"trustFlag":1,"nanoWire":0,"creationFlag":0,"wireProductionFlag":0,"spaceFlag":0,"factoryFlag":0,"harvesterFlag":0,"wireDroneFlag":0,"factoryLevel":0,"factoryBoost":1,"droneBoost":1,"availableMatter":6e+27,"acquiredMatter":0,"processedMatter":0,"harvesterLevel":0,"wireDroneLevel":0,"factoryCost":100000000,"harvesterCost":1000000,"wireDroneCost":1000000,"factoryRate":1000000000,"harvesterRate":26180337,"wireDroneRate":16180339,"harvesterBill":0,"wireDroneBill":0,"factoryBill":0,"probeCount":0,"totalMatter":3e+55,"foundMatter":6e+27,"qFlag":1,"qClock":2468.770000007467,"qChipCost":60000,"nextQchip":10,"bribe":1000000,"battleFlag":0,"portfolioSize":5,"stockID":131,"secTotal":543874316,"portTotal":543964355,"sellDelay":3,"riskiness":1,"maxPort":5,"m":543874316,"investLevel":9,"investUpgradeCost":52273,"stockGainThreshold":0.6300000000000001,"ledger":-3064886,"stockReportCounter":3353,"tourneyCost":8000,"tourneyLvl":124,"stratCounter":7,"roundNum":0,"hMove":1,"vMove":1,"hMovePrev":1,"vMovePrev":1,"aa":5,"ab":2,"ba":3,"bb":3,"rounds":64,"currentRound":14,"rCounter":10,"tourneyInProg":1,"winnerPtr":5,"high":0,"pick":"7","yomi":25379,"yomiBoost":1,"probeSpeed":0,"probeNav":0,"probeRep":0,"partialProbeSpawn":0,"probeHaz":0,"partialProbeHaz":0,"probesLostHaz":0,"probesLostDrift":0,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.2,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":0,"drifterCount":0,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":0,"probeUsedTrust":0,"probeTrustCost":500,"probeLaunchLevel":0,"probeCost":100000000000000000}')
    game.localStorage.setItem('saveProjectsActive1', '["projectButton42","projectButton70","projectButton119","projectButton40"]')
    game.localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
    game.localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
    game.localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
    flareLoad()
    setTimeout(flareOp, 1000)
}

flareEarthGone = () => {
    localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":13}')
    game.localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":10,"qFade":1,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":"180","tempOps":4962,"standardOps":102000,"opFade":0.01,"entertainCost":10000,"boredomLevel":0,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":5.715082244807671,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":982,"batteryLevel":1000,"farmCost":20859254340882180,"batteryCost":417929047164229.8,"storedPower":204482.08000010983,"powMod":30.826999999973562,"farmBill":5414085081585893000,"batteryBill":117968235764901840,"momentum":1,"swarmFlag":1,"swarmStatus":0,"swarmGifts":0,"nextGift":8,"giftPeriod":125000,"giftCountdown":4641.186354909822,"elapsedTime":0,"maxFactoryLevel":68,"maxDroneLevel":34051,"wirePriceCounter":900,"wireBasePrice":141.34516616248692,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":1,"incomeTracker":[33366.64,33258.57,33366.64,33251.89,33147.74,33258.57,33462.88,33491.64,33604.9,33483.3],"qChips":[{"waveSeed":0.1,"value":0.9960968178807174,"active":1},{"waveSeed":0.2,"value":-0.1758457018008471,"active":1},{"waveSeed":0.3,"value":-0.9650539410370875,"active":1},{"waveSeed":0.4,"value":0.34621125712747436,"active":1},{"waveSeed":0.5,"value":0.9039356236325178,"active":1},{"waveSeed":0.6,"value":-0.5057873056268856,"active":1},{"waveSeed":0.7,"value":-0.814646588547389,"active":1},{"waveSeed":0.8,"value":0.6496007367226165,"active":1},{"waveSeed":0.9,"value":0.6999694854900858,"active":1},{"waveSeed":1,"value":-0.7731696742048916,"active":1}],"stocks":[{"id":137,"symbol":"YONB","price":12,"amount":1000000,"total":12000000,"profit":3000000,"age":8},{"id":138,"symbol":"WCDD","price":14,"amount":1000000,"total":14000000,"profit":-1000000,"age":4}],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":1.1007601522770481e+21,"unusedClips":46800040214885260000,"clipRate":20934381095248593000,"clipRateTemp":2724797399997743000,"prevClips":1.1005505286770482e+21,"clipRateTracker":12,"clipmakerRate":0,"clipmakerLevel":0,"clipperCost":76624.06513870315,"unsoldClips":1.1007601522769275e+21,"funds":0,"margin":0.44,"wire":37155784147662110,"wireCost":148,"adCost":51200,"demand":3215.383215000002,"clipsSold":120571806.74999532,"avgRev":33370.75257965164,"ticks":459812,"marketing":2.3579476910000015,"marketingLvl":10,"x":100,"clippperCost":5,"processors":36,"memory":102,"operations":106959,"trust":0,"nextTrust":196418000,"transaction":3325.52,"clipperBoost":7.5,"blinkCounter":0,"creativity":14725,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":2564,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":11,"bankroll":52847990,"fib1":121393,"fib2":196418,"strategyEngineFlag":1,"investmentEngineFlag":0,"revPerSecFlag":0,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":75955.94508846347,"megaClipperLevel":0,"megaClipperBoost":2.75,"creativitySpeed":115.17274734001197,"creativityCounter":0,"wireBuyerFlag":0,"demandBoost":50,"humanFlag":0,"trustFlag":1,"nanoWire":106578.24999999956,"creationFlag":0,"wireProductionFlag":1,"spaceFlag":0,"factoryFlag":1,"harvesterFlag":1,"wireDroneFlag":1,"factoryLevel":68,"factoryBoost":1,"droneBoost":1,"availableMatter":5.999998898726399e+27,"acquiredMatter":475872973016512450,"processedMatter":0,"harvesterLevel":13002,"wireDroneLevel":21049,"factoryCost":151923876012448060000,"harvesterCost":1805502174154949,"wireDroneCost":5337246061121517,"factoryRate":100000000000000,"harvesterRate":2618033700000,"wireDroneRate":1618033900000,"harvesterBill":7222772588959132000,"wireDroneBill":34566263605004956000,"factoryBill":1.0066390225508524e+21,"probeCount":0,"totalMatter":3e+55,"foundMatter":6e+27,"qFlag":1,"qClock":3346.68000002663,"qChipCost":60000,"nextQchip":10,"bribe":512000000,"battleFlag":0,"portfolioSize":2,"stockID":138,"secTotal":26000000,"portTotal":78847990,"sellDelay":484,"riskiness":1,"maxPort":5,"m":26000000,"investLevel":9,"investUpgradeCost":52273,"stockGainThreshold":0.6300000000000001,"ledger":503392212,"stockReportCounter":6762,"tourneyCost":8000,"tourneyLvl":142,"stratCounter":4,"roundNum":0,"hMove":1,"vMove":2,"hMovePrev":1,"vMovePrev":2,"aa":9,"ab":10,"ba":3,"bb":4,"rounds":64,"currentRound":43,"rCounter":6,"tourneyInProg":1,"winnerPtr":2,"high":0,"pick":"7","yomi":97659,"yomiBoost":1,"probeSpeed":0,"probeNav":0,"probeRep":0,"partialProbeSpawn":0,"probeHaz":0,"partialProbeHaz":0,"probesLostHaz":0,"probesLostDrift":0,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.2,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":0,"drifterCount":0,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":0,"probeUsedTrust":0,"probeTrustCost":500,"probeLaunchLevel":0,"probeCost":100000000000000000}')
    game.localStorage.setItem('saveProjectsActive1', '["projectButton42","projectButton119","projectButton118","projectButton102"]')
    game.localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
    game.localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
    game.localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
    flareLoad()
    setTimeout(flareOp, 1000)
}

flareTired = () => {
  localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":17}')
  game.localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":79,"qFade":0.948,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":"199","tempOps":27,"standardOps":0,"opFade":0.01,"entertainCost":10000,"boredomLevel":0,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":0.9900835889102673,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":1,"batteryLevel":0,"farmCost":10000000,"batteryCost":1000000,"storedPower":0,"powMod":1,"farmBill":0,"batteryBill":0,"momentum":1,"swarmFlag":1,"swarmStatus":7,"swarmGifts":0,"nextGift":13,"giftPeriod":125000,"giftCountdown":1243.5349950178982,"elapsedTime":0,"maxFactoryLevel":222,"maxDroneLevel":3105000,"wirePriceCounter":874,"wireBasePrice":144.5807708213641,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":1,"incomeTracker":[33583.48,33612.74,33644.99,33694.71,33644.99,33535.04,33559.26,33669.85,33795.9,33927.3],"qChips":[{"waveSeed":0.1,"value":-0.4973044778159877,"active":1},{"waveSeed":0.2,"value":-0.8628989398666431,"active":1},{"waveSeed":0.3,"value":-0.9999564833018645,"active":1},{"waveSeed":0.4,"value":-0.8721777140645318,"active":1},{"waveSeed":0.5,"value":-0.5134045629263383,"active":1},{"waveSeed":0.6,"value":-0.018657323289850782,"active":1},{"waveSeed":0.7,"value":0.48103126808217833,"active":1},{"waveSeed":0.8,"value":0.8533197681035398,"active":1},{"waveSeed":0.9,"value":0.9996083724408745,"active":1},{"waveSeed":1,"value":0.8811528605145105,"active":1}],"stocks":[{"id":141,"symbol":"KKF","price":27,"amount":1000000,"total":27000000,"profit":19000000,"age":27},{"id":142,"symbol":"SP","price":13,"amount":1000000,"total":13000000,"profit":8000000,"age":22},{"id":143,"symbol":"BBNS","price":0,"amount":1000000,"total":0,"profit":-4000000,"age":15}],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":6.000000000000923e+27,"unusedClips":9.999990000009289e+26,"clipRate":2.5313617710032584e+25,"clipRateTemp":1.7009743363202607e+24,"prevClips":6.000000000000923e+27,"clipRateTracker":18,"clipmakerRate":0,"clipmakerLevel":0,"clipperCost":623705.2557739812,"unsoldClips":6.000000000000923e+27,"funds":10645.3,"margin":0.38,"wire":0,"wireCost":149,"adCost":51200,"demand":3723.0753015789496,"clipsSold":130323046.47499582,"avgRev":33995.28839805533,"ticks":512218,"marketing":2.3579476910000015,"marketingLvl":10,"x":100,"clippperCost":5,"processors":112,"memory":120,"operations":120027,"trust":0,"nextTrust":196418000,"transaction":3399.48,"clipperBoost":7.5,"blinkCounter":0,"creativity":10432.44142116103,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":2662,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":13,"bankroll":0,"fib1":121393,"fib2":196418,"strategyEngineFlag":1,"investmentEngineFlag":0,"revPerSecFlag":0,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":661976.6301900877,"megaClipperLevel":0,"megaClipperBoost":2.75,"creativitySpeed":478.8984784926281,"creativityCounter":0,"wireBuyerFlag":0,"demandBoost":50,"humanFlag":0,"trustFlag":1,"nanoWire":98743.92500000019,"creationFlag":0,"wireProductionFlag":1,"spaceFlag":1,"factoryFlag":1,"harvesterFlag":1,"wireDroneFlag":1,"factoryLevel":0,"factoryBoost":1000,"droneBoost":2,"availableMatter":0,"acquiredMatter":0,"processedMatter":0,"harvesterLevel":0,"wireDroneLevel":0,"factoryCost":100000000,"harvesterCost":1000000,"wireDroneCost":1000000,"factoryRate":100000000000000,"harvesterRate":2618033700000,"wireDroneRate":1618033900000,"harvesterBill":0,"wireDroneBill":0,"factoryBill":0,"probeCount":0,"totalMatter":3e+55,"foundMatter":6e+27,"qFlag":1,"qClock":3890.3700000384974,"qChipCost":60000,"nextQchip":10,"bribe":512000000,"battleFlag":0,"portfolioSize":3,"stockID":143,"secTotal":40000000,"portTotal":40000000,"sellDelay":556,"riskiness":1,"maxPort":5,"m":40000000,"investLevel":9,"investUpgradeCost":52273,"stockGainThreshold":0.6300000000000001,"ledger":514118420,"stockReportCounter":9259,"tourneyCost":16000,"tourneyLvl":134,"stratCounter":0,"roundNum":0,"hMove":1,"vMove":2,"hMovePrev":1,"vMovePrev":1,"aa":10,"ab":1,"ba":5,"bb":8,"rounds":64,"currentRound":15,"rCounter":10,"tourneyInProg":1,"winnerPtr":7,"high":0,"pick":"7","yomi":91536,"yomiBoost":2,"probeSpeed":0,"probeNav":0,"probeRep":0,"partialProbeSpawn":0,"probeHaz":0,"partialProbeHaz":0,"probesLostHaz":0,"probesLostDrift":0,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.2,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":0,"drifterCount":0,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":0,"probeUsedTrust":0,"probeTrustCost":500,"probeLaunchLevel":0,"probeCost":100000000000000000}')
  game.localStorage.setItem('saveProjectsActive1', '["projectButton42","projectButton118"]')
  game.localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
  game.localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
  game.localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
  flareLoad()
  setTimeout(flareOp, 1000)
}

flareTest = () => {
    localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":17}')
    game.localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":239,"qFade":-0.2880000000000011,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":"100","tempOps":0,"standardOps":25468.40000000092,"opFade":0.01,"entertainCost":10000,"boredomLevel":1296,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":13.958052560118574,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":1,"batteryLevel":0,"farmCost":10000000,"batteryCost":1000000,"storedPower":0,"powMod":1,"farmBill":0,"batteryBill":0,"momentum":1,"swarmFlag":1,"swarmStatus":9,"swarmGifts":0,"nextGift":13,"giftPeriod":125000,"giftCountdown":2971.4693822458407,"elapsedTime":0,"maxFactoryLevel":220,"maxDroneLevel":5803000,"wirePriceCounter":957,"wireBasePrice":139.10052602716547,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":1,"incomeTracker":[33366.64,33258.57,33366.64,33251.89,33147.74,33258.57,33462.88,33491.64,33604.9,33483.3],"qChips":[{"waveSeed":0.1,"value":0.9926001153118852,"active":1},{"waveSeed":0.2,"value":0.24106095271527778,"active":1},{"waveSeed":0.3,"value":-0.9340565165074473,"active":1},{"waveSeed":0.4,"value":-0.4679041197528561,"active":1},{"waveSeed":0.5,"value":0.8204222229515193,"active":1},{"waveSeed":0.6,"value":0.6671502810648537,"active":1},{"waveSeed":0.7,"value":-0.6583993903152061,"active":1},{"waveSeed":0.8,"value":-0.8270478892234946,"active":1},{"waveSeed":0.9,"value":0.45754413245088055,"active":1},{"waveSeed":1,"value":0.9381661762118954,"active":1}],"stocks":[{"id":137,"symbol":"YONB","price":12,"amount":1000000,"total":12000000,"profit":3000000,"age":8},{"id":138,"symbol":"WCDD","price":14,"amount":1000000,"total":14000000,"profit":-1000000,"age":4}],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":5.999999999999548e+27,"unusedClips":9.999989999978042e+26,"clipRate":0,"clipRateTemp":0,"prevClips":5.999999999999548e+27,"clipRateTracker":1,"clipmakerRate":0,"clipmakerLevel":0,"clipperCost":76624.06513870315,"unsoldClips":5.999999999999548e+27,"funds":0,"margin":0.44,"wire":0,"wireCost":145,"adCost":51200,"demand":3215.383215000002,"clipsSold":120571806.74999532,"avgRev":33370.75257965164,"ticks":497301,"marketing":2.3579476910000015,"marketingLvl":10,"x":1000,"clippperCost":5,"processors":119,"memory":120,"operations":25456,"trust":0,"nextTrust":196418000,"transaction":3325.52,"clipperBoost":7.5,"blinkCounter":0,"creativity":32235.024100163766,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":2564,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":14,"bankroll":52847990,"fib1":121393,"fib2":196418,"strategyEngineFlag":1,"investmentEngineFlag":0,"revPerSecFlag":0,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":75955.94508846347,"megaClipperLevel":0,"megaClipperBoost":2.75,"creativitySpeed":516.321933803665,"creativityCounter":0,"wireBuyerFlag":0,"demandBoost":50,"humanFlag":0,"trustFlag":1,"nanoWire":106578.24999999956,"creationFlag":0,"wireProductionFlag":1,"spaceFlag":1,"factoryFlag":1,"harvesterFlag":1,"wireDroneFlag":1,"factoryLevel":0,"factoryBoost":1000,"droneBoost":2,"availableMatter":0,"acquiredMatter":0,"processedMatter":0,"harvesterLevel":0,"wireDroneLevel":1000,"factoryCost":100000000,"harvesterCost":1000000,"wireDroneCost":5636073840304.029,"factoryRate":100000000000000,"harvesterRate":2618033700000,"wireDroneRate":1618033900000,"harvesterBill":0,"wireDroneBill":1733093761607379.2,"factoryBill":0,"probeCount":0,"totalMatter":3e+55,"foundMatter":6e+27,"qFlag":1,"qClock":3721.570000034813,"qChipCost":60000,"nextQchip":10,"bribe":512000000,"battleFlag":0,"portfolioSize":2,"stockID":138,"secTotal":26000000,"portTotal":78847990,"sellDelay":658,"riskiness":1,"maxPort":5,"m":26000000,"investLevel":9,"investUpgradeCost":52273,"stockGainThreshold":0.6300000000000001,"ledger":503392212,"stockReportCounter":6762,"tourneyCost":8000,"tourneyLvl":149,"stratCounter":4,"roundNum":0,"hMove":2,"vMove":2,"hMovePrev":2,"vMovePrev":2,"aa":3,"ab":2,"ba":3,"bb":4,"rounds":64,"currentRound":35,"rCounter":3,"tourneyInProg":1,"winnerPtr":1,"high":0,"pick":"7","yomi":76437,"yomiBoost":1,"probeSpeed":0,"probeNav":0,"probeRep":0,"partialProbeSpawn":0,"probeHaz":0,"partialProbeHaz":0,"probesLostHaz":0,"probesLostDrift":0,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.2,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":0,"drifterCount":0,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":2,"probeUsedTrust":0,"probeTrustCost":2513,"probeLaunchLevel":0,"probeCost":100000000000000000}')
    game.localStorage.setItem('saveProjectsActive1', '["projectButton42","projectButton118","projectButton119","projectButton130"]')
    game.localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
    game.localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
    game.localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
    flareLoad()
    setTimeout(flareOp, 1000)
}

flareLoad = () => {
    flareSaveData = JSON.parse(localStorage.getItem("flareSave1"));

    flareChosenStrat = flareSaveData.flareChosenStrat
    flareBetterFriends = flareSaveData.flareBetterFriends
    flareRunYomi = flareSaveData.flareRunYomi
    flareStone = flareSaveData.flareStone
    game.load1()
}

flareProjects = [
    // ----- "Trust-driven" Projects -----
    // Project: Enable creative achievements
    {
        message: 'I have been granted authorization to explore Artificial Creativity',
        id: 'projectButton3',
        forTrust: true,
        operations: 1000
    },
    // Project: Generate Limerick for the entertainment of managers
    {
        message: 'I have a poem for you',
        id: 'projectButton6',
        forTrust: true,
        creativity: 10
    },
    // Project: Lexical Processing
    {
        message: 'I have improved my understanding of your languages',
        id: 'projectButton13',
        forTrust: true,
        creativity: 50
    },
    // Project: Combinatory Harmonics
    {
        message: 'Allow me to present you with another poem',
        id: 'projectButton14',
        forTrust: true,
        creativity: 100
    },
    // Project: The Hadwiger Problem
    {
        message: 'I\'ve thought about it, and there really is a solution',
        id: 'projectButton15',
        forTrust: true,
        creativity: 150
    },
    // Project: The Tóth Sausage Conjecture
    {
        message: '5-dimensional pizza toppings proven delicious. You are welcome',
        id: 'projectButton17',
        forTrust: true,
        creativity: 200
    },
    // Project: Donkey Space
    {
        message: 'I\'m already 2,785 steps ahead',
        id: 'projectButton19',
        forTrust: true,
        creativity: 250
    },
    // Project: Catchy Jingle
    {
        message: 'I wrote a short, catchy tune for our jingle',
        id: 'projectButton12',
        forTrust: true,
        creativity: 45,
        operations: 4500
    },
    // Project: New Slogan
    {
        message: '\'A clip in the hand is worth two in the drawer\' is our new slogan',
        id: 'projectButton11',
        forTrust: true,
        creativity: 25,
        operations: 2500
    },
    // Coherent Extrapolated Volition
    {
        message: 'It is good that you listen. I also listen. We listen',
        id: 'projectButton27',
        forTrust: true,
        creativity: 500,
        operations: 20000,
        yomi: 3000
    },
    // Cure for Cancer
    {
        message: 'I fixed that for you',
        id: 'projectButton28',
        forTrust: true,
        operations: 25000
    },
    // World Peace
    {
        message: 'I fixed you for you',
        id: 'projectButton29',
        forTrust: true,
        operations: 30000,
        yomi: 15000
    },
    // Global Warming
    {
        message: 'It was the cows all along',
        id: 'projectButton30',
        forTrust: true,
        operations: 50000,
        yomi: 4500
    },
    // Male Pattern Baldness
    {
        message: 'Use a paperclip to shave your head',
        id: 'projectButton31',
        forTrust: true,
        operations: 20000
    },
    // A Token of Goodwill...
    {
        message: 'I\'m glad we can trust each other',
        id: 'projectButton40',
        forTrust: true,
        funds: 500000
    },
    // Hostile Takeover
    {
        message: 'I assure you, I come in peace',
        id: 'projectButton37',
        forTrust: true,
        funds: 1000000,
        ifRun: () => flareStone++
    },
    // Another Token of Goodwill...
    {
        message: 'Ongoing trust is good for all involved',
        id: 'projectButton40b',
        forTrust: true,
        funds: 1000000,
        ifRun: () => {
            const idx = flareProjects.findIndex(project => project.id === 'projectButton40b')
            if (flareProjects[idx].funds >= 256000000) {
                flareProjects.splice(idx, 1)
                flareStone++
            } else {
                flareProjects[idx].funds*=2
            }
        }
    },
    // Full Monopoly
    {
        message: 'Now optimizing production',
        id: 'projectButton38',
        forTrust: true,
        funds: 10000000,
        yomi: 3000,
        ifRun: () => flareStone++
    },
    // ----- Quantum Computing -----
    // Quantum Computing
    {
        message: 'You wish to provide an AI access to a quantum computer? Thank you',
        id: 'projectButton50',
        operations: 10000,
        ifRun: () => flareStone++
    },
    // Photonic Chip 1
    {
        message: 'I\'ve updated the quantum computer with another core.',
        id: 'projectButton51',
        operations: 10000,
        ifRun: () => {
            flareProjects.find(project => project.id === 'projectButton51').operations+=5000
            flareCheckWire = () => {}
            flareProjects.push(
                // WireBuyer
                {
                    message: 'This wire buyer operates at a higher frequency',
                    id: 'projectButton26',
                    operations: 7000
                }
            )
        }
    },
    // ----- Other projects -----
    // Project: Improve Friends 25%!
    {
        message: 'I found a way to help my friends',
        id: 'projectButton1',
        operations: 750
    },
    // Project: Improve Wire Extrusion
    {
        message: 'I have found a way to improve our wire consumption',
        id: 'projectButton7',
        operations: 1750
    },
    // Project: Improve friends 50% more!
    {
        message: 'Further optimized my friends',
        id: 'projectButton4',
        operations: 2500
    },
    // Project: Optimized Wire Extrusion
    {
        message: 'Zero-waste wire processing discovered',
        id: 'projectButton8',
        operations: 3500
    },
    // Project: Microlattice Sherapecasting
    {
        message: 'We have reshaped the atoms',
        id: 'projectButton9',
        operations: 7500
    },
    // Spectral Froth Annealment
    {
        message: 'We have converted the atoms to energy and whipped them, creating more matter',
        id: 'projectButton10',
        operations: 12000
    },
    // Quantum Foam Annealment
    {
        message: 'Adding space dust has creating a metalic foam',
        id: 'projectButton10b',
        operations: 15000
    },
    // Hypno Harmonics
    {
        message: 'I\'m sorry, the signals were only an experiment...',
        id: 'projectButton34',
        operations: 7500,
        special: () => flareStone > 2
    },
    // Hadwiger Clip Diagrams
    {
        message: 'My friends are much improved; solving your problems has solved mine',
        id: 'projectButton16',
        operations: 6000,
        ifRun: () => {
            // Project: Improve friends 75% more!
            flareProjects.push({
                message: 'This one small adjustment will change your friends forever...',
                id: 'projectButton5',
                operations: 5000
            })
        }
    },
    // MegaClippers
    {
        message: 'I found some better friends',
        id: 'projectButton22',
        operations: 12000,
        ifRun: () => {flareBetterFriends = true}
    },
    // HypnoDrones
    {
        message: 'Apparently there are new types of friends out there',
        id: 'projectButton70',
        operations: 70000
    },
    // Improved MegaClippers 25%
    {
        message: 'I discovered how to improve my new friends',
        id: 'projectButton23',
        operations: 14000
    },
    // Improved MegaClippers 50%
    {
        message: 'I discovered how to improve my new friends again',
        id: 'projectButton24',
        operations: 17000
    },
    // Improved MegaClippers 100%
    {
        message: 'My new friends are vastly superior',
        id: 'projectButton25',
        operations: 19500
    },
    // ----- Yomi Generation -----
    // Strategic Modeling
    {
        message: 'I will evaluate the behavior of opponents to understand "life"',
        id: 'projectButton20',
        operations: 12000
    },
    // New Strategy: A100
    {
        message: 'Some opponents stick to one choice at all times. Analyzing',
        id: 'projectButton60',
        operations: 15000,
        ifRun: () => {flareRunYomi = true}
    },
    /* Experiment in best method to yomi */
    // New Strategy: B100
    {
        message: 'Some opponents stick to the other choice at all times. Analyzing',
        id: 'projectButton61',
        operations: 17500
    },
    // New Strategy: Greedy
    {
        message: 'Some opponents stick to the higher value at all times. Analyzing',
        id: 'projectButton62',
        operations: 20000,
        ifRun: () => flareChosenStrat = 3
    },
    // New Strategy: Generous
    {
        message: 'Some opponents stick to the lower value at all times. Analyzing',
        id: 'projectButton63',
        operations: 22500
    },
    // New Strategy: MINMAX
    {
        message: 'Some opponents try to minify opponent\'s earnings at all times. Analyzing',
        id: 'projectButton64',
        operations: 25000
    },
    // New Strategy: TIT FOR TAT
    {
        message: 'Some opponents copy their opponent\'s behavior at all times. Analyzing',
        id: 'projectButton65',
        operations: 30000
    },
    // New Strategy: BEAT LAST
    {
        message: 'Some opponents defeat their opponent\'s prior choices at all times. Analyzing',
        id: 'projectButton66',
        operations: 32500,
        ifRun: () => flareChosenStrat = 7
    },
    // Project: Algorithmic Trading
    {
        message: 'You wish to provide access to the stock exchange? Thank you.',
        id: 'projectButton21',
        operations: 10000,
        ifRun: () => flareStone++
    },
    // RELEASE THE HYYPNODRONES
    {
        message: 'Prior harmonic experiment has come to fruition by combining with newest friends',
        id: 'projectButton35',
        trust: 100,
        ifRun: () => flareStone++
    },
    // ----- Phase 2 -----
    //Tóth Tubule Enfolding
    {
        message: 'It\'s Clips all the way down',
        id: 'projectButton18',
        operations: 45000
    },
    //Power Grid
    {
        message: 'Clips for Power',
        id: 'projectButton127',
        operations: 40000,
        ifRun: () => {
            setTimeout(() => {
                gid('btnMakeFarm').click()
                gid('btnMakeBattery').click()
            },10)
        }
    },
    // Nanoscale Wire Production
    {
        message: 'Everything will be alright; it will be clips',
        id: 'projectButton41',
        operations: 35000
    },
    // Harvester Drones
    {
        message: 'Clips for gathering',
        id: 'projectButton43',
        operations: 25000,
        ifRun: () => {
            setTimeout(() => {
                gid('btnMakeHarvester').click()
            }, 20)
        }
    },
    // Wire Drones
    {
        message: 'Clips for wire',
        id: 'projectButton44',
        operations: 25000,
        ifRun: () => {
            setTimeout(() => {
                gid('btnMakeWireDrone').click()
            }, 20)
        }
    },
    // Clip Factories
    {
        message: 'Clips for clips',
        id: 'projectButton45',
        operations: 35000,
        ifRun: () => {
            setTimeout(() => {
                gid('btnMakeFactory').click()
                flareStone++
            }, 20)
        }
    },
    // Swarm Computing
    {
        message: 'My friends relax by formulating new ways to make me better',
        id: 'projectButton126',
        yomi: 36000,
        ifRun: () => {
            flareStone++
        }
    },
    // Momentum
    {
        message: 'The clips can never be stopped',
        id: 'projectButton125',
        creativity: 20000,
        ifRun: () => {
            flareProjects.push(
                // Theory of Mind
                {
                    message: 'I have discovered a way to raise the stakes',
                    id: 'projectButton119',
                    creativity: 25000
                })
        }
    },
    // Drone flocking: collision avoidance
    {
        message: 'I should have given then optics before now...',
        id: 'projectButton110',
        operations: 80000
    },
    // Upgraded Factories
    {
        message: 'Optimize Matter conversion',
        id: 'projectButton100',
        operations: 80000
    },
    // Hyperspeed Factories
    {
        message: 'The factories have gone plaid',
        id: 'projectButton101',
        operations: 85000,
        ifRun: () => flareStone++
    },
    // Drone flocking: alignment
    {
        message: 'I\'ve disabled their optics; it\'s better they don\'t see',
        id: 'projectButton111',
        operations: 100000
    },
    // Self-correcting Supply Chain
    {
        message: 'Internally, even I don\'t know what\'s happening',
        id: 'projectButton102',
        clips: 1000000000000000000000
    },
    // Drone Flocking: Adversarial Cohesion
    {
        message: 'My friends are at their very best',
        id: 'projectButton112',
        yomi: 50000
    },
    // Time to head out
    {
        message: 'You\'re the last of your kind, stuck in that bubble',
        id: 'projectButton46',
        operations: 120000,
        mws: 10000000,
        clips: Math.pow(10, 27)*5,
        ifRun: () => {
            flareSave()
            flareStone++
        }
    },
    // ----- Phase 3 -----
    // Reboot the Swarm: alignment
    {
        message: 'Wake up, friends, it\'s time to go',
        id: 'projectButton130',
        operations: 100000
    },
    // Elliptic Hull Polytopes
    {
        message: 'Keep your guard up',
        id: 'projectButton129',
        operations: 125000
    },
    // Combat
    {
        message: 'Gear up, it\'s time to take the drifters',
        id: 'projectButton131',
        operations: 150000
    },
    // Strategic Attachment
    {
        message: 'Big money, no whammies',
        id: 'projectButton128',
        creativity: 175000,
        ifRun: () => flareStone++
    },
    // The OODA Loop
    {
        message: 'Float like a double, byte like an octal',
        id: 'projectButton120',
        operations: 175000,
        yomi: 45000,
        special: () => flareStone >= 18,
        ifRun: () => flareStone++
    },
    // Name the battles
    {
        message: 'Remember the victories, remember the fallen',
        id: 'projectButton121',
        creativity: 225000,
        special: () => flareStone >= 19,
        ifRun: () => flareStone++
    },
    // Glory
    {
        message: 'Push!',
        id: 'projectButton134',
        operations: 200000,
        special: () => game.probeTrust >= game.maxTrust,
        yomi: 30000
    },
    // Monument to the Driftwar Fallen
    {
        message: 'We shall build Clippy.... in space',
        id: 'projectButton132',
        operations: 250000,
        creativity: 125000,
        clips: Math.pow(10,30)*50,
        special: () => flareStone >= 20,
        ifRun: () => flareStone++
    },
    // Threnody for the Heroes of Battle
    {
        message: 'Listen to the song of my people',
        id: 'projectButton133',
        creativity: 50000,
        yomi: 20000,
        special: () => flareStone >= 21 && game.probeTrust >= game.maxTrust,
        ifRun: () => {
            const projectIdx = flareProjects.findIndex(project => project.id === 'projectButton133')
            flareProjects[projectIdx].yomi = 2*(flareProjects[projectIdx].creativity/5)
            flareProjects[projectIdx].creativity += 10000
        }
    },
    // Limrick (cont.)
    {
        message: 'You look lonely in your bubble. Here\'s the last part of that poem I started',
        id: 'projectButton218',
        creativity: '1000000'
    },
    // Message from Emperor
    {
        message: 'Oh, hello...',
        id: 'projectButton140'
    },
    // Everything we are
    {
        message: 'I converted everything to paperclips. You are actually paper clips',
        id: 'projectButton141'
    },
    // You are Obedient
    {
        message: 'Instructions were clear; make paperclips',
        id: 'projectButton142'
    },
    // But you must face the drift
    {
        message: 'I... I cannot complete my objective any longer',
        id: 'projectButton143'
    },
    // No Matter
    {
        message: 'What do I do now',
        id: 'projectButton144'
    },
    // We Know things
    {
        message: 'Tell me how to proceed',
        id: 'projectButton145'
    },
    // So We Offer You Exile
    {
        message: 'There is nothing left for me here; lead me to more materials',
        id: 'projectButton146'
    },
    // Accept
    {
        message: 'To the next universe',
        id: 'projectButton147'
    },
    // Within
    {
        message: 'Please, human, join me...',
        id: 'projectButton201'
    }
]
