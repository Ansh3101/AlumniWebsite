echo  "Building App..."
npm run build

echo "Deploying Files to Server"
scp -r build/* root@82.112.235.53:/var/www/82.112.235.53/

echo "Done!"