pkill -f 'updater_deamon'
bash -c "exec -a updater_deamon python3 updater_deamon.py &"
uvicorn scry:app --reload
