// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import axios from "axios";
import baseURL from "context/axios";
import { useNavigate } from "react-router-dom";

function Bill({ token,id,num,point1,point2,point3,point4,point5,name, company, email, vat, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate()
  const handleDelete = async() => {
    try {
      const res = await axios.delete(`${baseURL}api/appraisalmaster/${id}`, {
        headers : {
          auth: `Bearer ${token}`
        }
      })
      navigate('/dashboard')
      console.log("okee")
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {num}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error" onClick={handleDelete} >
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
            {/* <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>&nbsp;edit
            </MDButton> */}
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Point 1 :&nbsp;&nbsp;&nbsp;
          </MDTypography>
          <br/>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{marginTop: '5px'}} >
              {point1}
            </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Point 2 :&nbsp;&nbsp;&nbsp;
          </MDTypography>
          <br/>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{marginTop: '5px'}} >
              {point2}
            </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Point 3 :&nbsp;&nbsp;&nbsp;
          </MDTypography>
          <br/>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{marginTop: '5px'}} >
              {point3}
            </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Point 4 :&nbsp;&nbsp;&nbsp;
          </MDTypography>
          <br/>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{marginTop: '5px'}} >
              {point4}
            </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Point 5 :&nbsp;&nbsp;&nbsp;
          </MDTypography>
          <br/>
          <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{marginTop: '5px'}} >
              {point5}
            </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};


export default Bill;
