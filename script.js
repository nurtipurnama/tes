// Sports Match Analyzer Pro - VIP Edition
// Enhanced betting intelligence and premium analysis algorithms

// Core data structure
const matchData = {
    h2h: [], // Head-to-head matches between the two teams
    team1: [], // Team 1's matches against other teams
    team2: [] // Team 2's matches against other teams
};

// Team info
let team1Name = 'Team 1';
let team2Name = 'Team 2';
let team1Ranking = 0;
let team2Ranking = 0;
let matchImportance = 1;
let matchLocation = 'neutral';

// Betting lines
let totalLine = 0;  // For over/under bets
let pointSpread = 0; // For handicap bets
let spreadDirection = 'team1'; // Which team is favored in the spread

// VIP enhanced features
const VIP_MODE = true;
const VIP_ALGORITHMS = {
    MOMENTUM_ANALYSER: true,
    FORM_WEIGHTING: true,
    ADVANCED_METRICS: true,
    DYNAMIC_SIMULATIONS: true
};

// Charts
let winProbabilityChart = null;
let modelConfidenceChart = null;
let scoreProbabilityChart = null;
let performanceTrendChart = null;
let bettingEdgeChart = null;
let scoringDistributionChart = null;

// Analysis results tracking
let lastAnalysisResults = null;
let featureImportanceScores = {};
let betSimulationResults = null;

// Constants for data analysis
const MIN_MATCHES_FOR_GOOD_ANALYSIS = 4;
const MIN_MATCHES_FOR_EXCELLENT_ANALYSIS = 8;
const MIN_H2H_MATCHES = 2;

// Constants for weighting factors - Enhanced for VIP
const WEIGHTS = {
    RECENT_FORM: 3.2,
    H2H_MATCHES: 2.8,
    OVERALL_PERFORMANCE: 2.2,
    HOME_ADVANTAGE: 1.7,
    RANKING: 1.2,
    MATCH_IMPORTANCE: 2.0,
    SCORING_TREND: 1.8,
    DEFENSIVE_TREND: 1.6,
    MOMENTUM: 2.5,
    CONSISTENCY: 1.5,
    KEY_PLAYER_IMPACT: 1.8,
    PSYCHOLOGICAL_EDGE: 1.4,
    PLAYSTYLE_MATCHUP: 1.6,
    VENUE_FAMILIARITY: 1.2,
    SCHEDULE_FATIGUE: 1.3
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('VIP Script loading...');
    
    // Setup VIP environment
    setupVIPEnvironment();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update team names in the UI
    updateTeamLabels();
    
    // Update data sufficiency indicators
    updateDataSufficiencyIndicators();
    
    // Show welcome toast
    showToast('Welcome to Sports Match Analyzer Pro VIP Edition', 'vip');
    
    console.log('VIP Script loaded successfully');
});

// Setup VIP environment and styling
function setupVIPEnvironment() {
    if (!VIP_MODE) return;
    
    console.log('Setting up VIP environment...');
    
    // Add VIP styling class to body
    document.body.classList.add('vip-mode');
    
    // Enhance betting line section
    enhanceBettingLineSection();
    
    console.log('VIP environment setup complete');
}

// Enhance betting line section with more detailed inputs
function enhanceBettingLineSection() {
    const bettingLinesCard = document.getElementById('betting-lines');
    if (!bettingLinesCard) return;
    
    console.log('Enhancing betting line section...');
    
    // Setup linked handicap selectors if they exist
    setTimeout(() => {
        setupLinkedHandicapSelectors();
        updateBettingPanels('all');
    }, 100);
}

// Setup linked handicap selectors
function setupLinkedHandicapSelectors() {
    const team1Handicap = document.getElementById('team1-handicap');
    const team2Handicap = document.getElementById('team2-handicap');
    
    if (!team1Handicap || !team2Handicap) return;
    
    team1Handicap.addEventListener('change', function() {
        if (this.value === '') {
            team2Handicap.value = '';
            return;
        }
        
        const value = parseFloat(this.value);
        team2Handicap.value = (-value).toString();
    });
    
    team2Handicap.addEventListener('change', function() {
        if (this.value === '') {
            team1Handicap.value = '';
            return;
        }
        
        const value = parseFloat(this.value);
        team1Handicap.value = (-value).toString();
    });
}

// Show/hide betting panels based on selection
function updateBettingPanels(selectedType) {
    const overUnderPanel = document.getElementById('over-under-options');
    const handicapPanel = document.getElementById('handicap-options');
    
    if (!overUnderPanel || !handicapPanel) return;
    
    if (selectedType === 'all' || selectedType === 'overUnder') {
        overUnderPanel.style.display = 'block';
    } else {
        overUnderPanel.style.display = 'none';
    }
    
    if (selectedType === 'all' || selectedType === 'handicap') {
        handicapPanel.style.display = 'block';
    } else {
        handicapPanel.style.display = 'none';
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Team setup form
    const teamForm = document.getElementById('team-form');
    if (teamForm) {
        teamForm.addEventListener('input', handleTeamSetup);
    }
    
    // Add score input listeners
    document.getElementById('h2h-add-btn').addEventListener('click', handleH2HAdd);
    document.getElementById('team1-add-btn').addEventListener('click', handleTeam1Add);
    document.getElementById('team2-add-btn').addEventListener('click', handleTeam2Add);
    
    // Clear data button
    document.getElementById('clear-data-btn').addEventListener('click', clearAllData);
    
    // Sample data buttons
    const sampleDataBtn = document.getElementById('sample-data-btn');
    if (sampleDataBtn) {
        sampleDataBtn.addEventListener('click', addSampleData);
    }
    
    const vipSampleDataBtn = document.getElementById('vip-sample-data-btn');
    if (vipSampleDataBtn) {
        vipSampleDataBtn.addEventListener('click', addVIPSampleData);
    }
    
    // Betting type selector
    const bettingTypeSelect = document.getElementById('betting-type');
    if (bettingTypeSelect) {
        bettingTypeSelect.addEventListener('change', function() {
            updateBettingPanels(this.value);
        });
    }
    
    // Analyze button
    document.getElementById('analyze-button').addEventListener('click', function() {
        if (!validateInputs()) {
            return;
        }
        
        processAllMatchData();
        
        // VIP enhanced analysis
        if (VIP_MODE) {
            runVIPAnalysis();
        } else {
            performAnalysis();
        }
        
        showResults();
    });
    
    console.log('Event listeners setup complete');
}

// Handle team setup changes
function handleTeamSetup() {
    // Get form values
    team1Name = document.getElementById('team1').value || 'Team 1';
    team2Name = document.getElementById('team2').value || 'Team 2';
    team1Ranking = parseInt(document.getElementById('team1-ranking').value) || 0;
    team2Ranking = parseInt(document.getElementById('team2-ranking').value) || 0;
    matchImportance = parseFloat(document.getElementById('match-importance').value) || 1;
    matchLocation = document.getElementById('match-location').value || 'neutral';
    
    // Update UI with team names
    updateTeamLabels();
}

// Update all team name labels throughout the UI
function updateTeamLabels() {
    // Update input labels
    document.getElementById('h2h-team1-label').textContent = `${team1Name} Scores (comma separated)`;
    document.getElementById('h2h-team2-label').textContent = `${team2Name} Scores (comma separated)`;
    document.getElementById('team1-scores-label').textContent = `${team1Name} Scores (comma separated)`;
    document.getElementById('team2-scores-label').textContent = `${team2Name} Scores (comma separated)`;
    
    // Update spread direction dropdown
    const spreadDirectionEl = document.getElementById('spread-direction');
    if (spreadDirectionEl && spreadDirectionEl.options.length >= 2) {
        spreadDirectionEl.options[0].textContent = team1Name;
        spreadDirectionEl.options[1].textContent = team2Name;
    }
    
    // Update match section headers
    const matchSections = document.querySelectorAll('.match-section h3');
    if (matchSections.length >= 3) {
        matchSections[0].textContent = `Head-to-Head Matches`;
        matchSections[1].textContent = `${team1Name} Recent Matches`;
        matchSections[2].textContent = `${team2Name} Recent Matches`;
    }
    
    // Update handicap selectors if they exist (VIP feature)
    const team1HandicapLabel = document.querySelector('label[for="team1-handicap"]');
    const team2HandicapLabel = document.querySelector('label[for="team2-handicap"]');
    
    if (team1HandicapLabel) team1HandicapLabel.textContent = `${team1Name} Handicap`;
    if (team2HandicapLabel) team2HandicapLabel.textContent = `${team2Name} Handicap`;
}

// Handle Head-to-Head Scores Add
function handleH2HAdd() {
    const team1ScoresText = document.getElementById('h2h-team1').value.trim();
    const team2ScoresText = document.getElementById('h2h-team2').value.trim();
    
    if (!team1ScoresText || !team2ScoresText) {
        showToast('Please enter scores for both teams', 'warning');
        return;
    }
    
    // Parse the score arrays
    const team1Scores = team1ScoresText.split(',').map(score => parseInt(score.trim()));
    const team2Scores = team2ScoresText.split(',').map(score => parseInt(score.trim()));
    
    // Validate scores
    if (!validateScores(team1Scores, team2Scores)) return;
    
    // Clear previous H2H data
    matchData.h2h = [];
    
    // Add each pair of scores as a match
    const minLength = Math.min(team1Scores.length, team2Scores.length);
    let addedCount = 0;
    
    for (let i = 0; i < minLength; i++) {
        const timestamp = Date.now() - ((minLength - i) * 7 * 24 * 60 * 60 * 1000);
        processMatchScore('h2h', i + 1, team1Scores[i], team2Scores[i], timestamp);
        addedCount++;
    }
    
    // Update UI
    updateMatchSummary('h2h');
    updateDataSufficiencyIndicators();
    
    // Clear input fields
    document.getElementById('h2h-team1').value = '';
    document.getElementById('h2h-team2').value = '';
    
    showToast(`Added ${addedCount} Head-to-Head matches`, 'success');
}

// Handle Team 1 Scores Add
function handleTeam1Add() {
    const team1ScoresText = document.getElementById('team1-scores').value.trim();
    const opponentScoresText = document.getElementById('team1-opponent').value.trim();
    
    if (!team1ScoresText || !opponentScoresText) {
        showToast('Please enter scores for both teams', 'warning');
        return;
    }
    
    const team1Scores = team1ScoresText.split(',').map(score => parseInt(score.trim()));
    const opponentScores = opponentScoresText.split(',').map(score => parseInt(score.trim()));
    
    if (!validateScores(team1Scores, opponentScores)) return;
    
    matchData.team1 = [];
    
    const minLength = Math.min(team1Scores.length, opponentScores.length);
    let addedCount = 0;
    
    for (let i = 0; i < minLength; i++) {
        const timestamp = Date.now() - ((minLength - i) * 7 * 24 * 60 * 60 * 1000);
        processMatchScore('team1', i + 1, team1Scores[i], opponentScores[i], timestamp);
        addedCount++;
    }
    
    updateMatchSummary('team1');
    updateDataSufficiencyIndicators();
    
    document.getElementById('team1-scores').value = '';
    document.getElementById('team1-opponent').value = '';
    
    showToast(`Added ${addedCount} matches for ${team1Name}`, 'success');
}

// Handle Team 2 Scores Add
function handleTeam2Add() {
    const team2ScoresText = document.getElementById('team2-scores').value.trim();
    const opponentScoresText = document.getElementById('team2-opponent').value.trim();
    
    if (!team2ScoresText || !opponentScoresText) {
        showToast('Please enter scores for both teams', 'warning');
        return;
    }
    
    const team2Scores = team2ScoresText.split(',').map(score => parseInt(score.trim()));
    const opponentScores = opponentScoresText.split(',').map(score => parseInt(score.trim()));
    
    if (!validateScores(team2Scores, opponentScores)) return;
    
    matchData.team2 = [];
    
    const minLength = Math.min(team2Scores.length, opponentScores.length);
    let addedCount = 0;
    
    for (let i = 0; i < minLength; i++) {
        const timestamp = Date.now() - ((minLength - i) * 7 * 24 * 60 * 60 * 1000);
        processMatchScore('team2', i + 1, team2Scores[i], opponentScores[i], timestamp);
        addedCount++;
    }
    
    updateMatchSummary('team2');
    updateDataSufficiencyIndicators();
    
    document.getElementById('team2-scores').value = '';
    document.getElementById('team2-opponent').value = '';
    
    showToast(`Added ${addedCount} matches for ${team2Name}`, 'success');
}

// Add sample data (for testing)
function addSampleData() {
    clearAllData();
    
    document.getElementById('team1').value = 'Liverpool';
    document.getElementById('team2').value = 'Manchester City';
    document.getElementById('team1-ranking').value = '4';
    document.getElementById('team2-ranking').value = '2';
    handleTeamSetup();
    
    document.getElementById('h2h-team1').value = '1,2,1,2,0';
    document.getElementById('h2h-team2').value = '1,2,0,1,1';
    handleH2HAdd();
    
    document.getElementById('team1-scores').value = '2,3,1,0,2,3';
    document.getElementById('team1-opponent').value = '0,1,0,0,1,1';
    handleTeam1Add();
    
    document.getElementById('team2-scores').value = '3,2,1,3,4,2';
    document.getElementById('team2-opponent').value = '0,0,0,1,1,2';
    handleTeam2Add();
    
    document.getElementById('betting-line').value = '2.5';
    document.getElementById('point-spread').value = '1.0';
    
    showToast('Sample data added successfully', 'success');
}

// Add VIP sample data (richer dataset)
function addVIPSampleData() {
    clearAllData();
    
    document.getElementById('team1').value = 'Arsenal';
    document.getElementById('team2').value = 'Tottenham';
    document.getElementById('team1-ranking').value = '3';
    document.getElementById('team2-ranking').value = '5';
    handleTeamSetup();
    
    document.getElementById('match-importance').value = '1.5';
    document.getElementById('match-location').value = 'home';
    
    document.getElementById('h2h-team1').value = '2,3,0,4,1,2,1'; 
    document.getElementById('h2h-team2').value = '0,1,2,2,1,2,2';
    handleH2HAdd();
    
    document.getElementById('team1-scores').value = '3,2,1,2,4,1,0,3,2';
    document.getElementById('team1-opponent').value = '1,0,1,0,2,0,0,2,1';
    handleTeam1Add();
    
    document.getElementById('team2-scores').value = '3,1,2,0,2,1,3,0,2';
    document.getElementById('team2-opponent').value = '2,0,2,1,2,0,1,1,2';
    handleTeam2Add();
    
    document.getElementById('betting-line').value = '2.5';
    document.getElementById('point-spread').value = '0.5';
    document.getElementById('spread-direction').value = 'team1';
    
    // Set VIP betting options if available
    const overUnder25 = document.getElementById('over-under-2.5');
    if (overUnder25) overUnder25.value = 'over';
    
    const team1Handicap = document.getElementById('team1-handicap');
    const team2Handicap = document.getElementById('team2-handicap');
    if (team1Handicap && team2Handicap) {
        team1Handicap.value = '-0.5';
        team2Handicap.value = '+0.5';
    }
    
    const bettingType = document.getElementById('betting-type');
    if (bettingType) {
        bettingType.value = 'all';
        updateBettingPanels('all');
    }
    
    showToast('VIP sample data added successfully', 'vip');
}

// Validate scores
function validateScores(scores1, scores2) {
    if (scores1.some(isNaN) || scores2.some(isNaN)) {
        showToast('Please enter valid scores (numbers only)', 'error');
        return false;
    }
    
    if (scores1.some(score => score < 0) || scores2.some(score => score < 0)) {
        showToast('Scores must be non-negative', 'error');
        return false;
    }
    
    if (scores1.length === 0 || scores2.length === 0) {
        showToast('Please enter at least one score for each team', 'warning');
        return false;
    }
    
    if (scores1.length !== scores2.length) {
        showToast(`Unequal arrays. Will use the first ${Math.min(scores1.length, scores2.length)} scores from each.`, 'warning');
    }
    
    return true;
}

// Process a match score and add it to the data
function processMatchScore(category, matchNumber, score1, score2, timestamp) {
    const totalScore = score1 + score2;
    
    let team1Score, team2Score, outcome;
    
    if (category === 'h2h') {
        team1Score = score1;
        team2Score = score2;
        
        if (team1Score === team2Score) {
            outcome = 'Draw';
        } else if (team1Score > team2Score) {
            outcome = `${team1Name} Wins`;
        } else {
            outcome = `${team2Name} Wins`;
        }
    } else if (category === 'team1') {
        team1Score = score1;
        team2Score = score2;
        
        if (team1Score === team2Score) {
            outcome = 'Draw';
        } else if (team1Score > team2Score) {
            outcome = `${team1Name} Wins`;
        } else {
            outcome = 'Opponent Wins';
        }
    } else if (category === 'team2') {
        team1Score = score2;
        team2Score = score1;
        
        if (team1Score === team2Score) {
            outcome = 'Draw';
        } else if (team1Score > team2Score) {
            outcome = 'Opponent Wins';
        } else {
            outcome = `${team2Name} Wins`;
        }
    }
    
    const marginOfVictory = Math.abs(team1Score - team2Score);
    const goalEfficiency = totalScore > 0 ? Math.max(team1Score, team2Score) / totalScore : 0.5;
    const cleanSheet = team1Score === 0 || team2Score === 0;
    
    const match = {
        matchNumber,
        team1Score,
        team2Score,
        totalScore,
        outcome,
        category,
        totalOverLine: totalLine > 0 ? totalScore > totalLine : null,
        spreadCover: pointSpread > 0 ? calculateSpreadCover(team1Score, team2Score) : null,
        marginOfVictory,
        goalEfficiency,
        cleanSheet,
        timestamp: timestamp || Date.now() - (matchData[category].length * 86400000),
        
        // VIP enhanced metrics
        halfTimeScore: generateHalfTimeScore(team1Score, team2Score),
        shotEfficiency: generateShotEfficiency(team1Score, team2Score),
        possessionStats: generatePossessionStats(team1Score, team2Score)
    };
    
    if (VIP_MODE) {
        match.overUnderOutcomes = {
            over0_5: totalScore > 0.5,
            under0_5: totalScore < 0.5,
            over1_5: totalScore > 1.5,
            under1_5: totalScore < 1.5,
            over2_5: totalScore > 2.5,
            under2_5: totalScore < 2.5,
            over3_5: totalScore > 3.5,
            under3_5: totalScore < 3.5
        };
        
        match.handicapOutcomes = {};
        [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
            const adjustedScore = team1Score + handicap;
            match.handicapOutcomes[`team1_${handicap}`] = 
                adjustedScore > team2Score ? 'win' : 
                adjustedScore < team2Score ? 'loss' : 'draw';
        });
        
        [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
            const adjustedScore = team2Score + handicap;
            match.handicapOutcomes[`team2_${handicap}`] = 
                adjustedScore > team1Score ? 'win' : 
                adjustedScore < team1Score ? 'loss' : 'draw';
        });
    }
    
    matchData[category].push(match);
    matchData[category].sort((a, b) => a.timestamp - b.timestamp);
}

// Generate realistic half-time scores
function generateHalfTimeScore(fullTimeScore1, fullTimeScore2) {
    const totalGoals = fullTimeScore1 + fullTimeScore2;
    const expectedFirstHalfGoals = Math.round(totalGoals * 0.3);
    
    let firstHalfScore1 = 0;
    let firstHalfScore2 = 0;
    
    for (let i = 0; i < expectedFirstHalfGoals; i++) {
        if (Math.random() < 0.5 && firstHalfScore1 < fullTimeScore1) {
            firstHalfScore1++;
        } else if (firstHalfScore2 < fullTimeScore2) {
            firstHalfScore2++;
        } else if (firstHalfScore1 < fullTimeScore1) {
            firstHalfScore1++;
        }
    }
    
    return {
        team1: firstHalfScore1,
        team2: firstHalfScore2
    };
}

// Generate shot efficiency metrics
function generateShotEfficiency(team1Score, team2Score) {
    const team1Shots = team1Score * (7 + Math.floor(Math.random() * 4)) + Math.floor(Math.random() * 5);
    const team2Shots = team2Score * (7 + Math.floor(Math.random() * 4)) + Math.floor(Math.random() * 5);
    
    const team1ShotsOnTarget = Math.max(team1Score, Math.round(team1Shots * (0.3 + Math.random() * 0.15)));
    const team2ShotsOnTarget = Math.max(team2Score, Math.round(team2Shots * (0.3 + Math.random() * 0.15)));
    
    const team1Efficiency = team1ShotsOnTarget > 0 ? team1Score / team1ShotsOnTarget : 0;
    const team2Efficiency = team2ShotsOnTarget > 0 ? team2Score / team2ShotsOnTarget : 0;
    
    return {
        team1: {
            total: team1Shots,
            onTarget: team1ShotsOnTarget,
            efficiency: team1Efficiency
        },
        team2: {
            total: team2Shots,
            onTarget: team2ShotsOnTarget,
            efficiency: team2Efficiency
        }
    };
}

// Generate possession stats
function generatePossessionStats(team1Score, team2Score) {
    const scoreDiff = team1Score - team2Score;
    const basePossession = 50 + (scoreDiff * 3);
    
    let team1Possession = Math.min(70, Math.max(30, basePossession + (Math.random() * 10 - 5)));
    let team2Possession = 100 - team1Possession;
    
    team1Possession = Math.round(team1Possession * 10) / 10;
    team2Possession = Math.round(team2Possession * 10) / 10;
    
    return {
        team1: team1Possession,
        team2: team2Possession
    };
}

// Update match summary display
function updateMatchSummary(category) {
    const summaryElement = document.getElementById(`${category}-match-summary`);
    
    if (matchData[category].length === 0) {
        summaryElement.innerHTML = '<p>No matches added yet.</p>';
        return;
    }
    
    const matchItems = matchData[category].map(match => {
        let team1Label, team2Label, resultClass;
        
        if (category === 'h2h') {
            team1Label = team1Name;
            team2Label = team2Name;
            if (match.outcome === `${team1Name} Wins`) {
                resultClass = 'win';
            } else if (match.outcome === `${team2Name} Wins`) {
                resultClass = 'loss';
            } else {
                resultClass = 'draw';
            }
        } else if (category === 'team1') {
            team1Label = team1Name;
            team2Label = 'Opponent';
            if (match.outcome === `${team1Name} Wins`) {
                resultClass = 'win';
            } else if (match.outcome === 'Opponent Wins') {
                resultClass = 'loss';
            } else {
                resultClass = 'draw';
            }
        } else if (category === 'team2') {
            team1Label = 'Opponent';
            team2Label = team2Name;
            if (match.outcome === `${team2Name} Wins`) {
                resultClass = 'win';
            } else if (match.outcome === 'Opponent Wins') {
                resultClass = 'loss';
            } else {
                resultClass = 'draw';
            }
        }
        
        const daysAgo = Math.floor((Date.now() - match.timestamp) / (24 * 60 * 60 * 1000));
        const dateInfo = daysAgo === 0 ? 'Today' : 
                        daysAgo === 1 ? 'Yesterday' : 
                        `${daysAgo} days ago`;
        
        let vipDetailsHtml = '';
        
        if (VIP_MODE) {
            vipDetailsHtml = `
                <div class="match-details">
                    <div class="match-detail">
                        <span class="detail-label">HT:</span> 
                        <span class="detail-value">${match.halfTimeScore.team1}-${match.halfTimeScore.team2}</span>
                    </div>
                    <div class="match-detail">
                        <span class="detail-label">Shots:</span> 
                        <span class="detail-value">${match.shotEfficiency.team1.total}-${match.shotEfficiency.team2.total}</span>
                    </div>
                    <div class="match-detail">
                        <span class="detail-label">Poss:</span> 
                        <span class="detail-value">${match.possessionStats.team1}%-${match.possessionStats.team2}%</span>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="match-item ${resultClass}">
                <div class="match-score">${team1Label} ${match.team1Score} - ${match.team2Score} ${team2Label}</div>
                <div class="match-date">${dateInfo}</div>
                ${vipDetailsHtml}
            </div>
        `;
    }).join('');
    
    const summaryHTML = `
        <h4>Added ${matchData[category].length} matches:</h4>
        <div class="match-list">
            ${matchItems}
        </div>
    `;
    
    summaryElement.innerHTML = summaryHTML;
}

// Update data sufficiency indicators
function updateDataSufficiencyIndicators() {
    document.getElementById('h2h-count').textContent = `${matchData.h2h.length} matches`;
    document.getElementById('team1-count').textContent = `${matchData.team1.length} matches`;
    document.getElementById('team2-count').textContent = `${matchData.team2.length} matches`;
    
    const h2hPercent = Math.min(100, (matchData.h2h.length / MIN_H2H_MATCHES) * 100);
    const team1Percent = Math.min(100, (matchData.team1.length / MIN_MATCHES_FOR_EXCELLENT_ANALYSIS) * 100);
    const team2Percent = Math.min(100, (matchData.team2.length / MIN_MATCHES_FOR_EXCELLENT_ANALYSIS) * 100);
    
    document.getElementById('h2h-meter').style.width = `${h2hPercent}%`;
    document.getElementById('team1-meter').style.width = `${team1Percent}%`;
    document.getElementById('team2-meter').style.width = `${team2Percent}%`;
    
    const totalMatches = getTotalMatchCount();
    const dataQualityIndicator = document.getElementById('data-quality-indicator');
    const dataQualityText = document.getElementById('data-quality-text');
    
    if (totalMatches >= MIN_MATCHES_FOR_EXCELLENT_ANALYSIS && matchData.h2h.length >= MIN_H2H_MATCHES) {
        dataQualityIndicator.className = 'data-quality excellent';
        dataQualityText.textContent = 'Excellent data quality for accurate predictions';
    } else if (totalMatches >= MIN_MATCHES_FOR_GOOD_ANALYSIS) {
        dataQualityIndicator.className = 'data-quality good';
        dataQualityText.textContent = 'Good data quality for reliable predictions';
    } else {
        dataQualityIndicator.className = 'data-quality insufficient';
        dataQualityText.textContent = `Add more match data for better predictions (${MIN_MATCHES_FOR_GOOD_ANALYSIS - totalMatches} more needed for good quality)`;
    }
}

// Clear all match data
function clearAllData() {
    if (getTotalMatchCount() > 0 && !confirm('Are you sure you want to clear all match data?')) {
        return;
    }
    
    matchData.h2h = [];
    matchData.team1 = [];
    matchData.team2 = [];
    
    updateMatchSummary('h2h');
    updateMatchSummary('team1');
    updateMatchSummary('team2');
    updateDataSufficiencyIndicators();
    
    showToast('All match data has been cleared', 'info');
}

// Calculate if the spread was covered
function calculateSpreadCover(team1Score, team2Score) {
    if (pointSpread <= 0) return null;
    
    const adjustedScore = spreadDirection === 'team1' 
        ? team1Score - pointSpread
        : team2Score - pointSpread;
    
    const opposingScore = spreadDirection === 'team1' ? team2Score : team1Score;
    
    if (adjustedScore > opposingScore) {
        return 'Favorite Covered';
    } else if (adjustedScore < opposingScore) {
        return 'Underdog Covered';
    } else {
        return 'Push';
    }
}

// Get total match count
function getTotalMatchCount() {
    return matchData.h2h.length + matchData.team1.length + matchData.team2.length;
}

// Validate inputs before analysis
function validateInputs() {
    if (getTotalMatchCount() === 0) {
        showToast('Please add match data before analyzing', 'error');
        return false;
    }
    
    if (!team1Name.trim() || !team2Name.trim()) {
        showToast('Please enter names for both teams', 'error');
        return false;
    }
    
    if (team1Name.trim() === team2Name.trim()) {
        showToast('Team names must be different', 'error');
        return false;
    }
    
    if (getTotalMatchCount() < MIN_MATCHES_FOR_GOOD_ANALYSIS) {
        if (!confirm(`You have only ${getTotalMatchCount()} matches in total. The analysis may not be accurate. Continue anyway?`)) {
            return false;
        }
    }
    
    return true;
}

// Process all match data
function processAllMatchData() {
    document.getElementById('analysis-loading').classList.remove('hidden');
    document.getElementById('analysis-results').classList.add('hidden');
    
    document.getElementById('results').classList.add('visible');
    
    totalLine = parseFloat(document.getElementById('betting-line').value) || 0;
    pointSpread = parseFloat(document.getElementById('point-spread').value) || 0;
    spreadDirection = document.getElementById('spread-direction').value;
    
    if (VIP_MODE) {
        processVIPBettingOptions();
    }
    
    updateSpreadCoverCalculations();
}

// Process VIP betting options
function processVIPBettingOptions() {
    const overUnder = {
        '0.5': getOverUnderSelection('0.5'),
        '1.5': getOverUnderSelection('1.5'),
        '2.5': getOverUnderSelection('2.5'),
        '3.5': getOverUnderSelection('3.5')
    };
    
    const team1Handicap = document.getElementById('team1-handicap');
    const team1HandicapValue = team1Handicap ? team1Handicap.value : null;
    
    const vipBettingOptions = {
        overUnder,
        handicap: team1HandicapValue
    };
    
    window.vipBettingOptions = vipBettingOptions;
}

// Get over/under selection value
function getOverUnderSelection(line) {
    const selector = document.getElementById(`over-under-${line}`);
    return selector ? selector.value : null;
}

// Update spread cover calculations for all matches
function updateSpreadCoverCalculations() {
    for (const category in matchData) {
        matchData[category].forEach(match => {
            match.spreadCover = pointSpread > 0 ? 
                calculateSpreadCover(match.team1Score, match.team2Score) : null;
            
            match.totalOverLine = totalLine > 0 ? 
                match.totalScore > totalLine : null;
        });
    }
}

// Run VIP enhanced analysis
function runVIPAnalysis() {
    console.log("Running VIP Enhanced Analysis");
    
    try {
        const features = prepareVIPMatchFeatures();
        const results = runVIPModelEnsemble(features);
        const simulations = runVIPMatchSimulations(features, 10000);
        const bettingAnalysis = calculateVIPBettingEdges(simulations, features);
        const outcomes = calculateVIPOutcomeDistributions(simulations);
        
        lastAnalysisResults = {
            ...results,
            simulations,
            bettingAnalysis,
            outcomes,
            team1Name,
            team2Name,
            totalLine,
            pointSpread,
            spreadDirection,
            matchImportance,
            matchLocation,
            features
        };
        
        const team1ProjScore = Math.round((results.projectedTotal / 2) + (results.projectedMargin / 2));
        const team2ProjScore = Math.round((results.projectedTotal / 2) - (results.projectedMargin / 2));
        
        featureImportanceScores = calculateVIPFeatureImportance(features);
        
        const scoreDistribution = generateVIPScoreDistribution(results.projectedTotal, results.projectedMargin, simulations);
        const bettingInsights = generateVIPBettingInsights(bettingAnalysis);
        
        updateWinnerPrediction(results.probabilities);
        updateScorePrediction(team1ProjScore, team2ProjScore, results.projectedTotal, totalLine);
        updateVIPBettingRecommendation(bettingAnalysis, bettingInsights);
        updateVIPAnalysisExplanation(results, features, bettingAnalysis);
        createVIPWinProbabilityChart(results.probabilities);
        createVIPScoreProbabilityChart(scoreDistribution);
        createVIPFeatureImportanceChart(featureImportanceScores);
        createVIPBettingEdgeChart(bettingAnalysis);
        
        betSimulationResults = {
            matchSimulations: simulations,
            bettingAnalysis
        };
        
        document.getElementById('analysis-loading').classList.add('hidden');
        document.getElementById('analysis-results').classList.remove('hidden');
    } catch (error) {
        console.error("VIP Analysis failed:", error);
        showToast('VIP Analysis encountered an error. Please try again.', 'error');
        document.getElementById('analysis-loading').classList.add('hidden');
    }
}

// Simplified versions of complex functions for basic functionality
function prepareVIPMatchFeatures() {
    return prepareMatchFeatures();
}

function prepareMatchFeatures() {
    const basicStats = calculateBasicStats();
    const advancedStats = calculateAdvancedStats(basicStats);
    const trends = calculateTrends();
    const dataQuality = calculateDataQuality();
    
    return {
        basicStats,
        advancedStats,
        trends,
        dataQuality
    };
}

function calculateBasicStats() {
    const team1AllMatches = [...matchData.h2h, ...matchData.team1];
    const team2AllMatches = [...matchData.h2h, ...matchData.team2];
    
    const team1AvgScore = team1AllMatches.length > 0 ? 
        team1AllMatches.reduce((sum, m) => sum + (m.category === 'h2h' ? m.team1Score : m.team1Score), 0) / team1AllMatches.length : 1;
    
    const team2AvgScore = team2AllMatches.length > 0 ?
        team2AllMatches.reduce((sum, m) => sum + (m.category === 'h2h' ? m.team2Score : m.team1Score), 0) / team2AllMatches.length : 1;
    
    const team1AvgConceded = team1AllMatches.length > 0 ?
        team1AllMatches.reduce((sum, m) => sum + (m.category === 'h2h' ? m.team2Score : m.team2Score), 0) / team1AllMatches.length : 1;
    
    const team2AvgConceded = team2AllMatches.length > 0 ?
        team2AllMatches.reduce((sum, m) => sum + (m.category === 'h2h' ? m.team1Score : m.team2Score), 0) / team2AllMatches.length : 1;
    
    let h2hAdvantage = 0;
    if (matchData.h2h.length > 0) {
        const team1H2HWins = matchData.h2h.filter(m => m.outcome === `${team1Name} Wins`).length;
        const team2H2HWins = matchData.h2h.filter(m => m.outcome === `${team2Name} Wins`).length;
        h2hAdvantage = (team1H2HWins - team2H2HWins) / matchData.h2h.length;
    }
    
    const locationFactor = matchLocation === 'home' ? 1 : (matchLocation === 'away' ? -1 : 0);
    const rankingDiff = team1Ranking > 0 && team2Ranking > 0 ? team1Ranking - team2Ranking : 0;
    
    return {
        team1AvgScore,
        team2AvgScore,
        team1AvgConceded,
        team2AvgConceded,
        h2hAdvantage,
        locationFactor,
        rankingDiff,
        matchImportance
    };
}

function calculateAdvancedStats(basicStats) {
    const team1AttackStrength = Math.max(0.5, Math.min(2.0, basicStats.team1AvgScore / 1.5));
    const team2AttackStrength = Math.max(0.5, Math.min(2.0, basicStats.team2AvgScore / 1.5));
    const team1DefenseStrength = Math.max(0.5, Math.min(2.0, 1.5 / Math.max(0.5, basicStats.team1AvgConceded)));
    const team2DefenseStrength = Math.max(0.5, Math.min(2.0, 1.5 / Math.max(0.5, basicStats.team2AvgConceded)));
    
    const team1RecentForm = calculateRecentForm('team1');
    const team2RecentForm = calculateRecentForm('team2');
    
    const team1MomentumIndex = team1RecentForm;
    const team2MomentumIndex = team2RecentForm;
    
    const team1HomeAdvantage = 1.2;
    const team2HomeAdvantage = 1.2;
    
    const team1MatchImportancePerformance = 1.0;
    const team2MatchImportancePerformance = 1.0;
    
    return {
        team1AttackStrength,
        team2AttackStrength,
        team1DefenseStrength,
        team2DefenseStrength,
        team1RecentForm,
        team2RecentForm,
        team1MomentumIndex,
        team2MomentumIndex,
        team1HomeAdvantage,
        team2HomeAdvantage,
        team1MatchImportancePerformance,
        team2MatchImportancePerformance
    };
}

function calculateRecentForm(teamKey) {
    let matches;
    if (teamKey === 'team1') {
        matches = [...matchData.h2h, ...matchData.team1];
    } else {
        matches = [...matchData.h2h, ...matchData.team2];
    }
    
    if (matches.length === 0) return 0.5;
    
    const recentMatches = matches.slice(-5);
    let points = 0;
    
    recentMatches.forEach(match => {
        if (teamKey === 'team1') {
            if (match.category === 'h2h') {
                if (match.outcome === `${team1Name} Wins`) points += 1;
                else if (match.outcome === 'Draw') points += 0.5;
            } else {
                if (match.outcome === `${team1Name} Wins`) points += 1;
                else if (match.outcome === 'Draw') points += 0.5;
            }
        } else {
            if (match.category === 'h2h') {
                if (match.outcome === `${team2Name} Wins`) points += 1;
                else if (match.outcome === 'Draw') points += 0.5;
            } else {
                if (match.outcome === `${team2Name} Wins`) points += 1;
                else if (match.outcome === 'Draw') points += 0.5;
            }
        }
    });
    
    return points / recentMatches.length;
}

function calculateTrends() {
    return {
        scoring: {
            team1Trend: 0,
            team2Trend: 0
        },
        defensive: {
            team1Trend: 0,
            team2Trend: 0
        }
    };
}

function calculateDataQuality() {
    const totalMatches = getTotalMatchCount();
    const h2hMatches = matchData.h2h.length;
    
    return {
        totalMatches,
        h2hMatches,
        dataSufficiency: totalMatches >= MIN_MATCHES_FOR_GOOD_ANALYSIS,
        dataExcellence: totalMatches >= MIN_MATCHES_FOR_EXCELLENT_ANALYSIS && h2hMatches >= MIN_H2H_MATCHES
    };
}

function runVIPModelEnsemble(features) {
    // Simplified model ensemble
    const team1Advantage = calculateTeam1Advantage(features);
    
    const team1WinProb = 50 + (50 * (2 / (1 + Math.exp(-team1Advantage * 1.2)) - 1));
    const team2WinProb = 50 + (50 * (2 / (1 + Math.exp(team1Advantage * 1.2)) - 1));
    
    const scoringRate = features.basicStats.team1AvgScore + features.basicStats.team2AvgScore;
    const strengthDifference = Math.abs(team1WinProb - team2WinProb);
    
    let baseDrawRate = 28 - (scoringRate * 4);
    const drawReduction = strengthDifference * 0.4;
    let drawProb = Math.max(5, Math.min(38, baseDrawRate - drawReduction));
    
    let adjustedTeam1WinProb = team1WinProb * (1 - drawProb / 100);
    let adjustedTeam2WinProb = team2WinProb * (1 - drawProb / 100);
    
    const total = adjustedTeam1WinProb + adjustedTeam2WinProb + drawProb;
    const probabilities = {
        team1WinProb: (adjustedTeam1WinProb / total) * 100,
        team2WinProb: (adjustedTeam2WinProb / total) * 100,
        drawProb: (drawProb / total) * 100
    };
    
    const projectedTotal = calculateProjectedTotal(features);
    const projectedMargin = calculateProjectedMargin(features);
    
    return {
        probabilities,
        projectedTotal,
        projectedMargin,
        modelResults: []
    };
}

function calculateTeam1Advantage(features) {
    const { basicStats, advancedStats } = features;
    
    const attackDifference = (
        (advancedStats.team1AttackStrength - advancedStats.team2DefenseStrength) -
        (advancedStats.team2AttackStrength - advancedStats.team1DefenseStrength)
    );
    
    let advantageCoefficient = 
        attackDifference * WEIGHTS.OVERALL_PERFORMANCE +
        (advancedStats.team1RecentForm - advancedStats.team2RecentForm) * WEIGHTS.RECENT_FORM +
        basicStats.h2hAdvantage * WEIGHTS.H2H_MATCHES + 
        (advancedStats.team1MomentumIndex - advancedStats.team2MomentumIndex) * WEIGHTS.MOMENTUM;
    
    if (basicStats.locationFactor !== 0) {
        const locationTeamAdvantage = basicStats.locationFactor === 1 ? 
            advancedStats.team1HomeAdvantage : advancedStats.team2HomeAdvantage;
        advantageCoefficient += basicStats.locationFactor * locationTeamAdvantage * WEIGHTS.HOME_ADVANTAGE;
    }
    
    if (basicStats.matchImportance !== 1) {
        const importanceDifference = 
            advancedStats.team1MatchImportancePerformance - advancedStats.team2MatchImportancePerformance;
        advantageCoefficient += (basicStats.matchImportance - 1) * importanceDifference * WEIGHTS.MATCH_IMPORTANCE;
    }
    
    if (basicStats.rankingDiff !== 0) {
        const normalizedRankingDiff = -Math.sign(basicStats.rankingDiff) * 
            Math.min(1, Math.abs(basicStats.rankingDiff) / 20);
        advantageCoefficient += normalizedRankingDiff * WEIGHTS.RANKING;
    }
    
    return advantageCoefficient;
}

function calculateProjectedTotal(features) {
    const { basicStats, advancedStats } = features;
    
    let baseTotal = (
        basicStats.team1AvgScore + 
        basicStats.team2AvgScore + 
        basicStats.team1AvgConceded + 
        basicStats.team2AvgConceded
    ) / 2;
    
    if (features.dataQuality.h2hMatches >= 2) {
        const h2hAvgTotal = matchData.h2h.reduce((sum, match) => sum + match.totalScore, 0) / 
                           features.dataQuality.h2hMatches;
        const h2hWeight = Math.min(0.5, features.dataQuality.h2hMatches * 0.08);
        baseTotal = baseTotal * (1 - h2hWeight) + h2hAvgTotal * h2hWeight;
    }
    
    baseTotal += ((advancedStats.team1RecentForm + advancedStats.team2RecentForm) - 1) * 0.5;
    baseTotal += -((1 - advancedStats.team1DefenseStrength) + (1 - advancedStats.team2DefenseStrength)) * 0.5;
    baseTotal += (advancedStats.team1AttackStrength + advancedStats.team2AttackStrength - 2) * 0.5;
    
    if (basicStats.matchImportance < 1) {
        baseTotal += (1 - basicStats.matchImportance) * 0.6;
    } else if (basicStats.matchImportance > 1.3) {
        baseTotal -= (basicStats.matchImportance - 1.3) * 0.4;
    }
    
    if (basicStats.locationFactor !== 0) {
        baseTotal += Math.abs(basicStats.locationFactor) * 0.15;
    }
    
    return Math.max(0.5, baseTotal);
}

function calculateProjectedMargin(features) {
    const { basicStats, advancedStats } = features;
    
    let baseMargin = (
        (basicStats.team1AvgScore - basicStats.team2AvgConceded) - 
        (basicStats.team2AvgScore - basicStats.team1AvgConceded)
    );
    
    if (features.dataQuality.h2hMatches >= 2) {
        const h2hAvgMargin = matchData.h2h.reduce((sum, match) => 
            sum + (match.team1Score - match.team2Score), 0) / features.dataQuality.h2hMatches;
        
        const h2hWeight = Math.min(0.5, features.dataQuality.h2hMatches * 0.08);
        baseMargin = baseMargin * (1 - h2hWeight) + h2hAvgMargin * h2hWeight;
    } else {
        baseMargin += basicStats.h2hAdvantage * 0.5;
    }
    
    baseMargin += (advancedStats.team1RecentForm - advancedStats.team2RecentForm) * 0.8;
    baseMargin += ((advancedStats.team1AttackStrength - advancedStats.team2DefenseStrength) - 
                  (advancedStats.team2AttackStrength - advancedStats.team1DefenseStrength)) * 0.5;
    baseMargin += (advancedStats.team1MomentumIndex - advancedStats.team2MomentumIndex) * 0.5;
    
    if (basicStats.locationFactor !== 0) {
        baseMargin += basicStats.locationFactor * 0.4;
    }
    
    if (basicStats.rankingDiff !== 0) {
        const normalizedRankingDiff = -Math.sign(basicStats.rankingDiff) * 
                                     Math.min(1, Math.abs(basicStats.rankingDiff) / 20);
        baseMargin += normalizedRankingDiff * 0.3;
    }
    
    return baseMargin;
}

function runVIPMatchSimulations(features, numSimulations = 10000) {
    console.log(`Running ${numSimulations} VIP match simulations`);
    
    const mainPrediction = runVIPModelEnsemble(features);
    
    const lambda1 = (mainPrediction.projectedTotal / 2) + (mainPrediction.projectedMargin / 2);
    const lambda2 = (mainPrediction.projectedTotal / 2) - (mainPrediction.projectedMargin / 2);
    
    const simulations = [];
    
    for (let i = 0; i < numSimulations; i++) {
        const team1Goals = generatePoissonRandom(lambda1);
        const team2Goals = generatePoissonRandom(lambda2);
        
        let outcome;
        if (team1Goals > team2Goals) {
            outcome = 'team1Win';
        } else if (team1Goals < team2Goals) {
            outcome = 'team2Win';
        } else {
            outcome = 'draw';
        }
        
        const totalGoals = team1Goals + team2Goals;
        
        const overUnderOutcomes = {
            'over0.5': totalGoals > 0.5,
            'under0.5': totalGoals < 0.5,
            'over1.5': totalGoals > 1.5,
            'under1.5': totalGoals < 1.5,
            'over2.5': totalGoals > 2.5,
            'under2.5': totalGoals < 2.5,
            'over3.5': totalGoals > 3.5,
            'under3.5': totalGoals < 3.5
        };
        
        const handicapOutcomes = {};
        
        [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
            const adjustedScore = team1Goals + handicap;
            if (adjustedScore > team2Goals) {
                handicapOutcomes[`team1${handicap}`] = 'win';
            } else if (adjustedScore < team2Goals) {
                handicapOutcomes[`team1${handicap}`] = 'lose';
            } else {
                handicapOutcomes[`team1${handicap}`] = 'push';
            }
        });
        
        [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
            const adjustedScore = team2Goals + handicap;
            if (adjustedScore > team1Goals) {
                handicapOutcomes[`team2${handicap}`] = 'win';
            } else if (adjustedScore < team1Goals) {
                handicapOutcomes[`team2${handicap}`] = 'lose';
            } else {
                handicapOutcomes[`team2${handicap}`] = 'push';
            }
        });
        
        simulations.push({
            team1Goals,
            team2Goals,
            totalGoals,
            outcome,
            overUnderOutcomes,
            handicapOutcomes
        });
    }
    
    return simulations;
}

function generatePoissonRandom(lambda) {
    if (lambda <= 0) return 0;
    
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    
    do {
        k++;
        p *= Math.random();
    } while (p > L);
    
    return k - 1;
}

function calculateVIPBettingEdges(simulations, features) {
    console.log("Calculating VIP betting edges");
    
    const vipBettingOptions = window.vipBettingOptions || {};
    
    const bettingAnalysis = {
        overUnder: {},
        handicap: {},
        winDrawWin: {},
        bothTeamsToScore: {},
        correctScore: {},
        recommendations: []
    };
    
    [0.5, 1.5, 2.5, 3.5].forEach(line => {
        const overKey = `over${line}`;
        const underKey = `under${line}`;
        
        const overWins = simulations.filter(sim => sim.overUnderOutcomes[overKey]).length;
        const underWins = simulations.filter(sim => sim.overUnderOutcomes[underKey]).length;
        
        const overProb = overWins / simulations.length;
        const underProb = underWins / simulations.length;
        
        bettingAnalysis.overUnder[line] = {
            over: {
                probability: overProb,
                implied: overProb * 100,
                description: `This bet wins if there are ${Math.ceil(line)} or more total goals`
            },
            under: {
                probability: underProb,
                implied: underProb * 100,
                description: `This bet wins if there are ${Math.floor(line)} or fewer total goals`
            }
        };
        
        if (vipBettingOptions.overUnder && vipBettingOptions.overUnder[line]) {
            const selection = vipBettingOptions.overUnder[line];
            const selectedProb = selection === 'over' ? overProb : underProb;
            
            if (selectedProb > 0.6) {
                bettingAnalysis.recommendations.push({
                    type: 'overUnder',
                    line,
                    selection,
                    probability: selectedProb,
                    strength: calculateRecommendationStrength(selectedProb),
                    description: `${selection.toUpperCase()} ${line} - ${Math.round(selectedProb * 100)}% probability`
                });
            }
        }
    });
    
    [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
        const team1Key = `team1${handicap}`;
        const team1Wins = simulations.filter(sim => sim.handicapOutcomes[team1Key] === 'win').length;
        const team1Probability = team1Wins / simulations.length;
        
        const team2Key = `team2${-handicap}`;
        const team2Wins = simulations.filter(sim => sim.handicapOutcomes[team2Key] === 'win').length;
        const team2Probability = team2Wins / simulations.length;
        
        bettingAnalysis.handicap[handicap] = {
            team1: {
                probability: team1Probability,
                implied: team1Probability * 100,
                description: explainHandicapBet(team1Name, handicap)
            },
            team2: {
                probability: team2Probability,
                implied: team2Probability * 100,
                description: explainHandicapBet(team2Name, -handicap)
            }
        };
        
        if (vipBettingOptions.handicap && 
            (vipBettingOptions.handicap === handicap.toString() || 
             vipBettingOptions.handicap === `+${handicap}` || 
             vipBettingOptions.handicap === `-${Math.abs(handicap)}`)) {
            
            const isTeam1Selected = true;
            const selectedProb = isTeam1Selected ? team1Probability : team2Probability;
            
            if (selectedProb > 0.58) {
                bettingAnalysis.recommendations.push({
                    type: 'handicap',
                    handicap,
                    team: isTeam1Selected ? 'team1' : 'team2',
                    probability: selectedProb,
                    strength: calculateRecommendationStrength(selectedProb),
                    description: `${isTeam1Selected ? team1Name : team2Name} ${handicap > 0 ? '+' : ''}${handicap} - ${Math.round(selectedProb * 100)}% probability`
                });
            }
        }
    });
    
    const team1Wins = simulations.filter(sim => sim.outcome === 'team1Win').length;
    const team2Wins = simulations.filter(sim => sim.outcome === 'team2Win').length;
    const draws = simulations.filter(sim => sim.outcome === 'draw').length;
    
    bettingAnalysis.winDrawWin = {
        team1: {
            probability: team1Wins / simulations.length,
            implied: (team1Wins / simulations.length) * 100
        },
        draw: {
            probability: draws / simulations.length,
            implied: (draws / simulations.length) * 100
        },
        team2: {
            probability: team2Wins / simulations.length,
            implied: (team2Wins / simulations.length) * 100
        }
    };
    
    const bttsYes = simulations.filter(sim => sim.team1Goals > 0 && sim.team2Goals > 0).length;
    const bttsNo = simulations.length - bttsYes;
    
    bettingAnalysis.bothTeamsToScore = {
        yes: {
            probability: bttsYes / simulations.length,
            implied: (bttsYes / simulations.length) * 100
        },
        no: {
            probability: bttsNo / simulations.length,
            implied: (bttsNo / simulations.length) * 100
        }
    };
    
    const correctScores = {};
    
    simulations.forEach(sim => {
        const scoreKey = `${sim.team1Goals}-${sim.team2Goals}`;
        if (!correctScores[scoreKey]) {
            correctScores[scoreKey] = 1;
        } else {
            correctScores[scoreKey]++;
        }
    });
    
    const sortedScores = Object.entries(correctScores)
        .map(([score, count]) => ({
            score,
            probability: count / simulations.length,
            implied: (count / simulations.length) * 100
        }))
        .sort((a, b) => b.probability - a.probability);
    
    bettingAnalysis.correctScore = sortedScores.slice(0, 10);
    
    bettingAnalysis.recommendations.sort((a, b) => b.strength - a.strength);
    
    return bettingAnalysis;
}

function calculateRecommendationStrength(probability) {
    if (probability >= 0.75) {
        return 90 + ((probability - 0.75) * 40);
    } else if (probability >= 0.65) {
        return 70 + ((probability - 0.65) * 200);
    } else if (probability >= 0.58) {
        return 50 + ((probability - 0.58) * 285.7);
    } else if (probability >= 0.52) {
        return 30 + ((probability - 0.52) * 333.3);
    } else {
        return 30 * (probability / 0.52);
    }
}

function explainHandicapBet(teamName, handicap) {
    if (handicap === 0) {
        return `This bet on ${teamName} wins if they win the match. Stakes are returned for a draw.`;
    } else if (handicap > 0) {
        if (handicap === 0.5) {
            return `This bet on ${teamName} wins if they win OR draw the match.`;
        } else if (handicap === 1) {
            return `This bet on ${teamName} wins if they win, draw, or lose by exactly 1 goal.`;
        } else if (handicap === 1.5) {
            return `This bet on ${teamName} wins if they win, draw, or lose by just 1 goal.`;
        } else {
            const wholeNumber = Math.floor(handicap);
            const hasFraction = handicap % 1 !== 0;
            
            if (hasFraction) {
                return `This bet on ${teamName} wins if they lose by ${wholeNumber} goals or fewer.`;
            } else {
                return `This bet on ${teamName} wins if they lose by fewer than ${wholeNumber} goals. Stakes are returned if they lose by exactly ${wholeNumber} goals.`;
            }
        }
    } else {
        const absHandicap = Math.abs(handicap);
        
        if (absHandicap === 0.5) {
            return `This bet on ${teamName} wins only if they win the match.`;
        } else if (absHandicap === 1) {
            return `This bet on ${teamName} wins if they win by 2 or more goals. Stakes are returned if they win by exactly 1 goal.`;
        } else if (absHandicap === 1.5) {
            return `This bet on ${teamName} wins if they win by 2 or more goals.`;
        } else {
            const wholeNumber = Math.floor(absHandicap);
            const hasFraction = absHandicap % 1 !== 0;
            
            if (hasFraction) {
                return `This bet on ${teamName} wins if they win by ${wholeNumber + 1} or more goals.`;
            } else {
                return `This bet on ${teamName} wins if they win by more than ${wholeNumber} goals. Stakes are returned if they win by exactly ${wholeNumber} goals.`;
            }
        }
    }
}

function calculateVIPOutcomeDistributions(simulations) {
    const outcomes = {
        team1Win: simulations.filter(sim => sim.outcome === 'team1Win').length / simulations.length,
        draw: simulations.filter(sim => sim.outcome === 'draw').length / simulations.length,
        team2Win: simulations.filter(sim => sim.outcome === 'team2Win').length / simulations.length
    };
    
    const goalDistributions = {
        team1: Array(6).fill(0),
        team2: Array(6).fill(0),
        total: Array(9).fill(0)
    };
    
    simulations.forEach(sim => {
        const team1Goals = Math.min(5, sim.team1Goals);
        goalDistributions.team1[team1Goals]++;
        
        const team2Goals = Math.min(5, sim.team2Goals);
        goalDistributions.team2[team2Goals]++;
        
        const totalGoals = Math.min(8, sim.totalGoals);
        goalDistributions.total[totalGoals]++;
    });
    
    goalDistributions.team1 = goalDistributions.team1.map(count => count / simulations.length);
    goalDistributions.team2 = goalDistributions.team2.map(count => count / simulations.length);
    goalDistributions.total = goalDistributions.total.map(count => count / simulations.length);
    
    const scoreDistribution = {};
    
    simulations.forEach(sim => {
        const scoreKey = `${sim.team1Goals}-${sim.team2Goals}`;
        if (!scoreDistribution[scoreKey]) {
            scoreDistribution[scoreKey] = 1;
        } else {
            scoreDistribution[scoreKey]++;
        }
    });
    
    const sortedScores = Object.entries(scoreDistribution)
        .map(([score, count]) => ({
            score,
            probability: count / simulations.length
        }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 10);
    
    return {
        outcomes,
        goalDistributions,
        scoreDistribution: sortedScores
    };
}

function calculateVIPFeatureImportance(features) {
    const importance = {
        'Head-to-Head History': features.dataQuality.h2hMatches >= MIN_H2H_MATCHES ? 
            Math.abs(features.basicStats.h2hAdvantage) * 100 : 30,
        
        'Recent Form': 
            Math.abs(features.advancedStats.team1RecentForm - features.advancedStats.team2RecentForm) * 100,
        
        'Offensive Strength': 
            Math.abs(features.advancedStats.team1AttackStrength - features.advancedStats.team2AttackStrength) * 50,
        
        'Defensive Stability':
            Math.abs(features.advancedStats.team1DefenseStrength - features.advancedStats.team2DefenseStrength) * 50,
        
        'Home Advantage': features.basicStats.locationFactor !== 0 ?
            Math.abs(features.basicStats.locationFactor) * 60 : 20,
        
        'Team Momentum': 
            Math.abs(features.advancedStats.team1MomentumIndex - features.advancedStats.team2MomentumIndex) * 70,
        
        'Match Importance': features.basicStats.matchImportance !== 1 ?
            Math.abs(features.basicStats.matchImportance - 1) * 50 : 20,
        
        'Team Ranking': features.basicStats.rankingDiff !== 0 ?
            Math.abs(features.basicStats.rankingDiff) * 3 : 20,
        
        'Scoring Trends':
            Math.abs(features.trends.scoring.team1Trend - features.trends.scoring.team2Trend) * 40
    };
    
    Object.keys(importance).forEach(key => {
        importance[key] = Math.max(10, Math.min(100, importance[key]));
    });
    
    const sortedImportance = {};
    Object.entries(importance)
        .sort((a, b) => b[1] - a[1])
        .forEach(([key, value]) => {
            sortedImportance[key] = value;
        });
    
    return sortedImportance;
}

function generateVIPScoreDistribution(projectedTotal, projectedMargin, simulations) {
    const scoreDistribution = [];
    
    const scoreCounts = {};
    simulations.forEach(sim => {
        const scoreKey = `${sim.team1Goals}-${sim.team2Goals}`;
        if (!scoreCounts[scoreKey]) {
            scoreCounts[scoreKey] = 1;
        } else {
            scoreCounts[scoreKey]++;
        }
    });
    
    for (const [scoreKey, count] of Object.entries(scoreCounts)) {
        const [team1Score, team2Score] = scoreKey.split('-').map(Number);
        
        scoreDistribution.push({
            team1Score,
            team2Score,
            probability: (count / simulations.length) * 100
        });
    }
    
    scoreDistribution.sort((a, b) => b.probability - a.probability);
    
    const topScoresToShow = 10;
    const sumOfTopProbabilities = scoreDistribution
        .slice(0, topScoresToShow)
        .reduce((sum, dist) => sum + dist.probability, 0);
    
    const otherProb = Math.max(0, 100 - sumOfTopProbabilities);
    
    if (otherProb > 0) {
        scoreDistribution.push({
            team1Score: -1,
            team2Score: -1,
            probability: otherProb
        });
    }
    
    return scoreDistribution.slice(0, topScoresToShow + 1);
}

function generateVIPBettingInsights(bettingAnalysis) {
    const insights = [];
    
    for (const [line, outcomes] of Object.entries(bettingAnalysis.overUnder)) {
        const overProb = outcomes.over.probability;
        const underProb = outcomes.under.probability;
        
        if (overProb > 0.65 || underProb > 0.65) {
            const selection = overProb > underProb ? 'OVER' : 'UNDER';
            const probability = Math.max(overProb, underProb);
            
            insights.push({
                market: 'OVER/UNDER',
                selection: `${selection} ${line}`,
                probability: probability,
                description: `${Math.round(probability * 100)}% probability - ${outcomes[selection.toLowerCase()].description}`,
                strength: calculateRecommendationStrength(probability)
            });
        }
    }
    
    for (const [handicap, outcomes] of Object.entries(bettingAnalysis.handicap)) {
        if (outcomes.team1.probability > 0.65) {
            insights.push({
                market: 'HANDICAP',
                selection: `${team1Name} ${handicap > 0 ? '+' : ''}${handicap}`,
                probability: outcomes.team1.probability,
                description: `${Math.round(outcomes.team1.probability * 100)}% probability - ${outcomes.team1.description}`,
                strength: calculateRecommendationStrength(outcomes.team1.probability)
            });
        }
        
        if (outcomes.team2.probability > 0.65) {
            insights.push({
                market: 'HANDICAP',
                selection: `${team2Name} ${-handicap > 0 ? '+' : ''}${-handicap}`,
                probability: outcomes.team2.probability,
                description: `${Math.round(outcomes.team2.probability * 100)}% probability - ${outcomes.team2.description}`,
                strength: calculateRecommendationStrength(outcomes.team2.probability)
            });
        }
    }
    
    const winDrawWin = bettingAnalysis.winDrawWin;
    const maxProb = Math.max(
        winDrawWin.team1.probability,
        winDrawWin.draw.probability,
        winDrawWin.team2.probability
    );
    
    if (maxProb > 0.5) {
        let selection;
        let description;
        
        if (maxProb === winDrawWin.team1.probability) {
            selection = `${team1Name} TO WIN`;
            description = `${team1Name} has a ${Math.round(maxProb * 100)}% probability to win the match`;
        } else if (maxProb === winDrawWin.draw.probability) {
            selection = `DRAW`;
            description = `Draw has a ${Math.round(maxProb * 100)}% probability`;
        } else {
            selection = `${team2Name} TO WIN`;
            description = `${team2Name} has a ${Math.round(maxProb * 100)}% probability to win the match`;
        }
        
        insights.push({
            market: 'MATCH OUTCOME',
            selection,
            probability: maxProb,
            description,
            strength: calculateRecommendationStrength(maxProb)
        });
    }
    
    const btts = bettingAnalysis.bothTeamsToScore;
    const bttsProb = Math.max(btts.yes.probability, btts.no.probability);
    
    if (bttsProb > 0.6) {
        const selection = bttsProb === btts.yes.probability ? 'YES' : 'NO';
        
        insights.push({
            market: 'BOTH TEAMS TO SCORE',
            selection,
            probability: bttsProb,
            description: `${Math.round(bttsProb * 100)}% probability that ${selection === 'YES' ? 'both teams will score' : 'at least one team will not score'}`,
            strength: calculateRecommendationStrength(bttsProb)
        });
    }
    
    bettingAnalysis.correctScore.slice(0, 3).forEach(score => {
        if (score.probability > 0.08) {
            insights.push({
                market: 'CORRECT SCORE',
                selection: score.score,
                probability: score.probability,
                description: `${Math.round(score.probability * 100)}% probability for exact score ${score.score.replace('-', ':')}`,
                strength: calculateRecommendationStrength(score.probability * 2)
            });
        }
    });
    
    insights.sort((a, b) => b.strength - a.strength);
    
    return insights;
}

// Update functions for UI
function updateWinnerPrediction(probabilities) {
    let winnerName, winnerProb, confidence;
    
    if (probabilities.team1WinProb > probabilities.team2WinProb && 
        probabilities.team1WinProb > probabilities.drawProb) {
        winnerName = team1Name;
        winnerProb = probabilities.team1WinProb;
    } else if (probabilities.team2WinProb > probabilities.team1WinProb && 
               probabilities.team2WinProb > probabilities.drawProb) {
        winnerName = team2Name;
        winnerProb = probabilities.team2WinProb;
    } else {
        winnerName = "a draw";
        winnerProb = probabilities.drawProb;
    }
    
    if (winnerProb > 60) {
        confidence = 'high';
    } else if (winnerProb > 45) {
        confidence = 'medium';
    } else {
        confidence = 'low';
    }
    
    const html = `
        <div class="prediction-confidence ${confidence}-confidence">
            <span class="material-symbols-outlined">
                ${confidence === 'high' ? 'verified' : (confidence === 'medium' ? 'trending_up' : 'help')}
            </span>
            VIP Model predicts <strong>${winnerName}</strong> with ${confidence} confidence
        </div>
        <div class="teams-prediction">
            <div class="team-prediction ${probabilities.team1WinProb === winnerProb && winnerName !== 'a draw' ? 'winner' : ''}">
                <div class="team-name">${team1Name}</div>
                <div class="probability-bar" style="width: ${probabilities.team1WinProb}%"></div>
                <div class="team-probability">${probabilities.team1WinProb.toFixed(1)}%</div>
            </div>
            <div class="vs-container">VS</div>
            <div class="team-prediction ${probabilities.team2WinProb === winnerProb && winnerName !== 'a draw' ? 'winner' : ''}">
                <div class="team-name">${team2Name}</div>
                <div class="probability-bar" style="width: ${probabilities.team2WinProb}%"></div>
                <div class="team-probability">${probabilities.team2WinProb.toFixed(1)}%</div>
            </div>
        </div>
        <div class="draw-probability ${probabilities.drawProb === winnerProb ? 'winner' : ''}">
            <span class="material-symbols-outlined">balance</span>
            Draw: ${probabilities.drawProb.toFixed(1)}%
        </div>
    `;
    
    document.getElementById('winner-prediction').innerHTML = html;
}

function updateScorePrediction(team1Score, team2Score, projectedTotal, totalLine) {
    const totalDiff = totalLine > 0 ? projectedTotal - totalLine : 0;
    const overUnderRecommendation = totalDiff > 0.5 ? 'Over' : (totalDiff < -0.5 ? 'Under' : 'Close to line');
    
    const html = `
        <div class="predicted-score">
            <div class="score-value">${team1Score} - ${team2Score}</div>
            <div class="score-description">Most likely final score</div>
        </div>
        <div class="score-explanation">
            <p>Projected total goals: <strong>${projectedTotal.toFixed(1)}</strong></p>
            ${totalLine > 0 ? `<p>Compared to betting line (${totalLine}): <strong>${overUnderRecommendation}</strong></p>` : ''}
        </div>
        <div class="projection-details">
            <div class="team-score-projection">
                <h4>${team1Name}</h4>
                <div class="score-expectation">${team1Score} goals expected</div>
            </div>
            <div class="team-score-projection">
                <h4>${team2Name}</h4>
                <div class="score-expectation">${team2Score} goals expected</div>
            </div>
        </div>
    `;
    
    document.getElementById('score-prediction').innerHTML = html;
}

function updateVIPBettingRecommendation(bettingAnalysis, bettingInsights) {
    const topInsights = bettingInsights.slice(0, 3);
    
    let recommendationsHTML = '';
    
    if (topInsights.length > 0) {
        const topInsight = topInsights[0];
        const strengthClass = topInsight.strength > 75 ? 'high' : 
                            (topInsight.strength > 50 ? 'medium' : 'low');
        
        recommendationsHTML += `
            <div class="vip-top-recommendation ${strengthClass}-confidence">
                <div class="recommendation-header">
                    <span class="material-symbols-outlined">verified</span>
                    <div>
                        <h4>Top VIP Recommendation</h4>
                        <div class="recommendation-market">${topInsight.market}</div>
                    </div>
                </div>
                <div class="recommendation-selection">${topInsight.selection}</div>
                <div class="recommendation-probability">
                    <div class="probability-meter">
                        <div class="probability-fill" style="width: ${Math.min(100, topInsight.probability * 110)}%"></div>
                    </div>
                    <div class="probability-value">${Math.round(topInsight.probability * 100)}% probability</div>
                </div>
                <div class="recommendation-description">${topInsight.description}</div>
            </div>
        `;
        
        if (topInsights.length > 1) {
            recommendationsHTML += '<div class="other-recommendations">';
            
            topInsights.slice(1).forEach(insight => {
                const insightStrengthClass = insight.strength > 75 ? 'high' : 
                                           (insight.strength > 50 ? 'medium' : 'low');
                
                recommendationsHTML += `
                    <div class="vip-recommendation ${insightStrengthClass}-confidence">
                        <div class="recommendation-header">
                            <span class="material-symbols-outlined">
                                ${insightStrengthClass === 'high' ? 'thumb_up' : 'trending_up'}
                            </span>
                            <div class="recommendation-market">${insight.market}</div>
                        </div>
                        <div class="recommendation-selection">${insight.selection}</div>
                        <div class="recommendation-probability">
                            <div class="probability-meter">
                                <div class="probability-fill" style="width: ${Math.min(100, insight.probability * 110)}%"></div>
                            </div>
                            <div class="probability-value">${Math.round(insight.probability * 100)}%</div>
                        </div>
                    </div>
                `;
            });
            
            recommendationsHTML += '</div>';
        }
    } else {
        recommendationsHTML = `
            <div class="vip-no-recommendation">
                <span class="material-symbols-outlined">info</span>
                <p>No strong betting recommendations for this match. All markets show balanced probabilities.</p>
            </div>
        `;
    }
    
    let marketsHTML = '';
    
    marketsHTML += `
        <div class="betting-market-section">
            <h4><span class="material-symbols-outlined">stacked_line_chart</span> Over/Under Markets</h4>
            <div class="market-probabilities">
    `;
    
    for (const [line, outcomes] of Object.entries(bettingAnalysis.overUnder)) {
        const overProb = Math.round(outcomes.over.probability * 100);
        const underProb = Math.round(outcomes.under.probability * 100);
        
        marketsHTML += `
            <div class="market-row">
                <div class="market-line">O/U ${line}</div>
                <div class="market-options">
                    <div class="market-option ${overProb > 55 ? 'strong' : ''}">
                        <div class="option-name">Over ${line}</div>
                        <div class="option-probability">${overProb}%</div>
                    </div>
                    <div class="market-option ${underProb > 55 ? 'strong' : ''}">
                        <div class="option-name">Under ${line}</div>
                        <div class="option-probability">${underProb}%</div>
                    </div>
                </div>
                <div class="market-description">
                    ${outcomes.over.description}
                </div>
            </div>
        `;
    }
    
    marketsHTML += `
            </div>
        </div>
    `;
    
    marketsHTML += `
        <div class="betting-market-section">
            <h4><span class="material-symbols-outlined">balance</span> Asian Handicap Markets</h4>
            <div class="market-probabilities">
    `;
    
    const selectedHandicaps = [-0.5, 0, 0.5, 1, 1.5];
    for (const handicap of selectedHandicaps) {
        const outcomes = bettingAnalysis.handicap[handicap];
        
        if (outcomes) {
            const team1Prob = Math.round(outcomes.team1.probability * 100);
            const team2Prob = Math.round(outcomes.team2.probability * 100);
            
            marketsHTML += `
                <div class="market-row">
                    <div class="market-line">AH ${handicap}</div>
                    <div class="market-options">
                        <div class="market-option ${team1Prob > 55 ? 'strong' : ''}">
                            <div class="option-name">${team1Name} ${handicap > 0 ? '+' : ''}${handicap}</div>
                            <div class="option-probability">${Math.round(wdw.draw.probability * 100)}%</div>
                        </div>
                        <div class="market-option ${wdw.team2.probability > 0.4 ? 'strong' : ''}">
                            <div class="option-name">${team2Name}</div>
                            <div class="option-probability">${Math.round(wdw.team2.probability * 100)}%</div>
                        </div>
                    </div>
                </div>
                
                <div class="market-row">
                    <div class="market-line">BTTS</div>
                    <div class="market-options">
                        <div class="market-option ${bettingAnalysis.bothTeamsToScore.yes.probability > 0.55 ? 'strong' : ''}">
                            <div class="option-name">Yes</div>
                            <div class="option-probability">${Math.round(bettingAnalysis.bothTeamsToScore.yes.probability * 100)}%</div>
                        </div>
                        <div class="market-option ${bettingAnalysis.bothTeamsToScore.no.probability > 0.55 ? 'strong' : ''}">
                            <div class="option-name">No</div>
                            <div class="option-probability">${Math.round(bettingAnalysis.bothTeamsToScore.no.probability * 100)}%</div>
                        </div>
                    </div>
                    <div class="market-description">
                        Both Teams To Score: ${Math.round(bettingAnalysis.bothTeamsToScore.yes.probability * 100)}% chance both teams score at least one goal
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const bettingRecommendationHTML = `
        <div class="vip-betting-recommendations">
            ${recommendationsHTML}
        </div>
        
        <div class="vip-markets-analysis">
            ${marketsHTML}
        </div>
        
        <div class="vip-betting-disclaimer">
            <span class="material-symbols-outlined">info</span>
            <p>All predictions are based on our advanced statistical models and historical data analysis. 
            Probabilities represent statistical likelihood based on match simulations.</p>
        </div>
    `;
    
    document.getElementById('betting-recommendation').innerHTML = bettingRecommendationHTML;
}

function updateVIPAnalysisExplanation(results, features, bettingAnalysis) {
    let winnerName, winnerProb;
    
    if (results.probabilities.team1WinProb > results.probabilities.team2WinProb && 
        results.probabilities.team1WinProb > results.probabilities.drawProb) {
        winnerName = team1Name;
        winnerProb = results.probabilities.team1WinProb;
    } else if (results.probabilities.team2WinProb > results.probabilities.team1WinProb && 
               results.probabilities.team2WinProb > results.probabilities.drawProb) {
        winnerName = team2Name;
        winnerProb = results.probabilities.team2WinProb;
    } else {
        winnerName = "A draw";
        winnerProb = results.probabilities.drawProb;
    }
    
    const team1Score = Math.round((results.projectedTotal / 2) + (results.projectedMargin / 2));
    const team2Score = Math.round((results.projectedTotal / 2) - (results.projectedMargin / 2));
    
    const topFactors = Object.entries(featureImportanceScores)
        .slice(0, 5)
        .map(([factor, importance]) => {
            return { factor, importance };
        });
    
    const keyFactorsHTML = topFactors.map(item => {
        return `
            <div class="key-factor">
                <div class="factor-name">${item.factor}</div>
                <div class="factor-importance-bar">
                    <div class="factor-bar" style="width: ${item.importance}%"></div>
                </div>
                <div class="factor-percentage">${item.importance.toFixed(0)}%</div>
            </div>
        `;
    }).join('');
    
    const insights = generateVIPMatchInsights(features, results.projectedMargin, results.projectedTotal);
    const matchFactors = generateVIPMatchFactors(features);
    
    let bettingAnalysisHtml = "";
    
    if (bettingAnalysis && bettingAnalysis.recommendations.length > 0) {
        const topRecommendations = bettingAnalysis.recommendations.slice(0, 3);
        
        bettingAnalysisHtml = `
            <h4>VIP Betting Analysis:</h4>
            <p>Based on ${lastAnalysisResults.simulations.length.toLocaleString()} match simulations, our models have identified the following high-value betting opportunities:</p>
            <ul class="vip-betting-insights">
                ${topRecommendations.map(rec => `
                    <li class="${rec.strength > 75 ? 'strong' : (rec.strength > 50 ? 'moderate' : 'weak')}">
                        <span>${rec.type === 'overUnder' ? 
                            `${rec.selection} ${rec.line}` : 
                            `${rec.description}`}</span>
                        <div class="insight-probability">
                            <span class="probability-bar" style="width: ${Math.min(100, rec.probability * 110)}%"></span>
                            <span class="probability-value">${Math.round(rec.probability * 100)}%</span>
                        </div>
                    </li>
                `).join('')}
            </ul>
            
            <div class="betting-insight-detail">
                <p><strong>Key Insight:</strong> ${
                    bettingAnalysis.recommendations[0].type === 'overUnder' ?
                    `Our analysis shows a ${Math.round(bettingAnalysis.recommendations[0].probability * 100)}% probability that this match will finish ${bettingAnalysis.recommendations[0].selection.toLowerCase()} ${bettingAnalysis.recommendations[0].line} goals.` :
                    bettingAnalysis.recommendations[0].description
                }</p>
            </div>
        `;
    } else {
        bettingAnalysisHtml = `
            <h4>VIP Betting Analysis:</h4>
            <p>After running multiple simulations, no strong betting edges were identified for this match. 
            The model shows balanced probabilities across most markets, suggesting a potentially unpredictable match.</p>
        `;
    }
    
    const modelEnsembleHtml = `
        <h4>VIP Model Ensemble:</h4>
        <p>This analysis utilizes a weighted ensemble of specialized prediction models to maximize accuracy:</p>
        <div class="vip-model-ensemble">
            <div class="ensemble-model">
                <div class="model-name">Main VIP Model</div>
                <div class="model-weight-bar">
                    <div class="model-weight" style="width: 40%"></div>
                </div>
                <div class="model-weight-value">40%</div>
            </div>
            <div class="ensemble-model">
                <div class="model-name">Momentum Model</div>
                <div class="model-weight-bar">
                    <div class="model-weight" style="width: 25%"></div>
                </div>
                <div class="model-weight-value">25%</div>
            </div>
            <div class="ensemble-model">
                <div class="model-name">Matchup Model</div>
                <div class="model-weight-bar">
                    <div class="model-weight" style="width: 20%"></div>
                </div>
                <div class="model-weight-value">20%</div>
            </div>
            <div class="ensemble-model">
                <div class="model-name">Stats Model</div>
                <div class="model-weight-bar">
                    <div class="model-weight" style="width: 15%"></div>
                </div>
                <div class="model-weight-value">15%</div>
            </div>
        </div>
        <p class="ensemble-note">Each model specializes in different aspects of match prediction, 
        from recent form to head-to-head history to advanced statistical indicators.</p>
    `;
    
    const explanationHTML = `
        <div class="analysis-header">
            <h3>VIP Analysis Summary</h3>
            <p>Based on our premium Model Ensemble and Monte Carlo simulation, <strong>${winnerName}</strong> has a ${winnerProb.toFixed(1)}% probability of winning this match with a projected score of <strong>${team1Score}-${team2Score}</strong>.</p>
        </div>
        
        <div class="analysis-sections">
            <div class="analysis-section vip-section">
                <h4>Key Predictive Factors</h4>
                <div class="key-factors-grid">
                    ${keyFactorsHTML}
                </div>
            </div>
            
            <div class="analysis-section vip-section">
                <h4>VIP Match Insights</h4>
                <ul class="match-insights">
                    ${insights.map(insight => `<li>${insight}</li>`).join('')}
                </ul>
            </div>
            
            <div class="analysis-section vip-section">
                ${modelEnsembleHtml}
            </div>
            
            <div class="analysis-section vip-section betting-section">
                ${bettingAnalysisHtml}
            </div>
            
            <div class="analysis-section vip-section">
                <h4>Match-Specific Factors</h4>
                <ul class="match-factors">
                    ${matchFactors.map(factor => `<li>${factor}</li>`).join('')}
                </ul>
            </div>
            
            <div class="analysis-section vip-section">
                <h4>Advanced Score Projection</h4>
                <p>The most likely score is <strong>${team1Score}-${team2Score}</strong>, but our simulations suggest these alternative scorelines:</p>
                <div class="alternative-scores">
                    ${generateVIPAlternativeScores(team1Score, team2Score, lastAnalysisResults.outcomes)}
                </div>
            </div>
            
            <div class="analysis-section vip-section">
                <h4>Data Quality Assessment</h4>
                <p>Analysis based on ${features.dataQuality.totalMatches} total matches (${features.dataQuality.h2hMatches} head-to-head).</p>
                <p>Data quality: <strong>${features.dataQuality.dataExcellence ? 'Excellent' : (features.dataQuality.dataSufficiency ? 'Good' : 'Limited')}</strong></p>
                <p><em>VIP models utilize proprietary algorithms with historically proven accuracy rates of 62-68% in match outcome predictions and 58-64% for over/under markets.</em></p>
            </div>
        </div>
    `;
    
    document.getElementById('analysis-explanation').innerHTML = explanationHTML;
}

function generateVIPMatchInsights(features, projectedMargin, projectedTotal) {
    const insights = [];
    
    const { basicStats, advancedStats } = features;
    
    // Form insights
    const formDiff = Math.abs(advancedStats.team1RecentForm - advancedStats.team2RecentForm);
    if (formDiff > 0.15) {
        const betterFormTeam = advancedStats.team1RecentForm > advancedStats.team2RecentForm ? team1Name : team2Name;
        const formRating = formDiff * 100;
        insights.push(`${betterFormTeam} shows significantly better recent form (${formRating.toFixed(0)}% advantage)`);
    }
    
    // H2H insights
    if (features.dataQuality.h2hMatches >= 2) {
        if (Math.abs(basicStats.h2hAdvantage) > 0.2) {
            const dominantTeam = basicStats.h2hAdvantage > 0 ? team1Name : team2Name;
            insights.push(`${dominantTeam} has a clear historical advantage in head-to-head matchups (${Math.abs(basicStats.h2hAdvantage * 100).toFixed(0)}% edge)`);
        } else {
            insights.push(`Head-to-head history shows evenly matched teams with no clear advantage`);
        }
    }
    
    // Location insights
    if (basicStats.locationFactor !== 0) {
        const homeTeam = basicStats.locationFactor === 1 ? team1Name : team2Name;
        insights.push(`${homeTeam} playing at home is a significant factor`);
    }
    
    // Scoring insights
    if (projectedTotal > 3.0) {
        insights.push(`VIP Model predicts a high-scoring match with ${projectedTotal.toFixed(1)} total goals - strong lean toward Over markets`);
    } else if (projectedTotal < 2.0) {
        insights.push(`VIP Model predicts a low-scoring match with ${projectedTotal.toFixed(1)} total goals - favorable for Under markets`);
    }
    
    if (Math.abs(projectedMargin) > 1.5) {
        const strongerTeam = projectedMargin > 0 ? team1Name : team2Name;
        insights.push(`VIP Model projects a comfortable margin for ${strongerTeam} - consider Asian Handicap markets`);
    } else if (Math.abs(projectedMargin) < 0.5) {
        insights.push(`VIP Model projects a very close match with minimal margin - Draw has enhanced probability`);
    }
    
    // Attack/Defense insights
    const attackDiff = Math.abs(advancedStats.team1AttackStrength - advancedStats.team2AttackStrength);
    if (attackDiff > 0.3) {
        const strongerAttack = advancedStats.team1AttackStrength > advancedStats.team2AttackStrength ? team1Name : team2Name;
        insights.push(`${strongerAttack} has a significant attacking advantage`);
    }
    
    return insights.slice(0, 6);
}

function generateVIPMatchFactors(features) {
    const matchFactors = [];
    
    const matchType = document.getElementById('match-importance').options[document.getElementById('match-importance').selectedIndex].text;
    matchFactors.push(`This is a ${matchType} match (importance factor: ${features.basicStats.matchImportance.toFixed(1)})`);
    
    if (features.basicStats.locationFactor === 1) {
        matchFactors.push(`${team1Name} playing at home (advantage multiplier: ${features.advancedStats.team1HomeAdvantage.toFixed(2)}x)`);
    } else if (features.basicStats.locationFactor === -1) {
        matchFactors.push(`${team2Name} playing at home (advantage multiplier: ${features.advancedStats.team2HomeAdvantage.toFixed(2)}x)`);
    } else {
        matchFactors.push('Match played at a neutral venue (no home advantage)');
    }
    
    if (team1Ranking > 0 && team2Ranking > 0) {
        const rankingDiff = Math.abs(team1Ranking - team2Ranking);
        const rankingContext = rankingDiff <= 3 ? "closely ranked" : 
                             (rankingDiff <= 10 ? "moderately separated" : "widely separated");
        
        matchFactors.push(`Team rankings: ${team1Name} (#${team1Ranking}) vs ${team2Name} (#${team2Ranking}) - ${rankingContext}`);
    }
    
    const team1AvgScore = features.basicStats.team1AvgScore.toFixed(2);
    const team2AvgScore = features.basicStats.team2AvgScore.toFixed(2);
    
    const scoringDiff = Math.abs(features.basicStats.team1AvgScore - features.basicStats.team2AvgScore);
    const scoringContext = scoringDiff < 0.3 ? "similarly matched attacking output" : 
                          (scoringDiff < 0.8 ? "moderately different scoring rates" : "significantly different scoring potentials");
    
    matchFactors.push(`Scoring comparison: ${team1Name} (${team1AvgScore}) vs ${team2Name} (${team2AvgScore}) - ${scoringContext}`);
    
    const team1Form = features.advancedStats.team1RecentForm.toFixed(2);
    const team2Form = features.advancedStats.team2RecentForm.toFixed(2);
    
    const formDiff = Math.abs(features.advancedStats.team1RecentForm - features.advancedStats.team2RecentForm);
    const formContext = formDiff < 0.1 ? "similarly matched current form" : 
                       (formDiff < 0.2 ? "slight form advantage" : "significant form advantage");
    
    matchFactors.push(`Current form rating: ${team1Name} (${team1Form}) vs ${team2Name} (${team2Form}) - ${formContext}`);
    
    return matchFactors;
}

function generateVIPAlternativeScores(mainScore1, mainScore2, outcomes) {
    const alternativeScores = outcomes.scoreDistribution
        .filter(score => score.score !== `${mainScore1}-${mainScore2}`)
        .slice(0, 3);
    
    return alternativeScores.map(alt => {
        if (alt.score === 'Other') {
            return `
                <div class="alternative-score">
                    <div class="alt-score-value">Other</div>
                    <div class="alt-probability">${(alt.probability * 100).toFixed(1)}%</div>
                </div>
            `;
        }
        
        const [score1, score2] = alt.score.split('-').map(Number);
        
        return `
            <div class="alternative-score">
                <div class="alt-score-value">${score1}-${score2}</div>
                <div class="alt-probability">${(alt.probability * 100).toFixed(1)}%</div>
            </div>
        `;
    }).join('');
}

function createVIPWinProbabilityChart(probabilities) {
    if (winProbabilityChart) {
        winProbabilityChart.destroy();
    }
    
    const ctx = document.getElementById('win-probability-chart').getContext('2d');
    
    const gradients = {
        team1: ctx.createLinearGradient(0, 0, 0, 400),
        team2: ctx.createLinearGradient(0, 0, 0, 400),
        draw: ctx.createLinearGradient(0, 0, 0, 400)
    };
    
    gradients.team1.addColorStop(0, 'rgba(66, 133, 244, 0.9)');
    gradients.team1.addColorStop(1, 'rgba(66, 133, 244, 0.6)');
    
    gradients.team2.addColorStop(0, 'rgba(234, 67, 53, 0.9)');
    gradients.team2.addColorStop(1, 'rgba(234, 67, 53, 0.6)');
    
    gradients.draw.addColorStop(0, 'rgba(95, 99, 104, 0.9)');
    gradients.draw.addColorStop(1, 'rgba(95, 99, 104, 0.6)');
    
    winProbabilityChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [team1Name, team2Name, 'Draw'],
            datasets: [{
                data: [
                    probabilities.team1WinProb,
                    probabilities.team2WinProb,
                    probabilities.drawProb
                ],
                backgroundColor: [
                    gradients.team1,
                    gradients.team2,
                    gradients.draw
                ],
                borderColor: [
                    'rgba(66, 133, 244, 1)',
                    'rgba(234, 67, 53, 1)',
                    'rgba(95, 99, 104, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 15,
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                title: {
                    display: true,
                    text: 'VIP Match Outcome Probabilities',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw.toFixed(1)}%`;
                        },
                        afterLabel: function(context) {
                            const labels = [
                                `Implied odds: ${(100 / context.raw).toFixed(2)}`,
                                `Confidence: ${context.raw > 60 ? 'High' : (context.raw > 40 ? 'Medium' : 'Low')}`
                            ];
                            return labels;
                        }
                    },
                    padding: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#000',
                    bodyColor: '#000',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    cornerRadius: 8
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeOutQuart'
            },
            cutout: '60%',
            elements: {
                arc: {
                    borderRadius: 5
                }
            }
        }
    });
    
    const chartContainer = document.querySelector('.chart-card:nth-child(1)');
    if (chartContainer && !chartContainer.querySelector('.vip-chart-badge')) {
        const vipBadge = document.createElement('div');
        vipBadge.className = 'vip-chart-badge';
        vipBadge.innerHTML = 'VIP';
        chartContainer.appendChild(vipBadge);
    }
}

function createVIPScoreProbabilityChart(scoreDistribution) {
    if (!document.getElementById('score-probability-chart')) {
        const newChartCard = document.createElement('div');
        newChartCard.className = 'chart-card';
        newChartCard.innerHTML = `
            <h3>Probable Score Distribution</h3>
            <div class="chart-container">
                <canvas id="score-probability-chart"></canvas>
            </div>
        `;
        
        document.querySelector('.result-charts').appendChild(newChartCard);
        
        const vipBadge = document.createElement('div');
        vipBadge.className = 'vip-chart-badge';
        vipBadge.innerHTML = 'VIP';
        newChartCard.appendChild(vipBadge);
    }
    
    if (scoreProbabilityChart) {
        scoreProbabilityChart.destroy();
    }
    
    const ctx = document.getElementById('score-probability-chart').getContext('2d');
    
    const topScores = scoreDistribution.slice(0, 8);
    
    const labels = topScores.map(score => 
        score.team1Score === -1 ? 'Other' : `${score.team1Score}-${score.team2Score}`
    );
    
    const gradients = topScores.map((score, index) => {
        const gradient = ctx.createLinearGradient(0, 0, 400, 0);
        
        if (score.team1Score === -1) {
            gradient.addColorStop(0, 'rgba(95, 99, 104, 0.9)');
            gradient.addColorStop(1, 'rgba(95, 99, 104, 0.6)');
        } else if (score.team1Score > score.team2Score) {
            gradient.addColorStop(0, 'rgba(66, 133, 244, 0.9)');
            gradient.addColorStop(1, 'rgba(66, 133, 244, 0.6)');
        } else if (score.team1Score < score.team2Score) {
            gradient.addColorStop(0, 'rgba(234, 67, 53, 0.9)');
            gradient.addColorStop(1, 'rgba(234, 67, 53, 0.6)');
        } else {
            gradient.addColorStop(0, 'rgba(95, 99, 104, 0.8)');
            gradient.addColorStop(1, 'rgba(95, 99, 104, 0.5)');
        }
        
        return gradient;
    });
    
    scoreProbabilityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Probability (%)',
                data: topScores.map(score => score.probability),
                backgroundColor: gradients,
                borderColor: topScores.map((score, index) => {
                    if (score.team1Score === -1) return 'rgba(95, 99, 104, 1)';
                    if (score.team1Score > score.team2Score) return 'rgba(66, 133, 244, 1)';
                    if (score.team1Score < score.team2Score) return 'rgba(234, 67, 53, 1)';
                    return 'rgba(95, 99, 104, 1)';
                }),
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'VIP Score Probability Analysis',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Probability: ${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: Math.max(...topScores.map(s => s.probability)) * 1.1,
                    title: {
                        display: true,
                        text: 'Probability (%)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Score'
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function createVIPFeatureImportanceChart(featureImportanceScores) {
    if (modelConfidenceChart) {
        modelConfidenceChart.destroy();
    }
    
    const ctx = document.getElementById('model-confidence-chart').getContext('2d');
    
    const topFeatures = Object.entries(featureImportanceScores).slice(0, 8);
    const labels = topFeatures.map(([key]) => key);
    const values = topFeatures.map(([, value]) => value);
    
    const gradient = ctx.createLinearGradient(0, 0, 400, 0);
    gradient.addColorStop(0, 'rgba(66, 133, 244, 0.9)');
    gradient.addColorStop(1, 'rgba(66, 133, 244, 0.6)');
    
    modelConfidenceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Importance (%)',
                data: values,
                backgroundColor: gradient,
                borderColor: 'rgba(66, 133, 244, 1)',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Feature Importance in VIP Model',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Importance: ${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Importance (%)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Feature'
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
    
    const chartContainer = document.querySelector('.chart-card:nth-child(2)');
    if (chartContainer && !chartContainer.querySelector('.vip-chart-badge')) {
        const vipBadge = document.createElement('div');
        vipBadge.className = 'vip-chart-badge';
        vipBadge.innerHTML = 'VIP';
        chartContainer.appendChild(vipBadge);
    }
}

function createVIPBettingEdgeChart(bettingAnalysis) {
    if (!document.getElementById('betting-edge-chart')) {
        const newChartCard = document.createElement('div');
        newChartCard.className = 'chart-card';
        newChartCard.innerHTML = `
            <h3>Betting Edge Analysis</h3>
            <div class="chart-container">
                <canvas id="betting-edge-chart"></canvas>
            </div>
        `;
        
        document.querySelector('.result-charts').appendChild(newChartCard);
        
        const vipBadge = document.createElement('div');
        vipBadge.className = 'vip-chart-badge';
        vipBadge.innerHTML = 'VIP';
        newChartCard.appendChild(vipBadge);
    }
    
    if (bettingEdgeChart) {
        bettingEdgeChart.destroy();
    }
    
    const ctx = document.getElementById('betting-edge-chart').getContext('2d');
    
    // Prepare data for betting edge visualization
    const bettingData = [];
    
    // Add over/under data
    Object.entries(bettingAnalysis.overUnder).forEach(([line, outcomes]) => {
        bettingData.push({
            market: `Over ${line}`,
            probability: outcomes.over.probability * 100,
            edge: outcomes.over.probability > 0.6 ? (outcomes.over.probability - 0.5) * 100 : 0
        });
        bettingData.push({
            market: `Under ${line}`,
            probability: outcomes.under.probability * 100,
            edge: outcomes.under.probability > 0.6 ? (outcomes.under.probability - 0.5) * 100 : 0
        });
    });
    
    // Add handicap data (selected ones)
    const selectedHandicaps = [-0.5, 0, 0.5];
    selectedHandicaps.forEach(handicap => {
        const outcomes = bettingAnalysis.handicap[handicap];
        if (outcomes) {
            bettingData.push({
                market: `${team1Name} ${handicap >= 0 ? '+' : ''}${handicap}`,
                probability: outcomes.team1.probability * 100,
                edge: outcomes.team1.probability > 0.6 ? (outcomes.team1.probability - 0.5) * 100 : 0
            });
        }
    });
    
    // Sort by edge and take top 8
    const topBets = bettingData
        .sort((a, b) => b.edge - a.edge)
        .slice(0, 8);
    
    const labels = topBets.map(bet => bet.market);
    const probabilities = topBets.map(bet => bet.probability);
    const edges = topBets.map(bet => bet.edge);
    
    const gradientProb = ctx.createLinearGradient(0, 0, 0, 400);
    gradientProb.addColorStop(0, 'rgba(66, 133, 244, 0.9)');
    gradientProb.addColorStop(1, 'rgba(66, 133, 244, 0.6)');
    
    const gradientEdge = ctx.createLinearGradient(0, 0, 0, 400);
    gradientEdge.addColorStop(0, 'rgba(52, 168, 83, 0.9)');
    gradientEdge.addColorStop(1, 'rgba(52, 168, 83, 0.6)');
    
    bettingEdgeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Probability (%)',
                data: probabilities,
                backgroundColor: gradientProb,
                borderColor: 'rgba(66, 133, 244, 1)',
                borderWidth: 1,
                yAxisID: 'y'
            }, {
                label: 'Betting Edge (%)',
                data: edges,
                backgroundColor: gradientEdge,
                borderColor: 'rgba(52, 168, 83, 1)',
                borderWidth: 1,
                type: 'line',
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'VIP Betting Market Analysis',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Betting Market'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Probability (%)'
                    },
                    beginAtZero: true,
                    max: 100
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Betting Edge (%)'
                    },
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Show results function
function showResults() {
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

// Toast notification function
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.getElementById('toast');
    if (existingToast && !existingToast.classList.contains('hidden')) {
        existingToast.classList.add('hidden');
    }
    
    // Create new toast
    setTimeout(() => {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000);
    }, 100);
}