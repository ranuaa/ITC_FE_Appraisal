import { Link, useNavigate } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import baseURL from "context/axios";

function ProfileInfoCard({ title, description, info, social, action, shadow, user, currentUser }) {
  // console.log('user :', user)
  // console.log(currentUser)
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  const [fullName, setFullName] = useState( user ? user?.fullName : currentUser?.fullName )
  const [password, setPassword] = useState()
  const [email, setEmail] = useState(user ? user?.email : currentUser?.email)
  const [phoneNumber, setPhoneNumber] = useState(user ? user?.phoneNumber : currentUser?.phoneNumber)
  const [address, setAdress] = useState(user ? user?.address : currentUser?.address)
  const [profilePicture, setProfilePicture] = useState()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  let formData = new FormData()
  formData.append("fullName", fullName)
  formData.append("email", email)
  formData.append("phoneNumber", phoneNumber)
  formData.append("address", address)
  profilePicture && formData.append("profilePicture", profilePicture)
  password && formData.append("password", password)

  const handleSubmit = async() => {
    try {
      if(user){
        const res = await axios.put(`${baseURL}api/user/${user._id}`, formData, {
          headers: {
            auth: `Bearer ${currentUser.token}`
          }
        })
      }else {
        const res = await axios.put(`${baseURL}api/user/${currentUser._id}`, formData, {
          headers: {
            auth: `Bearer ${currentUser.token}`
          }
        })
        setOpen(false)
      }
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  // console.log('password', password)
  // console.log(formData)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));


  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography variant="body2" color="secondary" style={{cursor: 'pointer'}} onClick={handleClickOpen}>
          <Tooltip title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
          </MDBox>
          <MDBox>
          {renderItems}
        </MDBox>
      </MDBox>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Update User Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            User Information
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fullName"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="text"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            label="Adress"
            type="text"
            fullWidth
            variant="standard"
            value={address}
            onChange={(e) => setAdress(e.target.value)}
          />
          <MDTypography variant="body2" color="secondary">Profile Picture</MDTypography>
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            label="Profile Picture"
            type="file"
            fullWidth
            variant="standard"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
