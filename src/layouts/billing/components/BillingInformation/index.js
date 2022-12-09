// @mui material components
import { Button, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "context/axios";
import { useSelector } from "react-redux";



function BillingInformation() {

  const vals = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
  ];

  const {currentUser} = useSelector((state) => state.user)
  const [open, setOpen] = useState(false)
  const [aprraisalData,setAprraisalData] = useState([])
  const [point1, setPoint1] = useState('')
  const [value1, setValue1] = useState(5)
  const [point2, setPoint2] = useState('')
  const [value2, setValue2] = useState(4)
  const [point3, setPoint3] = useState('')
  const [value3, setValue3] = useState(3)
  const [point4, setPoint4] = useState('')
  const [value4, setValue4] = useState(2)
  const [point5, setPoint5] = useState('')
  const [value5, setValue5] = useState(1)

  const formData = {
    "point_1": point1,
	  "value_1": value1,
	  "point_2": point2,
	  "value_2": value2,
	  "point_3": point3,
	  "value_3": value3,
	  "point_4": point4,
	  "value_4": value4,
	  "point_5": point5,
	  "value_5": value5,
  }



  const fetchAppraisal = async() => {
    try {
      const res = await axios.get(`${baseURL}api/appraisalmaster`, {
        headers : {
          auth: `Bearer ${currentUser.token}`
        }
      })
      setAprraisalData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async() => {
    try {
      const res = await axios.post(`${baseURL}api/appraisalmaster`, formData, {
        headers: {
          auth: `Bearer ${currentUser.token}`
        }
      })
      setOpen(false)
      fetchAppraisal()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAppraisal()
  }, [])

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2} style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }} >
        <MDTypography variant="h6" fontWeight="medium">
          Appraisal Master
        </MDTypography>
        <Button style={{backgroundColor: 'green', color: 'white'}} onClick={handleOpen}>Add new</Button>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {aprraisalData?.map((data, index) => {
            console.log(data._id)
            return (
              <Bill
              token = {currentUser.token}
              id = {data._id}
              num = {index + 1}
              point1 = {data.point_1}
              point2 = {data.point_2}
              point3 = {data.point_3}
              point4 = {data.point_4}
              point5 = {data.point_5}
              />
            )
          })}
        </MDBox>
      </MDBox>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Appraisal Master New Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input Data from the highrst point to lowets point
          </DialogContentText>
          <br/>
          <TextField
            autoFocus
            margin="dense"
            id="Point1"
            label="Point 1"
            fullWidth
            multiline
            variant="standard"
            onChange={(e) => setPoint1(e.target.value)}
          />
          <br/>
          <TextField
          id="standard-select-currency"
          select
          label="Values"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          variant="standard"
          >
          {vals.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            id="Point2"
            label="Point 2"
            fullWidth
            multiline
            variant="standard"
             onChange={(e) => setPoint2(e.target.value)}
          />
                   <br/>
          <TextField
          id="standard-select-currency"
          select
          label="Values"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          variant="standard"
          >
          {vals.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            id="Point3"
            label="Point 3"
            fullWidth
            multiline
            variant="standard"
             onChange={(e) => setPoint3(e.target.value)}
          />
          <br/>
          <TextField
          id="standard-select-currency"
          select
          label="Values"
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          variant="standard"
          >
          {vals.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            id="Point4"
            label="Point 4"
            fullWidth
            multiline
            variant="standard"
             onChange={(e) => setPoint4(e.target.value)}
          />
          <br/>
          <TextField
          id="standard-select-currency"
          select
          label="Values"
          value={value4}
          onChange={(e) => setValue4(e.target.value)}
          variant="standard"
          >
          {vals.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            id="Point5"
            label="Point 5"
            fullWidth
            multiline
            variant="standard"
            onChange={(e) => setPoint5(e.target.value)}
          />
          <br/>
          <TextField
          id="standard-select-currency"
          select
          label="Values"
          value={value5}
          onChange={(e) => setValue5(e.target.value)}
          variant="standard"
          >
          {vals.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>


    </Card>
  );
}

export default BillingInformation;
