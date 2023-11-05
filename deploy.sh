# build project and create dist
npm run build

# going to dist
cd ./dist

copy index.html 404.html

# init
git init
git add .
git commit . -m "auto deploy"

# push to repository(URL), from local branch <master> to remote brance <gh-pages>
git push -f https://github.com/Judy0Pumpkin/Unicorn-Notebook.git master:gh-pages

cd ..

# promt input for finish, for checking result
echo "Press any key to continue."
read -s -n 1