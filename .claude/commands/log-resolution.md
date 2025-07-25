---
description: Log resolution attempt and update error tracker
allowed-tools: Write, Read, Bash
---

# Log Resolution Attempt for Issue #$ARGUMENTS

## Pre-Action Slack Update
📢 Posting intention to #MC-SSS-ERROR-updates-feed before making changes

## Read Current Tracking
Current status: @.claude/error-tracking/issue-$ARGUMENTS.md
Current attempts: !`grep -c "^### Attempt" .claude/error-tracking/issue-$ARGUMENTS.md 2>/dev/null || echo 0`

## Append New Attempt
Updating tracking file with:
- Timestamp: !`date`
- Attempt number
- Actions taken
- Results
- Next steps

## Update Global Error Tracker
Also updating: @docs/AI-ERROR-TRACKER.md

## Post-Action Slack Update
📢 Posting results to #echo-updates-feed (C0943NFUBDF)