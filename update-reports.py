#!/usr/bin/env python3
import os
import re


def update_report(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(
        r'<a href="#" class="navbar-logo">',
        '<a href="../index.html" class="navbar-logo back-link">\n            <span class="flag-icon">🏠</span>',
        content,
    )

    content = re.sub(
        r'(<button class="lang-btn" id="mobileLangBtn">)',
        r'<a href="../index.html" class="back-btn" data-i18n="backBtn">\n                <i class="fas fa-arrow-left"></i>\n                <span>返回首页</span>\n            </a>\n            \1',
        content,
    )

    content = re.sub(
        r"(navTitle: '美国经济数据',)",
        r"\1\n                backHome: '返回首页',\n                backBtn: '返回首页',",
        content,
    )

    content = re.sub(
        r"(navTitle: 'USA Economic Data',)",
        r"\1\n                backHome: 'Back to Home',\n                backBtn: 'Home',",
        content,
    )

    css_insertion = r""".lang-btn:hover { background: #2d2d5a; }
        
        /* Back to Home Button */
        .back-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            background: rgba(0, 0, 0, 0.08);
            color: inherit;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s;
            margin-right: 8px;
        }
        
        .back-btn:hover {
            background: rgba(0, 0, 0, 0.12);
            transform: translateX(-2px);
        }
        
        .back-btn i { font-size: 0.9rem; }"""

    content = re.sub(
        r"\.lang-btn:hover \{ background: #2d2d5a; \}", css_insertion, content
    )

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)


reports_dir = "reports"
for filename in os.listdir(reports_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(reports_dir, filename)
        update_report(filepath)
        print(f"Updated: {filename}")

print("\nAll reports updated successfully!")
