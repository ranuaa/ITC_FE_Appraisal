import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import moment from 'moment'
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import avatar from '../../assets/avatar.png'
import { Author, Job } from './data/employeesTableData'
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import baseURL from "context/axios";

function Tables() {
  const {currentUser} = useSelector((state) => state.user)
  const [users,setUsers] = useState([])
  const [temp,setTemp] = useState([])
  const fetchUsers = async() => {
    try {
      if(currentUser.fullName === 'Super Admin'){
        const res = await axios.get(`${baseURL}api/user`, {
          headers: {
            'auth' : `Bearer ${currentUser.token}`
          }
        })
        setUsers(res.data)
      }else {
        const res = await axios.get(`${baseURL}api/user/${currentUser._id}`, {
          headers: {
            'auth' : `Bearer ${currentUser.token}`
          }
        })
        let a = res.data.downline
        let b  = []
        a?.map(async(dat) => {
          const res = await axios.get(`${baseURL}api/user/${dat._id}`, {
            headers: {
              'auth' : `Bearer ${currentUser.token}`
            }
          })
          setUsers((prev) => [...prev, res.data])
        // b.push(res.data)
        
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  
  const columns = [
          { Header: "Name", accessor: "Name", width: "45%", align: "left" },
          { Header: "Position", accessor: "function", align: "left" },
          { Header: "status", accessor: "status", align: "center" },
          { Header: "Apprisal", accessor: "employed", align: "center" },
          { Header: "action", accessor: "action", align: "center" },
  ];

  const rows = users?.map((user) => {
    const data = user.dataAbsensi
    const today = data.map((dat) => {
      if(dat.date === moment(new Date()).format("DD-MM-YYYY")){
        return true
      }else{
        return false
      }
    })
    const appraisal = user.appraisal
    const lastdata = appraisal.map((dat) => {
      if(moment(dat.date).format("MM-YYYY") === moment().format("MM-YYYY")){
        return true
      }else{
        return false
      }
    })
    return     {
      Name: <Author image={user?.profilePicture ? `${baseURL}/${user.profilePicture}` : avatar} name={user.fullName} email={user.email} />,
      function: (
      <Job title={user?.careerHistory.length !=0 ? user.careerHistory[user.careerHistory.length - 1].career : "-"} />
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={today[0] === true ? 'Online' : 'offline'} color={today[0] === true ? "success" : 'error'} variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          A
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" >
          <Link to={`/profile`} style={{ color: 'black' }} state={user} >
          view
          </Link>
        </MDTypography>
      ),
    }
  })

 


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  {users.length > 0 ?  'Employee Table' : 'You dont have Downline'}
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
