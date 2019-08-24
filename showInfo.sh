echo "current folder dir"
echo $PWD
ls

echo "_________________"
echo "client folder dir"
cd $TRAVIS_BUILD_DIR/client
echo $PWD
ls
