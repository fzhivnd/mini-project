# Mini Project 1
## API to get currency excahnge from USD to IDR
### This API is get current price of IDR based on USD and record every price on database
#### only record the value of price, if current price has same value with recorded value, database will update the recorded date of that price
### This API have a scheduler that call API every 11.59 Asia/Jakarta time

## API Documentation
* GET /current : fetch latest USD price based on IDR and store it on database
* GET /recorded : fecth all USD price recorded data from database

* Scheduler : Every 11.59 Asia/Jakarta Time will call GET /current
