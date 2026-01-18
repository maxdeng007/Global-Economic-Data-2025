#!/bin/bash
for file in reports/*.html; do
    sed -i '' 's/\.lang-btn:hover { background: #2d2d5a; }/\.lang-btn:hover { background: #2d2d5a; }\n        \n        \/* Back to Home Button *\/\n        .back-btn {\n            display: flex;\n            align-items: center;\n            gap: 6px;\n            padding: 8px 14px;\n            background: rgba(0, 0, 0, 0.08);\n            color: inherit;\n            border: 1px solid rgba(0, 0, 0, 0.1);\n            border-radius: 6px;\n            font-size: 0.8rem;\n            font-weight: 600;\n            cursor: pointer;\n            text-decoration: none;\n            transition: all 0.3s;\n            margin-right: 8px;\n        }\n        \n        .back-btn:hover {\n            background: rgba(0, 0, 0, 0.12);\n            transform: translateX(-2px);\n        }\n        \n        .back-btn i { font-size: 0.9rem; }/g' "$file"
done
echo "CSS added to all reports"
