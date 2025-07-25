---
description: Quick initialize new issue with template
allowed-tools: Write, Bash
---

# Initialize New Issue #$ARGUMENTS

## Create from Template
!`cp .claude/error-tracking/template.md .claude/error-tracking/issue-$ARGUMENTS.md`

## Set Metadata
- Issue ID: #$ARGUMENTS
- Session ID: SESSION-$(date +%s)-$ARGUMENTS
- Created: !`date`

Issue initialized at: .claude/error-tracking/issue-$ARGUMENTS.md

Please provide error details to begin tracking.