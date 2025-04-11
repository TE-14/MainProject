
#!/bin/bash
# Log the deployment start
echo "Starting deployment at $(date)"

# Navigate to the project directory
cd /var/www/Sheildskills/MainProject

# Force clean any local changes (BE CAREFUL: this discards any local changes)
git reset --hard

# Make sure we have the latest refs from the remote
git fetch --all

# Force the local branch to exactly match the remote branch
git reset --hard origin/main  # Change 'main' to your branch name if different

# Show the current commit to verify we're on the latest code
echo "Current commit:"
git log -1 --oneline

# Install any new dependencies
npm install

# Fix npm audit issues (non-breaking)
npm audit fix

# Ensure the dist directory exists and has proper permissions BEFORE building
sudo mkdir -p /var/www/Sheildskills/MainProject/dist
sudo chown -R ec2-user:ec2-user /var/www/Sheildskills/MainProject/dist
sudo chmod -R 755 /var/www/Sheildskills/MainProject/dist

# Build the application
npm run build

# Set proper permissions AFTER building
sudo chown -R apache:apache /var/www/Sheildskills/MainProject/dist
sudo chmod -R 755 /var/www/Sheildskills/MainProject/dist

# Restart Apache
sudo systemctl restart httpd

echo "Deployment completed at $(date)"
