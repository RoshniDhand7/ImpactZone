import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addLocation, addLocationType, getLocations, getLocationTypes, updateLocation, updateLocationType } from "../../../redux/actions/locationsActions";
import { showFormErrors } from "../../../utils/commonFunctions";
import { allValidations } from "../../../utils/formValidations";
import { stringToBoolean } from "../../../utils/javascript";
import { getClubs } from "../../../redux/actions/clubsActions";

export default function Index() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [location, setLocation] = useState({
        isActive: null,
        name: "",
        locationType: "",
        clubs: []
    });

    const [locationType, setLocationType] = useState({
        isActive: null,
        name: "",
        allowOverBooking: ""
    });

    const [locationFilters, setLocationFilters] = useState({});

    let { locations } = useSelector((state) => state?.locations);
    let { locationTypes } = useSelector((state) => state?.locations);
    let { clubs } = useSelector((state) => state?.clubs);

    const [loading, setLoading] = useState(false);
    const [showLocationType, setshowLocationType] = useState(false);
    const [showAddLocation, setShowAddLocation] = useState(false);

    const [id, setId] = useState("")
    const [deleteRow, setDeleteRow] = useState({});
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        dispatch(getLocationTypes(setLoading));
        dispatch(getLocations(setLoading));
        dispatch(getClubs(setLoading));
    }, [dispatch]);

    const handleLocationTypeChange = ({ name, value }) => {
        if (value) {
            const formErrors = allValidations(name, value, locationType);
            if (name === "allowOverBooking") value = stringToBoolean(value);
            setLocationType((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };

    const handleLocationChange = ({ name, value }) => {
        if (value) {
            const formErrors = allValidations(name, value, location);
            setLocation((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };

    const onAddLocationType = () => {
        if (!showFormErrors(locationType, setLocationType)) {
            if (id) {
                dispatch(updateLocationType(id, locationType, setLoading, null));
                setId("");
            } else {
                dispatch(addLocationType(locationType, setLoading, null));
            }
            return setshowLocationType(false);
        }
    };

    const onSaveLocation = () => {
        if (!showFormErrors(location, setLocation)) {
            if (id) {
                dispatch(updateLocation(id, location, setLoading, null));
                setId("");
            } else {
                dispatch(addLocation(location, setLoading, null));
            }
            return setShowAddLocation(false);
        }
    };

    const onEditLocationType = (data) => {
        setId(data._id);
        setLocationType({ ...data });
        return setshowLocationType(true);
    };

    const onEditLocation = (data) => {
        setId(data._id);
        setLocation({ ...data });
        return setShowAddLocation(true);
    };

    const handleLocationFilters = ({ name, value }) => {
        if (value) {
            if (name === "status") value = value === 'Active' ? true : false;
            setLocationFilters((prev) => ({ ...prev, [name]: value }));
        }
    };

    const onCickSearch = () => {
        if (Object.values(locationFilters)) {
            // dispatch(getLocations(setLoading, `?filters=${locationFilters.toString()}`))
        }
    }

    return {
        locationTypes,
        loading,
        location,
        setLocation,
        locationType,
        setLocationType,
        navigate,
        handleLocationTypeChange,
        onAddLocationType,
        showLocationType,
        setshowLocationType,
        onEditLocationType,
        id,
        setId,
        deleteRow,
        setDeleteRow,
        showDelete,
        setShowDelete,
        setLoading,
        locations,
        clubs,
        handleLocationChange,
        onSaveLocation,
        showAddLocation,
        setShowAddLocation,
        onEditLocation,
        locationFilters,
        handleLocationFilters,
        onCickSearch
    };
}