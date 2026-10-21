# Registers Windows tasks: weekly deploy check + agent server at logon.
# Run once as your user: npm run install-weekly-deploy

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$npm = (Get-Command npm.cmd -ErrorAction Stop).Source

$weeklyAction = New-ScheduledTaskAction -Execute $npm -Argument "run deploy-agent" -WorkingDirectory $root
$weeklyTrigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At 3:00AM
$weeklySettings = New-ScheduledTaskSettingsSet -StartWhenAvailable

Register-ScheduledTask `
    -TaskName "Ohhhdan Portfolio Weekly Deploy" `
    -Action $weeklyAction `
    -Trigger $weeklyTrigger `
    -Settings $weeklySettings `
    -Description "Copies local site changes to NAS if files changed." `
    -Force | Out-Null

$serveAction = New-ScheduledTaskAction -Execute $npm -Argument "run deploy-agent:serve" -WorkingDirectory $root
$serveTrigger = New-ScheduledTaskTrigger -AtLogOn
$serveSettings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries

Register-ScheduledTask `
    -TaskName "Ohhhdan Portfolio Deploy Agent" `
    -Action $serveAction `
    -Trigger $serveTrigger `
    -Settings $serveSettings `
    -Description "Listens for admin Pull changes button from the NAS." `
    -Force | Out-Null

Write-Host ""
Write-Host "Scheduled tasks installed:"
Write-Host "  - Ohhhdan Portfolio Weekly Deploy (Sundays 3:00 AM)"
Write-Host "  - Ohhhdan Portfolio Deploy Agent (starts at Windows logon)"
Write-Host ""
Write-Host "Run once now if you want the agent listening immediately:"
Write-Host "  npm run deploy-agent:serve"
Write-Host ""
