const fs = require('fs');
const path = require('path');

const reportsDir = './reports';
const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} report files\n`);

let count = 0;

files.forEach(file => {
    const filepath = path.join(reportsDir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    
    console.log(`📝 Processing: ${file}`);
    
    if (content.includes('class="navbar-logo back-link"')) {
        console.log(`  🔄 Has old navbar-logo structure, updating...`);
        
        content = content.replace(
            /\s*<a href="\.\.\/index\.html" class="navbar-logo back-link">\s*<span class="flag-icon">[^<]*<\/span>(?:\s*<span class="flag-icon">[^<]*<\/span>)?\s*<span data-i18n="navTitle">[^<]*<\/span>\s*<\/a>\s*/,
            '\n'
        );
        
        content = content.replace(
            /<div class="navbar-actions">\s*<a href="\.\.\/index\.html" class="back-btn"/g,
            '<div class="navbar-actions">\n            <a href="../index.html" class="back-btn"'
        );
        
        content = content.replace(
            /<a href="\.\.\/index\.html" class="back-btn" data-i18n="backBtn">\s*<i class="fas fa-arrow-left"><\/i>\s*<span>[^<]*<\/span>\s*<\/a>/g,
            `<a href="../index.html" class="back-btn" data-i18n="backBtn">
                <i class="fas fa-arrow-left"></i>
                <span>Back</span>
            </a>`
        );
        
        content = content.replace(
            /<button class="lang-btn" id="mobileLangBtn">\s*<i class="fas fa-globe"><\/i>\s*<span>[^<]*<\/span>\s*<\/button>/g,
            `<button class="lang-btn" id="mobileLangBtn">
                <i class="fas fa-globe"></i>
                <span>EN</span>
            </button>`
        );
        
        console.log(`  ✅ Updated structure`);
    }
    
    if (content.includes('navbarLogoText')) {
        content = content.replace(
            /var navbarLogoText = document\.querySelector\('\.navbar-logo span:not\(.flag-icon\)'\);\s*if \(navbarLogoText\) navbarLogoText\.textContent = isZh \? '[^']*' : '[^']*';\s*/g,
            ''
        );
        console.log(`  ✅ Removed navbarLogoText JS`);
    }
    
    if (content.includes('.navbar-logo {')) {
        content = content.replace(/\.navbar-logo \{[^}]+\}/g, '');
        console.log(`  ✅ Removed .navbar-logo CSS`);
    }
    
    if (content.includes('.back-link {')) {
        content = content.replace(/\.back-link \{[^}]+\}\s*\.back-link:hover \{[^}]+\}/g, '');
        console.log(`  ✅ Removed .back-link CSS`);
    }
    
    if (content.includes("backBtn: 'Home'")) {
        content = content.replace(/backBtn: 'Home',/g, "backBtn: 'Back',");
        console.log(`  ✅ Updated EN translation`);
    }
    if (content.includes("backBtn: '返回首页'")) {
        content = content.replace(/backBtn: '返回首页',/g, "backBtn: '返回',");
        console.log(`  ✅ Updated ZH translation`);
    }
    
    fs.writeFileSync(filepath, content);
    count++;
    console.log(`✅ Done: ${file}\n`);
});

console.log(`🎉 Total processed: ${count} files`);
