import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEvents, getEvents } from '../../../../redux/actions/eventActions'
import { useEffect } from 'react'
import { useState } from 'react'
import { getLocationTypes } from '../../../../redux/actions/locationsActions'
import { getStateVAlue } from '../../../../redux/actions/stateAction'
import { getLevels } from '../../../../redux/actions/levelsAction'
import { getClubs } from '../../../../redux/actions/clubsActions'

const EventContainer = () => {
    const dispatch = useDispatch()
    const EventData = useSelector((state)=>state.events.events)
    const allClubs = useSelector((state)=>state.clubs.clubs)
    console.log("clubs",allClubs)
    const [clubSource,setClubSource] = useState([])
    const [levelIndex,setLevelIndex] = useState();
    const [selectedRow,setSelectedRow] = useState([]);

    const[serviceIndex,setServiceIndex] = useState();
    const[serviceDetailIndex,setServiceDetailIndex] = useState();
    
    // const [locationType,setLocationType] = useState([])
    // const locationTypeOptions = useSelector((state)=>state.locations.locationTypes)
    const Eventcolumn = [
      { field: "internalUse", header: "Internal Use", body:"InternalTemplate"},
      { field: "type", header: "Category" },
      { field: "name", header: "Name" },
      { field: "colors", header: "Colors", body: "SampleText" },
      { field: "locationtype", header: "Location Type", body:"LocationTemplate"},
      { field: "mappedServices", header: "Mapped To Services", body:"MappedServiceTemplate"},
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
    // services: {
    //     catelogPrice: "",
    //     name: "",
    //     size: "",
    //     status: ""
    // },
    services: [],
    serviceSelectbox:[],
    calendarDisplay: [],
    popupDisplay: [],
    pendingColor: {
        boxColor: "",
        textColor: ""
    },
    rebookingTimeOption: "",
    deployedClubs: [],
    deployedClubPickerOption:[],
    allowBooking: {
        atLeast: "",
        lessThan: ""
    },
    bookingCancellation: {
      cancelOnline: "",
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
  console.log("e",e)
const {name,value} = e?.target;
if(picklistName?.includes("|picker")){
  setAddEventData((prev)=>{
    return {
      ...prev,
      [picklistName.split("|")[0]]:e.target
    }
  })
   dispatch(getStateVAlue(e.source,picklistName.split("|")[0]))
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

const isActiveHandle = (e) => {
 const {name,value} = e;
  setAddEventData((prev)=>{
    return{
      ...prev,
      [name]:value
    }
  })
}

const serviceAddRow = (e) => {
  setSelectedRow(e.value)
}

const serviceHandleChange = (e) => {
  setSelectedRow(null)
let  selectValue = [...selectedRow]
console.log("e",e,levelIndex)
let wholeService = [...addEventData.services]
let serviceinitialObject = {...addEventData.services[levelIndex].level}
let serviceinitiaArray = [...addEventData.services[levelIndex].services]
selectValue.map((item)=>{
  console.log("item",item)
let  found = true
  serviceinitiaArray.map((child)=>{
    console.log("testing")
    if(child.id===item.id){
      found = false
    }
  })
console.log("found",found)
  if(found==true){
    console.log("inside")
    serviceinitiaArray.push(item)
  }

})

console.log("serviceinitiaArray",serviceinitiaArray)

let newObject = {
  level:{...serviceinitialObject},
  services:serviceinitiaArray,
}

wholeService.splice(levelIndex,1,newObject)

console.log("wholeservice",wholeService)

setAddEventData((prev)=>{
  return{
    ...prev,
    services:wholeService
  }
})
}

const serviceSelectHandle = (e) => {
let  selectedArray = [...e.value]
  console.log("e",e)
  let array = [...addEventData.services]
  console.log("array",array)

let newArray = array.filter((item)=>{return !selectedArray.find((child)=>{return item.level._id==child._id})})
let Update = selectedArray.filter((item)=>{return !array.find((child)=>{return item._id==child.level._id})})
console.log("newArray",newArray)
console.log("Update",Update)


Update.map((item)=> { 
  let obj = {
    level:{...item},
    services:[]
  }
  array.push(obj)
})
let dashArray = array.filter((item)=>{return !newArray.find((child)=>{return item.level._id===child._id})})
console.log("dashArray",dashArray)
  // selectedArray.map((item)=>{
  //   let obj = {
  //     // catelogPrice: "",
  //     // name: "",
  //     // size: "",
  //     // status: "",
  //     detail:[],
  //     labelId:item._id,
  //     labelName:item.name,
  // }

  // array.push(obj)
  // })


  setAddEventData((prev)=>{
    return{
...prev,
services:dashArray,
serviceSelectbox:selectedArray
    }
  })
  }

const DeleteService = () => {
  let wholeService = [...addEventData.services]
  let allAddEvent = {...addEventData.services[serviceIndex]}
 let filterService = allAddEvent.services.filter((item,index)=>{return index!==serviceDetailIndex})
 let newOuterService = {
  ...allAddEvent,
  services:filterService
 }
 wholeService.splice(serviceIndex,1,newOuterService)
 setAddEventData((prev)=>{
  return{
    ...prev,
    services:wholeService
  }
 })

  // allAddEvent.services.forEach((item)=> {
  //   item.services = item.services.filter((child,index) => index != serviceDetailIndex);
  // });
  // setAddEventData(allAddEvent)
  // let filterArray =  addEventData.services[serviceIndex].services[serviceDetailIndex]
}

const DeleteAllService = (index) => {
  let wholeService = [...addEventData.services]
  let allAddEvent = {...addEventData.services[serviceIndex]}
 let newOuterService = {
  ...allAddEvent,
  services:[]
 }
 wholeService.splice(serviceIndex,1,newOuterService)
 setAddEventData((prev)=>{
  return{
    ...prev,
    services:wholeService
  }
 })

}

const changePosition = (value) => {
  let allData = {...addEventData}
  if(value=="up"&&serviceDetailIndex!==0){
    allData.services[serviceIndex].services.splice(serviceDetailIndex-1, 0, allData.services[serviceIndex].services.splice(serviceDetailIndex, 1)[0]);
    console.log("allData",allData)
    setAddEventData(allData)
    setServiceDetailIndex(serviceDetailIndex-1)
  }
  else if(value=="down"&&serviceDetailIndex!==allData.services[serviceIndex].services.length-1){
    allData.services[serviceIndex].services.splice(serviceDetailIndex+1, 0, allData.services[serviceIndex].services.splice(serviceDetailIndex, 1)[0]);
    console.log("allData",allData)
    setAddEventData(allData)
    setServiceDetailIndex(serviceDetailIndex+1)
  }
 
}

  const setIndexFunc = (index,child) => {
    console.log("indexxx",index,child)
    setServiceIndex(index)
    setServiceDetailIndex(child)
  }

  

  const submit = () => {
dispatch(addEvents(addEventData))
  }



  const deployhandle = (e,picklistName) => {
    let selectedValue = e.target;
    let newValue = []
    selectedValue.map((item)=>{
      newValue.push(item._id)
    })
    setAddEventData((prev)=>{
      return {
        ...prev,
        [picklistName.split("|")[0]]:newValue,
        deployedClubPickerOption:e.target
      }
    })
    setClubSource(e.source)
  }



    useEffect(() => {
        dispatch(getEvents())
        dispatch(getLocationTypes())
        dispatch(getLevels())
        dispatch(getClubs())
    }, [])

    useEffect(() => {
      setClubSource(allClubs)
      
    }, [allClubs])
    

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
    serviceSelectHandle,
    setLevelIndex,
    serviceHandleChange,
    serviceAddRow,
    selectedRow,
    isActiveHandle,
    submit,
    setIndexFunc,
    serviceIndex,
    serviceDetailIndex,
    deployhandle,
    clubSource,
    DeleteService,
    changePosition,
    DeleteAllService
  }
}

export default EventContainer