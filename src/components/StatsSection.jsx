import React, { useState, useEffect } from 'react';
import { Github, Code2, AlertTriangle, MonitorPlay } from 'lucide-react';
import './StatsSection.css';

const StatsSection = () => {
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [hackerrankData, setHackerrankData] = useState(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [hackerrankLoading, setHackerrankLoading] = useState(true);

  // GITHUB FETCH
  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const res = await fetch('https://api.github.com/users/rohan-005');
        if (res.status === 403 || res.status === 429) {
           setGithubData({ public_repos: 'LIMIT', followers: 'LIMIT' });
        } else if (res.ok) {
           const json = await res.json();
           setGithubData(json);
        } else {
           setGithubData({ public_repos: 'ERR', followers: 'ERR' });
        }
      } catch (e) {
        console.error("Github fetch error", e);
      } finally {
        setGithubLoading(false);
      }
    };
    fetchGithub();
  }, []);

  // LEETCODE FETCH
  useEffect(() => {
    const fetchLeetcode = async () => {
      // AbortController for 5 second timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      try {
        const fetchConfig = { signal: controller.signal };
        const lcProfileRes = await fetch('https://alfa-leetcode-api.onrender.com/frosthowl_005', fetchConfig);
        const lcSolvedRes = await fetch('https://alfa-leetcode-api.onrender.com/frosthowl_005/solved', fetchConfig);
        const lcBadgesRes = await fetch('https://alfa-leetcode-api.onrender.com/frosthowl_005/badges', fetchConfig);

        // If rate limited by the proxy, show limit UI gracefully instead of dead component
        if (lcProfileRes.status === 429 || lcSolvedRes.status === 429) {
           setLeetcodeData({ 
              solvedProblem: 'LIMIT',
              ranking: 'LIMIT',
              badges: []
           });
           return;
        }

        // Safely verify JSON to avoid parsing HTML 502 proxy errors (SyntaxError: Unexpected token < or U)
        if (lcProfileRes.ok && lcSolvedRes.ok && lcProfileRes.headers.get("content-type")?.includes("application/json")) {
          const lcProfile = await lcProfileRes.json();
          const lcSolved = await lcSolvedRes.json();
          const lcBadges = await lcBadgesRes.json();

          setLeetcodeData({ 
             ...lcProfile, 
             solvedProblem: lcSolved.solvedProblem,
             badges: lcBadges.badges || []
          });
        }
      } catch (e) {
        console.error("Leetcode fetch error safely caught", e);
      } finally {
        clearTimeout(timeoutId);
        setLeetcodeLoading(false);
      }
    };
    fetchLeetcode();
  }, []);

  // HACKERRANK FETCH
  useEffect(() => {
    const fetchHackerrank = async () => {
      try {
        // use corsproxy.io as a reliable fallback for allorigins block
        const hrResponse = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://www.hackerrank.com/rest/hackers/rohandhanerwal/badges'));
        if (hrResponse.status === 429) {
           setHackerrankData({ badges: [{ badge_name: 'RATE_LIMIT', stars: 0 }] });
           return;
        }

        if (hrResponse.ok && hrResponse.headers.get("content-type")?.includes("application/json")) {
           const hrJson = await hrResponse.json();
           if (hrJson.models) {
             setHackerrankData({ badges: hrJson.models });
           }
        }
      } catch (e) {
        console.error("HackerRank fetch error", e);
      } finally {
        setHackerrankLoading(false);
      }
    };
    fetchHackerrank();
  }, []);

  return (
    <section className="stats-section chapter">
      <h3 className="mono chapter-title">[ SYSTEM_METRICS: LIVE_FEED ]</h3>
      
      <div className="stats-hud-grid">
        {/* GITHUB CARD */}
        <a href="https://github.com/rohan-005" target="_blank" rel="noreferrer" className="stat-card github-card">
          <div className="stat-card-header">
            <Github size={24} className="stat-icon" />
            <h4 className="mono">GITHUB // rohan-005</h4>
          </div>
          
          <div className="stat-card-body">
            {githubLoading ? (
              <div className="loading-pulse mono">AWAITING_DATA...</div>
            ) : !githubData ? (
              <div className="error-text mono"><AlertTriangle size={16}/> SYNC_FAILED</div>
            ) : (
              <div className="stat-metrics">
                <div className="metric-cell">
                  <span className="metric-label mono">PUBLIC_REPOS</span>
                  <span className="metric-value">{githubData?.public_repos || 0}</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-label mono">FOLLOWERS</span>
                  <span className="metric-value">{githubData?.followers || 0}</span>
                </div>
              </div>
            )}
          </div>
        </a>

        {/* LEETCODE CARD */}
        <a href="https://leetcode.com/frosthowl_005/" target="_blank" rel="noreferrer" className="stat-card leetcode-card">
          <div className="stat-card-header">
            <Code2 size={24} className="stat-icon" />
            <h4 className="mono">LEETCODE // frosthowl_005</h4>
          </div>
          
          <div className="stat-card-body">
            {leetcodeLoading ? (
              <div className="loading-pulse mono">AWAITING_DATA...</div>
            ) : !leetcodeData ? (
              <div className="error-text mono"><AlertTriangle size={16}/> SYNC_FAILED</div>
            ) : (
              <div className="card-data-wrapper">
                <div className="stat-metrics">
                  <div className="metric-cell">
                    <span className="metric-label mono">TOTAL_SOLVED</span>
                    <span className="metric-value">{leetcodeData.solvedProblem || 0}</span>
                  </div>
                  <div className="metric-cell">
                    <span className="metric-label mono">GLOBAL_RANK</span>
                    <span className="metric-value">#{leetcodeData.ranking?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>
                
                {leetcodeData.badges && leetcodeData.badges.length > 0 && (
                  <div className="badges-container">
                    <span className="badges-label mono">[ EARNED_BADGES: {leetcodeData.badges.length} ]</span>
                    <div className="badges-grid">
                      {leetcodeData.badges.map(b => (
                        <img 
                          key={b.id || b.displayName} 
                          src={b.icon.startsWith('http') ? b.icon : `https://leetcode.com${b.icon}`} 
                          alt={b.displayName} 
                          title={b.displayName} 
                          className="lc-badge-img" 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </a>

        {/* HACKERRANK CARD */}
        <a href="https://www.hackerrank.com/rohandhanerwal" target="_blank" rel="noreferrer" className="stat-card other-card">
          <div className="stat-card-header">
            <MonitorPlay size={24} className="stat-icon" />
            <h4 className="mono">HACKERRANK // rohandhanerwal</h4>
          </div>
          
          <div className="stat-card-body">
            {hackerrankLoading ? (
              <div className="loading-pulse mono">AWAITING_DATA...</div>
            ) : !hackerrankData ? (
              <div className="error-text mono"><AlertTriangle size={16}/> SYNC_FAILED</div>
            ) : (
              <div className="card-data-wrapper">
                {hackerrankData.badges && hackerrankData.badges.length > 0 ? (
                  <div className="badges-container">
                    <span className="badges-label mono">[ EARNED_BADGES: {hackerrankData.badges.length} ]</span>
                    <div className="hr-badges-grid">
                      {hackerrankData.badges.map(b => (
                        <div key={b.badge_name} className="hr-text-badge" title={`${b.stars} Stars`}>
                          <span className="hr-badge-stars">{'★'.repeat(b.stars)}</span>
                          <span className="hr-badge-name mono">{b.badge_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="stat-metrics hr-metrics">
                    <div className="metric-cell hr-title-cell">
                      <span className="metric-label mono">EARNED_BADGES</span>
                      <span className="metric-value text-title">0</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </a>

      </div>
    </section>
  );
};

export default StatsSection;
