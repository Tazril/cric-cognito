import React, { useState, useEffect } from 'react';

interface LiveViewProps {
  matchId: number;
}

const LiveView: React.FC<LiveViewProps> = ({ matchId }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/mcenter/livescore/${matchId}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <div style={{ padding: '24px 0' }}>Loading live scores...</div>;
  }

  const { miniscore, commentaryList } = data;
  const inningsScoreList = miniscore.matchScoreDetails.inningsScoreList || [];
  
  const currentInnings = inningsScoreList.find((i: any) => i.inningsId === miniscore.inningsId) || inningsScoreList[0];
  const previousInnings = inningsScoreList.find((i: any) => i.inningsId !== miniscore.inningsId);
  
  const batTeamName = currentInnings?.batTeamName || '';
  const batTeamScore = currentInnings?.score || 0;
  const batTeamWickets = currentInnings?.wickets || 0;
  const batTeamOvers = miniscore.overs || 0;

  const bowlTeamName = previousInnings?.batTeamName || '';
  const bowlTeamScore = previousInnings?.score || 0;
  const bowlTeamWickets = previousInnings?.wickets || 0;
  const bowlTeamOvers = previousInnings?.overs || 0;

  const batters = [];
  if (miniscore.batsmanStriker) batters.push({ ...miniscore.batsmanStriker, isStriker: true });
  if (miniscore.batsmanNonStriker) batters.push({ ...miniscore.batsmanNonStriker, isStriker: false });

  const bowlers = [];
  if (miniscore.bowlerStriker) bowlers.push({ ...miniscore.bowlerStriker, isBowling: true });
  if (miniscore.bowlerNonStriker) bowlers.push({ ...miniscore.bowlerNonStriker, isBowling: false });

  return (
    <div>
      {/* Live Score Header */}
      <div style={{ marginBottom: '24px' }}>
        {previousInnings && (
          <div style={{ fontSize: '18px', color: '#4a4a4a', marginBottom: '4px' }}>
            {bowlTeamName} {bowlTeamScore}-{bowlTeamWickets} ({bowlTeamOvers})
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
          <span style={{ fontSize: '36px', fontWeight: 'bold' }}>{batTeamName} {batTeamScore}-{batTeamWickets} ({batTeamOvers})</span>
          <span style={{ fontSize: '14px', color: '#4a4a4a', fontWeight: 'bold' }}>
            CRR: {miniscore.currentRunRate} {miniscore.requiredRunRate ? `  REQ: ${miniscore.requiredRunRate}` : ''}
          </span>
        </div>
        <div style={{ fontSize: '14px', color: '#4a4a4a', marginTop: '4px', fontStyle: 'italic' }}>
          {miniscore.status || miniscore.customStatus}
        </div>
      </div>

      {/* Tables Section */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        <div style={{ flex: 2 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', fontSize: '11px', fontFamily: 'Arial, sans-serif' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f3f3', color: '#333' }}>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'left' }}>Frontend Resources (Batters)</th>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Points (R)</th>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Tasks (B)</th>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Milestones (4s)</th>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Epics (6s)</th>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Velocity (SR)</th>
              </tr>
            </thead>
            <tbody>
              {batters.map((b, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fcfcfc' }}>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', color: '#1f1f1f', fontWeight: 'bold' }}>{b.batName} {b.isStriker ? '*' : ''}</td>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center', fontWeight: 'bold' }}>{b.batRuns}</td>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.batBalls}</td>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.batFours}</td>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.batSixes}</td>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.batStrikeRate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', fontFamily: 'Arial, sans-serif' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f3f3', color: '#333' }}>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'left' }}>Backend Infrastructure (Bowlers)</th>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Cycles (O)</th>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Idle (M)</th>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Cost (R)</th>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Resolved (W)</th>
                <th style={{ padding: '6px', fontWeight: 'bold', border: '1px solid #e0e0e0', textAlign: 'center' }}>Efficiency (ECO)</th>
              </tr>
            </thead>
            <tbody>
              {bowlers.map((b, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fcfcfc' }}>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', color: '#1f1f1f', fontWeight: 'bold' }}>{b.bowlName} {b.isBowling ? '*' : ''}</td>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.bowlOvs}</td>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.bowlMaidens}</td>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.bowlRuns}</td>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center', fontWeight: 'bold' }}>{b.bowlWkts}</td>
                  <td style={{ padding: '6px', border: '1px solid #e0e0e0', textAlign: 'center' }}>{b.bowlEcon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Stats Box */}
        <div style={{ flex: 1, border: '1px solid #e0e0e0', padding: '16px', backgroundColor: '#fafafa', borderRadius: '4px', alignSelf: 'flex-start' }}>
          <div style={{ color: '#4a4a4a', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #e0e0e0' }}>Key Stats</div>
          {miniscore.partnerShip && (
            <div style={{ fontSize: '14px', marginBottom: '12px' }}>
              <strong>Partnership:</strong> {miniscore.partnerShip.runs}({miniscore.partnerShip.balls})
            </div>
          )}
          {miniscore.matchScoreDetails?.tossResults && (
            <div style={{ fontSize: '14px' }}>
              <strong>Toss:</strong> {miniscore.matchScoreDetails.tossResults.tossWinnerName} ({miniscore.matchScoreDetails.tossResults.decision})
            </div>
          )}
        </div>
      </div>

      {/* Commentary Section */}
      <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '24px' }}>
        {commentaryList && commentaryList.map((comm: any, index: number) => {
          const isBoundary = comm.event === 'FOUR' || comm.event === 'SIX';
          const isWicket = comm.event === 'WICKET';
          
          return (
            <div key={comm.timestamp || index} style={{ display: 'flex', gap: '16px', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '40px' }}>
                <span style={{ fontWeight: 'bold' }}>{comm.overNumber}</span>
                {(isBoundary || isWicket) && (
                  <div style={{ 
                    marginTop: '8px', 
                    backgroundColor: comm.event === 'SIX' ? '#a255ff' : comm.event === 'FOUR' ? '#007bb5' : '#d32f2f', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '24px', 
                    height: '24px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {comm.event === 'WICKET' ? 'W' : comm.event === 'SIX' ? '6' : '4'}
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                {(() => {
                  const parts = comm.commText.split(/(\b(?:SIX|FOUR|out|OUT)\b)/g);
                  return parts.map((part: string, i: number) => 
                    (part.toUpperCase() === 'SIX' || part.toUpperCase() === 'FOUR' || part.toUpperCase() === 'OUT') 
                      ? <strong key={i}>{part}</strong> 
                      : <span dangerouslySetInnerHTML={{ __html: part.replace(/\\n/g, '<br/>') }} key={i} />
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveView;
