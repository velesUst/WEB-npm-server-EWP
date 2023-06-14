import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Paper,
  TextField,
  Typography,
  Select,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@material-ui/core';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { createStyles, makeStyles } from "@mui/styles";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {  
  updateSelectedWave,
  getSelectedPoint,
  setSelectedPoint
} from '../../features/wavesForecast/wavesForecastSlice'; 
import { Wave, ChartPoint } from '../../features/interfaces/wave'; 
import { PType, getSubWaveNames } from '../../features/interfaces/Enum/unitsOfWaves';
import { red } from '@material-ui/core/colors';

interface Props {
  wave: Wave
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: 1,
      marginRight: 1
    },
    actionsContainer: {
      marginBottom: 2
    },
    resetContainer: {
      padding: 3
    },
    formControl: {
      margin: 1,
      width: '100%',
    },
  }),
);

const WaveInformation: React.FC<Props> = ({ wave }) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  
  const [waveId, setWaveId] = React.useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSubWaveNames(Object.values(PType).indexOf(wave.type));
  const ptypes = Object.entries(PType); 
  const [ptype, setPtype] = React.useState(PType[wave.type] != undefined ? PType[wave.type] : 0);
  const [edition, setEdition] = React.useState(false);
  const [workPoints, setWorkPoints] = React.useState<ChartPoint []>([]);
  const selectedPoint = useAppSelector(getSelectedPoint);

  React.useEffect( () => {
    if(wave!==undefined && waveId!=wave.id) { 
      setWaveId(wave.id);
      setPtype(PType[wave.type] != undefined ? PType[wave.type] : 0);

      if(wave.points!==undefined)       
        setWorkPoints([...wave.points]);      
    }

    if(edition && selectedPoint!==undefined) {  // обновление точки только если ожидается выбор
      setEdition(false);
      var temp: ChartPoint [] = [...workPoints];
      temp.splice(activeStep,1,selectedPoint);
      setWorkPoints(temp);      
      
      updateWaveInStore(temp, PType[ptype]); // - local state updates very slowly and fails to catch up 
    }    
  } ); 
  
  const updateWaveInStore = (points: ChartPoint [], type: string) => {
    // - update the display of the edited wave
    var editedWave = Object.assign({}, wave);
    if(editedWave.entetyState=='Persistent')
      editedWave.entetyState = 'Detached';
    editedWave.points = points;
    editedWave.type = type;
    dispatch(updateSelectedWave(editedWave));
  } 

  const handleChangeType = (event) => {
    setPtype(event.target.value);   // - reliably enforce recalculation
    updateWaveInStore(workPoints, PType[event.target.value]);
  };

  const clearPoint = () => {
    var temp: ChartPoint [] = [...workPoints];
    temp.splice(activeStep,1);
    setWorkPoints(temp);      

    updateWaveInStore(temp, PType[ptype]);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //const handleReset = () => {
  //  setActiveStep(0);
  //};

  const handleSelectPoint = () => {
    //console.log(workPoints);
    if(!edition) {
      dispatch(setSelectedPoint(undefined));
      setEdition(true);
    }
    else {
      setEdition(false);
    }
  }

  function getStepContent(step: number) {
    return (
    <div>
      <Box
      component="span"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      >  
        <Box    
          sx={{
            display: 'flex',
            justifyContent: 'left',
            pt: 1
          }}              
        >  
          <LocalAtmIcon fontSize={"medium"}/> 
          <Typography variant="button" display="block" gutterBottom align="center">
            { (wave!==undefined && wave.points!==undefined && wave.points[step]!==undefined) && wave.points[step].y }
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            pt: 1
          }}        
        >  
          { edition &&
          <CircularProgress size={30} />
          }
          <ButtonGroup disableElevation color="primary" size="small" >
            <Button onClick={handleSelectPoint}>{ edition ? 'Cancel' : 'Edite'}</Button>
            <Button onClick={clearPoint}>Clear</Button>
          </ButtonGroup>          
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          pt: 1
        }}
      >  
        <DateRangeIcon fontSize={"medium"}/>
        <Typography variant="button" display="block" gutterBottom align="center">
          { (wave!==undefined && wave.points!==undefined && wave.points[step]!==undefined) && wave.points[step].x.toLocaleString() }
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          pt: 1
        }}
      >
        <ArrowDownwardIcon sx={{ color: red[900] }} />
        <Typography
          sx={{
            color: red[900],
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          to medium
        </Typography>
      </Box>
    </div>
    );
  }

  return (
  <div className={classes.root}>    
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel htmlFor="filled-age-native-simple">Pattern type</InputLabel>
      <Select
        native
        value={ptype}
        onChange={handleChangeType}
        inputProps={{
          name: 'age',
          id: 'filled-age-native-simple',
        }}
      >
      { ptypes.map((type) => { 
        if (isNaN(Number(type[0]))) 
        return ( 
          <option value={Number(type[1])} key={Number(type[1])}>{type[0]}</option> 
        ) 
        })
      }
      </Select>
    </FormControl>

    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            {getStepContent(index)}
            <div className={classes.actionsContainer}>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>                
                <Button
                  disabled={activeStep === steps.length - 1}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}                  
                >
                  'Next'
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  </div>
  );

};
export default WaveInformation;
