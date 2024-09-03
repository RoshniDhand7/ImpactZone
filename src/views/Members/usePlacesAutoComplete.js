import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import formValidation from '../../utils/validations';

const usePlacesAutocomplete = (data, setData) => {
    const handleChange1 = (address) => {
        const formErrors = formValidation('address', address, data);
        setData((prev) => ({ ...prev, address: address, formErrors }));
    };

    const handleSelect = (address) => {
        const formErrors = formValidation('address', address, data);
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => setData((prev) => ({ ...prev, address: address, latitude: latLng.lat, longitude: latLng.lng, formErrors })))
            .catch((error) => console.error('Error', error));
    };

    const renderAutocomplete = () => (
        <>
            <PlacesAutocomplete value={data.address} onChange={handleChange1} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'p-3 border-1 border-round-lg outline-none border-200 w-full mt-1 location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                const style = suggestion.active
                                    ? {
                                          backgroundColor: '#fafafa',
                                          fontSize: '12px',
                                          marginBottom: '10px',
                                          cursor: 'pointer',
                                          padding: '5px',
                                          borderBottom: '1px solid gray',
                                      }
                                    : {
                                          fontSize: '12px',
                                          marginBottom: '10px',
                                          cursor: 'pointer',
                                          padding: '5px',
                                          borderBottom: '1px solid #ebe9e9',
                                      };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <div className="p-error text-sm">{data?.formErrors?.address}</div>
        </>
    );

    return {
        renderAutocomplete,
    };
};

export default usePlacesAutocomplete;
