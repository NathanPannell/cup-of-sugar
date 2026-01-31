To run the api:
>> cd api
>> docker build -t doorbell-api .
>> docker run -p 5000:5000 --env-file .env doorbell-api
