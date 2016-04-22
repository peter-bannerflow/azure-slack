# azure-slack

## Config
### Azure web app - App settings
The following variables needs to be present in the app settings:
* SLACK_ROOM
* SLACK_TOKEN

### Slack
Create a bot to generate a token. 

## Deployment script
```batch
IF NOT EXIST "%DEPLOYMENT_SOURCE%\node_modules\@slack\client\index.js" (
  echo Download and install slack
  call npm --prefix "%DEPLOYMENT_SOURCE%" install @slack/client
  IF !ERRORLEVEL! NEQ 0 (
    echo "Failed to install slack. Ignoring."
    set ERRORLEVEL=0
  )
) ELSE (
  echo Update slack
  call npm --prefix "%DEPLOYMENT_SOURCE%" update hipchatter
  IF !ERRORLEVEL! NEQ 0 (
    echo "Failed to update slack. Ignoring."
    set ERRORLEVEL=0
  )
)
```

```batch
:SlackNotify
setlocal
set _MESSAGE_="%1"
set _MESSAGE_=%_MESSAGE_:"=%
echo "Reached SlackNotify"
echo !_MESSAGE_!
echo message: %_MESSAGE_%
IF EXIST "%DEPLOYMENT_SOURCE%\node_modules\@slack\client\index.js" (
  CALL node "%DEPLOYMENT_SOURCE%\deploy\slack.js" "%SLACK_ROOM%" "%SLACK_TOKEN%" "%_MESSAGE_%"
) ELSE (
  echo Slack Notifications Unavailable
)
exit /b !ERRORLEVEL!
```
