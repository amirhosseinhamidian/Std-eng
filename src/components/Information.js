import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import styles from "./Information.module.css";
import React, { useState, useEffect } from 'react';
import { useGetProfileInformation, useUpdateProfile } from '../services/apiService';

const Information = () => {
  const { data: profileData, isLoading, isError } = useGetProfileInformation();
  const initialFormData = {
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    education: '', 
    company: '',
    gender: '',
    birth_date: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    console.log("profile data: ", profileData)
    if (profileData) {
      setFormData({
        email: profileData.user.email || '',
        phone: profileData.user.phone || '',
        first_name: profileData.user.first_name || '',
        last_name: profileData.user.last_name || '',
        education: profileData.user.education || '',
        company: profileData.user.company || '',
        gender: profileData.user.gender || '',
        birth_date: profileData.user.birth_date || '',
      });
    }
    console.log("form data: ", formData)
  }, [profileData]);

  const [education, setEducation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [focusState, setFocusState] = useState({
    lastNameFocused: false,
    emailFocused: false,
    firstNameFocused: false,
    genderFocused: false,
    educationFocused: false,
    companyFocused: false,
    birthFocused: false,
  });

  
  const handleChangeEducation = (event) => {
    setEducation(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value || '',
    }));
  };

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    education: '',
    company: '',
    birth_date: '',
  });

  const { mutate: updateProfile, isLoading: isLoadingUpdate, errorUpdate } = useUpdateProfile();

  const saveHandle = () => {
    try {
      updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        email: formData.email,
        education: formData.education,
        company: formData.company,
        birth_date: formData.birth_date,
      });
    } catch (error) {
      console.log("errorUpdate", errorUpdate)
    if(errorUpdate) {
      console.error('Error updating profile:', errorUpdate);
      if (errorUpdate.response) {
        console.error('Error response:', errorUpdate.response.data);
        if (errorUpdate.response.data.errors) {
          const errorData = errorUpdate.response.data.errors;
          const newErrors = {};
          Object.keys(errorData).forEach((key) => {
            newErrors[key] = errorData[key][0]; // Assuming you want to display only the first error message
          });
          setErrors(newErrors);
          console.log("errrorrrs: ", newErrors)
        }
      } else if (errorUpdate.request) {
        console.error('No response from server:', errorUpdate.request);
        // Handle this case, retry request, or notify user
      } else {
        console.error('Error setting up request:', errorUpdate.message);
        // Handle other errors, retry, or notify user
      }
    }
    }
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching profile data</div>;
  }
  
  return (
    <div className={styles.information}>
      <form className={styles.frameParent}>
        <img className={styles.frameChild} alt="" src="/frame-32@2x.png" />
        <div className={styles.frameGroup}>
          <div className={styles.inputsParent}>
            <TextField
              className={styles.email}
              color="warning"
              label="Email"
              name="email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
              value={formData.email}
              onChange={handleChange}
              inputlabelprops={{
                shrink: !!profileData.email || focusState.emailFocused,
              }}
              onFocus={() => setFocusState({ ...focusState, emailFocused: true })}
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
            <TextField
              className={styles.email}
              color="warning"
              label="Phone"
              name="phone"
              disabled
              variant="outlined"
              value={formData.phone}
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
          </div>
          <div className={styles.inputsParent}>
            <TextField
              className={styles.email}
              color="warning"
              label="First name"
              name="first_name"
              variant="outlined"
              error={!!errors.first_name}
              helperText={errors.first_name}
              value={formData.first_name}
              onChange={handleChange}
              inputlabelprops={{
                shrink: !!profileData.first_name || focusState.firstNameFocused,
              }}
              onFocus={() => setFocusState({ ...focusState, firstNameFocused: true })}
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
            <TextField
              className={styles.email}
              color="warning"
              label="Last name"
              name="last_name"
              variant="outlined"
              error={!!errors.last_name}
              helperText={errors.last_name}
              value={formData.last_name}
              onChange={handleChange}
              inputlabelprops={{
                shrink: !!profileData.last_name || focusState.lastNameFocused,
              }}
              onFocus={() => setFocusState({ ...focusState, lastNameFocused: true })}
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
          </div>
          <div className={styles.inputsParent}>
            <FormControl
              className={styles.email}
              variant="outlined"
              error={!!errors.education}
              helperText={errors.education} 
              sx={{
                borderRadius: "0px 0px 0px 0px",
                width: "451px",
                height: "50px",
                m: 0,
                p: 0,
                "& .MuiInputBase-root": {
                  m: 0,
                  p: 0,
                  minHeight: "50px",
                  justifyContent: "center",
                  display: "inline-flex",
                },
                "& .MuiInputLabel-root": {
                  m: 0,
                  p: 0,
                  minHeight: "50px",
                  display: "inline-flex",
                },
                "& .MuiMenuItem-root": {
                  m: 0,
                  p: 0,
                  height: "50px",
                  display: "inline-flex",
                },
                "& .MuiSelect-select": {
                  m: 0,
                  p: 0,
                  height: "50px",
                  alignItems: "center",
                  display: "inline-flex",
                },
                "& .MuiInput-input": { m: 0, p: 0 },
                "& .MuiInputBase-input": {
                  textAlign: "left",
                  p: "0 !important",
                  padding: "8px 16px",
                },
              }}
            >
              <InputLabel color="warning">Education</InputLabel>
              <Select
                color="warning"
                label="Education"
                name="education"
                value={formData.education || ''}
                onChange={handleChange} // Handle change event
                inputProps={{ name: 'education' }}
                inputlabelprops={{
                  shrink: !!profileData.education || focusState.educationFocused,
                }}
                onFocus={() => setFocusState({ ...focusState, educationFocused: true })}
              >
                <MenuItem value="Bachelor">Bachelor's degree</MenuItem>
                <MenuItem value="Master">Masters</MenuItem>
                <MenuItem value="PHD">P.H.D</MenuItem>
              </Select>
              <FormHelperText />
            </FormControl>
            <TextField
              className={styles.email}
              color="warning"
              label="Company"
              name="company"
              variant="outlined"
              error={!!errors.company}
              helperText={errors.company} 
              value={formData.company}
              onChange={handleChange}
              inputlabelprops={{
                shrink: !!profileData.company || focusState.companyFocused,
              }}
              onFocus={() => setFocusState({ ...focusState, companyFocused: true })}
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
          </div>
          <div className={styles.inputsParent}>
            <FormControl
              className={styles.email}
              variant="outlined"
              error={!!errors.gender}
              helperText={errors.gender} 
              sx={{
                borderRadius: "0px 0px 0px 0px",
                width: "451px",
                height: "50px",
                m: 0,
                p: 0,
                "& .MuiInputBase-root": {
                  m: 0,
                  p: 0,
                  minHeight: "50px",
                  justifyContent: "center",
                  display: "inline-flex",
                },
                "& .MuiInputLabel-root": {
                  m: 0,
                  p: 0,
                  minHeight: "50px",
                  display: "inline-flex",
                },
                "& .MuiMenuItem-root": {
                  m: 0,
                  p: 0,
                  height: "50px",
                  display: "inline-flex",
                },
                "& .MuiSelect-select": {
                  m: 0,
                  p: 0,
                  height: "50px",
                  alignItems: "center",
                  display: "inline-flex",
                },
                "& .MuiInput-input": { m: 0, p: 0 },
                "& .MuiInputBase-input": {
                  textAlign: "left",
                  p: "0 !important",
                  padding: "8px 16px",
                },
              }}
            >
              <InputLabel color="warning">Gender</InputLabel>
              <Select
                color="warning"
                label="Gender"
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
                inputlabelprops={{
                  shrink: !!profileData.gender || focusState.genderFocused,
                }}
                onFocus={() => setFocusState({ ...focusState, genderFocused: true })}
                onBlur={() => setFocusState({ ...focusState, genderFocused: !!profileData.gender })}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              <FormHelperText />
            </FormControl>
            <TextField
              className={styles.email}
              color="warning"
              label="Birth date"
              variant="outlined"
              name="birth_date"
              error={!!errors.birth_date}
              helperText={errors.birth_date} 
              value={formData.birth_date || ''}
              onClick={() => setStartDate(new Date())}
              inputlabelprops={{
                shrink: !!profileData.birth_date || focusState.birthFocused,
              }}
              onFocus={() => setFocusState({ ...focusState, birthFocused: true })}
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
          </div>
        </div>
        <button type="button" className={styles.saveButton}>
          <b className={styles.save} onClick={saveHandle}>SAVE</b>
        </button>
      </form>
    </div>
  );
};

export default Information;
