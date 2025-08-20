#!/bin/bash
cd /home/kavia/workspace/code-generation/event-manager-platform-128324/event_management_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

