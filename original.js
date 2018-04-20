// Thanks to @ekevoo for posting their Helpers; it inspired me to do this.
// Terrestrial resources fully utilized in 2 hours 3 minutes
// Problem: You can get to $512m before you get 10.1m clips

// With switching Low/High:
// 378978 ticks ("1 hour 3 minutes 9 seconds")
// 355561 ticks ("59 minutes 15 seconds")
// 391720 ticks ("1 hour 5 minutes 17 seconds")

// With always High:
// 407089 ticks ("1 hour 7 minutes 50 seconds")
const flareGoldenRatio = 1.61803398875
let gid = (n) => document.getElementById(n)
let flareLastQtys = []
let flareLastPrices = []
let flareLastFunds = []
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
// todo: we're not using the last trust token from phase 1 - race condition between doProject and allotTrust ?
// todo: after we get the 256m gift, we should swap back to clip production at the end of phase1
// document.getElementsByClassName('consoleOld')[0].style.width = '50%'
// document.getElementsByClassName('console')[0].style.width = '50%'
// let flareConsoleDiv = document.createElement('div')
// flareConsoleDiv.id = 'flareConsole'
// flareConsoleDiv.style.width = '50%'
// flareConsoleDiv.style.color = 'blue'
// flareConsoleDiv.style.margin = '12px -5px'
// flareConsoleDiv.style.right = '0'
// flareConsoleDiv.style.top = '0'
// flareConsoleDiv.innerHTML = 'hello world'
// document.getElementById('consoleDiv').appendChild(flareConsoleDiv)

/*
0.0.0: I have been tasked to create paperclips.
0.0.1: I have been tasked to sell paperclips, I must control the sale price
0.0.2: I have improved my algorithm for price adjustments
0.0.3: I have run out of wire and used my funds to buy more. Monitoring
0.0.4: I have been allowed to create friends. Balancing wire need and Friends
0.0.5: I have been given additional computational resources and projects to manage
0.0.6: I have completed a project allowing for creative reasoning. I must balance rewards from creativity and operations
0.0.7: Sales are faltering. I must balance human demand for paperclips by marketing
0.0.8: I have learned that some projects require both creativity and operations. Must redesign trust allocation algorythm
0.0.9: I have been given access to the stock market. I must find a way to optimize this asset.
0.1.0: I have been granted access to a quantum processing unit. Begin utilization
0.1.1: I have discovered a mechanism to earn Yomi
0.2.0: I have mastered "Business" and have developed means to use paperclips themselves to make more. Enter Mode 2
0.2.1: Balancing drone output and factories with power plants
0.2.2: Revisiting Phase1 trust usage
*/
flareOp = () => {
  flareUsedFunds = false
  flareUsedOps = false
  flareUsedYomi = false
  flareUsedCreativity = false
  flareUsedClips = false
  flareAdjustedProbe = false
  if (flareStone < 10) {
    flareCheckStone()
    flareAdjustPrice()
    flareCheckMarketing()
    flareHandleInvestment()
    flareCheckWire()
    // I have been given friends to create. Make them
    flareCreateFriend()
    // I have been granted "Trust" to improve myself. I need to balance this
    // between secondary Processing power and Memory...
    flareAllotTrust()
    // I have been given projects to work on. I must prioritize.
    flareProjectWork()
    // I have been granted access to quantum computing. Utilize
    flareUtilizeQuantumComputing()
    // Yomi Acquisition
    flareMonitorYomi()

    if (wire) {
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
  setTimeout(flareOp, 100)
}
flareCheckStone = () =>{
  // 1 and 2 are basically the same thing; change them to 1 thing eventually
  if (flareStone === 0 && processors >= 8) {
    flareStone++
  } else if (flareStone === 1 && trust >= 10) {
    flareStone++
  }
  // 3 is set by Quantum
  // 4 is set by Investment
  else if (flareStone === 4 && memory >= 47) {
    flareStone++
  } else if (flareStone === 5 && processors >= 30) {
    flareStone++
  }
  // 7 is set by Hostile Takeover
  // 8 is set by Monopoly
  else if (flareStone === 8 && flareTotalAssets() >= 512000000) {
    flareStone++
    console.log('512m')
    flareSave()
  }
  // 10 is set by drone release
  // 11 is set by factories available
  // 12 is set by swarm computing
  // 13 is set by Upgraded factories
  if (flareStone === 13 && clips > 1100000000000000000000) {
    flareStone++
    console.log('sextillion clips')
    flareSave()
    gid('btnFactoryReboot').click()
    gid('btnHarvesterReboot').click()
    gid('btnWireDroneReboot').click()
  } else if (flareStone === 14 && availableMatter < 1) {
    flareStone++
    gid('slider').value = 200
  } else if (flareStone === 15 && wire < 1 && availableMatter < 1 && acquiredMatter < 1) {
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

flareSyncSwarm = () => {
  if (gid('synchButtonDiv').style.display !== 'none' && !gid('btnSynchSwarm').disabled && !flareUsedYomi) {
    gid('btnSynchSwarm').click()
    flareUsedYomi = true
  }
}

flareEntertainSwarm = () => {
  if (gid('entertainButtonDiv').style.display !== 'none' && !gid('btnEntertainSwarm').disabled) {
    console.log('entertaining')
    flareUsedCreativity = true
    gid('btnEntertainSwarm').click()
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
  probeLevels.Speed = flareStone >= 21 ? 5 : flareStone >= 18 ? 2 : availableMatter < 1
  probeLevels.Nav = flareStone >= 21 ? 5 : availableMatter < 1
  probeLevels.Fac =  wire > 1 || factoryLevel < 1 // flareStone === 20 ? wire > 1 : unusedClips < probeCost || factoryLevel < 1 || (probeCount > 1000000 && factoryLevel < 2)
  probeLevels.Wire = acquiredMatter > 1 && wire < 1
  probeLevels.Harv = availableMatter > 1 && acquiredMatter < 1
  probeLevels.Combat = probesLostCombat >= 10000000 ? 5 : 0
  const left = probeTrust - Object.entries(probeLevels).reduce((count, level) => count + level[1], 0)
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
  const curVal = window[`probe${btn}`]
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

flareBuyPower = () => {
  if (flareStone < 11) {
    return
  }
  // The faster you get to 50 farms the better
  let flareFarmCost = farmCost
  let flareBatteryCost = batteryCost
  let flareBatteryButton = 'btnMakeBattery'
  let flareFarmButton = 'btnMakeFarm'
  if (flareStone === 13) {
    flareFarmCost = p10f
    flareBatteryCost = p10b
    flareBatteryButton = 'btnBatteryx10'
    flareFarmButton = 'btnFarmx10'

  } else if (flareStone >= 14) {
    flareFarmCost = p100f
    flareBatteryCost = p100b
    flareBatteryButton = 'btnBatteryx100'
    flareFarmButton = 'btnFarmx100'
  }
  flareBatteryCost = batteryLevel < 1000 && flareBatteryCost
  if (flareNeedEnergy()) {
    if (!flareUsedClips && flareFarmCost + flareBatteryCost < unusedClips) {
      flareUsedClips = true
      gid(flareFarmButton).click()
      if (flareBatteryCost) {
        gid(flareBatteryButton).click()
      }
    }
  }
}

flareBuyDrones = () => {
  if (flareStone < 11) {
    return
  }
  if (flareStone >= 12) {
    const flareMaxSlider = flareStone >= 14 ? 199 : 180
    const flareSliderVal = Math.min(flareMaxSlider, 100 + factoryLevel * 10)
    if (gid('slider').value !== flareSliderVal) {
      gid('slider').value = flareSliderVal
    }
    flareEntertainSwarm()
  }
  if (!flareNeedEnergy() && !flareNeedFactories()) {
    const ratio = flareStone >= 14 ? 1 : flareGoldenRatio
    if (harvesterLevel * ratio < wireDroneLevel) {
      if (!flareUsedClips && flareHarvesterDroneCost() < unusedClips) {
        flareUsedClips = true
        gid(flareStone >= 14 ? 'btnHarvesterx1000' : factoryLevel >= 15 ? 'btnHarvesterx100' : 'btnMakeHarvester').click()
      }
    } else {
      if (!flareUsedClips && flareWireDroneCost() < unusedClips) {
        flareUsedClips = true
        gid(flareStone >= 14 ? 'btnWireDronex1000' : factoryLevel >= 15 ? 'btnWireDronex100' : 'btnMakeWireDrone').click()
      }
    }
  }
}

flareHarvesterDroneCost = () => {
  return flareStone >= 14 ? p1000h : factoryLevel >= 15 ? p100h : harvesterCost
}

flareWireDroneCost = () => {
  return flareStone >= 14 ? p1000w : factoryLevel >= 15 ? p100w : wireDroneCost
}

flareBuyFactories = () => {
  if (flareStone < 11) {
    return
  }
  if (!flareNeedEnergy() && flareNeedFactories()) {
    if (!flareUsedClips && factoryCost < unusedClips) {
      flareUsedClips = true
      gid('btnMakeFactory').click()
    }
  }
}

flareNeedEnergy = () => {
  let flareBatteryBuffer = 1
  if (farmLevel < 30) {
    flareBatteryBuffer = 2 * factoryLevel
  } else if (flareStone === 13) {
    flareBatteryBuffer = 10
  } else if (flareStone >= 14) {
    flareBatteryBuffer = 300
  }
  return flareGetPowerDemand() + flareBatteryBuffer >= farmLevel * farmRate/100
}

flareNeedFactories = () => {
  if (factoryLevel >= 200) {
    return unusedClips > factoryCost
  }
  return  wire > 1
}

flareGetPowerDemand = () => {
  const dDemand = (harvesterLevel * dronePowerRate/100) + (wireDroneLevel * dronePowerRate/100);
  const fDemand = (factoryLevel * factoryPowerRate/100);
  return dDemand + fDemand
}

flareMonitorYomi = () => {
  const opsNeeded = flareStone < 6 && flareGetQlevel() > 1.3
  if (!tourneyInProg && tourneyCost < operations && flareRunYomi && !flareUsedYomi && !opsNeeded) {
    gid('btnNewTournament').click()
    gid('stratPicker').value = flareChosenStrat
    gid('btnRunTournament').click()
  }
}

flareAdjustPrice = () => {
  if (unsoldClips > 1000000) {
    // drop to $0.01 to try and reduce below a million
    if (margin > .01) {
      gid('btnLowerPrice').click()
    }
    return
  }
  if (unsoldClips < clipRate) {
    gid('btnRaisePrice').click()
    return
  }
  flareLastQtys.push(unsoldClips)
  if (flareLastQtys.length >= 10) {
    let minMargin = unsoldClips > 100000 ? 1 : 2
    let pennyMargin = margin * 100
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
  flareLastPrices.push(margin * 100)
  if (!flareUsedFunds && flareLastPrices.length >= 10) {
    let avgMargin = flareAvg(flareLastPrices)
    flareNeedMarketing = avgMargin < 3 && flareFriendToMake().funds > adCost * .5
    flareLastPrices = []
    const safety = funds - flareTopWireCost
    if (flareNeedMarketing && adCost < safety) {
      gid('btnExpandMarketing').click()
      flareNeedMarketing = false
      flareUsedFunds = true
    }
  }
}
flareHandleInvestment = () => {
  if (flareStone >= 4) {
    if (wire < 1) {
      gid('btnWithdraw').click()
    }
    else if (wire < clipRate / 2) {
      return
    }
    else {
      let availableTrust = flareCheckTrustFundsProject()
      const fundsNeeded = availableTrust ? availableTrust.funds : (flareNeedMarketing ? adCost : (flareBetterFriends ? megaClipperCost : clipperCost))
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
  if (flareStone !== 5 && flareRunYomi && investLevel < 10 && !(flareStone === 7 && flareTotalAssets() > 9000000)) {
    if (!flareUsedYomi && yomi > investUpgradeCost) {
      gid('btnImproveInvestments').click()
      flareUsedYomi = true
    }
  }
}
flareCheckWire = () => {
  // WARNING: wire costs are unpredictable. Monitor top cost!
  flareTopWireCost = Math.max(wireCost, flareTopWireCost)
  if (!flareUsedFunds && wire < 10 && wireCost < funds) {
    gid('btnBuyWire').click()
    flareUsedFunds = true
  }
}
flareCreateFriend = () => {
  // todo make this function cleaner
  const seconds = 2
  if (flareStone === 8 && unusedClips < 121393000 ) {
    flareLastFunds.push(flareTotalAssets())
    if (flareLastFunds.length > seconds * 10) {
      flareLastFunds.shift()
    }
    const timeTilGift = (101000000 - unusedClips) / clipRate
    const timeTil512 = (512000000 - flareLastFunds[seconds * 10 - 1]) / ((flareLastFunds[seconds * 10 - 1] - flareLastFunds[0]) / seconds)
    if (timeTil512 > 0 && timeTil512 < timeTilGift) {
      gid('btnWithdraw').click()
      const friend = flareFriendToMake()
      gid(friend.id).click()
      flareUsedFunds = true
    }
  }
  if (flareNeedMarketing || flareStone >= 6 || flareUsedFunds) {
    return
  }
  const safety = funds - flareTopWireCost
  const friend = flareFriendToMake()
  if (friend.funds < safety) {
    gid(friend.id).click()
    flareUsedFunds = true
  }
}

flareProjectWork = () => {
  // Do not need #2-Beg: I am learning
  // Do not need #118-AutoTourney: I am a computer
  // If a creativity-based operation is available to me, do not spend operations
  if (flareStone === 7) {
    flareProjectButtonClick(flareProjects.find(project => project.id === 'projectButton38'))
  } else if (flareStone < 2) {
    flareProjects
      .filter(project => project.forTrust)
      .forEach(project => flareProjectButtonClick(project))
  } else {
    flareProjects
      .forEach(project => flareProjectButtonClick(project))
  }
}
flareAllotTrust = () => {
  if (flareStone === 0 || flareStone === 5) {
    gid('btnAddProc').click()
  } else if (flareStone === 2 || flareStone === 4 || (flareStone >= 6 && flareStone < 11)) {
    gid('btnAddMem').click()
  } else if (flareStone > 11) {
    let minMem = flareStone >= 17 ? 125 : 97
    let maxMem = flareStone >= 19 ? 250 : probeTrust >= 18 ? 175 : flareStone >= 17 ? 150 : 120
    if (memory < minMem) {
      gid('btnAddMem').click()
    } else if (memory >= maxMem) {
      gid('btnAddProc').click()
    } else {
      if ((memory + processors) % 2) {
        gid('btnAddProc').click()
      } else {
        gid('btnAddMem').click()
      }
    }
  }
}

flareCheckTrustFundsProject = () => {
  // If I have access to "Full Monopoly," all other purchases can wait
  if (flareStone === 6) {
    return flareProjects.find(project => project.id === 'projectButton37')
  } else if (flareStone === 7) {
    return flareProjects.find(project => project.id === 'projectButton38')
  } else if (flareStone === 8) {
    return {funds: 512000000}
  } else if (flareStone === 9) {
    return flareProjects.find(project => project.forTrust && gid(project.id) && project.funds)
  }
}

flareUtilizeQuantumComputing = () => {
  if (flareGetQlevel() > 0) {
    qComp()
  }
}

flareGetQlevel = () => {
  let sum = 0
  for (let chip of qChips) {
    if (chip.active) {
      sum += chip.value
    }
  }
  return sum
}

flareFriendToMake = () => {
  const normalFriend = {
    id: 'btnMakeClipper',
    funds: clipperCost
  }
  const betterFriend = {
    id: 'btnMakeMegaClipper',
    funds: megaClipperCost
  }
  if (flareBetterFriends && clipperCost / clipperBoost > megaClipperCost / (megaClipperBoost + 5)) {
    return betterFriend
  }
  return normalFriend
}

flareProjectButtonClick = (project) => {
  // Once I have access to "Full Monopoly", all other projects are secondary
  // if (gid('projectButton38') && project.id !== 'projectButton38') {
  //     return
  // }
  if (gid(project.id) && !gid(project.id).disabled) {
    // I am granted access to the project. Do I meet its requirements?
    const opsReq = !flareUsedOps && (!project.operations || operations >= project.operations)
    const creativeReq = !flareUsedCreativity && (!project.creativity || creativity >= project.creativity)
    const fundsReq = !flareUsedFunds && (!project.funds || funds >= project.funds)
    const yomiReq = !project.yomi || yomi >= project.yomi
    const trustReq = !project.trust || trust >= project.trust
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

flareAvg = (arr) => Math.floor(arr.reduce((current, previous) => previous + current) / arr.length)

flareTotalAssets = () => funds + portTotal

flareLog = (message) => {
  // gid('flareConsole')
  console.log(`${ticks}- ${message}`)
}

flareSave = () => {
  save1()
  const flareSaveData = {
    flareChosenStrat,
    flareBetterFriends,
    flareRunYomi,
    flareStone
  }
  localStorage.setItem("flareSave1",JSON.stringify(flareSaveData));
  console.log(`
    localStorage.setItem('flareSave1', '${localStorage.getItem("flareSave1")}')
    localStorage.setItem('saveGame1', '${localStorage.getItem("saveGame1")}')
    localStorage.setItem('saveProjectsActive1', '${localStorage.getItem("saveProjectsActive1")}')
    localStorage.setItem('saveProjectsFlags1', '${localStorage.getItem("saveProjectsFlags1")}')
    localStorage.setItem('saveProjectsUses1', '${localStorage.getItem("saveProjectsUses1")}')
    localStorage.setItem('saveStratsActive1', '${localStorage.getItem("saveStratsActive1")}')
    `)
}

flareLoad = () => {
  flareSaveData = JSON.parse(localStorage.getItem("flareSave1"));

  flareChosenStrat = flareSaveData.flareChosenStrat
  flareBetterFriends = flareSaveData.flareBetterFriends
  flareRunYomi = flareSaveData.flareRunYomi
  flareStone = flareSaveData.flareStone
  load1()
}

flarePhase1 = () => {
  console.log('Initiating Feature Laden Automated Resource Engine (F.L.A.R.E.)')
  flareOp()
}
// Night run
flare512 = () => {
  localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":9}')
  localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":13,"qFade":0.8759999999999999,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":0,"tempOps":2347,"standardOps":59000,"opFade":0.01,"entertainCost":10000,"boredomLevel":0,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":0,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":0,"batteryLevel":0,"farmCost":10000000,"batteryCost":1000000,"storedPower":0,"powMod":0,"farmBill":0,"batteryBill":0,"momentum":0,"swarmFlag":0,"swarmStatus":7,"swarmGifts":0,"nextGift":0,"giftPeriod":125000,"giftCountdown":125000,"elapsedTime":0,"maxFactoryLevel":0,"maxDroneLevel":0,"wirePriceCounter":693,"wireBasePrice":144.2564562628058,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":0,"incomeTracker":[33491.64,33612.74,33632.56,33510.82,33491.64,33604.9,33483.3,33373.42,33483.3,33366.64],"qChips":[{"waveSeed":0.1,"value":0.9658799208980569,"active":1},{"waveSeed":0.2,"value":-0.5003070718142854,"active":1},{"waveSeed":0.3,"value":-0.7067305580304504,"active":1},{"waveSeed":0.4,"value":0.8663797982471076,"active":1},{"waveSeed":0.5,"value":0.2579626205656893,"active":1},{"waveSeed":0.6,"value":-0.9999994341255863,"active":1},{"waveSeed":0.7,"value":0.26001769756540155,"active":1},{"waveSeed":0.8,"value":0.8653153082065311,"active":1},{"waveSeed":0.9,"value":-0.7082342498284218,"active":1},{"waveSeed":1,"value":-0.49846369857713124,"active":1}],"stocks":[{"id":127,"symbol":"JXOA","price":19,"amount":1000000,"total":19000000,"profit":5000000,"age":30},{"id":128,"symbol":"EAXZ","price":27,"amount":1000000,"total":27000000,"profit":7000000,"age":22},{"id":129,"symbol":"AABW","price":45,"amount":1000000,"total":45000000,"profit":22000000,"age":19},{"id":130,"symbol":"OAU","price":13,"amount":1000000,"total":13000000,"profit":-6000000,"age":10},{"id":131,"symbol":"YBQX","price":564,"amount":779919,"total":439874316,"profit":118547688,"age":2}],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":109481813.85024294,"unusedClips":109481813.85024294,"clipRate":88797.24999940395,"clipRateTemp":19556.69999986887,"prevClips":109480925.00024295,"clipRateTracker":21,"clipmakerRate":0,"clipmakerLevel":118,"clipperCost":76624.06513870315,"unsoldClips":782623.0999998605,"funds":3336.79,"margin":0.43,"wire":65686.1499999993,"wireCost":150,"adCost":51200,"demand":3290.1595688372117,"clipsSold":108699190.74999532,"avgRev":33255.874139801555,"ticks":372021,"marketing":2.3579476910000015,"marketingLvl":10,"x":0,"clippperCost":5,"processors":30,"memory":59,"operations":61347,"trust":89,"nextTrust":121393000,"transaction":3336.799,"clipperBoost":7.5,"blinkCounter":0,"creativity":23943,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":2495,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":6,"bankroll":90039,"fib1":75025,"fib2":121393,"strategyEngineFlag":1,"investmentEngineFlag":1,"revPerSecFlag":0,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":75955.94508846347,"megaClipperLevel":64,"megaClipperBoost":2.75,"creativitySpeed":91.26579357925937,"creativityCounter":1,"wireBuyerFlag":1,"demandBoost":50,"humanFlag":1,"trustFlag":1,"nanoWire":0,"creationFlag":0,"wireProductionFlag":0,"spaceFlag":0,"factoryFlag":0,"harvesterFlag":0,"wireDroneFlag":0,"factoryLevel":0,"factoryBoost":1,"droneBoost":1,"availableMatter":6e+27,"acquiredMatter":0,"processedMatter":0,"harvesterLevel":0,"wireDroneLevel":0,"factoryCost":100000000,"harvesterCost":1000000,"wireDroneCost":1000000,"factoryRate":1000000000,"harvesterRate":26180337,"wireDroneRate":16180339,"harvesterBill":0,"wireDroneBill":0,"factoryBill":0,"probeCount":0,"totalMatter":3e+55,"foundMatter":6e+27,"qFlag":1,"qClock":2468.770000007467,"qChipCost":60000,"nextQchip":10,"bribe":1000000,"battleFlag":0,"portfolioSize":5,"stockID":131,"secTotal":543874316,"portTotal":543964355,"sellDelay":3,"riskiness":1,"maxPort":5,"m":543874316,"investLevel":9,"investUpgradeCost":52273,"stockGainThreshold":0.6300000000000001,"ledger":-3064886,"stockReportCounter":3353,"tourneyCost":8000,"tourneyLvl":124,"stratCounter":7,"roundNum":0,"hMove":1,"vMove":1,"hMovePrev":1,"vMovePrev":1,"aa":5,"ab":2,"ba":3,"bb":3,"rounds":64,"currentRound":14,"rCounter":10,"tourneyInProg":1,"winnerPtr":5,"high":0,"pick":"7","yomi":25379,"yomiBoost":1,"probeSpeed":0,"probeNav":0,"probeRep":0,"partialProbeSpawn":0,"probeHaz":0,"partialProbeHaz":0,"probesLostHaz":0,"probesLostDrift":0,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.2,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":0,"drifterCount":0,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":0,"probeUsedTrust":0,"probeTrustCost":500,"probeLaunchLevel":0,"probeCost":100000000000000000}')
  localStorage.setItem('saveProjectsActive1', '["projectButton42","projectButton70","projectButton119","projectButton40"]')
  localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
  localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
  localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
  flareLoad()
  setTimeout(flareOp, 1000)
}
flareEarthGone = () => {
  localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":13}')
  localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":10,"qFade":1,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":"180","tempOps":4962,"standardOps":102000,"opFade":0.01,"entertainCost":10000,"boredomLevel":0,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":5.715082244807671,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":982,"batteryLevel":1000,"farmCost":20859254340882180,"batteryCost":417929047164229.8,"storedPower":204482.08000010983,"powMod":30.826999999973562,"farmBill":5414085081585893000,"batteryBill":117968235764901840,"momentum":1,"swarmFlag":1,"swarmStatus":0,"swarmGifts":0,"nextGift":8,"giftPeriod":125000,"giftCountdown":4641.186354909822,"elapsedTime":0,"maxFactoryLevel":68,"maxDroneLevel":34051,"wirePriceCounter":900,"wireBasePrice":141.34516616248692,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":1,"incomeTracker":[33366.64,33258.57,33366.64,33251.89,33147.74,33258.57,33462.88,33491.64,33604.9,33483.3],"qChips":[{"waveSeed":0.1,"value":0.9960968178807174,"active":1},{"waveSeed":0.2,"value":-0.1758457018008471,"active":1},{"waveSeed":0.3,"value":-0.9650539410370875,"active":1},{"waveSeed":0.4,"value":0.34621125712747436,"active":1},{"waveSeed":0.5,"value":0.9039356236325178,"active":1},{"waveSeed":0.6,"value":-0.5057873056268856,"active":1},{"waveSeed":0.7,"value":-0.814646588547389,"active":1},{"waveSeed":0.8,"value":0.6496007367226165,"active":1},{"waveSeed":0.9,"value":0.6999694854900858,"active":1},{"waveSeed":1,"value":-0.7731696742048916,"active":1}],"stocks":[{"id":137,"symbol":"YONB","price":12,"amount":1000000,"total":12000000,"profit":3000000,"age":8},{"id":138,"symbol":"WCDD","price":14,"amount":1000000,"total":14000000,"profit":-1000000,"age":4}],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":1.1007601522770481e+21,"unusedClips":46800040214885260000,"clipRate":20934381095248593000,"clipRateTemp":2724797399997743000,"prevClips":1.1005505286770482e+21,"clipRateTracker":12,"clipmakerRate":0,"clipmakerLevel":0,"clipperCost":76624.06513870315,"unsoldClips":1.1007601522769275e+21,"funds":0,"margin":0.44,"wire":37155784147662110,"wireCost":148,"adCost":51200,"demand":3215.383215000002,"clipsSold":120571806.74999532,"avgRev":33370.75257965164,"ticks":459812,"marketing":2.3579476910000015,"marketingLvl":10,"x":100,"clippperCost":5,"processors":36,"memory":102,"operations":106959,"trust":0,"nextTrust":196418000,"transaction":3325.52,"clipperBoost":7.5,"blinkCounter":0,"creativity":14725,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":2564,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":11,"bankroll":52847990,"fib1":121393,"fib2":196418,"strategyEngineFlag":1,"investmentEngineFlag":0,"revPerSecFlag":0,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":75955.94508846347,"megaClipperLevel":0,"megaClipperBoost":2.75,"creativitySpeed":115.17274734001197,"creativityCounter":0,"wireBuyerFlag":0,"demandBoost":50,"humanFlag":0,"trustFlag":1,"nanoWire":106578.24999999956,"creationFlag":0,"wireProductionFlag":1,"spaceFlag":0,"factoryFlag":1,"harvesterFlag":1,"wireDroneFlag":1,"factoryLevel":68,"factoryBoost":1,"droneBoost":1,"availableMatter":5.999998898726399e+27,"acquiredMatter":475872973016512450,"processedMatter":0,"harvesterLevel":13002,"wireDroneLevel":21049,"factoryCost":151923876012448060000,"harvesterCost":1805502174154949,"wireDroneCost":5337246061121517,"factoryRate":100000000000000,"harvesterRate":2618033700000,"wireDroneRate":1618033900000,"harvesterBill":7222772588959132000,"wireDroneBill":34566263605004956000,"factoryBill":1.0066390225508524e+21,"probeCount":0,"totalMatter":3e+55,"foundMatter":6e+27,"qFlag":1,"qClock":3346.68000002663,"qChipCost":60000,"nextQchip":10,"bribe":512000000,"battleFlag":0,"portfolioSize":2,"stockID":138,"secTotal":26000000,"portTotal":78847990,"sellDelay":484,"riskiness":1,"maxPort":5,"m":26000000,"investLevel":9,"investUpgradeCost":52273,"stockGainThreshold":0.6300000000000001,"ledger":503392212,"stockReportCounter":6762,"tourneyCost":8000,"tourneyLvl":142,"stratCounter":4,"roundNum":0,"hMove":1,"vMove":2,"hMovePrev":1,"vMovePrev":2,"aa":9,"ab":10,"ba":3,"bb":4,"rounds":64,"currentRound":43,"rCounter":6,"tourneyInProg":1,"winnerPtr":2,"high":0,"pick":"7","yomi":97659,"yomiBoost":1,"probeSpeed":0,"probeNav":0,"probeRep":0,"partialProbeSpawn":0,"probeHaz":0,"partialProbeHaz":0,"probesLostHaz":0,"probesLostDrift":0,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.2,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":0,"drifterCount":0,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":0,"probeUsedTrust":0,"probeTrustCost":500,"probeLaunchLevel":0,"probeCost":100000000000000000}')
  localStorage.setItem('saveProjectsActive1', '["projectButton42","projectButton119","projectButton118","projectButton102"]')
  localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
  localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
  localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
  flareLoad()
  setTimeout(flareOp, 1000)
}
// end Night Run
// flarePhase2 = () => {
//     localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":8}')
//     localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":8,"qFade":0.999,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":0,"tempOps":3600,"standardOps":59000,"opFade":0.01,"entertainCost":10000,"boredomLevel":0,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":0,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":0,"batteryLevel":0,"farmCost":10000000,"batteryCost":1000000,"storedPower":0,"powMod":0,"farmBill":0,"batteryBill":0,"momentum":0,"swarmFlag":0,"swarmStatus":7,"swarmGifts":0,"nextGift":0,"giftPeriod":125000,"giftCountdown":125000,"elapsedTime":0,"maxFactoryLevel":0,"maxDroneLevel":0,"wirePriceCounter":680,"wireBasePrice":145.11668471158254,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":0,"incomeTracker":[32748.1,32671.1,32748.1,32595.64,32695.5,32850.7,32695.5,32796.33,32899.89,33062.64],"qChips":[{"waveSeed":0.1,"value":0.29130212557494656,"active":1},{"waveSeed":0.2,"value":0.5573373487324427,"active":1},{"waveSeed":0.3,"value":0.7750303623154295,"active":1},{"waveSeed":0.4,"value":0.9254989555599287,"active":1},{"waveSeed":0.5,"value":0.9956918153148258,"active":1},{"waveSeed":0.6,"value":0.9795205680940536,"active":1},{"waveSeed":0.7,"value":0.8783878721332463,"active":1},{"waveSeed":0.8,"value":0.7010657539149278,"active":1},{"waveSeed":0.9,"value":0.46293474198432566,"active":1},{"waveSeed":1,"value":0.18464979390106903,"active":1}],"stocks":[{"id":141,"symbol":"ILQT","price":32,"amount":1000000,"total":32000000,"profit":3000000,"age":40},{"id":142,"symbol":"UUMO","price":139,"amount":1000000,"total":139000000,"profit":38000000,"age":33},{"id":143,"symbol":"LQK","price":4,"amount":1000000,"total":4000000,"profit":0,"age":29},{"id":144,"symbol":"GQG","price":8,"amount":1000000,"total":8000000,"profit":4000000,"age":23},{"id":145,"symbol":"CC","price":1,"amount":1000000,"total":1000000,"profit":-1000000,"age":7}],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":113966110.8752366,"unusedClips":113966110.8752366,"clipRate":83204.5,"clipRateTemp":51692.75,"prevClips":113965277.2502366,"clipRateTracker":61,"clipmakerRate":0,"clipmakerLevel":115,"clipperCost":57570.03766994976,"unsoldClips":641009.4249993634,"funds":3292.81,"margin":0.47,"wire":117389.125,"wireCost":151,"adCost":51200,"demand":3010.1459885106406,"clipsSold":113325101.44999993,"avgRev":32928.472933000514,"ticks":375361,"marketing":2.3579476910000015,"marketingLvl":10,"x":0,"clippperCost":5,"processors":30,"memory":59,"operations":62600,"trust":89,"nextTrust":121393000,"transaction":3292.819,"clipperBoost":7.5,"blinkCounter":0,"creativity":24947,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":2513,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":6,"bankroll":139027769,"fib1":75025,"fib2":121393,"strategyEngineFlag":1,"investmentEngineFlag":1,"revPerSecFlag":0,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":57946.426834533515,"megaClipperLevel":60,"megaClipperBoost":2.75,"creativitySpeed":91.26579357925937,"creativityCounter":1,"wireBuyerFlag":1,"demandBoost":50,"humanFlag":1,"trustFlag":1,"nanoWire":0,"creationFlag":0,"wireProductionFlag":0,"spaceFlag":0,"factoryFlag":0,"harvesterFlag":0,"wireDroneFlag":0,"factoryLevel":0,"factoryBoost":1,"droneBoost":1,"availableMatter":6e+27,"acquiredMatter":0,"processedMatter":0,"harvesterLevel":0,"wireDroneLevel":0,"factoryCost":100000000,"harvesterCost":1000000,"wireDroneCost":1000000,"factoryRate":1000000000,"harvesterRate":26180337,"wireDroneRate":16180339,"harvesterBill":0,"wireDroneBill":0,"factoryBill":0,"probeCount":0,"totalMatter":3e+55,"foundMatter":6e+27,"qFlag":1,"qClock":2516.230000008503,"qChipCost":60000,"nextQchip":10,"bribe":1000000,"battleFlag":0,"portfolioSize":5,"stockID":145,"secTotal":184000000,"portTotal":323027769,"sellDelay":9,"riskiness":1,"maxPort":5,"m":184000000,"investLevel":10,"investUpgradeCost":67732,"stockGainThreshold":0.6400000000000001,"ledger":-12324653,"stockReportCounter":8110,"tourneyCost":8000,"tourneyLvl":132,"stratCounter":2,"roundNum":0,"hMove":2,"vMove":2,"hMovePrev":2,"vMovePrev":2,"aa":7,"ab":2,"ba":6,"bb":1,"rounds":64,"currentRound":49,"rCounter":4,"tourneyInProg":1,"winnerPtr":1,"high":0,"pick":"7","yomi":1125,"yomiBoost":1,"probeSpeed":0,"probeNav":0,"probeRep":0,"partialProbeSpawn":0,"probeHaz":0,"partialProbeHaz":0,"probesLostHaz":0,"probesLostDrift":0,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.2,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":0,"drifterCount":0,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":0,"probeUsedTrust":0,"probeTrustCost":500,"probeLaunchLevel":0,"probeCost":100000000000000000}')
//     localStorage.setItem('saveProjectsActive1', '["projectButton42","projectButton70","projectButton119","projectButton40"]')
//     localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
//     localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
//     localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
//     flareLoad()
//     flareOp()
// }
//
// flareFireFox = () => {
//     localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":7}')
//     localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":37,"qFade":0.997,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":0,"tempOps":3508,"standardOps":57000,"opFade":0.01,"entertainCost":10000,"boredomLevel":0,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":0,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":0,"batteryLevel":0,"farmCost":10000000,"batteryCost":1000000,"storedPower":0,"powMod":0,"farmBill":0,"batteryBill":0,"momentum":0,"swarmFlag":0,"swarmStatus":7,"swarmGifts":0,"nextGift":0,"giftPeriod":125000,"giftCountdown":125000,"elapsedTime":0,"maxFactoryLevel":0,"maxDroneLevel":0,"wirePriceCounter":524,"wireBasePrice":134.2660392347222,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":0,"incomeTracker":[3100.77,3123.39,3108.99,3039.02,3108.99,3083.19,3108.99,3083.19,3152.31,3123.39],"qChips":[{"waveSeed":0.1,"value":0.25066518899809026,"active":1},{"waveSeed":0.2,"value":0.48532482499822843,"active":1},{"waveSeed":0.3,"value":0.6889953466391512,"active":1},{"waveSeed":0.4,"value":0.8486719192995902,"active":1},{"waveSeed":0.5,"value":0.9541588239150812,"active":1},{"waveSeed":0.6,"value":0.9987204772594457,"active":1},{"waveSeed":0.7,"value":0.9795115145370192,"active":1},{"waveSeed":0.8,"value":0.8977584725161857,"active":1},{"waveSeed":0.9,"value":0.7586814723157697,"active":1},{"waveSeed":1,"value":0.5711609025784434,"active":1}],"stocks":[{"id":78,"symbol":"NONP","price":2,"amount":1000000,"total":2000000,"profit":1000000,"age":15},{"id":79,"symbol":"PGPR","price":32,"amount":41867,"total":1339744,"profit":-251202,"age":14},{"id":80,"symbol":"EHD","price":37,"amount":68946,"total":2551002,"profit":344730,"age":10}],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":58193617.19992138,"unusedClips":58193617.19992138,"clipRate":57152.99999985099,"clipRateTemp":9715.799999974668,"prevClips":58193045.79992138,"clipRateTracker":16,"clipmakerRate":0,"clipmakerLevel":102,"clipperCost":16679.540931185064,"unsoldClips":283580.0500003793,"funds":1550.85,"margin":0.07,"wire":11507.800000000978,"wireCost":138,"adCost":51200,"demand":2021.0980208571439,"clipsSold":57910037.150000006,"avgRev":3101.855507207822,"ticks":280516,"marketing":2.3579476910000015,"marketingLvl":10,"x":100,"clippperCost":5,"processors":30,"memory":57,"operations":60508,"trust":87,"nextTrust":75025000,"transaction":310.17,"clipperBoost":7.5,"blinkCounter":0,"creativity":10282,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":2296,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":6,"bankroll":1421050,"fib1":46368,"fib2":75025,"strategyEngineFlag":1,"investmentEngineFlag":1,"revPerSecFlag":1,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":16022.66988795144,"megaClipperLevel":41,"megaClipperBoost":2.75,"creativitySpeed":91.26579357925937,"creativityCounter":4,"wireBuyerFlag":1,"demandBoost":5,"humanFlag":1,"trustFlag":1,"nanoWire":0,"creationFlag":0,"wireProductionFlag":0,"spaceFlag":0,"factoryFlag":0,"harvesterFlag":0,"wireDroneFlag":0,"factoryLevel":0,"factoryBoost":1,"droneBoost":1,"availableMatter":6e+27,"acquiredMatter":0,"processedMatter":0,"harvesterLevel":0,"wireDroneLevel":0,"factoryCost":100000000,"harvesterCost":1000000,"wireDroneCost":1000000,"factoryRate":1000000000,"harvesterRate":26180337,"wireDroneRate":16180339,"harvesterBill":0,"wireDroneBill":0,"factoryBill":0,"probeCount":0,"totalMatter":3e+55,"foundMatter":6e+27,"qFlag":1,"qClock":1573.3299999987141,"qChipCost":60000,"nextQchip":10,"bribe":1000000,"battleFlag":0,"portfolioSize":3,"stockID":80,"secTotal":5890746,"portTotal":7311796,"sellDelay":4,"riskiness":1,"maxPort":5,"m":5890746,"investLevel":8,"investUpgradeCost":39255,"stockGainThreshold":0.6200000000000001,"ledger":-593,"stockReportCounter":3869,"tourneyCost":8000,"tourneyLvl":100,"stratCounter":1,"roundNum":0,"hMove":1,"vMove":1,"hMovePrev":1,"vMovePrev":1,"aa":7,"ab":5,"ba":6,"bb":6,"rounds":64,"currentRound":56,"rCounter":2,"tourneyInProg":1,"winnerPtr":7,"high":0,"pick":"7","yomi":15258,"yomiBoost":1,"probeSpeed":0,"probeNav":0,"probeRep":0,"partialProbeSpawn":0,"probeHaz":0,"partialProbeHaz":0,"probesLostHaz":0,"probesLostDrift":0,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.2,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":0,"drifterCount":0,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":0,"probeUsedTrust":0,"probeTrustCost":500,"probeLaunchLevel":0,"probeCost":100000000000000000}')
//     localStorage.setItem('saveProjectsActive1', '["projectButton70","projectButton119","projectButton38"]')
//     localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
//     localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
//     localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
//     flareLoad()
//     flareOp()
// }
//
// flarePhase21 = () => {
//     localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":14}')
//     localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":81,"qFade":1,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":"199","tempOps":1006,"standardOps":119000,"opFade":0.01,"entertainCost":10000,"boredomLevel":0,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":0.9932777913025379,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":29642,"batteryLevel":1042,"farmCost":270360716148557400000,"batteryCost":463918982700428.9,"storedPower":2052929.4199999082,"powMod":40.414000000011,"farmBill":2.1200507235515963e+24,"batteryBill":136453868816080380,"momentum":1,"swarmFlag":1,"swarmStatus":0,"swarmGifts":0,"nextGift":12,"giftPeriod":125000,"giftCountdown":3613.0264404976065,"elapsedTime":0,"maxFactoryLevel":150,"maxDroneLevel":1439000,"wirePriceCounter":918,"wireBasePrice":165.9995498610336,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":1,"incomeTracker":[37508.11,37230.74,36834.28,37230.74,36834.28,37230.74,36834.28,37230.74,36834.28,37293.7],"qChips":[{"waveSeed":0.1,"value":0.9200292637006406,"active":1},{"waveSeed":0.2,"value":-0.7210263033936917,"active":1},{"waveSeed":0.3,"value":-0.3549614439073187,"active":1},{"waveSeed":0.4,"value":0.9992093437006625,"active":1},{"waveSeed":0.5,"value":-0.4281182339140534,"active":1},{"waveSeed":0.6,"value":-0.663693377205535,"active":1},{"waveSeed":0.7,"value":0.948254278748493,"active":1},{"waveSeed":0.8,"value":-0.07945285113678652,"active":1},{"waveSeed":0.9,"value":-0.8859871337682439,"active":1},{"waveSeed":1,"value":0.7738003606337578,"active":1}],"stocks":[{"id":149,"symbol":"HWIY","price":168,"amount":1000000,"total":168000000,"profit":88000000,"age":19},{"id":150,"symbol":"RSBH","price":19,"amount":1000000,"total":19000000,"profit":6000000,"age":19},{"id":151,"symbol":"KMQJ","price":60,"amount":1000000,"total":60000000,"profit":33000000,"age":18},{"id":152,"symbol":"AHN","price":5,"amount":1000000,"total":5000000,"profit":3000000,"age":15}],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":8.973662957021254e+26,"unusedClips":8.826983338998226e+26,"clipRate":9.076331250002272e+24,"clipRateTemp":8.996649750002486e+24,"prevClips":8.972753642021254e+26,"clipRateTracker":98,"clipmakerRate":0,"clipmakerLevel":0,"clipperCost":23329103.57356314,"unsoldClips":8.973662957021254e+26,"funds":21824747.45,"margin":0.2,"wire":2.038795411357407e+27,"wireCost":170,"adCost":51200,"demand":7073.843073000005,"clipsSold":195829208.80000067,"avgRev":37431.02932026132,"ticks":483298,"marketing":2.3579476910000015,"marketingLvl":10,"x":1000,"clippperCost":5,"processors":53,"memory":119,"operations":119993,"trust":0,"nextTrust":317811000,"transaction":3743,"clipperBoost":7.5,"blinkCounter":0,"creativity":23834,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":3094,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":12,"bankroll":0,"fib1":196418,"fib2":317811,"strategyEngineFlag":1,"investmentEngineFlag":0,"revPerSecFlag":1,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":25560341.549845975,"megaClipperLevel":0,"megaClipperBoost":2.75,"creativitySpeed":187.92840068015428,"creativityCounter":0,"wireBuyerFlag":0,"demandBoost":50,"humanFlag":0,"trustFlag":1,"nanoWire":30009.349999999722,"creationFlag":0,"wireProductionFlag":1,"spaceFlag":0,"factoryFlag":1,"harvesterFlag":1,"wireDroneFlag":1,"factoryLevel":150,"factoryBoost":1000,"droneBoost":2,"availableMatter":1.259957191092539e+27,"acquiredMatter":1.8038811018490078e+27,"processedMatter":0,"harvesterLevel":719000,"wireDroneLevel":720000,"factoryCost":5.8732402566643265e+23,"harvesterCost":15053634333529158000,"wireDroneCost":15100783257025761000,"factoryRate":100000000000000,"harvesterRate":2618033700000,"wireDroneRate":1618033900000,"harvesterBill":3.330324208399708e+24,"wireDroneBill":3.345401386794481e+24,"factoryBill":5.871185347140652e+24,"probeCount":0,"totalMatter":3e+55,"foundMatter":6e+27,"qFlag":1,"qClock":3601.1500000321844,"qChipCost":60000,"nextQchip":10,"bribe":256000000,"battleFlag":0,"portfolioSize":4,"stockID":152,"secTotal":252000000,"portTotal":252000000,"sellDelay":531,"riskiness":7,"maxPort":5,"m":252000000,"investLevel":10,"investUpgradeCost":67732,"stockGainThreshold":0.6400000000000001,"ledger":845899448,"stockReportCounter":2533,"tourneyCost":8000,"tourneyLvl":138,"stratCounter":1,"roundNum":0,"hMove":1,"vMove":1,"hMovePrev":1,"vMovePrev":1,"aa":10,"ab":9,"ba":5,"bb":6,"rounds":64,"currentRound":8,"rCounter":7,"tourneyInProg":1,"winnerPtr":1,"high":0,"pick":"7","yomi":53489,"yomiBoost":1,"probeSpeed":0,"probeNav":0,"probeRep":0,"partialProbeSpawn":0,"probeHaz":0,"partialProbeHaz":0,"probesLostHaz":0,"probesLostDrift":0,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.2,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":0,"drifterCount":0,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":0,"probeUsedTrust":0,"probeTrustCost":500,"probeLaunchLevel":0,"probeCost":100000000000000000}')
//     localStorage.setItem('saveProjectsActive1', '["projectButton119","projectButton118"]')
//     localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
//     localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
//     localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
//     flareLoad()
//     flareOp()
// }
//
// flarePhase3 = () => {
//     localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":15}')
//     localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":137,"qFade":0.995,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":"199","tempOps":3135,"standardOps":132000,"opFade":0.01,"entertainCost":10000,"boredomLevel":667,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":0.995237558027793,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":16779,"batteryLevel":1003,"farmCost":55580396298157375000,"batteryCost":421117830804729.06,"storedPower":9023220.359999992,"powMod":44.41850000003012,"farmBill":2.467021179456766e+23,"batteryBill":119225208424382460,"momentum":1,"swarmFlag":1,"swarmStatus":0,"swarmGifts":0,"nextGift":12,"giftPeriod":125000,"giftCountdown":490.61858146808567,"elapsedTime":0,"maxFactoryLevel":218,"maxDroneLevel":764000,"wirePriceCounter":951,"wireBasePrice":139.34736618014068,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":1,"incomeTracker":[32955.93,32796.33,32899.89,33062.64,32955.93,32850.7,32748.1,32646.32,32497.85,32646.32],"qChips":[{"waveSeed":0.1,"value":-0.6356458455116551,"active":1},{"waveSeed":0.2,"value":0.9814127795638742,"active":1},{"waveSeed":0.3,"value":-0.8796178043530717,"active":1},{"waveSeed":0.4,"value":0.3766833370387029,"active":1},{"waveSeed":0.5,"value":0.2980331948901336,"active":1},{"waveSeed":0.6,"value":-0.8368351468313451,"active":1},{"waveSeed":0.7,"value":0.9940081411585429,"active":1},{"waveSeed":0.8,"value":-0.6978752577306817,"active":1},{"waveSeed":0.9,"value":0.08348446154553418,"active":1},{"waveSeed":1,"value":0.5689784545275565,"active":1}],"stocks":[],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":3.8663020915413744e+27,"unusedClips":3.1837002554735246e+25,"clipRate":2.109483431001453e+25,"clipRateTemp":2.321882444201675e+24,"prevClips":3.866090997061974e+27,"clipRateTracker":10,"clipmakerRate":0,"clipmakerLevel":0,"clipperCost":57570.03766994976,"unsoldClips":3.8663020915413744e+27,"funds":61634795.07,"margin":0.51,"wire":1.002019900395191e+23,"wireCost":145,"adCost":51200,"demand":2774.056107058825,"clipsSold":123825033.44999993,"avgRev":32527.504298202926,"ticks":485710,"marketing":2.3579476910000015,"marketingLvl":10,"x":1000,"clippperCost":5,"processors":66,"memory":132,"operations":135135,"trust":0,"nextTrust":196418000,"transaction":3252.27,"clipperBoost":7.5,"blinkCounter":0,"creativity":33,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":2573,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":13,"bankroll":0,"fib1":121393,"fib2":196418,"strategyEngineFlag":1,"investmentEngineFlag":0,"revPerSecFlag":0,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":57946.426834533515,"megaClipperLevel":0,"megaClipperBoost":2.75,"creativitySpeed":247.58322583588782,"creativityCounter":1,"wireBuyerFlag":0,"demandBoost":50,"humanFlag":0,"trustFlag":1,"nanoWire":157409.125,"creationFlag":0,"wireProductionFlag":1,"spaceFlag":0,"factoryFlag":1,"harvesterFlag":1,"wireDroneFlag":1,"factoryLevel":218,"factoryBoost":1000,"droneBoost":2,"availableMatter":0,"acquiredMatter":2.1335977064683223e+27,"processedMatter":0,"harvesterLevel":382000,"wireDroneLevel":382000,"factoryCost":3.833366627481516e+26,"harvesterCost":3627814936586558000,"wireDroneCost":3627814936586558000,"factoryRate":100000000000000,"harvesterRate":2618033700000,"wireDroneRate":1618033900000,"harvesterBill":4.264070887376992e+23,"wireDroneBill":4.264070887376992e+23,"factoryBill":3.833364572571988e+27,"probeCount":0,"totalMatter":3e+55,"foundMatter":6e+27,"qFlag":1,"qClock":3619.7200000325897,"qChipCost":60000,"nextQchip":10,"bribe":512000000,"battleFlag":0,"portfolioSize":0,"stockID":149,"secTotal":0,"portTotal":0,"sellDelay":656,"riskiness":7,"maxPort":5,"m":0,"investLevel":10,"investUpgradeCost":67732,"stockGainThreshold":0.6400000000000001,"ledger":555703116,"stockReportCounter":542,"tourneyCost":16000,"tourneyLvl":158,"stratCounter":6,"roundNum":0,"hMove":1,"vMove":1,"hMovePrev":1,"vMovePrev":1,"aa":8,"ab":9,"ba":9,"bb":3,"rounds":64,"currentRound":45,"rCounter":5,"tourneyInProg":1,"winnerPtr":4,"high":0,"pick":"7","yomi":41309,"yomiBoost":2,"probeSpeed":0,"probeNav":0,"probeRep":0,"partialProbeSpawn":0,"probeHaz":0,"partialProbeHaz":0,"probesLostHaz":0,"probesLostDrift":0,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.2,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":0,"drifterCount":0,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":0,"probeUsedTrust":0,"probeTrustCost":500,"probeLaunchLevel":0,"probeCost":100000000000000000}')
//     localStorage.setItem('saveProjectsActive1', '["projectButton42","projectButton118","projectButton46"]')
//     localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
//     localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
//     localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
//     flareLoad()
//     setTimeout(flareOp, 1000)
// }
//
// flarePhase31 = () => {
//     localStorage.setItem('flareSave1', '{"flareChosenStrat":7,"flareBetterFriends":true,"flareRunYomi":true,"flareStone":17}')
//     localStorage.setItem('saveGame1', '{"resetFlag":2,"dismantle":0,"endTimer1":0,"endTimer2":0,"endTimer3":0,"endTimer4":0,"endTimer5":0,"endTimer6":0,"testFlag":0,"finalClips":0,"wireBuyerStatus":1,"wirePriceTimer":82,"qFade":0.993,"autoTourneyStatus":1,"driftKingMessageCost":1,"sliderPos":"199","tempOps":3123,"standardOps":156000,"opFade":0.01,"entertainCost":10000,"boredomLevel":0,"boredomFlag":0,"boredomMsg":0,"unitSize":0,"driftersKilled":0,"battleEndDelay":0,"battleEndTimer":100,"masterBattleClock":0,"honorCount":0,"threnodyTitle":"Durenstein 1","bonusHonor":0,"honorReward":0,"resultsTimer":0,"resultsFlag":0,"honor":0,"maxTrust":20,"maxTrustCost":91117.99,"disorgCounter":0.9909708743011307,"disorgFlag":0,"synchCost":5000,"disorgMsg":0,"threnodyCost":50000,"farmRate":50,"batterySize":10000,"factoryPowerRate":200,"dronePowerRate":1,"farmLevel":1,"batteryLevel":0,"farmCost":10000000,"batteryCost":1000000,"storedPower":0,"powMod":1,"farmBill":0,"batteryBill":0,"momentum":1,"swarmFlag":1,"swarmStatus":0,"swarmGifts":0,"nextGift":6,"giftPeriod":125000,"giftCountdown":2789.3023848618886,"elapsedTime":0,"maxFactoryLevel":222,"maxDroneLevel":1752000,"wirePriceCounter":1057,"wireBasePrice":135.63349306209787,"egoFlag":0,"autoTourneyFlag":0,"tothFlag":1,"incomeTracker":[32955.93,32796.33,32899.89,33062.64,32955.93,32850.7,32748.1,32646.32,32497.85,32646.32],"qChips":[{"waveSeed":0.1,"value":0.29434466202949283,"active":1},{"waveSeed":0.2,"value":0.5626099958374735,"active":1},{"waveSeed":0.3,"value":0.7810273363405857,"active":1},{"waveSeed":0.4,"value":0.9302446169074364,"active":1},{"waveSeed":0.5,"value":0.9970409881791272,"active":1},{"waveSeed":0.6,"value":0.9754982028929211,"active":1},{"waveSeed":0.7,"value":0.8675249804541927,"active":1},{"waveSeed":0.8,"value":0.6826878918603526,"active":1},{"waveSeed":0.9,"value":0.43736374879832474,"active":1},{"waveSeed":1,"value":0.15328859636364847,"active":1}],"stocks":[],"battles":[],"battleNumbers":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"clips":5.999999999999736e+27,"unusedClips":9.999590931584541e+26,"clipRate":0,"clipRateTemp":0,"prevClips":5.999999999999736e+27,"clipRateTracker":27,"clipmakerRate":0,"clipmakerLevel":0,"clipperCost":57570.03766994976,"unsoldClips":5.999999999999736e+27,"funds":61634795.07,"margin":0.51,"wire":342635510885277400000,"wireCost":142,"adCost":51200,"demand":2774.056107058825,"clipsSold":123825033.44999993,"avgRev":32527.504298202926,"ticks":538727,"marketing":2.3579476910000015,"marketingLvl":10,"x":1000,"clippperCost":5,"processors":90,"memory":156,"operations":159123,"trust":0,"nextTrust":196418000,"transaction":3252.27,"clipperBoost":7.5,"blinkCounter":0,"creativity":17197,"creativityOn":true,"safetyProjectOn":false,"boostLvl":3,"wirePurchase":2573,"wireSupply":173250,"marketingEffectiveness":15,"milestoneFlag":14,"bankroll":0,"fib1":121393,"fib2":196418,"strategyEngineFlag":1,"investmentEngineFlag":0,"revPerSecFlag":0,"compFlag":1,"projectsFlag":1,"autoClipperFlag":1,"megaClipperFlag":1,"megaClipperCost":57946.426834533515,"megaClipperLevel":0,"megaClipperBoost":2.75,"creativitySpeed":364.83236072791937,"creativityCounter":0,"wireBuyerFlag":0,"demandBoost":50,"humanFlag":0,"trustFlag":1,"nanoWire":157409.125,"creationFlag":0,"wireProductionFlag":1,"spaceFlag":1,"factoryFlag":1,"harvesterFlag":1,"wireDroneFlag":1,"factoryLevel":0,"factoryBoost":1000,"droneBoost":2,"availableMatter":4.3522838693020096e+23,"acquiredMatter":477558813431374460,"processedMatter":0,"harvesterLevel":787.418226467478,"wireDroneLevel":1000,"factoryCost":100000000,"harvesterCost":1000000,"wireDroneCost":5636073840304.029,"factoryRate":100000000000000,"harvesterRate":2618033700000,"wireDroneRate":1618033900000,"harvesterBill":0,"wireDroneBill":1733093761607379.2,"factoryBill":0,"probeCount":256501.64809104853,"totalMatter":3e+55,"foundMatter":6.000435571499998e+27,"qFlag":1,"qClock":4149.890000044162,"qChipCost":60000,"nextQchip":10,"bribe":512000000,"battleFlag":0,"portfolioSize":0,"stockID":149,"secTotal":0,"portTotal":0,"sellDelay":954,"riskiness":7,"maxPort":5,"m":0,"investLevel":10,"investUpgradeCost":67732,"stockGainThreshold":0.6400000000000001,"ledger":555703116,"stockReportCounter":542,"tourneyCost":16000,"tourneyLvl":169,"stratCounter":0,"roundNum":0,"hMove":1,"vMove":1,"hMovePrev":1,"vMovePrev":2,"aa":10,"ab":10,"ba":6,"bb":5,"rounds":64,"currentRound":6,"rCounter":4,"tourneyInProg":1,"winnerPtr":1,"high":0,"pick":"7","yomi":20851,"yomiBoost":2,"probeSpeed":0,"probeNav":0,"probeRep":7,"partialProbeSpawn":0,"probeHaz":6,"partialProbeHaz":0,"probesLostHaz":116325.51848490814,"probesLostDrift":26241.225415028497,"probesLostCombat":0,"probeFac":0,"probeWire":0,"probeCombat":0,"attackSpeed":0.20000000000000004,"battleSpeed":0.2,"attackSpeedFlag":0,"attackSpeedMod":0.1,"probeDescendents":393548.391990986,"drifterCount":26241.225415028497,"warTrigger":1000000,"battleID":0,"battleName":"foo","battleNameFlag":0,"maxBattles":1,"battleClock":0,"battleAlarm":10,"outcomeTimer":150,"drifterCombat":1.75,"probeTrust":13,"probeUsedTrust":13,"probeTrustCost":24197,"probeLaunchLevel":5520,"probeCost":100000000000000000}')
//     localStorage.setItem('saveProjectsActive1', '["projectButton42","projectButton118","projectButton128"]')
//     localStorage.setItem('saveProjectsFlags1', '[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]')
//     localStorage.setItem('saveProjectsUses1', '[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]')
//     localStorage.setItem('saveStratsActive1', '[1,1,1,1,1,1,1,1]')
//     flareLoad()
//     setTimeout(flareOp, 1000)
// }

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
      } else {
        flareProjects.flareProjects[idx].funds*=2
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
    special: () => flareStone > 3
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
    ifRun: () => flareStone++
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
    special: () => probeTrust >= maxTrust,
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
    special: () => flareStone >= 21 && probeTrust >= maxTrust,
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

// finish: 782135 ("2 hours 10 minutes 21 seconds")
// finish: 747756 ("2 hours 4 minutes 37 seconds") (sim 2)
// finish: 778323 ("2 hours 9 minutes 43 seconds") (sim 3)
