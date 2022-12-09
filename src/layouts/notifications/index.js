import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from 'moment'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import instance from "context/axios";
import axios from "axios";
import baseURL from "context/axios";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  const approvalUser = async () => {
    try {
      const data = await axios.get(`${baseURL}api/auth/approval`, {
        headers: {
          auth: `Bearer ${currentUser.token}`
        },
      });
      setUsers(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async(id) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${baseURL}api/auth/approval/${id}`,
        headers: {
          auth : `Bearer ${currentUser.token}`
        }
      })
      approvalUser()
    } catch (error) {
      console.log(error)
    }
  }
  const handleReject = async(id) => {
    try {
      const res = await axios({
        method: 'delete',
        url: `${baseURL}api/user/${id}`,
        headers: {
          auth : `Bearer ${currentUser.token}`
        }
      })
      approvalUser()
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    approvalUser();
    
  }, []);
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <MDTypography variant="h5" style={{marginBottom: "10px"}}>Approval Request</MDTypography>
            {users.map((user) => {
              return (
                <Card style={{ marginBottom: "10px", display:'flex', justifyContent:'space-between', alignItems:'space-between'}} key={user._id}>
                  <MDBox p={2} lineHeight={0}>
                  <Grid container spacing={3} margin={1}>
                  <Grid item xs={12} sm={6} lg={6}>
                    <MDTypography variant='h5' > User Name : <br/> {user.fullName}</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <MDTypography variant='h5'>CreatedAt : <br/>{moment(user.createdAt).format("DD-MM-YYYY (HH:mm)")}</MDTypography>
                  </Grid>
                  </Grid>
                  </MDBox>
                  <MDBox p={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} lg={12}>
                        <MDButton variant="gradient" color="success" fullWidth onClick={() => handleApprove(user._id)} >
                          Approve
                        </MDButton>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={12}>
                        <MDButton variant="gradient" color="error" fullWidth onClick={() => handleReject(user._id)} >
                          Decline
                        </MDButton>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              );
            })}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Notifications;
