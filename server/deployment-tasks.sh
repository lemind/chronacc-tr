echo "start deployment tasks"

sleep 3

echo "migrate-mongo status"

cd db && migrate-mongo up && migrate-mongo status
