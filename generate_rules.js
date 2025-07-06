const fs = require('fs');
const fetch = require('node-fetch');

const easyListURL = "https://easylist.to/easylist/easylist.txt";

async function fetchEasyList(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }
  return res.text();
}

function convertFilterToRule(filter, id) {
  // Only basic URL block filters: ||example.com^ or plain URLs
  if (!filter || filter.startsWith('!') || filter.includes('##') || filter.includes('#@#')) return null;

  let urlFilter = null;
  if (filter.startsWith('||')) {
    urlFilter = filter.replace('||', '').replace(/\^.*$/, '');
  } else if (filter.startsWith('|') || filter.includes('^')) {
    return null; // skip unsupported filter types
  } else {
    urlFilter = filter;
  }

  return {
    id: id,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter,
      resourceTypes: ["main_frame", "sub_frame", "script", "image", "xmlhttprequest", "stylesheet", "font", "other"]
    }
  };
}

async function generateRules() {
  const text = await fetchEasyList(easyListURL);
  const lines = text.split('\n');

  const rules = [];
  let ruleId = 1;

  for (const line of lines) {
    const filter = line.trim();
    const rule = convertFilterToRule(filter, ruleId);
    if (rule) {
      rules.push(rule);
      ruleId++;
    }
    if (ruleId > 29999) break;
  }

  fs.writeFileSync('ads_rules.json', JSON.stringify(rules, null, 2));
  console.log(`Generated ${rules.length} rules from EasyList`);
}

generateRules().catch(console.error);
