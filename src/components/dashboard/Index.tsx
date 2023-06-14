import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  MenuItem,
  TextField
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getIndex,
  setIndex,
  getTimeFrame,
  fetchChartDataAsync 
} from '../../features/chartMarkup/chartMarkupSlice'; 
import {
  getToken
} from '../../features/login/loginSlice'; 

const series = [
  {
    value: "EURUSD",
    label: "EURUSD"
  },
  {
    value: "USDJPY",
    label: "USDJPY"
  },
  {
    value: "DAX",
    label: "DAX"
  },
  {
    value: "S&P500",
    label: "S&P500"
  }
];

const Index: React.FC = (props) =>  {

  const dispatch = useAppDispatch();
  const index = useAppSelector(getIndex);
  const timeFrame = useAppSelector(getTimeFrame);
  const token = useAppSelector(getToken);

  
  const handleChangeIndex = (event) => {
    
    const index_ = event.target.value;
    const timeFrame_ = timeFrame;
    
    dispatch(setIndex(index_));
    
    dispatch(fetchChartDataAsync( {index_, timeFrame_, token} )); // - состояние redux store должно поменяться и index должен быть новый, но нет  Пачему должны совпадать имена переменных      
   
  };

  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              INDEX
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <TextField
                id="index-code-select"
                select
                //label="Index Code"
                value={index}
                onChange={handleChangeIndex}
                //helperText="Please select your country"
                SelectProps={{
                  renderValue: (value) => value
                }}
              >
                {series.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Typography>        
          </Grid>
        </Grid>        
      </CardContent>
    </Card>
  );
}

export default Index;
