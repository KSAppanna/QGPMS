import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Select, { components } from 'react-select';
import { TiTick } from 'react-icons/ti';

const fieldConfig = [
  { name: 'cfasId', label: 'CFAS ID *', type: 'text', required: true },
  { name: 'sow', label: 'SOW *', type: 'select', required: true, options: ['SOW-A', 'SOW-B'] },
  { name: 'cilliCode', label: 'CILLI Code', type: 'text' },
  { name: 'permit', label: 'Permit *', type: 'select', required: true, options: ['Yes', 'No'] },
  { name: 'wireCenter', label: 'Wire Center', type: 'text' },
  { name: 'nppaxNo', label: 'NPPAX No', type: 'number' },
  { name: 'pfpAddress', label: 'PFP Address', type: 'text' },
  { name: 'daNumber', label: 'DA Number', type: 'number' },
  { name: 'jobName', label: 'Job Name *', type: 'text', required: true },
  { name: 'f1CfasId', label: 'F1 CFAS ID *', type: 'text', required: true },
  { name: 'f2CfasId', label: 'F2 CFAS ID *', type: 'text', required: true },
  { name: 'psaNumber', label: 'PSA Number', type: 'number' },
  { name: 'attScore', label: 'ATT Score', type: 'number' },
  { name: 'state', label: 'State *', type: 'text', required: true },
  { name: 'receivedDate', label: 'Received Date *', type: 'date', required: true },
  { name: 'dueDate', label: 'Due Date *', type: 'date', required: true },
];

const alphanumericFields = new Set([
  'cfasId', 'cilliCode', 'wireCenter', 'pfpAddress',
  'jobName', 'f1CfasId', 'f2CfasId', 'state'
]);
const numericFields = new Set(['nppaxNo', 'attScore', 'psaNumber', 'daNumber']);

const ProjectInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialState = Object.fromEntries(fieldConfig.map(field => [field.name, '']));
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    if (alphanumericFields.has(name) && !/^[a-zA-Z0-9 ]*$/.test(value)) return;
    if (numericFields.has(name) && !/^[0-9]*$/.test(value)) return;

    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (fieldConfig.find(f => f.name === name)?.required) {
      const error = validate(updatedForm)[name];
      setFormErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  };

  const validate = (values) => {
    const errors = {};
    const alphaNumRegex = /^[a-zA-Z0-9 ]+$/;

    if (!values.cfasId) errors.cfasId = 'CFAS ID is required';
    else if (values.cfasId.length < 5) errors.cfasId = 'Minimum 5 characters';
    else if (!alphaNumRegex.test(values.cfasId)) errors.cfasId = 'Must be alphanumeric';

    ['sow', 'permit', 'jobName', 'f1CfasId', 'f2CfasId', 'state', 'receivedDate', 'dueDate'].forEach(field => {
      if (!values[field]) errors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
    });

    if (values.f1CfasId && values.f2CfasId && values.f1CfasId === values.f2CfasId) {
      errors.f2CfasId = 'Must be different from F1 CFAS ID';
    }

    const rec = new Date(values.receivedDate);
    const due = new Date(values.dueDate);
    if (values.receivedDate && values.dueDate && due < rec) {
      errors.dueDate = 'Due Date must not be before Received Date';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const payload = {
        ...formData,
        senderId: "userA",
        receiverId: "userB",
      };

      await axios.post('http://localhost:3000/Projects', payload);
      toast.success('Data saved successfully!');
      setFormData(initialState);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save data');
    }
  };

  return (
    <div className="w-full sm:w-[95%] mx-auto sm:ml-14">
      <Toaster position="top-center" />
      <div
        className=" mt-2 bg-gradient-to-r from-blue-500 via-sky-300 to-blue-200 text-white px-3 h-9 rounded-lg flex items-center justify-between cursor-pointer shadow-lg backdrop-blur-md hover:from-blue-600 hover:to-blue-300"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div className="flex items-center w-full">
          <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d={isOpen
                ? 'M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z'
                : 'M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'}
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-2 font-medium">Project Information</span>
        </div>
      </div>

      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="mt-1 p-4 rounded-lg bg-white dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="grid grid-cols-2  sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-2">
            {fieldConfig.map(({ name, label, type, required, options }) => {
              const value = formData[name];
              const hasError = formErrors[name];
              const borderColor = hasError
                ? 'border-red-500'
                : value
                ? 'border-green-500'
                : 'border-gray-300';

              const commonProps = {
                name,
                value,
                onChange: handleChange,
                required,
                onKeyDown: numericFields.has(name)
                  ? (e) => {
                      if (['-', 'e', '.', 'E'].includes(e.key)) e.preventDefault();
                    }
                  : undefined,
                className: `w-full text-sm rounded-md px-2 h-[32px] bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-900 placeholder-gray-500 transition duration-200 focus:outline-none focus:ring-0 ${borderColor} ${numericFields.has(name) ? 'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''}`
              };

              return (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  {type === 'select' ? (
                    <Select
                      name={name}
                      value={options.map(opt => ({ label: opt, value: opt })).find(opt => opt.value === value)}
                      onChange={(selected) => handleChange({ target: { name, value: selected?.value || '' } })}
                      options={options.map(opt => ({ label: opt, value: opt }))}
                      isClearable
                      placeholder={`Select ${label}`}
                      className="w-full text-sm"
                      classNamePrefix="react-select"
                      components={{
                        DropdownIndicator: (props) => (
                          <>
                            {value && !hasError && <TiTick className="text-green-500 mr-1" />}
                            <components.DropdownIndicator {...props} />
                          </>
                        )
                      }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: '#f9fafb',
                          border: 'none',
                          boxShadow: 'none',
                          borderRadius: '0.375rem',
                          minHeight: '32px',
                          height: '32px',
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          fontSize: '0.875rem',
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          padding: '0 6px',
                        }),
                        indicatorsContainer: (base) => ({
                          ...base,
                          height: '32px',
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          padding: '4px',
                        }),
                        clearIndicator: (base) => ({
                          ...base,
                          padding: '4px',
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: '#6b7280',
                        }),
                      }}
                    />
                  ) : (
                    <div className="relative">
                      <input
                        {...commonProps}
                        type={type}
                        inputMode={numericFields.has(name) ? 'numeric' : undefined}
                        pattern={alphanumericFields.has(name) ? '^[a-zA-Z0-9 ]*$' : undefined}
                        title={alphanumericFields.has(name) ? 'Only alphanumeric characters allowed' : undefined}
                        placeholder={required ? `Enter ${label.replace(/\*/g, '')}` : label.replace(/\*/g, '')}
                      />
                      {value && !hasError && (
                        <TiTick className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 text-lg" />
                      )}
                    </div>
                  )}

                  <div className={`transition-all duration-500 transform ${hasError ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none h-0'}`}>
                    <p className="text-sm text-red-500 mt-1 italic">{hasError}</p>
                  </div>
                </div>
              );
            })}

            <div className="col-span-2 flex justify-end">
              <button type="submit" className="mt-5 h-9 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
