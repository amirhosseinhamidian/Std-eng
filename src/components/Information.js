import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import styles from "./Information.module.css";
import React, { useState, useEffect  } from 'react';
import {getProfileInformation, updateProfile} from '../services/apiService'

const Information = () => {

  const [profileData, setProfileData] = useState({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    education: '',
    company: '',
    gender: '',
    birth_date: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfileInformation();
        const { user } = response;
        setProfileData(user);
        console.log("profile data", user);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const [education, setEducation] = useState('');
  const handleChangeEducation = (event) => {
    setEducation(event.target.value);
  };

  const pickBirthDate = () => {
    const [startDate, setStartDate] = useState(new Date());
      return (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name)
    console.log("value", value);
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const [focusState, setFocusState] = useState({
    lastNameFocused: false,
    emailFocused: false,
    firstNameFocused: false,
    genderFoused: false,
    educationFocused: false,
    companyFocused: false,
    birthFocused: false,
    // Add other properties for other input fields if needed
  });
  
  const saveHandle = async() => {
      try {
        await updateProfile(
          profileData.first_name,
          profileData.last_name,
          profileData.gender,
          profileData.email,
          profileData.education,
          profileData.company,
          profileData.birth_date,
        )
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <div className={styles.information}>
      <form className={styles.frameParent}>
        <img className={styles.frameChild} alt="" src="/frame-32@2x.png"/>
        <div className={styles.frameGroup}>
          <div className={styles.inputsParent}>
            <TextField
              className={styles.email}
              color="warning"
              label="Email"
              name="email"
              // required={true}
              variant="outlined"
              value={profileData.email}
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
              value={profileData.phone}
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
              value={profileData.first_name}
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
              value={profileData.last_name}
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
                  padding: "8px 16px"
                },
              }}
            >
              <InputLabel color="warning">Education</InputLabel>
              <Select
                color="warning"
                label="Education"
                name="education"
                value={profileData.education}
                onChange={handleChange}// Handle change event
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
              value={profileData.company}
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
                  padding: "8px 16px"
                },
              }}
            >
              <InputLabel color="warning" >Gender</InputLabel>
              <Select
                color="warning"
                label="Gender"
                name="gender"
                onChange={handleChange}
                inputProps={{ name: 'gender' }} 
                value={profileData.gender || ''}
                inputlabelprops={{
                  shrink: !!profileData.gender || focusState.genderFoused,
                }}
                onFocus={() => setFocusState({ ...focusState, genderFoused: true })}
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
              value={profileData.birth_date || ''}
              onClick={
                () => pickBirthDate
              }
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