// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Label } from "@mui/icons-material";
import axios from "axios";
import baseURL from "context/axios";


function Timeline({user, currentUser, action}) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [career, setCareer] = useState()
  const start = moment(startDate).format("DD-MM-YYYY")
  const navigate = useNavigate()


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const data = {
    "dateStart" : start,
    "career" : career
  }
  const handleSubmit = async() => {
    try {
      if (user){
        const res = await axios.post(`${baseURL}api/career/${user._id}`, data, {
          headers : {
            auth : `Bearer ${currentUser.token}`
          }
        })
        console.log(res)
      }else {
        const res = await axios.post(`${baseURL}api/career/${currentUser._id}`, data, {
          headers : {
            auth : `Bearer ${currentUser.token}`
          }
        })
        console.log(res)
      }
      setOpen(false)
      navigate('/employee')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
        Career History
        </MDTypography>
        <MDTypography variant="body2" color="secondary" style={{cursor: 'pointer'}} onClick={handleClickOpen} >
          <Tooltip title="Add new career" placement="top">
            <Icon>add</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
     {user ? user.careerHistory.map((usr) => {
        return(
          <TimelineItem
          color="success"
          icon="star"
          title={usr.career}
          startDate={usr.dateStart}
        />
        )
     }): currentUser?.careerHistory.map((usr) => {
        return(
          <TimelineItem
          color="success"
          icon="star"
          title={usr.career}
          startDate={usr.dateStart}
        />
        )
     })}
      </MDBox>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add New career</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please nput from the oldest to the newest position
          </DialogContentText>
          <TextField
            autoFocus
            id="position"
            label="Position"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setCareer(e.target.value)}
          />
          <MDTypography variant="body2" color="secondary">Start date</MDTypography>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Timeline;
