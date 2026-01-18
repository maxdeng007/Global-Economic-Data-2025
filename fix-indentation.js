const fs = require('fs');
const path = require('path');

const reportsDir = './reports';
const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} report files\n`);

let count = 0;

files.forEach(file => {
    const filepath = path.join(reportsDir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    
    const badPattern = /<nav class="navbar">\s*<div class="navbar-actions">/;
    
    if (badPattern.test(content)) {
        content = content.replace(badPattern, '<nav class="navbar">\n        <div class="navbar-actions">');
        fs.writeFileSync(filepath, content);
        console.log(`✅ Fixed indentation: ${file}`);
        count++;
    } else {
        console.log(`⏭️  Skipped: ${file}`);
    }
});

console.log(`\n🎉 Total fixed: ${count} files`);
