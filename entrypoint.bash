rm -r ../build

cd client

npm run build

mv build ../

cd ..

npm run start
