# PowerShell script to deploy the debt-tracker application to VPS
# Usage: .\deploy-to-vps.ps1

Write-Host "Starting deployment to VPS..." -ForegroundColor Green

# Define VPS connection details
$VPS_IP = "45.92.173.33"
$VPS_USER = "root"

# Create a temporary directory for deployment files
$DEPLOY_DIR = "$env:TEMP\debt-tracker-deploy"
if (Test-Path $DEPLOY_DIR) {
    Remove-Item -Path $DEPLOY_DIR -Recurse -Force
}
New-Item -ItemType Directory -Path $DEPLOY_DIR | Out-Null

# Copy necessary files to deployment directory
Write-Host "Preparing deployment files..." -ForegroundColor Yellow
Copy-Item -Path "dist\*" -Destination $DEPLOY_DIR -Recurse
Copy-Item -Path "backend" -Destination $DEPLOY_DIR -Recurse
Copy-Item -Path "package.json" -Destination $DEPLOY_DIR
Copy-Item -Path "deploy.sh" -Destination $DEPLOY_DIR

# Create a zip archive of the deployment files
Write-Host "Creating deployment package..." -ForegroundColor Yellow
$ZIP_FILE = "$env:TEMP\debt-tracker-deploy.zip"
if (Test-Path $ZIP_FILE) {
    Remove-Item -Path $ZIP_FILE -Force
}
Compress-Archive -Path "$DEPLOY_DIR\*" -DestinationPath $ZIP_FILE

# Copy the deployment package to VPS
Write-Host "Copying files to VPS..." -ForegroundColor Yellow
scp $ZIP_FILE "$VPS_USER@$VPS_IP:/tmp/"

# Run deployment on VPS
Write-Host "Running deployment on VPS..." -ForegroundColor Yellow
ssh $VPS_USER@$VPS_IP "cd /tmp && unzip -o debt-tracker-deploy.zip && cd debt-tracker-deploy && bash deploy.sh"

# Clean up local temporary files
Write-Host "Cleaning up local files..." -ForegroundColor Yellow
Remove-Item -Path $DEPLOY_DIR -Recurse -Force
Remove-Item -Path $ZIP_FILE -Force

Write-Host "Deployment process completed!" -ForegroundColor Green
Write-Host "Check your application at: http://debt-tracker.prox.uz" -ForegroundColor Cyan