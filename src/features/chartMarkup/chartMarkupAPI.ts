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
import RSocketWebSocketClient from 'rsocket-websocket-client';
import {ChartPoint, ChartBreak} from '../interfaces/wave';
import { reviver } from '../interfaces/Enum/unitsOfWaves';
import { connect } from '../../utils/socketApi';


  export function fetchChartData( index: string, timeFrame: any, token: string ) {
    return new Promise<{ data: ChartPoint [], breaks: ChartBreak[] }>(async (resolve, reject) => {
      try {
        const rsocket = await connect();

        var chartData: ChartPoint [] = new Array();
        
        rsocket.requestStream({

          data: Buffer.from(JSON.stringify({
            series: index,
            scale: timeFrame
          })),
          metadata: encodeCompositeMetadata([
            [MESSAGE_RSOCKET_ROUTING, encodeRoute("fetch.data")],
            ['message/x.rsocket.authentication.bearer.v0', Buffer.from(token)],
          ]),
   
        }).subscribe({ 
    
          onComplete: () => { 
            // - вычисляем пробелы в данных            
            var chartBreaks: ChartBreak[] = [];
            var offSet: number = 10; // - отступ для исторических данных
            for (let i = offSet+1; i < chartData.length-1; i++) {
              var a: Date = new Date(chartData[i-1].x);
              var b: Date = new Date(chartData[i].x);
              var c: Date = new Date(chartData[i+1].x);
              if(Math.floor((b.getTime() - a.getTime()) / 60000) > Math.floor((c.getTime() - b.getTime()) / 60000)) {
                chartBreaks.push({ startValue: chartData[i-1].x, endValue: chartData[i].x });
                i++;
              }
              if(Math.floor((b.getTime() - a.getTime()) / 60000) < Math.floor((c.getTime() - b.getTime()) / 60000)) {
                chartBreaks.push({ startValue: chartData[i].x, endValue: chartData[i+1].x });
                i++;
              }
            }            
            
            resolve({ data: chartData, breaks: chartBreaks }); 
            rsocket.connectionStatus().subscribe(status => console.log(status));
            rsocket.close();
          },
          onError: error => {            
            reject( new Error(`Error in chartData request:${error.message}`));
            rsocket.close();
          },
          onSubscribe: subscription => {
            subscription.request(2147483647);
          },
          onNext: payload => {          
            var obj: ChartPoint = JSON.parse(payload.data);
            chartData.push(obj);
          }
        });

      } catch(error) { 
        reject(new Error('Error in network connection...'));
      }      
    }); 
  }
