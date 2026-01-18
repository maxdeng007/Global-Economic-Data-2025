#!/bin/bash
echo "🛑 Stopping file watcher..."
pkill -f "tsx scripts/watch.ts"
echo "✅ Watcher stopped!"
