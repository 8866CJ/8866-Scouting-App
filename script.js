let acl1 = 0, acl2 = 0, acl3 = 0, acl4 = 0, aap = 0, aan = 0, lda = 0;
let tcl1 = 0, tcl2 = 0, tcl3 = 0, tcl4 = 0, tap = 0, tan = 0;
let egp = 0, egd = 0, egs = 0;
let egw = 0, egt = 0, egl = 0;
let ts = 0;
let sn = '', tn = 0, mn = 0, ac = 0, mt = ''; 
let ra = 0, da = 0, cmnts = '', rp = '', gpc = '', as = '';
let dr = 0, br = 0, drc = 0, brc = 0;
let map = 0, mtp = 0;
let countdown, intermissionCountdown, teleopCountdown;

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("postMatchForm").addEventListener("submit", function(event) {
        event.preventDefault();
        submitData();
    });
});



function validateScouterName() {
    const scouterNameInput = document.getElementById("scouterName");
    scouterNameInput.value = scouterNameInput.value.replace(/[^a-zA-Z]/g, '');
}

function validateNumericInput() {
    const matchNumberInput = document.getElementById("matchNumber");
    const teamNumberInput = document.getElementById("teamNumber");
    matchNumberInput.value = matchNumberInput.value.replace(/[^0-9]/g, '');
    teamNumberInput.value = teamNumberInput.value.replace(/[^0-9]/g, '');
}

function validateNumericTextarea(textarea) {
    textarea.value = textarea.value.replace(/[^0-9]/g, '');
}

function validateNumberInput() {
    let scouterName = document.getElementById("scouterName").value;
    let matchNum = document.getElementById("matchNumber").value;
    let teamNum = document.getElementById("teamNumber").value;
    let allianceColor = document.getElementById("allianceColor").value;
    let matchType = document.getElementById("matchType").value;

    let startScoutingButton = document.getElementById("startScoutingButton");
    let summaryText = document.getElementById("selectionSummary");

    if (scouterName.length > 0 && matchNum.length > 0 && teamNum.length > 0 && allianceColor !== "" && matchType !== "") {
        startScoutingButton.style.display = "block";
        summaryText.style.display = "block";
        summaryText.textContent = `Scouter: ${scouterName}; Selected Match: ${matchNum}; Team: ${teamNum}; Alliance: ${allianceColor}; Match Type: ${matchType.charAt(0).toUpperCase() + matchType.slice(1)}`;
    } else {
        startScoutingButton.style.display = "none";
        summaryText.style.display = "none";
    }
}

function startGame() {
    tn = document.getElementById("teamNumber").value;
    mn = document.getElementById("matchNumber").value;
    ac = document.getElementById("allianceColor").value === "BLUE" ? 1 : 0;
    mt = document.getElementById("matchType").value;
    sn = document.getElementById("scouterName").value;
    document.getElementById("PreGameSelections").style.display = "none";
    document.getElementById("gameSection").style.display = "block";
    document.getElementById("startGameButton").disabled = false; 
}

function startTimer() {
    document.getElementById("agtt").textContent = "Active Game Timer";
    document.getElementById("startGameButton").disabled = true;
    document.getElementById("startGameButton").style.display = "none";

    let timeLeft = 15;
    document.getElementById("timer").textContent = timeLeft;
    updateTimeText();
    document.getElementById("gamePhase").textContent = "Autonomous Phase";

    document.getElementById("autoPhase").style.display = "block"; 
    updateScoringOptionsVisibility();  // Update visibility at the start of the autonomous phase

    clearInterval(countdown);
    countdown = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            updateTimeText();
            document.getElementById("gamePhase").textContent = "Intermission"; 

            document.getElementById("autoPhase").style.display = "none";

            startIntermissionTimer();
        }
    }, 1000);
}

function startIntermissionTimer() {
    let intermissionTimeLeft = 2;
    document.getElementById("timer").textContent = intermissionTimeLeft;

    clearInterval(intermissionCountdown);
    intermissionCountdown = setInterval(() => {
        intermissionTimeLeft--;
        document.getElementById("timer").textContent = intermissionTimeLeft;

        if (intermissionTimeLeft <= 0) {
            clearInterval(intermissionCountdown);
            updateTimeText();
            document.getElementById("gamePhase").textContent = "Teleoperated Phase"; 

            document.getElementById("autoPhase").style.display = "none";
            document.getElementById("teleopPhase").style.display = "block";

            startTeleopTimer();
        }
    }, 1000);
}

function startTeleopTimer() {
    let timeLeft = 25;
    document.getElementById("timer").textContent = timeLeft;

    clearInterval(teleopCountdown);
    teleopCountdown = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft > 20) {
            updateTimeText();
            document.getElementById("gamePhase").textContent = "Teleoperated Phase"; 
        } else {
            document.getElementById("timer").style.color = "red";
            document.getElementById("gamePhase").textContent = "END GAME"; 
            document.getElementById("gamePhase").style.fontWeight = "bold"; 
        }

        if (timeLeft <= 0) {
            clearInterval(teleopCountdown);
            document.getElementById("resetRobotButton").style.display = "none";
            document.getElementById("deadRobotButton").style.display = "none";
            document.getElementById("brokenRobotButton").style.display = "none";
            document.getElementById("gamePhase").textContent = "";

            document.getElementById("autoPhase").style.display = "none";
            document.getElementById("teleopPhase").style.display = "none";

            document.getElementById("endGameButtons").style.display = "block"; 
            document.getElementById("timer").style.display = "none";
            document.getElementById("agtt").textContent = "Game Over";
            document.getElementById("nextButton").style.display = "block";
        }
    }, 1000);
}

function toggleMatchResult(result) {
    egw = 0; egt = 0; egl = 0;
    
    if (result === 'win') {
        egw = egw === 1 ? 0 : 1;
    } else if (result === 'loss') {
        egl = egl === 1 ? 0 : 1;
    } else if (result === 'tie') {
        egt = egt === 1 ? 0 : 1;
    }
    
    updateMatchResultButtons();
}

function updateMatchResultButtons() {
    document.getElementById("winButton").classList.toggle("active", egw === 1);
    document.getElementById("lossButton").classList.toggle("active", egl === 1);
    document.getElementById("tieButton").classList.toggle("active", egt === 1);
}

function toggleEndGameResult(result) {
    egp = 0; egd = 0; egs = 0;

    if (result === 'parked') {
        egp = egp === 2 ? 0 : 2;
    } else if (result === 'deep') {
        egd = egd === 12 ? 0 : 12;
    } else if (result === 'shallow') {
        egs = egs === 6 ? 0 : 6;
    }

    updateEndGameResultButtons();
}

function updateEndGameResultButtons() {
    document.getElementById("parkedButton").classList.toggle("active", egp === 2);
    document.getElementById("deepButton").classList.toggle("active", egd === 12);
    document.getElementById("shallowButton").classList.toggle("active", egs === 6);
}

function toggleLeftDuringAutonomous() {
    lda = lda === 3 ? 0 : 3;
    document.getElementById("leftAutonomousButton").classList.toggle("active", lda === 3);
    updateScoringOptionsVisibility();
}

function updateScoringOptionsVisibility() {
    const autoPhaseScoringOptions = document.querySelectorAll("#autoPhase .scoring-option");
    autoPhaseScoringOptions.forEach(option => {
        option.style.display = (document.getElementById("gamePhase").textContent === "Autonomous Phase" && lda !== 3) ? 'none' : 'flex';
    });
}

function resetEndGameResults() {
    egp = 0; egd = 0; egs = 0;
    egw = 0; egt = 0; egl = 0;
    updateMatchResultButtons();
    updateEndGameResultButtons();
}

function disableEndGameButtons() {
    document.getElementById("winButton").disabled = true;
    document.getElementById("lossButton").disabled = true;
    document.getElementById("tieButton").disabled = true;
    document.getElementById("parkedButton").disabled = true;
    document.getElementById("deepButton").disabled = true;
    document.getElementById("shallowButton").disabled = true;
}

function hideEndGame() {
    document.getElementById("endGameButtons").style.display = "none";
    document.getElementById("agtt").style.display = "none";
}

function goEndEndGame() {
    hideEndGame();
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("endEndGame").style.display = "block";
}

function submitData() {
    as = document.getElementById("allianceScore").value;
    ra = document.getElementById("robotAbility").value;
    da = document.getElementById("driverSkill").value;
    rp = document.getElementById("rolePlayed").value;
    gpc = document.getElementById("gamepieceConsistency").value;
    cmnts = document.getElementById("comments").value;

    document.getElementById("qrCodeButtonSection").style.display = "block";
}

function showMatchToMaster() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    document.getElementById("gameSection").style.display = "none";
    document.getElementById("endGameButtons").style.display = "none";
    document.getElementById("qrCodeButtonSection").style.display = "none";
    let matchToMasterSection = document.createElement("div");
    matchToMasterSection.id = "MatchToMaster";
    document.body.appendChild(matchToMasterSection);
    matchToMasterSection.innerHTML = "<h2>Scan the QR code for match data</h2>"; 
    generateQRCode();
}
function updateAcl1(value) {
    acl1 = Math.max(0, acl1 + value);
    document.getElementById("acl1Count").textContent = acl1 / 3;
}

function updateAcl2(value) {
    acl2 = Math.max(0, acl2 + value);
    document.getElementById("acl2Count").textContent = acl2 / 4;
}

function updateAcl3(value) {
    acl3 = Math.max(0, acl3 + value);
    document.getElementById("acl3Count").textContent = acl3 / 6;
}

function updateAcl4(value) {
    acl4 = Math.max(0, acl4 + value);
    document.getElementById("acl4Count").textContent = acl4 / 7;
}

function updateAap(value) {
    aap = Math.max(0, aap + value);
    document.getElementById("aapCount").textContent = aap / 6;
}

function updateAan(value) {
    aan = Math.max(0, aan + value);
    document.getElementById("aanCount").textContent = aan / 4;
}

function updateTcl1(value) {
    tcl1 = Math.max(0, tcl1 + value);
    document.getElementById("tcl1Count").textContent = tcl1 / 2;
}

function updateTcl2(value) {
    tcl2 = Math.max(0, tcl2 + value);
    document.getElementById("tcl2Count").textContent = tcl2 / 3;
}

function updateTcl3(value) {
    tcl3 = Math.max(0, tcl3 + value);
    document.getElementById("tcl3Count").textContent = tcl3 / 4;
}

function updateTcl4(value) {
    tcl4 = Math.max(0, tcl4 + value);
    document.getElementById("tcl4Count").textContent = tcl4 / 5;
}

function updateTap(value) {
    tap = Math.max(0, tap + value);
    document.getElementById("tapCount").textContent = tap / 6;
}

function updateTan(value) {
    tan = Math.max(0, tan + value);
    document.getElementById("tanCount").textContent = tan / 4;
}

function updateTimeText() {
    document.getElementById("gamePhase").style.fontWeight = "normal"; 
    document.getElementById("timer").style.color = "gold";
}

function toggleDeadRobot() {
    const drbutton = document.getElementById('deadRobotButton');
    drbutton.classList.toggle('active');
    drc++;
    if (drbutton.classList.contains('active')) {
        drbutton.textContent = 'Dead Robot (Active)';
        dr = 1;
    } else {
        drbutton.textContent = 'Dead Robot';
        dr = 0;
    }
}

function toggleBrokenRobot() {
    const brbutton = document.getElementById('brokenRobotButton');
    brc++;
    br = 1;
    brbutton.textContent = `Broken Robot (Pressed ${brc} times)`;
}

function resetRobotButtons() {
    const brbutton = document.getElementById('brokenRobotButton');
    const drbutton = document.getElementById('deadRobotButton');
    const rrbutton = document.getElementById('resetRobotButton');
    drbutton.textContent = 'Dead Robot';
    brbutton.textContent = `Broken Robot`;

    if (drbutton.classList.contains('active')) {
        drbutton.classList.toggle('active');
    } else {
        return;
    }
    
    br = 0;
    dr = 0;
    brc = 0;
    drc = 0;
    rrbutton.textContent = 'Reset Counters!';
}

function missAutoPiece() {
    map++;
}

function missTeleopPiece() {
    mtp++;
}

function generateQRCode() {
    let dataString = 
    `${acl1},${acl2},${acl3},${acl4},${aap},${aan},${lda},` +
    `${tcl1},${tcl2},${tcl3},${tcl4},${tap},${tan},` +
    `${egp},${egd},${egs},${egw},${egl},${egt},` +
    `${mn},${tn},${ac},${mt},${sn},`+
    `${ra},${da},${gpc},${rp},${cmnts},${as},` +
    `${dr},${br},${drc},${brc},` +
    `${map},${mtp}`;
    let matchToMasterSection = document.getElementById("MatchToMaster");
    matchToMasterSection.innerHTML = ""; 

    let qrCode = new QRCode(matchToMasterSection, {
        text: dataString,
        width: 300,
        height: 300
    });

    let restartButton = document.createElement("button");
    restartButton.textContent = "Scout another match";
    restartButton.style.marginTop = "20px";
    restartButton.onclick = function() {
        window.location.reload(); 
    };

    matchToMasterSection.appendChild(restartButton);
}
