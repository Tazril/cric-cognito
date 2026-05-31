import React, { useState, useEffect } from 'react';

interface ScorecardViewProps {
  matchId: number;
}

const ScorecardView: React.FC<ScorecardViewProps> = ({ matchId }) => {
  const [data, setData] = useState<any>(null);
  const [activeInnings, setActiveInnings] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/mcenter/scorecard/${matchId}`);
        const json = await response.json();
        setData(json);
        // By default, show the most recent innings
        if (json.scoreCard && json.scoreCard.length > 0) {
          // If we want the most recent, it might be the last one in the array if sorted chronologically,
          // or we can default to inningsId matching the active one. Let's just default to the last one (most recent).
          setActiveInnings(json.scoreCard.length - 1);
        }
      } catch (error) {
        console.error('Failed to fetch scorecard:', error);
      }
    };

    fetchData();
    // Scorecard doesn't need to poll as aggressively, but we can update every 15s
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <div style={{ padding: '24px 0' }}>Loading scorecard...</div>;
  }

  const { scoreCard, status } = data;
  if (!scoreCard || scoreCard.length === 0) {
    return <div style={{ padding: '24px 0' }}>No scorecard data available.</div>;
  }

  const currentScorecard = scoreCard[activeInnings];
  const batTeam = currentScorecard.batTeamDetails;
  const bowlTeam = currentScorecard.bowlTeamDetails;
  const scoreDetails = currentScorecard.scoreDetails;
  const extrasData = currentScorecard.extrasData;
  const wicketsData = currentScorecard.wicketsData || {};

  // Extract batsmen arrays
  const batsmenKeys = Object.keys(batTeam.batsmenData).sort((a, b) => parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]));
  const batters = batsmenKeys.map(k => batTeam.batsmenData[k]);

  // Split into batted and yet to bat
  const battedBatters = batters.filter(b => b.outDesc);
  const yetToBat = batters.filter(b => !b.outDesc);

  // Extract bowlers arrays
  const bowlersKeys = Object.keys(bowlTeam.bowlersData).sort((a, b) => parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]));
  const bowlers = bowlersKeys.map(k => bowlTeam.bowlersData[k]);

  // Extract wickets arrays
  const wicketsKeys = Object.keys(wicketsData).sort((a, b) => parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]));
  const wickets = wicketsKeys.map(k => wicketsData[k]);

  return (
    <div>
      {/* Match Status */}
      <div style={{ color: '#d32f2f', fontSize: '15px', marginBottom: '16px', fontWeight: '500' }}>
        {status}
      </div>

      {/* Innings Toggles */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {scoreCard.map((innings: any, index: number) => {
          const isActive = index === activeInnings;
          return (
            <button
              key={index}
              onClick={() => setActiveInnings(index)}
              style={{
                padding: '6px 16px',
                borderRadius: '16px',
                border: 'none',
                backgroundColor: isActive ? '#009270' : '#e0e0e0',
                color: isActive ? 'white' : '#4a4a4a',
                fontSize: '14px',
                fontWeight: isActive ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              {innings.batTeamDetails.batTeamShortName} ({innings.inningsId} {innings.inningsId === 1 ? 'st' : innings.inningsId === 2 ? 'nd' : 'rd'} Inn)
            </button>
          );
        })}
      </div>

      {/* Batting Header */}
      <div style={{ backgroundColor: '#009270', color: 'white', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', fontWeight: 'bold' }}>
        <span>{batTeam.batTeamName}</span>
        <span>{scoreDetails.runs}-{scoreDetails.wickets} ({scoreDetails.overs} Ov)</span>
      </div>

      {/* Batting Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', fontFamily: 'Arial, sans-serif', marginBottom: '16px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f3f3', color: '#333' }}>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'left' }}>Frontend Resources (Batters)</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Points (R)</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Tasks (B)</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Milestones (4s)</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Epics (6s)</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Velocity (SR)</th>
          </tr>
        </thead>
        <tbody>
          {battedBatters.map((b, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fcfcfc' }}>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', color: '#1f1f1f', fontWeight: 'bold' }}>{b.batName} {b.isCaptain ? '(c)' : ''} {b.isKeeper ? '(wk)' : ''}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', color: '#4a4a4a' }}>{b.outDesc}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', fontWeight: 'bold', textAlign: 'center' }}>{b.runs}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.balls}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.fours}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.sixes}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.strikeRate}</td>
            </tr>
          ))}
          {/* Extras Row */}
          <tr style={{ backgroundColor: '#f9f9f9' }}>
            <td style={{ padding: '6px', border: '1px solid #e0e0e0', fontWeight: 'bold' }}>Unallocated Buffer (Extras)</td>
            <td colSpan={6} style={{ padding: '6px', border: '1px solid #e0e0e0', fontWeight: 'bold' }}>
              {extrasData.total} <span style={{ fontWeight: 'normal' }}>(b {extrasData.byes}, lb {extrasData.legByes}, w {extrasData.wides}, nb {extrasData.noBalls}, p {extrasData.penalty})</span>
            </td>
          </tr>
          {/* Total Row */}
          <tr style={{ backgroundColor: '#f9f9f9' }}>
            <td style={{ padding: '6px', border: '1px solid #e0e0e0', fontWeight: 'bold' }}>Aggregate (Total)</td>
            <td colSpan={6} style={{ padding: '6px', border: '1px solid #e0e0e0', fontWeight: 'bold' }}>
              {scoreDetails.runs}-{scoreDetails.wickets} <span style={{ fontWeight: 'normal' }}>({scoreDetails.overs} Overs, RR: {scoreDetails.runRate})</span>
            </td>
          </tr>
          {/* Yet to Bat Row */}
          {yetToBat.length > 0 && (
            <tr style={{ backgroundColor: 'white' }}>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', fontWeight: 'bold' }}>Idle Resources (Yet to Bat)</td>
              <td colSpan={6} style={{ padding: '6px', border: '1px solid #e0e0e0', color: '#1f1f1f', fontWeight: 'bold' }}>
                {yetToBat.map(b => b.batName).join(', ')}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Bowling Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', fontFamily: 'Arial, sans-serif', marginBottom: '24px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f3f3', color: '#333' }}>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'left' }}>Backend Infrastructure (Bowlers)</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Cycles (O)</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Idle (M)</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Cost (R)</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Resolved (W)</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>NB</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>WD</th>
            <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Efficiency (ECO)</th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((b, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fcfcfc' }}>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', color: '#1f1f1f', fontWeight: 'bold' }}>{b.bowlName}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.overs}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.maidens}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.runs}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', fontWeight: 'bold', textAlign: 'center' }}>{b.wickets}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.no_balls}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.wides}</td>
              <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.economy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Fall of Wickets */}
      {wickets.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', fontFamily: 'Arial, sans-serif', marginBottom: '24px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f3f3', color: '#333' }}>
              <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'left' }}>Incident Reports (Fall of Wickets)</th>
              <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Impact Score</th>
              <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Cycle Time (Over)</th>
            </tr>
          </thead>
          <tbody>
            {wickets.map((w, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fcfcfc' }}>
                <td style={{ padding: '6px', border: '1px solid #e0e0e0', color: '#1f1f1f', fontWeight: 'bold' }}>{w.batName}</td>
                <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{w.wktRuns}-{w.wktNbr}</td>
                <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{w.wktOver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
};

export default ScorecardView;
