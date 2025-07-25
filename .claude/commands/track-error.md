---
description: Initialize error tracking with mandatory Slack notifications after 3 attempts
allowed-tools: Write, Read, Bash, Explore
---

# 🚨 ERROR TRACKING PROTOCOL - Issue #$ARGUMENTS

## Session Initialization
- Session ID: SESSION-$(date +%s)-$ARGUMENTS
- Tracking file: .claude/error-tracking/issue-$ARGUMENTS.md
- Error count check: !`grep -c "^### Attempt" .claude/error-tracking/issue-$ARGUMENTS.md 2>/dev/null || echo 0`

## Initialize Tracking
!`mkdir -p .claude/error-tracking && touch .claude/error-tracking/issue-$ARGUMENTS.md`

<ultrathinking>
I need to check if this is a new issue or if we've already made attempts. If we've made 3 or more attempts, I must trigger the Slack protocol immediately.

Key steps:
1. Check attempt count
2. If >= 3, post to Slack immediately
3. Document the current state
4. Analyze systematically
5. Update tracking after each action
6. Post results to Slack

IMPORTANT REMINDERS:
- I have Cloudflare MCP tools - NEVER use wrangler CLI
- I have Supabase MCP tools for direct database/storage access
- These tools provide direct API access without permission issues
</ultrathinking>

## Attempt Count Check
Current attempts: !`grep -c "^### Attempt" .claude/error-tracking/issue-$ARGUMENTS.md 2>/dev/null || echo 0`

## Current Context
- Working directory: !`pwd`
- Git status: !`git status --short`
- Recent commits: !`git log --oneline -5`
- Current branch: !`git branch --show-current`
- Timestamp: !`date`

## Available Diagnostic Tools
### Cloudflare MCP (NO WRANGLER!)
- worker_list/get/put/delete - Worker management
- kv_list/get/put/delete - KV operations
- r2_* - R2 bucket operations
- d1_* - D1 database operations
- analytics_get - Analytics data

### Supabase MCP
- list_projects/get_project - Project info
- execute_sql - Direct SQL queries
- get_logs - Service logs (api, auth, storage)
- get_advisors - Security/performance tips

## Error Investigation Protocol

### Step 1: Document the Error
First, I'll check existing tracking and gather complete error information.

Check existing tracking: @.claude/error-tracking/issue-$ARGUMENTS.md

### Step 2: Systematic Analysis
For each solution attempt, I will document:
- **Attempt Number**: Sequential tracking
- **Hypothesis**: What we think might be wrong
- **Action Taken**: Specific steps performed
- **Commands Run**: Exact commands with outputs
- **Result**: What happened (❌ Failed / ⚠️ Partial / ✅ Success)
- **Learning**: What this tells us
- **Next Steps**: Based on the outcome

### Step 3: Update Tracking
After each attempt, update the tracking file with complete details.

Please provide:
1. The exact error message or description
2. Steps to reproduce
3. What triggered this error
4. Any relevant logs or stack traces
5. Is this a Cloudflare or Supabase related issue?