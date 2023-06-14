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

export async function connect() {
  const maxRSocketRequestN = 2147483647;    
  const keepAlive = 60000;
  const lifetime = 180000;
  const dataMimeType = APPLICATION_JSON.string;
  const metadataMimeType = MESSAGE_RSOCKET_COMPOSITE_METADATA.string;

  var client = new RSocketClient({
    serializers: {
      data: IdentitySerializer,
      metadata: IdentitySerializer,
    },
    setup: {
      dataMimeType,
      keepAlive,
      lifetime,
      metadataMimeType
    },
    transport: new RSocketWebSocketClient({
      url: process.env.PUBLIC_URL                
    },BufferEncoders)
  });

  return await client.connect();  
}