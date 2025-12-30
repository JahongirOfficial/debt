#!/bin/bash

# Deployment script for debt-tracker application
# This script will deploy both frontend and backend to the VPS

echo "Starting deployment of debt-tracker application..."

# Create project directory
sudo mkdir -p /var/www/debt-tracker
sudo chown $USER:$USER /var/www/debt-tracker

# Copy frontend build files
echo "Copying frontend files..."
cp -r dist/* /var/www/debt-tracker/

# Copy backend files
echo "Copying backend files..."
cp -r backend /var/www/debt-tracker/
cp package.json /var/www/debt-tracker/

# Install backend dependencies
echo "Installing backend dependencies..."
cd /var/www/debt-tracker/backend
npm install --production

# Create systemd service for backend
echo "Creating systemd service for backend..."
sudo tee /etc/systemd/system/debt-tracker-backend.service > /dev/null <<EOF
[Unit]
Description=Debt Tracker Backend Service
After=network.target

[Service]
Type=exec
User=www-data
WorkingDirectory=/var/www/debt-tracker/backend
ExecStart=/usr/bin/node server.js
Restart=always
Environment=NODE_ENV=production
Environment=PORT=5001

[Install]
WantedBy=multi-user.target
EOF

# Setup Nginx configuration
echo "Setting up Nginx configuration..."
sudo tee /etc/nginx/sites-available/debt-tracker > /dev/null <<EOF
server {
    listen 80;
    server_name debt-tracker.prox.uz;

    root /var/www/debt-tracker;
    index index.html;

    # MIME types for JavaScript modules
    include /etc/nginx/mime.types;
    types {
        application/javascript js mjs;
        text/css css;
    }

    # Frontend static files
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Static assets with proper caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:5001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/debt-tracker /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart services
echo "Restarting services..."
sudo systemctl daemon-reload
sudo systemctl restart debt-tracker-backend
sudo systemctl restart nginx

echo "Deployment completed successfully!"
echo "Your application should now be accessible at http://debt-tracker.prox.uz"