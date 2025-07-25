---
description: Review current progress and trigger Slack alerts if needed
allowed-tools: Read, Write, Bash
---

# Progress Check for Issue #$ARGUMENTS

## Current Status
Display tracking file: @.claude/error-tracking/issue-$ARGUMENTS.md

## Attempt Analysis
Total attempts: !`grep -c "^### Attempt" .claude/error-tracking/issue-$ARGUMENTS.md 2>/dev/null || echo 0`

## Status Summary
I'll analyze:
1. Total attempts made
2. If >= 3 attempts, MANDATORY Slack alert
3. Patterns in failures
4. What we've learned
5. Remaining hypotheses
6. Recommended next actions

## Visual Progress
- ✅ What's been ruled out
- ⚠️ Partial successes  
- ❌ Failed attempts
- 🔄 Circular patterns detected
- 💡 New insights gained