import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store/employeeSlice';
import { states, departments } from '../utils/states';
import { DatePicker } from 'DatePickerReact';
import 'DatePickerReact/dist/style.css';
import Modal from '../components/Modal';
import '../styles/CreateEmployee.css';

/**
 * CreateEmployee page component
 * Form for creating new employees
 */
function CreateEmployee() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: ''
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle date change from DatePicker
  const handleDateChange = (name) => (value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Street is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid zip code format';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(addEmployee(formData));
      setIsModalOpen(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: ''
      });
    }
  };

  return (
    <div className="create-employee">
      <h2>Create Employee</h2>
      
      <form onSubmit={handleSubmit} className="employee-form" noValidate>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'error' : ''}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && (
            <span id="firstName-error" className="error-message">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? 'error' : ''}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
          {errors.lastName && (
            <span id="lastName-error" className="error-message">{errors.lastName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <DatePicker
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleDateChange('dateOfBirth')}
            placeholder="YYYY-MM-DD"
            maxDate={new Date()}
            className={errors.dateOfBirth ? 'error' : ''}
          />
          {errors.dateOfBirth && (
            <span id="dateOfBirth-error" className="error-message">{errors.dateOfBirth}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleDateChange('startDate')}
            placeholder="YYYY-MM-DD"
            className={errors.startDate ? 'error' : ''}
          />
          {errors.startDate && (
            <span id="startDate-error" className="error-message">{errors.startDate}</span>
          )}
        </div>

        <fieldset className="address-fieldset">
          <legend>Address</legend>

          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className={errors.street ? 'error' : ''}
              aria-invalid={!!errors.street}
              aria-describedby={errors.street ? 'street-error' : undefined}
            />
            {errors.street && (
              <span id="street-error" className="error-message">{errors.street}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={errors.city ? 'error' : ''}
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? 'city-error' : undefined}
            />
            {errors.city && (
              <span id="city-error" className="error-message">{errors.city}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className={errors.state ? 'error' : ''}
              aria-invalid={!!errors.state}
              aria-describedby={errors.state ? 'state-error' : undefined}
            >
              <option value="">Select a state</option>
              {states.map(state => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <span id="state-error" className="error-message">{errors.state}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className={errors.zipCode ? 'error' : ''}
              aria-invalid={!!errors.zipCode}
              aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
            />
            {errors.zipCode && (
              <span id="zipCode-error" className="error-message">{errors.zipCode}</span>
            )}
          </div>
        </fieldset>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className={errors.department ? 'error' : ''}
            aria-invalid={!!errors.department}
            aria-describedby={errors.department ? 'department-error' : undefined}
          >
            <option value="">Select a department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <span id="department-error" className="error-message">{errors.department}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Save
        </button>
      </form>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <p>Employee Created!</p>
      </Modal>
    </div>
  );
}

export default CreateEmployee;