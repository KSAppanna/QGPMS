import React, { useState } from 'react';
import Select, { components } from 'react-select';
import rawOptions from './User-Dump.json';

const options = rawOptions.map(user => ({
  ...user,
  label: user.Full_Name,
  value: user.Employee_ID
}));


const CustomOption = (props) => (
  <components.Option {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={props.data.imageUrl}
        alt={props.data.label}
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          marginRight: 10
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{props.data.label}</span>
        <span style={{ fontSize: '0.85em', color: '#555' }}>{props.data.Employee_ID}</span>
      </div>
    </div>
  </components.Option>
);


const CustomMultiValueLabel = (props) => (
  <components.MultiValueLabel {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={props.data.imageUrl}
        alt={props.data.label}
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          marginRight: 5
        }}
      />
      {props.data.label}
    </div>
  </components.MultiValueLabel>
);

// Styling
const customStyles = {
  control: (provided) => ({
    ...provided,
    color: 'black'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'black'
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'black',
    backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
  })
};



const Dropdown = () => {
   const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };  

  return (
    <Select
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      isMulti={true}
      styles={customStyles}
      placeholder="Select owners..."
      components={{ Option: CustomOption, MultiValueLabel: CustomMultiValueLabel }}
    />
  );
};

export default Dropdown