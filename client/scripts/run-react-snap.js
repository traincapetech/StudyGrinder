const fs = require('fs');
const path = require('path');
const { run } = require('react-snap');

function findSystemChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const candidates = [
    // macOS
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    // Linux
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    // Windows
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const buildDir = path.join(rootDir, 'build');
  const html200 = path.join(buildDir, '200.html');
  const indexHtml = path.join(buildDir, 'index.html');

  // If a previous run was aborted midway, restore index.html and remove 200.html
  if (fs.existsSync(html200)) {
    console.log('🔄 Cleaning up stale 200.html from previous run...');
    try {
      if (fs.existsSync(indexHtml)) {
        fs.unlinkSync(html200);
      } else {
        fs.renameSync(html200, indexHtml);
      }
    } catch (e) {
      console.warn('⚠️ Warning during 200.html cleanup:', e.message);
    }
  }

  const pkg = require(path.join(rootDir, 'package.json'));
  const reactSnapConfig = { ...(pkg.reactSnap || {}) };

  const systemChrome = findSystemChrome();
  if (systemChrome) {
    console.log(`🚀 Using Chrome executable at: ${systemChrome}`);
    reactSnapConfig.puppeteerExecutablePath = systemChrome;
  } else {
    console.log('ℹ️ Using default bundled Puppeteer browser');
  }

  try {
    await run(reactSnapConfig);
    console.log('✅ react-snap completed successfully!');
  } catch (error) {
    console.error('❌ react-snap encountered an error:', error);
    process.exit(1);
  }
}

main();
