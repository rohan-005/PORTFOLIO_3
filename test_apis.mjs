import fetch from "node-fetch";

async function run() {
  console.log("Testing LeetCode alfa API...");
  try {
    const lc = await fetch('https://alfa-leetcode-api.onrender.com/frosthowl_005');
    console.log("LeetCode Alfa HTTP Status:", lc.status);
  } catch (e) {
    console.error("LeetCode Alfa Proxy failed", e.message);
  }

  console.log("Testing LeetCode stats heroku API...");
  try {
    const lch = await fetch('https://leetcode-stats-api.herokuapp.com/frosthowl_005');
    console.log("LeetCode Heroku HTTP Status:", lch.status);
    console.log(await lch.json());
  } catch (e) {
    console.error("LeetCode Heroku Proxy failed", e.message);
  }

  console.log("Testing GitHub readme stats SVG...");
  try {
    const gh = await fetch('https://github-readme-stats.vercel.app/api?username=rohan-005');
    console.log("GitHub SVG Status:", gh.status);
  } catch (e) {
    console.error("GitHub SVG failed", e.message);
  }

  console.log("Testing HackerRank through allorigins...");
  try {
    const hr = await fetch('https://api.allorigins.win/raw?url=https://www.hackerrank.com/rest/hackers/rohandhanerwal/badges');
    console.log("HackerRank AllOrigins Status:", hr.status);
  } catch (e) {
    console.error("HackerRank AllOrigins failed", e.message);
  }

  console.log("Testing HackerRank through corsproxy.io...");
  try {
    const hr2 = await fetch('https://corsproxy.io/?https://www.hackerrank.com/rest/hackers/rohandhanerwal/badges');
    console.log("HackerRank CorsProxy Status:", hr2.status);
  } catch (e) {
    console.error("HackerRank CorsProxy failed", e.message);
  }

  console.log("Testing HackerRank through codetabs...");
  try {
    const hr3 = await fetch('https://api.codetabs.com/v1/proxy?quest=https://www.hackerrank.com/rest/hackers/rohandhanerwal/badges');
    console.log("HackerRank Codetabs Status:", hr3.status);
  } catch (e) {
    console.error("HackerRank Codetabs failed", e.message);
  }
}
run();
