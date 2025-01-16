let acl1 = 0, acl2 = 0, acl3 = 0, acl4 = 0, aap = 0, aan = 0, lda = 0;
let tcl1 = 0, tcl2 = 0, tcl3 = 0, tcl4 = 0, tap = 0, tan = 0;
let egp = 0, egd = 0, egs = 0;
let egw = 0, egt = 0, egl = 0;
let ts = 0;
let tn = 0, mn = 0, ac = 0, mt = ''; 
let countdown, intermissionCountdown, teleopCountdown;

function validateNumberInput() {
    let matchNum = document.getElementById("matchNumber").value;
    let teamNum = document.getElementById("teamNumber").value;
    let allianceColor = document.getElementById("allianceColor").value;
    let matchType = document.getElementById("matchType").value;

    let startScoutingButton = document.getElementById("startScoutingButton");
    let summaryText = document.getElementById("selectionSummary");

    if (matchNum.length > 0 && teamNum.length > 0 && allianceColor !== "" && matchType !== "") {
        startScoutingButton.style.display = "block";
        summaryText.style.display = "block";
        summaryText.textContent = `Selected Match: ${matchNum}; Team: ${teamNum}; Alliance: ${allianceColor}; Match Type: ${matchType.charAt(0).toUpperCase() + matchType.slice(1)}`;
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
    document.getElementById("PreGameSelections").style.display = "none";
    document.getElementById("gameSection").style.display = "block";
    document.getElementById("startGameButton").disabled = false; 
}

function startTimer() {
    document.getElementById("startGameButton").disabled = true;
    document.getElementById("startGameButton").style.display = "none";

    let timeLeft = 15;
    document.getElementById("timer").textContent = timeLeft;
    document.getElementById("gamePhase").style.fontWeight = "normal"; 
    document.getElementById("timer").style.color = "black";
    document.getElementById("gamePhase").textContent = "Autonomous Phase";

    document.getElementById("autoPhase").style.display = "block"; 

    clearInterval(countdown);
    countdown = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById("gamePhase").style.fontWeight = "normal"; 
            document.getElementById("timer").style.color = "black";
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
            document.getElementById("gamePhase").style.fontWeight = "normal"; 
            document.getElementById("timer").style.color = "black";
            document.getElementById("gamePhase").textContent = "Teleoperated Phase"; 

            document.getElementById("autoPhase").style.display = "none";
            document.getElementById("teleopPhase").style.display = "block";

            startTeleopTimer();
        }
    }, 1000);
}

function startTeleopTimer() {
    let timeLeft = 22;
    document.getElementById("timer").textContent = timeLeft;

    clearInterval(teleopCountdown);
    teleopCountdown = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft > 135) {
            document.getElementById("timer").style.color = "black"; 
            document.getElementById("gamePhase").textContent = "Teleoperated Phase"; 
            document.getElementById("gamePhase").style.fontWeight = "normal"; 
        } else {
            document.getElementById("timer").style.color = "red";
            document.getElementById("gamePhase").textContent = "END GAME"; 
            document.getElementById("gamePhase").style.fontWeight = "bold"; 
        }

        if (timeLeft <= 0) {
            clearInterval(teleopCountdown);
            document.getElementById("gamePhase").textContent = "";

            document.getElementById("autoPhase").style.display = "none";
            document.getElementById("teleopPhase").style.display = "none";

            document.getElementById("endGameButtons").style.display = "block"; 
            document.getElementById("timer").style.display = "none";
            document.getElementById("agtt").textContent = "Game Over";
            document.getElementById("qrCodeButtonSection").style.display = "block";
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
}

function disableEndGameButtons() {
    document.getElementById("winButton").disabled = true;
    document.getElementById("lossButton").disabled = true;
    document.getElementById("tieButton").disabled = true;
    document.getElementById("parkedButton").disabled = true;
    document.getElementById("deepButton").disabled = true;
    document.getElementById("shallowButton").disabled = true;
}

function showMatchToMaster() {
    document.getElementById("gameSection").style.display = "none";
    document.getElementById("endGameButtons").style.display = "none";
    document.getElementById("qrCodeButtonSection").style.display = "none";
    let matchToMasterSection = document.createElement("div");
    matchToMasterSection.id = "MatchToMaster";
    document.body.appendChild(matchToMasterSection);
    matchToMasterSection.innerHTML = "<h2>Scan the QR code for match data</h2>"; 
    generateQRCode();
}

function updateAcl1() { acl1 += 3; }
function updateAcl2() { acl2 += 4; }
function updateAcl3() { acl3 += 6; }
function updateAcl4() { acl4 += 7; }
function updateAap() { aap += 6; }
function updateAan() { aan += 4; }
function updateLda() { lda = lda === 3 ? 0 : 3; }

function updateTcl1() { tcl1 += 2; }
function updateTcl2() { tcl2 += 3; }
function updateTcl3() { tcl3 += 4; }
function updateTcl4() { tcl4 += 5; }
function updateTap() { tap += 6; }
function updateTan() { tan += 4; }

function generateQRCode() {
    let dataString = `${acl1},${acl2},${acl3},${acl4},${aap},${aan},${lda},` +
                     `${tcl1},${tcl2},${tcl3},${tcl4},${tap},${tan},` +
                     `${egp},${egd},${egs},` + `${egw},${egl},${egt},` + `${mn},${tn},${ac},${mt},0`;

    let matchToMasterSection = document.getElementById("MatchToMaster");
    matchToMasterSection.innerHTML = ""; // Clear previous QR code if any

    let qrCode = new QRCode(matchToMasterSection, {
        text: dataString,
        width: 300,
        height: 300
    });

    // Add a restart button
    let restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.onclick = function() {
        window.location.reload(); 
    };

    matchToMasterSection.appendChild(restartButton);
}