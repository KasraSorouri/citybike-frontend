# About
This is a client side of basic app for showing bike trips and some statistics about bike stations. It was done based on a pre-assignment challenge from Solita, and Solita supplied the journey and station data.

To make the application working, you also need a backend server, which you can clone: 

```
> git clone https://github.com/KasraSorouri/cityBike
```

# Frontend
 Frontend is based on React.JS and Redux and MaterialUI. According to Mui the supported browsers listed in below table.

## Prerequisite 
You need to have Node 18.12.1 and npm installed on your machine.
The versions which been mentioned above are based on the one I have on my personal computer.

# Run
To run the app, you can use 
```
> npm start 
```
if everything goes well the app start on port 3000

# Features
The app consists of 4 pages. Which can be navigated to by the App bar top menu.

### Trips:
It shows all paginated trips. You can filter the trips based on stations, time frame of the event, min and max duration and distance. 

### Stations:
It shows paginated all stations, their address, their capacity.
If you click on a station you navigate to the station info page. 

### Station Info:
In this page a detail information about one station and some important statistics are displayed.
Addition to the address and map of the station, the top 5 most Origins and destinations, average of duration and distance and round trip which the dictation is the same station and displayed. 
The station can be chosen directly on this page as well, by the selecting a station on the top corner input. 

### Uploading the new file
  In upload page you should choose what type of data you are going to update? ( trips or stations) then you could select your file and you can deactivate duplication check option.   By deactivating the duplication check option the data stores on database faster but there is the risk of duplicate data which decrease the validity of statistic reports. 
