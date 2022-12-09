// react-routers components
import { Link, useNavigate } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes, { checkPropTypes } from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import baseURL from "context/axios";
// stepper
import StepWizard from "react-step-wizard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


function ProfilesList({ title, profiles, shadow, user, currentUser }) {
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState({})
  let [finalScore, setFinalScore]  = useState('')
  const [appraisalData, setAppraisalData] = useState([]);
  const [vals, setVals] = useState([]);
  const [score,setScores] = useState(0)
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [admin, setAdmin] = useState(true)
  const navigate= useNavigate()

  const handleNext = () => {
    if(activeStep === appraisalData.length - 1){
      handleSubmit()
      handleClose()
    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const fetchAppraisal = async (req, res) => {
    try {
      const res = await axios.get(`${baseURL}api/appraisalmaster`, {
        headers: {
          auth: `Bearer ${currentUser.token}`,
        },
      });
      setAppraisalData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppraisal();
  }, []);

  // console.log(user)
  const handleChange = (event, {target}) => {
    a()
    handleNext()
    setScores((prev) => prev + parseInt(event.target.value.split('%%')[0]))
    setVals((prev) => [...prev, event.target.value.split('%%')[1]])
  };  

  const handleDelete = async() => {
    try {
      const resp = await axios.delete(`${baseURL}api/user/${user._id}`, {
        headers: {
          auth: `Bearer ${currentUser.token}`,
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAdmin = async() => {
    let formData = new FormData()
    formData.append("isAdmin", admin)
    try {
      const res = await axios.put(`${baseURL}api/user/${user._id}`, formData,{
        headers: {
          auth: `Bearer ${currentUser.token}`,
        }
      } )
      alert(res.statusText)
    } catch (error) {
      console.log(error)
    }
  }
  const data = {
    userId : user._id,
    score : finalScore,
    points : vals
  }
  const a = () => {if(score / appraisalData.length === 5){
    setFinalScore('A')
  }else if(score / appraisalData.length < 5 && score / appraisalData.length > 4){
    setFinalScore('B')
  }else if (score / appraisalData.length < 4 && score / appraisalData.length > 3){
    setFinalScore('C')
  }else if(score / appraisalData.length < 3 && score / appraisalData.length > 2){
    setFinalScore('D')
  }else if (score / appraisalData.length < 2){
    setFinalScore('E')
  }}
  const handleSubmit = async() => {
    try {
      const resp = await axios.post(`${baseURL}api/appraisal/${user._id}`,data,  {
        headers: {
          auth: `Bearer ${currentUser.token}`,
        }
      })
      navigate('/employee')
    } catch (error) {
      console.log(error)
    }
    setOpen(false);
    setActiveStep(0)
    setScores(0)
    setVals([])
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log(finalScore)
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0)
    setScores(0)
    setVals([])
  };


  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      {currentUser.isAdmin && 
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          <Button style={{ backgroundColor: "green", color: "white", margin: '10px' }} onClick={handleClickOpen}>
            Add Appraisal
          </Button>
          <Button style={{ backgroundColor: "red", color: "white" ,margin: '10px'}} onClick={handleDelete}>
            Delete User
          </Button>
          {currentUser.email === 'superadmin@admin.com' && 
          <Button style={{ backgroundColor: "blue", color: "white" ,margin: '10px'}} onClick={handleAdmin}>
            Set As Leader
          </Button>
          }
        </MDTypography>
      </MDBox>
      }
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth>
        <DialogTitle>User Apprasial</DialogTitle>
        <DialogContent>
        <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group"  style={{textAlign: 'Center', fontWeight: 'bold', fontSize: '20px', textDecoration: 'underline'}}>{ activeStep + 1}</FormLabel>
                <RadioGroup
                  checked='none'
                  id={activeStep}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name={activeStep}
                  // value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel value={appraisalData[activeStep]?.value_1 + '%%' + appraisalData[activeStep]?.point_1}  name='Radio Appraisal' control={<Radio />} label={appraisalData[activeStep]?.point_1} />
                  <br/>
                  <FormControlLabel value={appraisalData[activeStep]?.value_2 + "%%" + appraisalData[activeStep]?.point_2} name="Radio Appraisal" control={<Radio />} label={appraisalData[activeStep]?.point_2} />
                  <br/>
                  <FormControlLabel value={appraisalData[activeStep]?.value_3 + "%%" + appraisalData[activeStep]?.point_3} name="Radio Appraisal" control={<Radio />} label={appraisalData[activeStep]?.point_3} />
                  <br/>
                  <FormControlLabel value={appraisalData[activeStep]?.value_4 + "%%" + appraisalData[activeStep]?.point_4} name="Radio Appraisal" control={<Radio />} label={appraisalData[activeStep]?.point_4} />
                  <br/>
                  <FormControlLabel value={appraisalData[activeStep]?.value_5 + "%%" + appraisalData[activeStep]?.point_5} name="Radio Appraisal" control={<Radio />} label={appraisalData[activeStep]?.point_5} />
                </RadioGroup>
                <br/>
              </FormControl>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={slide ? handleClose : changeSlide}>{slide ? "submit" : 'next'}</Button> */}
          <MobileStepper
      variant="dots"
      steps={appraisalData.length}
      position="static"
      activeStep={activeStep}
      sx={{ width: '100%', flexGrow: 1 }}
      nextButton={
        <Button size="small" onClick={handleNext}>
          {activeStep === appraisalData.length - 1 ? 'Submit' : "Next"}
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleClose}>
          Cancel
        </Button>
      }
    />
        </DialogActions>
      </Dialog>
    </Card>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

export default ProfilesList;
