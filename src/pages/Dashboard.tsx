import * as React from "react";
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import PatternHierarchy from '../components/dashboard/PatternHierarchy';
import SalesChart from '../components/dashboard/SalesChart';
import ForecastTool from '../components/dashboard/ForecastTool';

const Dashboard: React.FC = () => (
  <>
    <Helmet>
      <title>Dashboard | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        > 
          <Grid
            item
            lg={3}
            md={12}
            xl={3}
            xs={12}
          >
            <ForecastTool />
          </Grid>         
          <Grid
            item
            lg={9}
            md={12}
            xl={9}
            xs={12}
          >
            <Box >
              <SalesChart />
              <PatternHierarchy />
            </Box>
          </Grid>
         
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
