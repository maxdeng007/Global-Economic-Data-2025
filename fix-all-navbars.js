const fs = require('fs');
const path = require('path');

const reportsDir = './reports';
const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} report files\n`);

const navbarTemplate = `    <!-- NAVBAR -->
    <nav class="navbar">
        <div class="navbar-actions">
            <a href="../index.html" class="back-btn" data-i18n="backBtn">
                <i class="fas fa-arrow-left"></i>
                <span>Back</span>
            </a>
            <button class="lang-btn" id="mobileLangBtn">
                <i class="fas fa-globe"></i>
                <span>EN</span>
            </button>
            <button class="hamburger" id="hamburger">
                <span></span><span></span><span></span>
            </button>
        </div>
        
        <div class="pc-nav">`;

let count = 0;

files.forEach((file, index) => {
    const filepath = path.join(reportsDir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    
    const corruptionPatterns = [
        /<div class="navbar-actions">\s+<a href="\.\.\/index\.html" class="back-btn"/,
        /<button class="lang-btn"[^>]*>\s+<i class="fas fa-globe"><\/i>\s+<span>中文<\/span>/,
        /\s+<span>Back<\/span>[\s\S]{0,50}messageChar/
    ];
    
    let needsFix = false;
    for (const pattern of corruptionPatterns) {
        if (pattern.test(content)) {
            needsFix = true;
            break;
        }
    }
    
    if (!needsFix) {
        console.log(`✅ ${file} - OK`);
        return;
    }
    
    console.log(`🔄 Fixing: ${file}`);
    
    const pcNavMatch = content.match(/<div class="pc-nav">[\s\S]+<\/nav>/);
    if (!pcNavMatch) {
        console.log(`  ⚠️  Could not find pc-nav in ${file}`);
        return;
    }
    
    const pcNavSection = pcNavMatch[0];
    
    content = `</head>
<body>

${navbarTemplate}
${pcNavSection}`;
    
    fs.writeFileSync(filepath, content);
    count++;
    console.log(`  ✅ Fixed: ${file}`);
});

console.log(`\n🎉 Total fixed: ${count} files`);
