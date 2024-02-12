import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import styles from "./Information.module.css";

const Information = () => {
  return (
    <div className={styles.information}>
      <form className={styles.frameParent}>
        <img className={styles.frameChild} alt="" src="/frame-32@2x.png" />
        <div className={styles.frameGroup}>
          <div className={styles.emailParent}>
            <TextField
              className={styles.email}
              color="warning"
              label="Email"
              required={true}
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
            <TextField
              className={styles.email}
              color="warning"
              label="Phone"
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
          </div>
          <div className={styles.emailParent}>
            <TextField
              className={styles.email}
              color="primary"
              label="First name"
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
            <TextField
              className={styles.email}
              color="warning"
              label="Last name"
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
          </div>
          <div className={styles.emailParent}>
            <FormControl
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
                },
              }}
            >
              <InputLabel color="warning">Education</InputLabel>
              <Select
                color="warning"
                label="Education"
                disableUnderline
                displayEmpty
              >
                <MenuItem value="Associate degree">Associate degree</MenuItem>
                <MenuItem value="Bachelor's degree">Bachelor's degree</MenuItem>
                <MenuItem value="Masters">Masters</MenuItem>
                <MenuItem value="P.H.D">P.H.D</MenuItem>
              </Select>
              <FormHelperText />
            </FormControl>
            <TextField
              className={styles.email}
              color="warning"
              label="Company"
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
          </div>
          <div className={styles.emailParent}>
            <FormControl
              className={styles.genderParent}
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
                },
              }}
            >
              <InputLabel color="warning">Gender</InputLabel>
              <Select
                color="warning"
                label="Gender"
                disableUnderline
                displayEmpty
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              <FormHelperText />
            </FormControl>
            <TextField
              className={styles.email}
              color="warning"
              label="Age"
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": { height: "50px" },
                width: "451px",
              }}
            />
          </div>
        </div>
        <button className={styles.saveButton}>
          <b className={styles.save}>SAVE</b>
        </button>
      </form>
    </div>
  );
};

export default Information;
