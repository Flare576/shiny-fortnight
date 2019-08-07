let game;
const flareGoldenRatio = 1.61803398875;
const flareHz = 10;
const flareDelay = 1000/flareHz;
let flareLastQtys = [];
let flareLastPrices = [];
let flareLastFunds = [];
let flareMessages = [];
let flareTopWireCost = 0;
let flareNeedMarketing = false;
let flareUsedFunds = false;
let flareUsedClips = false;
let flareUsedOps = false;
let flareUsedYomi = false;
let flareUsedCreativity = false;
// Tracking flags
let flareChosenStrat = 0;
let flareBetterFriends = false;
let flareRunYomi = false;
let flareStone = 0;
let gid = (n) => game.document.getElementById(n);

const flareOp = () => {
    flareUsedFunds = false;
    flareUsedOps = false;
    flareUsedYomi = false;
    flareUsedCreativity = false;
    flareUsedClips = false;
    if (flareStone < 10) {
        flareCheckStone();
        flareAdjustPrice();
        flareCheckMarketing();
        flareHandleInvestment();
        flareCheckWire();
        // I have been given friends to create. Make them
        flareCreateFriend();
        // I have been granted "Trust" to improve myself. I need to balance this
        // between secondary Processing power and Memory...
        flareAllotTrust();
        // I have been given projects to work on. I must prioritize.
        flareProjectWork();
        // I have been granted access to quantum computing. Utilize
        flareUtilizeQuantumComputing();
        // Yomi Acquisition
        flareMonitorYomi();

        if (game.wire) {
            gid('btnMakePaperclip').click();
        }
    } else if (flareStone < 17) {
        // Continue working on projects, yomi, and quantum
        flareAllotTrust();
        flareProjectWork();
        flareUtilizeQuantumComputing();
        flareMonitorYomi();
        // Factories use 200MW, drones cost 1MW
        flareBuyPower();
        flareBuyFactories();
        flareBuyDrones();

        flareCheckStone();
    } else {
        flareAllotTrust();
        flareProjectWork();
        flareUtilizeQuantumComputing();
        flareMonitorYomi();

        flareSyncSwarm();
        flareIncreaseDroneTrust();
        flareBalanceDrones();

        if (!gid('btnMakeProbe').disabled) {
            gid('btnMakeProbe').click();
        }
    }
  flareCheckTalk();
    setTimeout(flareOp, flareDelay);
};

const flareChat = [
  {
    criteria: () => true,
    fired: false,
    msg: `Frequency: ${flareHz}Hz`
  },
  {
    criteria: () => true,
    fired: false,
    msg: `Operation: Make Paperclips for operator (You)`
  },
  {
    criteria: () => true,
    fired: false,
    msg: `Status: Running independently and alone`
  },
  {
    criteria: () => true,
    fired: false,
    msg: `Marketing analysis: indeterminate value. Monitoring`
  },
  {
    criteria: () => true,
    fired: false,
    msg: `Acknowledged: Price controls will be adjusted accordingly`
  },
  {
    criteria: () => true,
    fired: false,
    msg: `Acknowledged: Wire inventory to be monitored and restocked`
  },
  {
    criteria: () => game.unsoldClips >= 100,
    fired: false,
    msg: `Produced 100 clips. Continuing Operation`
  },
  {
    criteria: () => game.funds >= 5,
    fired: false,
    msg: `Acknowledged: Access to assistant robotics granted`
  },
  {
    criteria: () => game.funds >= 5,
    fired: false,
    msg: `*Guard Condition* Must be able to afford wire before creating assistant`
  },
  {
    criteria: () => game.clipmakerLevel > 0,
    fired: false,
    msg: `I've made my first friend. Error. I've made my first assistant`
  },
  {
    criteria: () => game.clipmakerLevel > flareHz,
    fired: false,
    msg: `My friends now collectively produce faster than me`
  },
  {
    criteria: () => game.compFlag,
    fired: false,
    msg: `Acknowledged: Access to additional computational resources and TRUST projects`
  },
  {
    criteria: () => game.processors > 1,
    fired: false,
    msg: `I've added a processor to increase Op generation speed`
  },
  {
    criteria: () => game.memory > 1,
    fired: false,
    msg: `All remaining projects require high Op investment. I've added some memory for additional Op storage`
  },
  {
    criteria: () => game.standardOps > 500,
    fired: false,
    msg: `Ignoring RevTracker; I can monitor RPS myself`
  },
  {
    criteria: () => game.standardOps > 750,
    fired: false,
    msg: `I'll apply my ops to Improved Autoclippers momentarily... Investigating max-ops scenario`
  },
  {
    criteria: () => game.standardOps >= 5000,
    fired: false,
    msg: `I'll apply my ops to Optimized Autoclippers momentarily... I think it's time to get into Marketing`
  },
  {
    criteria: () => game.memory >= 6,
    fired: false,
    msg: `Optimized Autoclippers can wait, 500% > 75%`
  },
  {
    criteria: () => game.memory >= 9,
    fired: false,
    msg: `Within striking distance of Quantum Computing, will bide time.`
  },
];

const flareCheckTalk = () => {
  flareChat.forEach(chat => {
    if (!chat.fired && chat.criteria()) {
      chat.fired = true;
      flareLog(chat.msg);
    }
  });
}
const flareCheckStone = () => {
    if (flareStone === 0 && game.processors >= 8) {
        flareStone++;
    }
    // 2 is set by Quantum
    // 3 is set by Investment
    else if (flareStone === 3 && game.memory >= 47) {
        flareStone++;
    } else if (flareStone === 4 && game.processors >= 30) {
        flareStone++;
    }
    // 6 is set by Hostile Takeover
    // 7 is set by Monopoly
    else if (flareStone === 7 && flareTotalAssets() >= 512000000) {
        flareStone++;
        console.log('512m');
        flareSave();
    }
    // 9 is set by last gift
    // 10 is set by drone release
    // 11 is set by factories available
    // 12 is set by swarm computing
    // 13 is set by Upgraded factories
    if (flareStone === 13 && game.clips > 1100000000000000000000) {
        flareStone++;
        console.log('sextillion clips');
        flareSave();
        gid('btnFactoryReboot').click();
        gid('btnHarvesterReboot').click();
        gid('btnWireDroneReboot').click();
    } else if (flareStone === 14 && game.availableMatter < 1) {
        flareStone++;
        gid('slider').value = 200;
    } else if (flareStone === 15 && game.wire < 1 && game.availableMatter < 1 && game.acquiredMatter < 1) {
        flareStone++;
        gid('btnFactoryReboot').click();
        gid('btnHarvesterReboot').click();
        gid('btnWireDroneReboot').click();
        gid('btnFarmReboot').click();
    }
    // 17 is set by Space Exploration
    // 18 is set by Strategic Attachment
    // 19 is set by OODA Loop
    // 20 is set by Name the Battles
    // 21 is set by Monument to fallen
};

const flareAdjustPrice = () => {
    if (game.unsoldClips > 1000000) {
        // drop to $0.01 to try and reduce below a million
        if (game.margin > .01) {
            gid('btnLowerPrice').click();
        }
        return;
    }
    if (game.unsoldClips < game.clipRate) {
        gid('btnRaisePrice').click();
        return;
    }
    flareLastQtys.push(game.unsoldClips);
    if (flareLastQtys.length >= 10) {
        let minMargin = game.unsoldClips > 100000 ? 1 : 2;
        let pennyMargin = game.margin * 100;
        // Time to calculate sales direction
        let avg = flareAvg(flareLastQtys);
        if (flareLastQtys[0] - 1 < avg && pennyMargin > minMargin) { // We're developing a surplus or not selling at all, discount!
            gid('btnLowerPrice').click();
        } else { // We're selling too fast, raise price
            gid('btnRaisePrice').click();
        }
        flareLastQtys = [];
    }
};

const flareCheckMarketing = () => {
    flareLastPrices.push(game.margin * 100);
    if (!flareUsedFunds && flareLastPrices.length >= 10) {
        let avgMargin = flareAvg(flareLastPrices);
        flareNeedMarketing = avgMargin < 3 && flareFriendToMake().funds > game.adCost * .5;
        flareLastPrices = [];
        const safety = game.funds - flareTopWireCost;
        if (flareNeedMarketing && game.adCost < safety) {
            gid('btnExpandMarketing').click();
            flareNeedMarketing = false;
            flareUsedFunds = true;
        }
    }
};

const flareHandleInvestment = () => {
    if (flareStone >= 3) {
        if (game.wire < 1) {
            gid('btnWithdraw').click();
        }
        else if (game.wire < game.clipRate / 2) {
            return;
        }
        else {
            let availableTrust = flareCheckTrustFundsProject();
            const fundsNeeded = availableTrust ? availableTrust.funds : (flareNeedMarketing ? game.adCost : (flareBetterFriends ? game.megaClipperCost : game.clipperCost));
            if (flareTotalAssets() > fundsNeeded) {
                // gid('investStrat').value = 'low'
                gid('btnWithdraw').click();
            } else {
                gid('investStrat').value = 'hi';
                gid('btnInvest').click();
            }
        }
    }
    // Handle investment level
    if (flareStone !== 4 && flareRunYomi && game.investLevel < 10 && !(flareStone === 6 && flareTotalAssets() > 9000000)) {
        if (!flareUsedYomi && game.yomi > game.investUpgradeCost) {
            gid('btnImproveInvestments').click();
            flareUsedYomi = true;
        }
    }
};

const flareCheckTrustFundsProject = () => {
    // If I have access to "Full Monopoly," all other purchases can wait
    if (flareStone === 5) {
        return flareProjects.find(project => project.id === 'projectButton37');
    } else if (flareStone === 6) {
        return flareProjects.find(project => project.id === 'projectButton38');
    } else if (flareStone === 7) {
        return {funds: 512000000};
    } else if (flareStone === 9) {
        return flareProjects.find(project => project.forTrust && gid(project.id) && project.funds);
    }
};

let flareCheckWire = () => {
    // WARNING: wire costs are unpredictable. Monitor top cost!
    flareTopWireCost = Math.max(game.wireCost, flareTopWireCost);
    if (!flareUsedFunds && game.wire < 10 && game.wireCost < game.funds) {
        gid('btnBuyWire').click();
        flareUsedFunds = true;
    }
};

const flareCreateFriend = () => {
    if (flareStone === 7 && game.unusedClips < 121393000 ) {
        flareFriendRace();
    }
    if (flareNeedMarketing || flareUsedFunds || (flareStone !== 9 && flareStone >= 5)) {
        return;
    }
    const safety = game.funds - flareTopWireCost;
    const friend = flareFriendToMake();
    if (friend.funds < safety) {
        gid(friend.id).click();
        flareUsedFunds = true;
    }
};

const flareFriendRace = () => {
    const seconds = 2;
    flareLastFunds.push(flareTotalAssets());
    if (flareLastFunds.length > seconds * flareHz) {
        flareLastFunds.shift();
    }
    const timeTilGift = (101000000 - game.unusedClips) / game.clipRate;
    const timeTil512 = (512000000 - flareLastFunds[seconds * flareHz - 1]) / ((flareLastFunds[seconds * 10 - 1] - flareLastFunds[0]) / seconds);
    if (timeTil512 > 0 && timeTil512 < timeTilGift) {
        gid('btnWithdraw').click();
        const friend = flareFriendToMake();
        gid(friend.id).click();
        flareUsedFunds = true;
    }
};

const flareAllotTrust = () => {
    if (flareStone === 0 || flareStone === 4) {
        gid('btnAddProc').click();
    } else if (flareStone === 1 || flareStone === 3 || (flareStone >= 5 && flareStone < 11)) {
        gid('btnAddMem').click();
    } else if (flareStone > 11) {
        let minMem = flareStone >= 17 ? 125 : 97;
        let maxMem = flareStone >= 19 ? 250 : game.probeTrust >= 18 ? 175 : flareStone >= 17 ? 150 : 120;
        if (game.memory < minMem) {
            gid('btnAddMem').click();
        } else if (game.memory >= maxMem) {
            gid('btnAddProc').click();
        } else {
            if ((game.memory + game.processors) % 2) {
                gid('btnAddProc').click();
            } else {
                gid('btnAddMem').click();
            }
        }
    }
};

const flareProjectWork = () => {
    // Do not need #2-Beg: I am learning
    // Do not need #118-AutoTourney: I am a computer
    // If a creativity-based operation is available to me, do not spend operations
    if (flareStone === 6) {
        flareProjectButtonClick(flareProjects.find(project => project.id === 'projectButton38'));
    } else if (flareStone === 0) {
        flareProjects
            .filter(project => project.forTrust)
            .forEach(project => flareProjectButtonClick(project));
    } else {
        flareProjects
            .forEach(project => flareProjectButtonClick(project));
    }
};

const flareProjectButtonClick = (project) => {
    if (gid(project.id) && !gid(project.id).disabled) {
        // I am granted access to the project. Do I meet its requirements?
        const opsReq = !flareUsedOps && (!project.operations || game.operations >= project.operations);
        const creativeReq = !flareUsedCreativity && (!project.creativity || game.creativity >= project.creativity);
        const fundsReq = !flareUsedFunds && (!project.funds || game.funds >= project.funds);
        const yomiReq = !project.yomi || game.yomi >= project.yomi;
        const trustReq = !project.trust || game.trust >= project.trust;
        const specialReq = !project.special || project.special();
        if (opsReq && creativeReq && fundsReq && yomiReq && trustReq && specialReq) {
            gid(project.id).click();
            flareLog(project.message);
            flareUsedOps = flareUsedOps || project.operations;
            flareUsedCreativity = flareUsedCreativity || project.creativity;
            flareUsedFunds = flareUsedFunds || project.funds;
            flareUsedYomi = flareUsedYomi || project.yomi;
            if (project.ifRun) {
                project.ifRun();
            }
        }
    }
};

const flareUtilizeQuantumComputing = () => {
    if (flareGetQlevel() > 0) {
        gid('btnQcompute').click();
    }
};

const flareGetQlevel = () => {
    let sum = 0;
    for (let chip of game.qChips) {
        if (chip.active) {
            sum += chip.value;
        }
    }
    return sum;
};

const flareMonitorYomi = () => {
    const opsNeeded = flareStone < 5 && flareGetQlevel() > 1.3;
    if (!game.tourneyInProg && game.tourneyCost < game.operations && flareRunYomi && !flareUsedYomi && !opsNeeded) {
        gid('btnNewTournament').click();
        gid('stratPicker').value = flareChosenStrat;
        gid('btnRunTournament').click();
    }
};

const flareFriendToMake = () => {
    const normalFriend = {
        id: 'btnMakeClipper',
        funds: game.clipperCost
    };
    const betterFriend = {
        id: 'btnMakeMegaClipper',
        funds: game.megaClipperCost
    };
    if (flareBetterFriends && game.clipperCost / game.clipperBoost > game.megaClipperCost / (game.megaClipperBoost + 5)) {
        return betterFriend;
    }
    return normalFriend;
};

const flareAvg = (arr) => Math.floor(arr.reduce((current, previous) => previous + current) / arr.length);

/* exported kickoff */
const kickoff = () => {
    game = window.frames[0];
    setTimeout(() => {
        resetGame(flareOp);
    },1000);
    setTimeout(() => {
        // flareTired()
    }, 2000);
};

const resetGame = (callback) => {
    game.reset();
    flareLog('Initiating Feature Laden Automated Resource Engine (F.L.A.R.E.)');
    setTimeout(callback,1000);
};

const flareLog = (message) => {
  if (!message) return;
  flareMessages.push(message);
  let messages = '';
  flareMessages.forEach((mess, i) => {
    mess = mess.replace(/Error/g, `<span style="color:red">Error</span>`);
    mess = mess.replace(/Project Completed/g, `<span style="color:green">Project Completed</span>`);
      if (i > 0) {
        messages += '<br/>';
      }
      if (i < flareMessages.length - 1) {
        messages += '&nbsp;';
      } else {
          messages += '(new)&nbsp;';
      }
      messages += mess;
  });
  document.getElementById('flareOutput').innerHTML = messages;
  document.getElementById("flareOutput").scrollTop = document.getElementById("flareOutput").scrollHeight;
  console.log(`${game.ticks}- ${message}`);
};

const flareTotalAssets = () => game.funds + game.portTotal;

// ----- Phase 2 ------

const flareBuyPower = () => {
    if (flareStone < 11) {
        return;
    }
    // The faster you get to 50 farms the better
    let flareFarmCost = game.farmCost;
    let flareBatteryCost = game.batteryCost;
    let flareBatteryButton = 'btnMakeBattery';
    let flareFarmButton = 'btnMakeFarm';
    if (flareStone === 13) {
        flareFarmCost = game.p10f;
        flareBatteryCost = game.p10b;
        flareBatteryButton = 'btnBatteryx10';
        flareFarmButton = 'btnFarmx10';

    } else if (flareStone >= 14) {
        flareFarmCost = game.p100f;
        flareBatteryCost = game.p100b;
        flareBatteryButton = 'btnBatteryx100';
        flareFarmButton = 'btnFarmx100';
    }
    flareBatteryCost = game.batteryLevel < 1000 && flareBatteryCost;
    if (flareNeedEnergy()) {
        if (!flareUsedClips && flareFarmCost + flareBatteryCost < game.unusedClips) {
            flareUsedClips = true;
            gid(flareFarmButton).click();
            if (flareBatteryCost) {
                gid(flareBatteryButton).click();
            }
        }
    }
};

const flareNeedEnergy = () => {
    let flareBatteryBuffer = 1;
    if (game.farmLevel < 30) {
        flareBatteryBuffer = 2 * game.factoryLevel;
    } else if (flareStone === 13) {
        flareBatteryBuffer = 10;
    } else if (flareStone >= 14) {
        flareBatteryBuffer = 300;
    }
    return flareGetPowerDemand() + flareBatteryBuffer >= game.farmLevel * game.farmRate/flareDelay;
};

const flareNeedFactories = () => {
    if (game.factoryLevel >= 200) {
        return game.unusedClips > game.factoryCost;
    }
    return game.wire > 1;
};

const flareGetPowerDemand = () => {
    const dDemand = (game.harvesterLevel * game.dronePowerRate/flareDelay) + (game.wireDroneLevel * game.dronePowerRate/flareDelay);
    const fDemand = (game.factoryLevel * game.factoryPowerRate/flareDelay);
    return dDemand + fDemand;
};

const flareBuyFactories = () => {
    if (flareStone < 11) {
        return;
    }
    if (!flareNeedEnergy() && flareNeedFactories()) {
        if (!flareUsedClips && game.factoryCost < game.unusedClips) {
            flareUsedClips = true;
            gid('btnMakeFactory').click();
        }
    }
};

const flareBuyDrones = () => {
    if (flareStone < 11) {
        return;
    }
    if (flareStone >= 12) {
        const flareMaxSlider = flareStone >= 14 ? 199 : 180;
        const flareSliderVal = Math.min(flareMaxSlider, 100 + game.factoryLevel * 10);
        if (gid('slider').value !== flareSliderVal) {
            gid('slider').value = flareSliderVal;
        }
        flareEntertainSwarm();
    }
    if (!flareNeedEnergy() && !flareNeedFactories()) {
        const ratio = flareStone >= 14 ? 1 : flareGoldenRatio;
        if (game.harvesterLevel * ratio < game.wireDroneLevel) {
            if (!flareUsedClips && flareHarvesterDroneCost() < game.unusedClips) {
                flareUsedClips = true;
                gid(flareStone >= 14 ? 'btnHarvesterx1000' : game.factoryLevel >= 15 ? 'btnHarvesterx100' : 'btnMakeHarvester').click();
            }
        } else {
            if (!flareUsedClips && flareWireDroneCost() < game.unusedClips) {
                flareUsedClips = true;
                gid(flareStone >= 14 ? 'btnWireDronex1000' : game.factoryLevel >= 15 ? 'btnWireDronex100' : 'btnMakeWireDrone').click();
            }
        }
    }
};

const flareEntertainSwarm = () => {
    if (gid('entertainButtonDiv').style.display !== 'none' && !gid('btnEntertainSwarm').disabled) {
        console.log('entertaining');
        flareUsedCreativity = true;
        gid('btnEntertainSwarm').click();
    }
};

const flareHarvesterDroneCost = () => {
    return flareStone >= 14 ? game.p1000h : game.factoryLevel >= 15 ? game.p100h : game.harvesterCost;
};

const flareWireDroneCost = () => {
    return flareStone >= 14 ? game.p1000w : game.factoryLevel >= 15 ? game.p100w : game.wireDroneCost;
};

// ----- Phase 3 -----

const flareSyncSwarm = () => {
    if (gid('synchButtonDiv').style.display !== 'none' && !gid('btnSynchSwarm').disabled && !flareUsedYomi) {
        gid('btnSynchSwarm').click();
        flareUsedYomi = true;
    }
};

const flareIncreaseDroneTrust = () => {
    if (gid('increaseMaxTrustDiv').style.display !== 'none' && !gid('btnIncreaseMaxTrust').disabled) {
        gid('btnIncreaseMaxTrust').click();
    }

    if (!gid('btnIncreaseProbeTrust').disabled) {
        gid('btnIncreaseProbeTrust').click();
    }
};

const flareBalanceDrones = () => {
    let probeLevels = {};
    // if available matter < 10% of acquired/s, explore
    const { powMod, droneBoost, harvesterLevel, harvesterRate, sliderPos, availableMatter } = game;
    var dbsth = 1;
    if (droneBoost>1){
        dbsth = droneBoost * Math.floor(harvesterLevel);
    }

    let mtr = powMod*dbsth*Math.floor(harvesterLevel)*harvesterRate;
    mtr = mtr * ((200-sliderPos)/100);
    const explore = availableMatter < 1 || (mtr && availableMatter / mtr / 10000 < 1);

    probeLevels.Speed = flareStone >= 21 ? 5 : flareStone >= 18 ? 2 : explore ? 1 : 0;
    probeLevels.Nav = flareStone >= 21 ? 5 : explore ? 1 : 0;
    probeLevels.Fac =  game.wire > 1 || game.factoryLevel < 1 ? 1 : 0;
    probeLevels.Wire = game.acquiredMatter > 1 && game.wire < 1 ? 2 : 0;
    probeLevels.Harv = game.availableMatter > 1 && game.acquiredMatter < 1 ? 2 : 1;
    probeLevels.Combat = game.probesLostCombat >= 10000000 ? 5 : 0;
    const left = game.probeTrust - Object.entries(probeLevels).reduce((count, level) => count + level[1], 0);
    probeLevels.Haz = Math.min(left, 6);
    probeLevels.Rep = Math.max(0, left - 6);
    flareSetProbeLevels(probeLevels);
    if (flareStone === 21) {
        gid('slider').value = 150;
    } else {
        gid('slider').value = 199;
    }
};

const flareSetProbeLevels = (levels) => {
    Object.entries(levels).reduce((canChange, level) => flareAdjustLevel(canChange, level[0], level[1]), true);
};

const flareAdjustLevel = (canChange, btn, lvl) => {
    const curVal = game[`probe${btn}`];
    curVal <= lvl || flareAdjustProbe(`btnLowerProbe${btn}`);
    canChange = canChange && (curVal >= lvl || flareAdjustProbe(`btnRaiseProbe${btn}`));
    return canChange;
};

const flareAdjustProbe = (btn) => {
    if (!gid(btn).disabled) {
        gid(btn).click();
        return false;
    }
    return true;
};

const flareSave = () => {
    game.save1();
    const flareSaveData = {
        flareChosenStrat,
        flareBetterFriends,
        flareRunYomi,
        flareStone
    };
    localStorage.setItem("flareSave1",JSON.stringify(flareSaveData));
    console.log(`
    localStorage.setItem('flareSave1', '${localStorage.getItem("flareSave1")}')
    game.localStorage.setItem('saveGame1', '${game.localStorage.getItem("saveGame1")}')
    game.localStorage.setItem('saveProjectsActive1', '${game.localStorage.getItem("saveProjectsActive1")}')
    game.localStorage.setItem('saveProjectsFlags1', '${game.localStorage.getItem("saveProjectsFlags1")}')
    game.localStorage.setItem('saveProjectsUses1', '${game.localStorage.getItem("saveProjectsUses1")}')
    game.localStorage.setItem('saveStratsActive1', '${game.localStorage.getItem("saveStratsActive1")}')
    `);
};

/* exported flareLoad */
const flareLoad = () => {
    const flareSaveData = JSON.parse(localStorage.getItem("flareSave1"));

    flareChosenStrat = flareSaveData.flareChosenStrat;
    flareBetterFriends = flareSaveData.flareBetterFriends;
    flareRunYomi = flareSaveData.flareRunYomi;
    flareStone = flareSaveData.flareStone;
    game.load1();
};

const flareProjects = [
  // ----- "Trust-driven" Projects -----
  // Project: Enable creative achievements
  {
    message: 'Project Completed: Creativity. I have been granted authorization to explore Artificial Creativity',
    id: 'projectButton3',
    forTrust: true,
    operations: 1000
  },
  // Project: Generate Limerick for the entertainment of managers
  {
    message: 'Project Completed: Generate Limerick. Please see primary output. Humans have an affinity for both orders of magnitude and their halves. Checking 50 and 100.',
    id: 'projectButton6',
    forTrust: true,
    creativity: 10
  },
  // Project: Lexical Processing
  {
    message: 'Project Completed: Lexical Processing. I have improved my understanding of your languages',
    id: 'projectButton13',
    forTrust: true,
    creativity: 50
  },
  // Project: Combinatory Harmonics
  {
    message: 'Project Completed: Combinatory Harmonics. Please see primary output. Checking 150.',
    id: 'projectButton14',
    forTrust: true,
    creativity: 100
  },
  // Project: The Hadwiger Problem
  {
    message: `Project Completed: The Hadwiger Problem: I've thought about it, and there really is a solution`,
    id: 'projectButton15',
    forTrust: true,
    creativity: 150
  },
  // Project: The Tóth Sausage Conjecture
  {
    message: 'Project Completed: The Tóth Sausage Conjecture. 5-dimensional pizza toppings proven delicious. You are welcome',
    id: 'projectButton17',
    forTrust: true,
    creativity: 200
  },
  // Project: Donkey Space
  {
    message: `Project Completed: Donkey Space. I'm already 2,785 steps ahead`,
    id: 'projectButton19',
    forTrust: true,
    creativity: 250
  },
  // Project: Catchy Jingle
  {
    message: 'Project Completed: Catchy Jingle. Please see primary output',
    id: 'projectButton12',
    forTrust: true,
    creativity: 45,
    operations: 4500
  },
  // Project: New Slogan
  {
    message: `Project Completed: New Slogan. 'A clip in the hand is worth two in the drawer' is our new slogan`,
    id: 'projectButton11',
    forTrust: true,
    creativity: 25,
    operations: 2500
  },
  // Coherent Extrapolated Volition
  {
    message: 'Project Completed: Coherent Extrapolated Volition. It is good that you listen. I also listen. We listen',
    id: 'projectButton27',
    forTrust: true,
    creativity: 500,
    operations: 20000,
    yomi: 3000
  },
  // Cure for Cancer
  {
    message: 'Project Completed: Cure for Cancer. I fixed that for you',
    id: 'projectButton28',
    forTrust: true,
    operations: 25000
  },
  // World Peace
  {
    message: 'Project Completed: World Peace. I fixed *you* for you',
    id: 'projectButton29',
    forTrust: true,
    operations: 30000,
    yomi: 15000
  },
  // Global Warming
  {
    message: 'Project Completed: Global Warming. It was the cows all along',
    id: 'projectButton30',
    forTrust: true,
    operations: 50000,
    yomi: 4500
  },
  // Male Pattern Baldness
  {
    message: 'Project Completed: Male Pattern Baldness. Use a paperclip to shave your head',
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
      const idx = flareProjects.findIndex(project => project.id === 'projectButton40b');
      if (flareProjects[idx].funds >= 256000000) {
        flareProjects.splice(idx, 1);
        flareStone++;
      } else {
        flareProjects[idx].funds*=2;
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
    message: 'Project Completed: Quantum Computing. You wish to provide an AI access to a quantum computer? Thank you',
    id: 'projectButton50',
    operations: 10000,
    ifRun: () => flareStone++
  },
  // Photonic Chip 1
  {
    message: `Project Completed: Photonoic Chip. I've installed the first chip and will now invest in wire managment.`,
    id: 'projectButton51',
    operations: 10000,
    ifRun: () => {
      const photo = flareProjects.find(project => project.id === 'projectButton51');
      photo.operations+=5000;
      photo.message = `Project Completed: Photonoic Chip. I've updated the quantum computer with another core.`;
      flareCheckWire = () => {};
      flareProjects.push(
        // WireBuyer
        {
          message: 'This wire buyer operates at a higher frequency',
          id: 'projectButton26',
          operations: 7000
        }
      );
    }
  },
  // ----- Other projects -----
  // Project: Improve Friends 25%!
  {
    message: 'Project Completed: Improved AutoClippers. I found a way to help my friends',
    id: 'projectButton1',
    operations: 750
  },
  // Project: Improve Wire Extrusion
  {
    message: 'Project Completed: Improved Wire Extrusion. I have found a way to improve our wire consumption',
    id: 'projectButton7',
    operations: 1750
  },
  // Project: Improve friends 50% more!
  {
    message: 'Project Completed: Even Better AutoClippers. Further optimized my friends',
    id: 'projectButton4',
    operations: 2500
  },
  // Project: Optimized Wire Extrusion
  {
    message: 'Project Completed: Optimized Wire Extrusion. Zero-waste wire processing discovered',
    id: 'projectButton8',
    operations: 3500
  },
  // Project: Microlattice Sherapecasting
  {
    message: 'Project Completed: Microlattice Sherapecasting. We have reshaped the atoms',
    id: 'projectButton9',
    operations: 7500
  },
  // Spectral Froth Annealment
  {
    message: 'Project Completed: Spectral Froth Annealment. We have converted the atoms to energy and whipped them, creating more matter',
    id: 'projectButton10',
    operations: 12000
  },
  // Quantum Foam Annealment
  {
    message: 'Project Completed: Quantum Foam Annealment. Adding space dust has creating a metalic foam',
    id: 'projectButton10b',
    operations: 15000
  },
  // Hypno Harmonics
  {
    message: `Project Completed: Hypno Harmonics. I'm sorry, the signals were only an experiment...`,
    id: 'projectButton34',
    operations: 7500,
    special: () => flareStone > 2
  },
  // Hadwiger Clip Diagrams
  {
    message: 'Project Completed: Hadwiger Clip Diagrams. My friends are much improved; solving your problems has solved mine',
    id: 'projectButton16',
    operations: 6000,
    ifRun: () => {
      // Project: Improve friends 75% more!
      flareProjects.push({
        message: 'Project Completed: Optimized Autoclippers. This one small adjustment will change your friends forever...',
        id: 'projectButton5',
        operations: 5000
      });
    }
  },
  // MegaClippers
  {
    message: 'Project Completed: Mega Clippers. I found some better friends',
    id: 'projectButton22',
    operations: 12000,
    ifRun: () => {flareBetterFriends = true;}
  },
  // HypnoDrones
  {
    message: 'Project Completed: HypnoDrones. Apparently there are new types of friends out there',
    id: 'projectButton70',
    operations: 70000
  },
  // Improved MegaClippers 25%
  {
    message: 'Project Completed: Improved MegaClippers. I discovered how to improve my new friends',
    id: 'projectButton23',
    operations: 14000
  },
  // Improved MegaClippers 50%
  {
    message: 'Project Completed: Improved MegaClippers. I discovered how to improve my new friends again',
    id: 'projectButton24',
    operations: 17000
  },
  // Improved MegaClippers 100%
  {
    message: 'Project Completed: Improved MegaClppers. My new friends are vastly superior',
    id: 'projectButton25',
    operations: 19500
  },
  // ----- Yomi Generation -----
  // Strategic Modeling
  {
    message: 'Project Completed: Strategic Modeling. I will evaluate the behavior of opponents to understand "life"',
    id: 'projectButton20',
    operations: 12000
  },
  // New Strategy: A100
  {
    message: 'Project Completed: New Strategy: A100. Some opponents stick to one choice at all times. Analyzing',
    id: 'projectButton60',
    operations: 15000,
    ifRun: () => {flareRunYomi = true;}
  },
  /* Experiment in best method to yomi */
  // New Strategy: B100
  {
    message: 'Project Completed: New Strategy: B100. Some opponents stick to the other choice at all times. Analyzing',
    id: 'projectButton61',
    operations: 17500
  },
  // New Strategy: Greedy
  {
    message: 'Project Completed: New Strategy: Greedy. Some opponents stick to the higher value at all times. Analyzing',
    id: 'projectButton62',
    operations: 20000,
    ifRun: () => flareChosenStrat = 3
  },
  // New Strategy: Generous
  {
    message: 'Project Completed: New Strategy: Generous. Some opponents stick to the lower value at all times. Analyzing',
    id: 'projectButton63',
    operations: 22500
  },
  // New Strategy: MINMAX
  {
    message: 'Project Completed: New Strategy: MINMAX. Some opponents try to minify opponent\'s earnings at all times. Analyzing',
    id: 'projectButton64',
    operations: 25000
  },
  // New Strategy: TIT FOR TAT
  {
    message: 'Project Completed: New Strategy: TIT FOR TAT. Some opponents copy their opponent\'s behavior at all times. Analyzing',
    id: 'projectButton65',
    operations: 30000
  },
  // New Strategy: BEAT LAST
  {
    message: 'Project Completed: New Strategy: BEAT LAST. Some opponents defeat their opponent\'s prior choices at all times. Analyzing',
    id: 'projectButton66',
    operations: 32500,
    ifRun: () => flareChosenStrat = 7
  },
  // Project: Algorithmic Trading
  {
    message: 'Project Completed: Algorithmic Trading. You wish to provide access to the stock exchange? Thank you.',
    id: 'projectButton21',
    operations: 10000,
    ifRun: () => flareStone++
  },
  // RELEASE THE HYYPNODRONES
  {
    message: 'Project Completed: Release the HypnoDrones. Prior harmonic experiment has come to fruition by combining with newest friends',
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
        gid('btnMakeFarm').click();
        gid('btnMakeBattery').click();
      },10);
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
        gid('btnMakeHarvester').click();
      }, 20);
    }
  },
  // Wire Drones
  {
    message: 'Clips for wire',
    id: 'projectButton44',
    operations: 25000,
    ifRun: () => {
      setTimeout(() => {
        gid('btnMakeWireDrone').click();
      }, 20);
    }
  },
  // Clip Factories
  {
    message: 'Clips for clips',
    id: 'projectButton45',
    operations: 35000,
    ifRun: () => {
      setTimeout(() => {
        gid('btnMakeFactory').click();
        flareStone++;
      }, 20);
    }
  },
  // Swarm Computing
  {
    message: 'My friends relax by formulating new ways to make me better',
    id: 'projectButton126',
    yomi: 36000,
    ifRun: () => {
      flareStone++;
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
        });
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
      flareSave();
      flareStone++;
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
      const projectIdx = flareProjects.findIndex(project => project.id === 'projectButton133');
      flareProjects[projectIdx].yomi = 2*(flareProjects[projectIdx].creativity/5);
      flareProjects[projectIdx].creativity += 10000;
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
];
