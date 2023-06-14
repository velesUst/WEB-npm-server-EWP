import React from 'react';
import { createStyles, makeStyles } from "@mui/styles";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddToPhotosSharpIcon from '@material-ui/icons/AddToPhotosSharp';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Drawer,
  Dialog,
  DialogContent,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  deleteWaveAsync,
  getWavesInView,
  getTempWave,
  setTempWave,
  getSelectedWave,
  setSelectedWave,
  setWaveToKeepInViewList,
  setWaveToRemoveFromViewList,
  addAlternativeVariant,
  addSubwaveVariant,
  saveWaveAsync,
  getError,
  setError
} from '../../features/wavesForecast/wavesForecastSlice'; 
import { Wave } from '../../features/interfaces/wave'; 
import WaveInformation from './WaveInformation';
import {
  getToken
} from '../../features/login/loginSlice'; 

interface ChipData {
  key: number;
  label: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: 1,
      margin: 1
    },
    chip: {
      margin: 2,
      '&.MuiChip-root': {
        height: 50
      }
    }
  }),
);

const WavesDescription: React.FC<any> = (props) => {

  const dispatch = useAppDispatch();
  const wavesInView: Wave[] = useAppSelector(getWavesInView);
  const tempWave: Wave = useAppSelector(getTempWave);
  const selectedWave = useAppSelector(getSelectedWave);
  const token = useAppSelector(getToken);
  const error : string = useAppSelector(getError);

  const classes = useStyles();
  const [chipData, setChipData] = React.useState<ChipData[]>([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
    { key: 5, label: '555Vue.js' },
    { key: 6, label: '222Vue.js' },
  ]);

  const handleRemoveFromView = (waveToRemove: Wave) => () => {
    dispatch(setWaveToRemoveFromViewList(waveToRemove.id));
  };
  const handleClick = (wave_: Wave) => () => {
    dispatch(setSelectedWave(wave_)); 
  };

  const handleKeepInView = () => {
    dispatch(setWaveToKeepInViewList(selectedWave));
    dispatch(setTempWave(undefined)); 
  };
  const handleAddAlternativeVariant = () => {
    dispatch(addAlternativeVariant());
  };
  const handleAddSubwaveVariant = () => {
    dispatch(addSubwaveVariant());
  };  
  const handleSaveWave = () => {
    var wave = Object.assign({}, selectedWave);
    dispatch(saveWaveAsync( {wave, token} ));
  } 
  const handleDeleteWave = () => {
    var wave = Object.assign({}, selectedWave);
    dispatch(deleteWaveAsync( {wave, token} ));
  } 
  const handleClearError = ( ) => {    
    dispatch(setError(''));
  };

  return (

    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="h6"
        >
          WAVES IN VIEW
        </Typography>
        <Paper component="ul" className={classes.root}>
          { wavesInView.map((wave) => {
            let icon;
            if (wave.entetyState=='New' || wave.entetyState=='Detached') {
              icon = <SaveIcon />;
            }
            return (
              <li key={wave.id}>
                <Chip
                  icon={icon}
                  label={wave.scale + '.' + wave.type}
                  onDelete={handleRemoveFromView(wave)}
                  onClick={handleClick(wave)}
                  className={classes.chip}
                  variant= { (selectedWave!==undefined && selectedWave.id==wave.id) ? "filled" : "outlined" }
                  color={ (wave.entetyState=='New' || wave.entetyState=='Detached') ? undefined : "info" }
                  size={'medium'} 
                />
              </li>
            );
          })}          
          { tempWave != undefined &&
              <li key={tempWave.id}>
                <Chip
                  icon={<FilterNoneIcon />}
                  label={tempWave.scale + '.' + tempWave.type + '.' + tempWave.id}
                  //onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                  onClick={handleClick(tempWave)}
                  className={classes.chip}
                  variant={ (selectedWave!==undefined && selectedWave.id==tempWave.id) ? "filled" : "outlined" }
                  color={ (tempWave.entetyState=='New' || tempWave.entetyState=='Detached') ? undefined : "info" } 
                  size={'medium'}
                />
              </li>
          }
        </Paper>
        <Box
          sx={{
            backgroundColor: 'background.default',
            m: 0,
            p: 0
          }}
        > 
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              pt: 1
            }}
          >
          { (tempWave != undefined && selectedWave!==undefined && tempWave.id == selectedWave.id) &&
            <AddToPhotosSharpIcon
               color="primary"
               onClick={(e) => handleKeepInView()}
               fontSize="small" 
            />
          }
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              pt: 1
            }}
          >
            { selectedWave != undefined && selectedWave!==undefined && <WaveInformation wave={selectedWave} /> }
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 1
            }}
          >
          { selectedWave!==undefined &&
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={(e) => handleAddAlternativeVariant()}
            >
              Add alternative variant
            </Button>
          }
          { selectedWave!==undefined &&
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={(e) => handleAddSubwaveVariant()}
            >
              Add subwave variant
            </Button>
          }
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 1
            }}
          >
          { ( selectedWave!==undefined && (selectedWave.entetyState=='New' || selectedWave.entetyState=="Detached") ) &&
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={(e) => handleSaveWave()}
            >
              Save
            </Button>
          }
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
          { ( selectedWave!==undefined && (selectedWave.entetyState=='Persistent' || selectedWave.entetyState=="Detached") ) &&
            <Button
              color="primary"              
              onClick={(e) => handleDeleteWave()}
            >
              <DeleteIcon color="primary"/>
            </Button>              
          }
          </Box>
        </Box>
      </CardContent>

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
}
export default WavesDescription;
