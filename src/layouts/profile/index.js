// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

// Overview page components
import Header from "layouts/profile/components/Header";
// Data
import profilesListData from "layouts/profile/data/profilesListData";
// Images
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Timeline from "layouts/timeline/Timeline";
import SimpleAccordion from "layouts/profile/components/accordion"


function Overview() {
  const {currentUser} = useSelector((state) => state.user)
  const state = useLocation().state
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header user={state} currentUser={currentUser}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <Timeline user={state} currentUser={currentUser} />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                user={state} 
                currentUser={currentUser}
                title="profile information"
                info={{
                  fullName: state ? state.fullName : currentUser.fullName,
                  mobile: state ? state.phoneNumber : currentUser.phoneNumber,
                  email: state ? state.email : currentUser.email,
                  adress: state ? state.address : currentUser.address,
                  upline : state ? state.upline?.fullName : currentUser.upline?.fullName
                }}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={true}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false}  user={state} 
                currentUser={currentUser}/>
            </Grid>
          </Grid>
        </MDBox>
       </Header>
       <SimpleAccordion user={ state ? state.appraisal : currentUser.appraisal}/>
    </DashboardLayout>
  );
}

export default Overview;
