/**
 * Main sync script - parses all markdown files and generates JSON
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { processAllFiles } from './parse-markdown.js';
import { COUNTRY_CONFIG } from './country-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCES_DIR = path.join(__dirname, '../sources');
const OUTPUT_DIR = path.join(__dirname, '../public/data');

console.log('🔄 Syncing country data from markdown files...\n');

processAllFiles(SOURCES_DIR, OUTPUT_DIR, COUNTRY_CONFIG);

console.log('\n✅ Sync complete!');
