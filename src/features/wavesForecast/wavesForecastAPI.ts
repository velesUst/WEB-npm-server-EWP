import {
  RSocketClient,
  BufferEncoders,
  encodeCompositeMetadata,
  encodeCompositeData,
  JsonSerializer, 
  IdentitySerializer,
  TEXT_PLAIN,
  MESSAGE_RSOCKET_COMPOSITE_METADATA,
  MESSAGE_RSOCKET_ROUTING,
  MESSAGE_RSOCKET_AUTHENTICATION,
  APPLICATION_JSON,
  Encoders,
  encodeRoute,
  encodeCustomAuthMetadata,
  encodeSimpleAuthMetadata,
  encodeAndAddCustomMetadata,
  encodeBearerAuthMetadata
} from 'rsocket-core';
import { connect } from '../../utils/socketApi';
import { IDataNodeType } from "../../utils/customUI/d3Tree/Globals/data/Interfaces/GOTElementInterfaces";
import { Wave } from '../interfaces/wave';
import { reviver } from '../interfaces/Enum/unitsOfWaves';

  export function fetchTopRatedWaves( index: string, timeFrame: any, token: string ) {
    return new Promise<{ data: IDataNodeType }>(async (resolve, reject) => {
      try {
        const rsocket = await connect();

        rsocket.requestResponse({

          data: Buffer.from('READ_PRIVILEGE'),
          metadata: encodeCompositeMetadata([
              [MESSAGE_RSOCKET_ROUTING, encodeRoute("fetch.topRatedTree")],
              ['message/x.rsocket.authentication.bearer.v0', Buffer.from(token)]
          ]),

        }).subscribe({ 
          onComplete: (data) => {             
            resolve({ data: JSON.parse(data.data) });                        
            rsocket.close();
          },
          onError: error => {
            console.error(`Request-stream error:${error.message}`);
            rsocket.close();
          }
        });

      } catch(error) { 
        reject(new Error('Error in network connection...'));
      }      
    }); 
  }

  export function fetchWaveInfo(wave_id: string, token: string ) {
    return new Promise<{ data: Wave }>(async (resolve, reject) => {
      try {
        const rsocket = await connect();
  
        rsocket.requestResponse({
  
          data: Buffer.from(JSON.stringify({
            wave_id: wave_id
          })),
          metadata: encodeCompositeMetadata([
              [MESSAGE_RSOCKET_ROUTING, encodeRoute("fetch.waveInfo")],
              ['message/x.rsocket.authentication.bearer.v0', Buffer.from(token)]
          ]),
  
        }).subscribe({ 
          onComplete: (data) => {             
            var wave: Wave = JSON.parse(data.data);
            //var wave: Wave = JSON.parse(data.data, reviver);
            /*wave.points.forEach( (p) => {
              p.x = new Date(p.x) ;
            });            */
            resolve({ data: wave });
            rsocket.close();
          },
          onError: error => {
            console.error(`Request-stream error:${error.message}`);
            rsocket.close();
          }
        });
  
      } catch(error) { 
        reject(new Error('Error in network connection...'));
      }      
    });     
  }

  export function saveWave(wave: Wave, token: string ) {
    return new Promise<{ data: Wave, prevId: string }>(async (resolve, reject) => {
      try { 
        const rsocket = await connect();
        rsocket.requestResponse({
          
          data: Buffer.from(JSON.stringify( wave )),
          metadata: encodeCompositeMetadata([
              [MESSAGE_RSOCKET_ROUTING, encodeRoute("save.wave")],
              ['message/x.rsocket.authentication.bearer.v0', Buffer.from(token)]
          ]),
  
        }).subscribe({ 
          onComplete: (data) => {             
            var rez = JSON.parse(data.data);
            //console.log(rez);
            if( rez == '' || rez == undefined || rez == null ) 
              reject( new Error(`Error_ in saveWave request...`)); 
            else if( isNaN(rez) ) 
              reject( new Error(`Error_ in saveWave request:${rez}`));
            else { 
              var prevId = wave.id;
              wave.id = rez;
              wave.entetyState = 'Persistent';
              resolve({ data: wave, prevId: prevId });
            }
            rsocket.close();
          },
          onError: error => {
            reject( new Error(`Error in saveWave request:${error.message}`));
            rsocket.close();
          }
        });
  
      } catch(error) { 
        reject(new Error('Error in network connection...'));
      }      
    });     
  }

  export function deleteWave(wave: Wave, token: string ) {
    return new Promise<{ removeId: string }>(async (resolve, reject) => {
      try { 
        const rsocket = await connect();
        rsocket.requestResponse({
          
          data: Buffer.from(JSON.stringify( wave )),
          metadata: encodeCompositeMetadata([
              [MESSAGE_RSOCKET_ROUTING, encodeRoute("delete.wave")],
              ['message/x.rsocket.authentication.bearer.v0', Buffer.from(token)]
          ]),
  
        }).subscribe({ 
          onComplete: (data) => {             
            var rez = JSON.parse(data.data);
            //console.log(rez);
            if( rez == '' || rez == undefined || rez == null ) 
              resolve({ removeId: wave.id });
            else 
              reject( new Error(`Error_ in deleteWave request...`)); 
   
            rsocket.close();
          },
          onError: error => {
            reject( new Error(`Error in deleteWave request:${error.message}`));
            rsocket.close();
          }
        });
  
      } catch(error) { 
        reject(new Error('Error in network connection...'));
      }      
    });     
  }