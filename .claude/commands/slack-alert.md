---
description: Post error status to Slack channels
allowed-tools: Bash, Read
---

# 📢 SLACK ALERT - Issue #$ARGUMENTS

## Read Current Status
Current tracking: @.claude/error-tracking/issue-$ARGUMENTS.md

## Determine Alert Type
- If new issue: 🚨 BUILD_FAILURE notification
- If solution found: ✅ SOLUTION_PROVIDED notification
- If progress update: 📝 ERROR_LOGGED notification

## Post to Slack
Posting to #cca-ERROR-updates-feed and #echo-updates-feed (C0943NFUBDF)

Alert format:
- Session ID from tracking file
- Error type and severity
- Current status
- Next actions