/**
 * File watcher - watches for changes in sources/ and auto-generates everything
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { processAllFiles } from './parse-markdown.js';
import { COUNTRY_CONFIG } from './country-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCES_DIR = path.join(__dirname, '../sources');
const OUTPUT_DIR = path.join(__dirname, '../public/data');
const AUTO_SYNC = path.join(__dirname, 'auto-sync.ts');

console.log('🔄 Starting auto-sync first...\n');

// Run auto-sync to generate config files
try {
  execSync(`tsx ${AUTO_SYNC}`, { cwd: __dirname });
} catch (err) {
  console.error('Auto-sync failed:', err);
}

console.log('\n👀 Watching for changes in sources/ directory...\n');

// Initial JSON generation
processAllFiles(SOURCES_DIR, OUTPUT_DIR, COUNTRY_CONFIG);

console.log('\n📋 Waiting for file changes...\n');

// Watch for changes
fs.watch(SOURCES_DIR, (eventType, filename) => {
  if (eventType === 'change' && filename?.endsWith('.md')) {
    console.log(`\n📝 Detected change: ${filename}`);
    
    // Run auto-sync first (to update config if new country)
    try {
      execSync(`tsx ${AUTO_SYNC}`, { cwd: __dirname });
    } catch (err) {
      console.warn('Auto-sync warning:', err.message);
    }
    
    // Then generate JSON
    processAllFiles(SOURCES_DIR, OUTPUT_DIR, COUNTRY_CONFIG);
    console.log('\n📋 Waiting for file changes...\n');
  }
});

console.log('Press Ctrl+C to stop watching\n');
