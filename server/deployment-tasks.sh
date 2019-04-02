echo "start deployment tasks"

sleep 3

echo "migrate-mongo status"

migrate-mongo up && migrate-mongo status
