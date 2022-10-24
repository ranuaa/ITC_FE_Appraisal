// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import avatar from '../../assets/avatar.png'
// Data
// import employeesTableData from "layouts/tables/data/employeesTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
import { Author, Job } from './data/employeesTableData'
import MDBadge from "components/MDBadge";
import team2 from "assets/images/team-2.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Tables() {
  // const { columns, rows } = employeesTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();

  const {currentUser} = useSelector((state) => state.user)
  const [users,setUsers] = useState([])



  
  const fetchUsers = async() => {
    try {
      const res = await axios.get('http://localhost:5000/user', {
        headers: {
          'auth' : `Bearer ${currentUser.token}`
        }
      })
      setUsers(res.data)
      
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
    return     {
      Name: <Author image={user.photoProfile ? `http://localhost:5000/${user.photoProfile}` : avatar} name={user.fullName} email={user.email} />,
      function: <Job title="Manager" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
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

  const row =[
    users && users.map((user) => {
      return {  Name: <Author image={team2} name={user?.fullName} email="john@creative-tim.com" />,
      function: <Job title="Manager" />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          A
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"  >
          Edit
        </MDTypography>
      ),}
    })
  ]


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
                  Employee Table
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
