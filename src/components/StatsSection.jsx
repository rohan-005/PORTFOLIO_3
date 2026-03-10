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

  // ─── GITHUB ───────────────────────────────────────────────────────────────
  // Direct GitHub API can 403 from browser IPs. Route through codetabs proxy
  // (confirmed 200 in backend tests). Hardcoded fallback if all fail.
  useEffect(() => {
    (async () => {
      const GITHUB_URL = 'https://api.github.com/users/rohan-005';
      const proxies = [
        GITHUB_URL,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(GITHUB_URL)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(GITHUB_URL)}`,
      ];
      for (const url of proxies) {
        try {
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 6_000);
          const res = await fetch(url, { signal: ctrl.signal });
          clearTimeout(timer);
          if (!res.ok) continue;
          const text = await res.text();
          if (!text.startsWith('{')) continue;
          const json = JSON.parse(text);
          if (json.login) { setGithubData(json); setGithubLoading(false); return; }
        } catch { /* try next */ }
      }
      // All proxies failed – use hardcoded known values so card never stays empty
      setGithubData({ public_repos: 36, followers: 7, following: 7, hardcoded: true });
      setGithubLoading(false);
    })();
  }, []);

  // ─── LEETCODE ─────────────────────────────────────────────────────────────
  // faisalshohag's vercel proxy – confirmed 200 in backend tests.
  // Returns a flat object with totalSolved, easySolved, mediumSolved,
  // hardSolved, ranking, etc.
  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10_000);
    (async () => {
      try {
        const res = await fetch(
          'https://leetcode-api-faisalshohag.vercel.app/frosthowl_005',
          { signal: ctrl.signal }
        );
        if (res.ok) {
          const text = await res.text();
          if (text.startsWith('{')) setLeetcodeData(JSON.parse(text));
        }
      } catch (e) {
        if (e.name !== 'AbortError') console.error('LC fetch error', e);
      } finally {
        clearTimeout(timer);
        setLeetcodeLoading(false);
      }
    })();
  }, []);

  // ─── HACKERRANK ───────────────────────────────────────────────────────────
  // allorigins confirmed 200 in backend tests for this endpoint.
  // Falls back to codetabs if allorigins is down.
  useEffect(() => {
    const HR_URL = 'https://www.hackerrank.com/rest/hackers/rohandhanerwal/badges';
    const PROXIES = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(HR_URL)}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(HR_URL)}`,
    ];
    (async () => {
      for (const proxy of PROXIES) {
        try {
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 8_000);
          const res = await fetch(proxy, { signal: ctrl.signal });
          clearTimeout(timer);
          if (!res.ok) continue;
          const text = await res.text();
          if (!text.startsWith('{')) continue;
          const json = JSON.parse(text);
          if (json.models?.length) {
            setHackerrankData({ badges: json.models });
            setHackerrankLoading(false);
            return; // success – stop trying further proxies
          }
        } catch { /* try next proxy */ }
      }
      // All proxies failed – still mark loading done
      setHackerrankLoading(false);
    })();
  }, []);

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <section className="stats-section chapter">
      <h3 className="mono chapter-title">[ SYSTEM_METRICS: LIVE_FEED ]</h3>

      <div className="stats-hud-grid">

        {/* ── GITHUB CARD ─────────────────────────────────────────────── */}
        <a href="https://github.com/rohan-005" target="_blank" rel="noreferrer" className="stat-card github-card">
          <div className="stat-card-header">
            <Github size={24} className="stat-icon" />
            <h4 className="mono">GITHUB // rohan-005</h4>
          </div>
          <div className="stat-card-body">
            {githubLoading ? (
              <div className="loading-pulse mono">AWAITING_DATA...</div>
            ) : (
              /* JSON data (live or hardcoded fallback) */
              <div className="stat-metrics">
                <div className="metric-cell">
                  <span className="metric-label mono">PUBLIC_REPOS</span>
                  <span className="metric-value">{githubData.public_repos}</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-label mono">FOLLOWERS</span>
                  <span className="metric-value">{githubData.followers}</span>
                </div>
                <div className="metric-cell">
                  <span className="metric-label mono">FOLLOWING</span>
                  <span className="metric-value">{githubData.following}</span>
                </div>
              </div>
            )}

            {/* Always show the contribution streak SVG below the numbers */}
            {!githubLoading && !githubData?.fallback && (
              <div className="github-svg-wrapper" style={{ marginTop: '1.5rem' }}>
                <span className="badges-label mono" style={{ display: 'block', marginBottom: '8px' }}>[ CONTRIBUTIONS ]</span>
                <img
                  src="https://github-readme-streak-stats.herokuapp.com/?user=rohan-005&theme=radical&hide_border=true&background=00000000&ring=A2CB8B&fire=A2CB8B&currStreakLabel=E8F5BD"
                  alt="GitHub Streak"
                  className="github-stat-img"
                  style={{ width: '100%', height: 'auto' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>
        </a>

        {/* ── LEETCODE CARD ───────────────────────────────────────────── */}
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
                {/* Primary metrics */}
                <div className="stat-metrics">
                  <div className="metric-cell">
                    <span className="metric-label mono">TOTAL_SOLVED</span>
                    <span className="metric-value">{leetcodeData.totalSolved ?? leetcodeData.solvedProblem ?? 0}</span>
                  </div>
                  <div className="metric-cell">
                    <span className="metric-label mono">GLOBAL_RANK</span>
                    <span className="metric-value" style={{ fontSize: '2rem' }}>#{(leetcodeData.ranking ?? 0).toLocaleString()}</span>
                  </div>
                </div>

                {/* Difficulty breakdown */}
                <div className="lc-difficulty-row">
                  <div className="lc-diff easy">
                    <span className="diff-label mono">EASY</span>
                    <span className="diff-val">{leetcodeData.easySolved ?? 0}</span>
                  </div>
                  <div className="lc-diff medium">
                    <span className="diff-label mono">MED</span>
                    <span className="diff-val">{leetcodeData.mediumSolved ?? 0}</span>
                  </div>
                  <div className="lc-diff hard">
                    <span className="diff-label mono">HARD</span>
                    <span className="diff-val">{leetcodeData.hardSolved ?? 0}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </a>

        {/* ── HACKERRANK CARD ─────────────────────────────────────────── */}
        <a href="https://www.hackerrank.com/rohandhanerwal" target="_blank" rel="noreferrer" className="stat-card other-card">
          <div className="stat-card-header">
            <MonitorPlay size={24} className="stat-icon" />
            <h4 className="mono">HACKERRANK // rohandhanerwal</h4>
          </div>
          <div className="stat-card-body">
            {hackerrankLoading ? (
              <div className="loading-pulse mono">AWAITING_DATA...</div>
            ) : !hackerrankData || hackerrankData.badges?.length === 0 ? (
              <div className="error-text mono"><AlertTriangle size={16}/> NO_DATA</div>
            ) : (
              <div className="badges-container">
                <span className="badges-label mono">[ EARNED_BADGES: {hackerrankData.badges.length} ]</span>
                <div className="hr-badges-grid">
                  {hackerrankData.badges.map(b => (
                    <div key={b.badge_name} className="hr-text-badge" title={`${b.stars} Stars`}>
                      <span className="hr-badge-stars">{'★'.repeat(Math.min(b.stars, 5))}</span>
                      <span className="hr-badge-name mono">{b.badge_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </a>

      </div>
    </section>
  );
};

export default StatsSection;
