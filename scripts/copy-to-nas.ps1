# Copies only what the NAS needs for Docker build (~1 MB, not ~700 MB).
# Usage: .\scripts\copy-to-nas.ps1
#        .\scripts\copy-to-nas.ps1 -NasPath "\\192.168.0.122\docker\ohhhdan-portfolio"

param(
    [string]$NasPath = "\\192.168.0.122\docker\ohhhdan-portfolio"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

if (-not (Test-Path $NasPath)) {
    Write-Host "NAS path not found: $NasPath"
    Write-Host "Edit -NasPath or map the network drive first."
    exit 1
}

$envFile = Join-Path $root "docker\synology\.env"
if (-not (Test-Path $envFile)) {
    Write-Host "Missing docker\synology\.env - run: npm run generate-prod-env www.ohhhdan.com"
    exit 1
}

New-Item -ItemType Directory -Force -Path "$NasPath\docker\synology\data", "$NasPath\docker\synology\scorm-packages" | Out-Null

$prodEnv = Join-Path $root "docker\synology\production.env"
$envSource = if (Test-Path $prodEnv) { $prodEnv } else { $envFile }
Copy-Item $envSource (Join-Path $NasPath "docker\synology\production.env") -Force

Write-Host "Copying to $NasPath (skipping node_modules, .next)..."
robocopy $root $NasPath /E `
    /XD node_modules .next out build coverage .git `
    /XF .env.local `
    /R:2 /W:2 | Out-Null

if ($LASTEXITCODE -gt 7) {
    Write-Host "Copy failed (robocopy exit $LASTEXITCODE)"
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "Done. On the NAS (SSH), run:"
Write-Host ""
Write-Host "  cd /volume1/docker/ohhhdan-portfolio"
Write-Host "  sudo docker compose -f docker/synology/docker-compose.yml up -d --build"
Write-Host ""
