import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteEvents, UpdateEvents, addEvents, getEvents } from '../../../../redux/actions/eventActions'
import { useEffect } from 'react'
import { useState } from 'react'
import { getLocationTypes } from '../../../../redux/actions/locationsActions'
import { getStateVAlue } from '../../../../redux/actions/stateAction'
import { getLevels } from '../../../../redux/actions/levelsAction'
import { getClubs } from '../../../../redux/actions/clubsActions'
import FormValidation from '../../../../utils/AllFormValidation'
import { showAllFormErrors } from '../../../../utils/commonFunctions'
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

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
    const [showEventSetups, setShowEventSetups] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const[isEdit,setIsEdit] = useState(null)
    const [required,setRequired] = useState(["name","type","internalUse","locationType","defaulatMaxAttendees","eventCommType","availableOnline","requiredToCreate","requiredToComplete","bookingAndCancellation","durations"])
    
    console.log("activeIndex",activeIndex)
    console.log("setIsactive",isEdit)
    // const [locationType,setLocationType] = useState([])
    // const locationTypeOptions = useSelector((state)=>state.locations.locationTypes)
    const deleteConfirm = (id) => {
      
      confirmDialog({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        rejectClassName: "cancel-button",
        accept: () => acceptFunc(id),
        reject,
      });
    };
    const acceptFunc = (id) => {
      dispatch(DeleteEvents(id)).then((data)=>{console.log("data",data);if(data.success){dispatch(getEvents());const myTimeout = setTimeout(()=>setShowEventSetups(false), 1000)}})
    };
  
    const reject = () => {};
    const ActionEditDelete = (rowData) => {
      return (
        <>
          <div className="flex justify-content-end">
            <span className="mx-2" onClick={()=>setIsEdit(rowData)}>
              <i className="pi pi-pencil"></i>
            </span>
  
            <span onClick={()=>deleteConfirm(rowData?._id)}>
              <i className="pi pi-trash"></i>
            </span>
          </div>
        </>
      );
    };
    const InternalTemplate = (rowData) => {
      return (
        <>
        <div className="flex">
          {rowData.internalUse===true ? "Yes" : "No" }
        </div>
        </>
      )
    }
  
    const MappedServiceTemplate = (rowData) => {
      return(
        <div>
          {rowData?.services?.length>0 ? "Yes" : "No"}
        </div>
      )
    }
  
    const LocationTemplate = (rowData) => {
      return (
        <>
        <div className="flex">
          {rowData?.locationType?.name}
        </div>
        </>
      )
    }

    const Eventcolumn = [
      { field: "", header: "Internal Use", body:InternalTemplate},
      { field: "type", header: "Category" },
      { field: "name", header: "Name" },
      { field: "colors", header: "Colors", body: "SampleText" },
      { field: "", header: "Location Type", body:LocationTemplate},
      { field: "", header: "Mapped To Services", body:MappedServiceTemplate},
      { field: "", header: "", body: ActionEditDelete },
    ];

const [initialData,setInitialData] = useState({})
const [addEventData,setAddEventData] = useState(
  {   isActive:true,
    name: "",
    type: "",
    internalUse: null,
    locationType: "",
    defaulatMaxAttendees: "",
    eventCommType: "",
    availableOnline: null,
    trackAttendees: null,
    maxWaitList: "",
    waitListExpiration: "",
    requiredToCreate: {
        employee: null,
        location: null,
        member: null
    },
    requiredToComplete: {
        employee: null,
        location: null,
        member: null,
        memberVerification: null,
        employeeVerification: null,
        autoComplete: null
    },
    bookingAndCancellation: {
        overBooking: null,
        cancelNoCharge: null,
        cancelCharge: null,
        rebook: null
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
      cancelOnline: null,
        timeBeforeEvent: ""
    },
    description: "",
    termsAndConditions: "",
    eventReminder: {
        sendEventNotification: null,
        timeBeforeEventToSendText: "",
        message: "",
        sendCancelLink: null
    }
}
)


console.log("initialDatain container",initialData)

console.log("addEventData",addEventData)

// const required = ["name","type","internalUse","locationType","defaulatMaxAttendees","eventCommType","availableOnline","pendingColor","requiredToCreate","requiredToComplete","bookingAndCancellation","durations"]

const handleChange = (e,picklistName) => {
  console.log("e",e)
const {name,value} = e?.target;
console.log("nameeeee",name,value)
if(picklistName?.includes("|picker")){
  const formErrors = FormValidation(picklistName.split("|")[0], e.target, addEventData,required,initialData);
  
  setAddEventData((prev)=>{
    return {
      ...prev,
      [picklistName.split("|")[0]]:e.target,
      formErrors
    }
  })
   dispatch(getStateVAlue(e.source,picklistName.split("|")[0]))
}
else if(name.includes('|')){
  let newValue = {
    [name.split("|")[0]]:value
  }
  const formErrors = FormValidation(name.split("|")[1], newValue, addEventData,required,initialData);
  console.log("formErorsin handlechange",formErrors)
  setAddEventData((prev)=>{
    return{
      ...prev,
      formErrors,
      [name.split("|")[1]]:{
        ...prev[name.split("|")[1]],
        [name.split("|")[0]]:value,
      }
      
    }
  })
}
else{
  console.log("elseeeename",name,value)
  const formErrors = FormValidation(name, value, addEventData,required,initialData);
  setAddEventData((prev)=>{
    return{
      ...prev,
      [name]:value,
      formErrors
    }
  })
}


}

const isActiveHandle = (e) => {
  const {name,value} = e;
  const formErrors = FormValidation(name, value, addEventData,required,initialData);
  setAddEventData((prev)=>{
    return{
      ...prev,
      [name]:value,
      formErrors
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
let dashArray = array.filter((item)=>{return !newArray.find((child)=>{return item.level._id===child.level._id})})
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

  const formErrors = FormValidation("services", dashArray, addEventData,required,initialData);
  setAddEventData((prev)=>{
    return{
...prev,
services:dashArray,
serviceSelectbox:selectedArray,
formErrors
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
    if(showAllFormErrors(addEventData, setAddEventData,required,initialData)){
      if(isEdit){
        dispatch(UpdateEvents(addEventData)).then((data)=>{if(data.success){console.log("data",data);dispatch(getEvents());const myTimeout = setTimeout(()=>setShowEventSetups(false), 1000)}})
      }else{
        dispatch(addEvents(addEventData)).then((data)=>{if(data.success){console.log("data",data);dispatch(getEvents());const myTimeout = setTimeout(()=>setShowEventSetups(false), 1000)}})
      }
      
    }
    else{
      window.scrollTo({
        top: 250,
        left: 0,
        behavior: "smooth",
      });
    }

  }



  const deployhandle = (e,picklistName) => {
  
    let selectedValue = e.target;
    let newValue = []
    selectedValue.map((item)=>{
      newValue.push(item._id)
    })
    const formErrors = FormValidation(picklistName.split("|")[0], newValue, addEventData,required,initialData);
    setAddEventData((prev)=>{
      return {
        ...prev,
        [picklistName.split("|")[0]]:newValue,
        deployedClubPickerOption:e.target,
        formErrors
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

    useEffect(() => {
      setInitialData(addEventData)
    }, [])

    useEffect(() => {
     if(isEdit){
      let ServiceSelectBox = []
      
      isEdit?.services?.map((item)=>{
        console.log("itemInside",item)
        let objLevel = {
          ...item.level,
          employees:[]
        }
        ServiceSelectBox.push(objLevel)
      })
      let objNew = {}
      Object.keys(isEdit).map((item)=>{
        console.log("item",item)
        // if(isEdit[item]==true){
        //   objNew[item] = "true"
        // }
        // else if(isEdit[item]==false){
        //   objNew[item] = "false"
        // }
        // else{
          objNew[item] = isEdit[item]
        // }
      })

let obj = {
  ...objNew,
  serviceSelectbox:ServiceSelectBox,
  deployedClubPickerOption:isEdit.deployedClubs
}
console.log("obj",obj)
setAddEventData(obj)
setShowEventSetups(true)
     }
    }, [isEdit])
    
    

    useEffect(() => {
      if(activeIndex===0){
        setRequired(["name","type","internalUse","locationType","defaulatMaxAttendees","eventCommType","availableOnline","requiredToCreate","requiredToComplete","bookingAndCancellation","durations"])
      }
      else if(activeIndex===1){
        setRequired(["services"])
      }
      else if(activeIndex===2){
        setRequired(["calendarDisplay","popupDisplay","pendingColor","rebookingTimeOption","deployedClubs"])
      }
    }, [activeIndex])
    
    

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
    DeleteAllService,
    setShowEventSetups,
    showEventSetups,
    setAddEventData,
    required,
    activeIndex,
    setActiveIndex,
    initialData,
    // setIsEdit
  }
}

export default EventContainer