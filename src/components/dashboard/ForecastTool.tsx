import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme,
  Container,
  Grid
} from '@material-ui/core';
import Index from './Index';
import ForecastVariants from './ForecastVariants';
import WavesDescription from  './WavesDescription';

const ForecastTool: React.FC<any> = (props) => {
  const theme = useTheme();
 
  return (
    <Card {...props} >
        <Grid
          container
          spacing={1}
          sx={{
            backgroundColor: 'background.default'
          }}
        > 
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <Index />
          </Grid>
          <Divider />
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <ForecastVariants />
          </Grid>
          <Divider />
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <WavesDescription />
          </Grid>                   
        </Grid>
      
    </Card>
  );
};

export default ForecastTool;
