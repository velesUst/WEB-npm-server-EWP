import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  Button
} from '@material-ui/core';
import { green, orange, red } from '@material-ui/core/colors';
import { withStyles } from '@mui/styles';
import MoneyIcon from '@material-ui/icons/Money';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getIndex,  
  getTimeFrame  
} from '../../features/chartMarkup/chartMarkupSlice'; 
import {
  fetchTopRatedAsync
} from '../../features/wavesForecast/wavesForecastSlice'; 
import {
  getToken
} from '../../features/login/loginSlice'; 

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
  root: {
    padding: 0,
  },
}))(MuiAccordionDetails);


const ForecastVariants: React.FC<any> = (props) => {
  
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const dispatch = useAppDispatch();
  const index = useAppSelector(getIndex);
  const token = useAppSelector(getToken);
  
  const handleQueryTopRated = ( event: React.MouseEvent<HTMLElement> ) => {    
    const index_ = index;
    const timeFrame_ = "-";
    dispatch(fetchTopRatedAsync( {index_, timeFrame_, token} ));
  };

  return (
    <Card {...props}>
      <CardContent>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Container fixed>
            <Typography variant="h5">My forecast</Typography>
          </Container>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56,
              marginRight: 5
            }}
          >
            <MoneyIcon />
          </Avatar>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Container fixed>
            <Typography variant="h5">Top rated</Typography>
          </Container>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56,
              marginRight: 5
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleQueryTopRated}
          >
            Select
          </Button>
        </AccordionDetails>
      </Accordion>
      
      </CardContent>
    </Card>
  );
}
export default ForecastVariants;
