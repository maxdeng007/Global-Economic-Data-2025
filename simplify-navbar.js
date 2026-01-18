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
    
    const logoPattern = /\s*<a href="\.\.\/index\.html" class="navbar-logo back-link">\s*<span class="flag-icon">[^<]*<\/span>\s*<span data-i18n="backHome">[^<]*<\/span>\s*<\/a>\s*/;
    
    if (logoPattern.test(content)) {
        content = content.replace(logoPattern, '\n');
        console.log(`  ✅ Removed navbar-logo`);
    } else {
        console.log(`  ⚠️  navbar-logo pattern not found`);
    }
    
    content = content.replace(
        /<a href="\.\.\/index\.html" class="back-btn" data-i18n="backBtn">\s*<i class="fas fa-arrow-left"><\/i>\s*<span>[^<]*<\/span>\s*<\/a>/,
        `<a href="../index.html" class="back-btn" data-i18n="backBtn">
            <i class="fas fa-arrow-left"></i>
            <span>Back</span>
        </a>`
    );
    
    const jsPattern = /var navbarLogoText = document\.querySelector\('\.navbar-logo span:not\(.flag-icon\)'\);\s*if \(navbarLogoText\) navbarLogoText\.textContent = isZh \? '[^']*' : '[^']*';\s*/;
    if (jsPattern.test(content)) {
        content = content.replace(jsPattern, '');
        console.log(`  ✅ Removed navbarLogoText JS`);
    }
    
    const cssPattern = /\.navbar-logo \{[^}]+\}/;
    if (cssPattern.test(content)) {
        content = content.replace(cssPattern, '');
        console.log(`  ✅ Removed .navbar-logo CSS`);
    }
    
    const backLinkPattern = /\.back-link \{[^}]+\}\s*\.back-link:hover \{[^}]+\}/;
    if (backLinkPattern.test(content)) {
        content = content.replace(backLinkPattern, '');
        console.log(`  ✅ Removed .back-link CSS`);
    }
    
    content = content.replace(/backBtn: '返回首页',/g, "backBtn: '返回',");
    content = content.replace(/backBtn: 'Home',/g, "backBtn: 'Back',");
    content = content.replace(/backHome: 'Back to Home',/g, "backHome: 'Back',");
    content = content.replace(/backHome: '返回首页',/g, "backHome: '返回',");
    
    fs.writeFileSync(filepath, content);
    count++;
    console.log(`✅ Done: ${file}\n`);
});

console.log(`🎉 Total processed: ${count} files`);
