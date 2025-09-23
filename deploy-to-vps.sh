#!/bin/bash

# Script to deploy the debt-tracker application to VPS
# Usage: ./deploy-to-vps.sh

echo "Starting deployment to VPS..."

# Define VPS connection details
VPS_IP="45.92.173.33"
VPS_USER="root"

# Create a temporary directory for deployment files
DEPLOY_DIR="/tmp/debt-tracker-deploy"
mkdir -p $DEPLOY_DIR

# Copy necessary files to deployment directory
echo "Preparing deployment files..."
cp -r dist $DEPLOY_DIR/
cp -r backend $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp deploy.sh $DEPLOY_DIR/

# Create a tarball of the deployment files
echo "Creating deployment package..."
cd /tmp
tar -czf debt-tracker-deploy.tar.gz debt-tracker-deploy

# Copy the deployment package to VPS
echo "Copying files to VPS..."
scp debt-tracker-deploy.tar.gz $VPS_USER@$VPS_IP:/tmp/

# Run deployment on VPS
echo "Running deployment on VPS..."
ssh $VPS_USER@$VPS_IP << 'EOF'
cd /tmp
tar -xzf debt-tracker-deploy.tar.gz
cd debt-tracker-deploy
chmod +x deploy.sh
./deploy.sh
EOF

# Clean up local temporary files
echo "Cleaning up local files..."
rm -rf $DEPLOY_DIR
rm /tmp/debt-tracker-deploy.tar.gz

echo "Deployment process completed!"
echo "Check your application at: http://debt-tracker.prox.uz"