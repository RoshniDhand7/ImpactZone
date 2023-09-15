import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../../../redux/actions/eventActions'
import { useEffect } from 'react'
import { useState } from 'react'
import { getLocationTypes } from '../../../../redux/actions/locationsActions'
import { getStateVAlue } from '../../../../redux/actions/stateAction'

const EventContainer = () => {
    const dispatch = useDispatch()
    const EventData = useSelector((state)=>state.events.events)
    // const [locationType,setLocationType] = useState([])
    // const locationTypeOptions = useSelector((state)=>state.locations.locationTypes)
    const Eventcolumn = [
      { field: "internalUse", header: "Internal Use", body:"InternalTemplate"},
      { field: "type", header: "Category" },
      { field: "name", header: "Name" },
      { field: "colors", header: "Colors", body: "SampleText" },
      { field: "locationtype", header: "Location Type", body:"LocationTemplate"},
      { field: "mappedServices", header: "Mapped To Services" },
      { field: "", header: "", body: "ActionEditDelete" },
    ];


const [addEventData,setAddEventData] = useState(
  {   isActive:"",
    name: "",
    type: "",
    internalUse: "",
    locationType: "",
    defaulatMaxAttendees: "",
    eventCommType: "",
    availableOnline: "",
    trackAttendees: "",
    maxWaitList: "",
    waitListExpiration: "",
    requiredToCreate: {
        employee: "",
        location: "",
        member: ""
    },
    requiredToComplete: {
        employee: "",
        location: "",
        member: "",
        memberVerification: "",
        employeeVerification: "",
        autoComplete: ""
    },
    bookingAndCancellation: {
        overBooking: "",
        cancelNoCharge: "",
        cancelCharge: "",
        rebook: ""
    },
    durations: [],
    services: {
        catelogPrice: "",
        name: "",
        size: "",
        status: ""
    },
    calendarDisplay: [],
    popupDisplay: [],
    pendingColor: {
        boxColor: "",
        textColor: ""
    },
    rebookingTimeOption: "",
    deployedClubs: [  ],
    allowBooking: {
        atLeast: "",
        lessThan: ""
    },
    bookingCancellation: {
        cancelOnlie: "",
        timeBeforeEvent: ""
    },
    description: "",
    termsAndConditions: "",
    eventReminder: {
        sendEventNotification: "",
        timeBeforeEventToSendText: "",
        message: "",
        sendCancelLink: ""
    }
}
)

console.log("addEventData",addEventData)

const handleChange = (e,picklistName) => {
const {name,value} = e.target;
console.log("e",e.target)
if(picklistName?.includes("|picker")){
  setAddEventData((prev)=>{
    return {
      ...prev,
      [picklistName.split("|")[0]]:e.target
    }
  })
   dispatch(getStateVAlue(e.source))
}
else if(name.includes('|')){
  setAddEventData((prev)=>{
    return{
      ...prev,
      [name.split("|")[1]]:{
        ...prev[name.split("|")[1]],
        [name.split("|")[0]]:value
      }
    }
  })
}
else{
  setAddEventData((prev)=>{
    return{
      ...prev,
      [name]:value
    }
  })
}


}


    useEffect(() => {
        dispatch(getEvents())
        dispatch(getLocationTypes())
    }, [])

    // useEffect(()=>{
    //   let array=[]
    //   locationTypeOptions.map((item)=>{
    //     let obj = {
    //       label:"",
    //       value:""
    //     }

    //   })
      
    //   setLocationType()
    // },[locationTypeOptions])
    
  return {
    EventData,
    Eventcolumn,
    addEventData,
    handleChange,
  }
}

export default EventContainer