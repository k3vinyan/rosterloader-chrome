$( document ).ready(function(){

  var rosterArray = [];
  var rosterJSON = {}

  let node = $('body');
  let roster = $(node).find('#cspDATable > tbody')[1].children;

  for(let i = 0; i < roster.length; i++){
    let driver = $(roster[i], 'tr')[0].children;
    let driverId = $(driver[0]).text();
    let driverName = $(driver[1]).text();
    let driverCurrentStatus = $(driver[2]).text();
    let driverBlockTime = $(driver[4]).text();
    let driverStartTime = $(driver[5]).text();
    let driverEndTime = $(driver[6]).text();


    if(rosterJSON[driverId]){
      rosterJSON[driverId].block.push({"time":driverBlockTime, "startTime":driverStartTime, "endTime":driverEndTime});
    } else {
      rosterJSON[driverId] = {"driverName":driverName, "block":[{"time":driverBlockTime, "startTime":driverStartTime, "endTime":driverEndTime}]};
    }

    rosterArray.push({driverName:driverName, driverId:driverId, driverBlockTime:driverBlockTime, driverStartTime:driverStartTime, driverEndTime:driverEndTime})
  };

  console.log("making request to api.........")
  $.ajax({
    type: "POST",
    url: "http://localhost:9000/api/drivers",
    data: JSON.stringify(rosterArray),
    success: function(data){
      console.log(data)
      console.log("request successful!")
    },
    error: function(data){
      console.log("An error has occurred.  Please check if server is on....")
    }
  });

  setTimeout(function () {
    location.reload();
  }, 24000);
});
