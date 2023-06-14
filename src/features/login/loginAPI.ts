import { User } from '../interfaces/User';
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
import { connect } from '../../utils/socketApi';

  export function fetchLogin( user: User ) {
    return new Promise<{ data: string }>(async (resolve, reject) => {
      try {
        const rsocket = await connect();
      
        rsocket.requestResponse(
          { data: Buffer.from(JSON.stringify({
                  user_id: user.userId,
                  password: user.password
            })),
            metadata: encodeCompositeMetadata([
                [MESSAGE_RSOCKET_ROUTING, encodeRoute("signin.v1")],
            ])      
          } 
        ).subscribe({
          onComplete: (response) => {
            
            resolve({ data: response.data });
            rsocket.connectionStatus().subscribe(status => console.log(status));
            rsocket.close();
          },
          onError: (error) => {
            reject(new Error('No such user, or password error. Try again'));
          },
          onSubscribe: (cancel) => {
            /* call cancel() to stop onComplete/onError */
          },
        });  

      } catch(error) { 
        reject(new Error('Error in network connection...'));
      }      
    });
  }