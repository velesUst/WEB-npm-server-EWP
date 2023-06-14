import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Dialog,
  DialogContent,
  useTheme,
  colors,
  useControlled,
  Grid,
  Typography,
  MenuItem
} from '@material-ui/core';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getData,
  getBreaks,
  getIndex,  
  getTimeFrame,
  setTimeFrame,
  getLoadDataStatus,
  fetchChartDataAsync,
  getError,
  setError 
} from '../../features/chartMarkup/chartMarkupSlice'; 
import {
  getSelectedWavePoints,
  setSelectedPoint
} from '../../features/wavesForecast/wavesForecastSlice'; 
import { Wave } from '../../features/interfaces/wave'; 
import {
  getToken
} from '../../features/login/loginSlice'; 
import StockChart from '../../utils/customUI/stockChart/StockChart';


const SalesChart: React.FC = (props) => {
  //const theme = useTheme();
  const dispatch = useAppDispatch();
  const chartData = useAppSelector(getData);
  const chartBreaks = useAppSelector(getBreaks); 
  const index = useAppSelector(getIndex);
  const timeFrame = useAppSelector(getTimeFrame);
  const loadDataStatus = useAppSelector(getLoadDataStatus);
  const token = useAppSelector(getToken);
  const selectedWavePoints = useAppSelector(getSelectedWavePoints);
  const error : string = useAppSelector(getError);

  const options = {       
    charts: [{
      axisX: {
        scaleBreaks: {   
          type: "straight",
			    lineThickness: 0,
          spacing:0,
          customBreaks: chartBreaks
        }
      },
      data: [
        {
          type: "line",
          dataPoints: chartData,
          click: (e) => dispatch(setSelectedPoint({ id: e.dataPoint.id, x: e.dataPoint.x.toISOString(), y: e.dataPoint.y}))
        },
        {
          type: "line",
          dataPoints: selectedWavePoints 
        } 
      ]
    }],
    navigator: {
      /*slider: {
        minimum: new Date("2018-07-01"),
        maximum: new Date("2019-06-30")
      }*/
    },
    rangeSelector: {
      enabled: false
    }
  };

  const handleChangeTimeFrame = ( event: React.MouseEvent<HTMLElement>, timeFrame_: string ) => {    

    dispatch(setTimeFrame(timeFrame_));    
    const index_ = index;
    dispatch(fetchChartDataAsync( {index_, timeFrame_, token} )); // - состояние redux store должно поменяться и index должен быть новый, но нет       

  };
  
  const handleClearError = ( ) => {    
    dispatch(setError(''));
  };

  const handleVariant = ( checkForTF: string ) => {     
    if( checkForTF === timeFrame )
      return "contained";
    else 
      return "text";
  };
    

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Box>
            <Button                
              size="small"
              variant={handleVariant("week")}
              onClick={(e) => handleChangeTimeFrame(e, "week")}
            >
              week
            </Button>
            <Button
              size="small"
              variant={handleVariant("day")}
              onClick={(e) => handleChangeTimeFrame(e, "day")}
            >
              day
            </Button>
            <Button
              size="small"
              variant={handleVariant("60min")}
              onClick={(e) => handleChangeTimeFrame(e, "60min")}
            >
              60min
            </Button>
            <Button
              size="small"
              variant={handleVariant("30min")}
              onClick={(e) => handleChangeTimeFrame(e, "30min")}
            >
              30min
            </Button>
            <Button
              size="small"
              variant={handleVariant("15min")}
              onClick={(e) => handleChangeTimeFrame(e, "15min")}
            >
              15min
            </Button>
            <Button
              size="small"
              variant={handleVariant("5min")}
              onClick={(e) => handleChangeTimeFrame(e, "5min")}
            >
              5min
            </Button>
            <Button
              size="small"
              variant={handleVariant("1min")}
              onClick={(e) => handleChangeTimeFrame(e, "1min")}
            >
              1min
            </Button>
          </Box>
        )}
        title=""
      />
      <Divider />      
      <StockChart inputData = {options}/>      

      <Dialog
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={loadDataStatus === 'loading'} 
        >
        <DialogContent>
          <table width="100%">
            <tbody>
              <tr>
                <td height="40">
                  <CircularProgress />
                </td>
              </tr>
            </tbody>
          </table>           
        </DialogContent>
      </Dialog>

      <Dialog
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={ error !== '' } 
        >
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 2
              }}
            >
              <Typography
                align="center"
                variant="body2"
              >
                {error}
              </Typography>
              <Button  variant="contained" onClick={handleClearError}  style={{ margin: '10px' }} color="primary" autoFocus >
                Close
              </Button>          
            </Box>
          </DialogContent>
        </Dialog>

    </Card>
  );
};

export default SalesChart;