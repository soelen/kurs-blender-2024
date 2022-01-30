let characteristic;
let bluetoothDevice;

const connect = ( filter, service ) => {
  return new Promise( function( resolve, reject) {

    return navigator.bluetooth.requestDevice( {
        acceptAllDevices: true,
        optionalServices: [ 0x18F0, ]
    })
    .then( ( device ) => {
        bluetoothDevice = device;

        const gatt = device.gatt;

        return gatt.connect();
    } )
    .then( server => {
        return server.getPrimaryService( 0x18F0 );
    } )
    .then( ( service ) => {
        return service.getCharacteristics();
    } )
    .then( ( characteristics ) => {
        characteristic = characteristics.find( characteristic => characteristic.properties.write );
        resolve( characteristic );
        return characteristic;
    }).catch( error => {
        reject( error );
    });
  });

}

const disconnect = () => {
  if (!bluetoothDevice) return false;
  if (bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.disconnect();
    return true;
  }
  return false;
}

const print = ( data ) => {

    let array = [];

    for (var i=0; i < data.length; i++ ) {
      array.push( data[i].charCodeAt(0) );
    }

    const mapped = textEncoder( data );
    Promise.all( mapped ).then( data => {
      var chunk_size = 110;
      var groups = []
      groups = mapped.map( ( character, index ) => {
        return index % chunk_size === 0 ? mapped.slice( index, index + chunk_size ) : null;
      } ).filter( character => character );

      groups.push( [ 0x01B, 0x64, 2 ] )
      chunkStreamer( groups );
    });

}

const textEncoder = ( string ) => {
  const array = [];

  for ( let i = 0; i < string.length; i++ ) {
    array.push( string[ i ].charCodeAt( 0 ) );
  }
  return array;

}

const chunkStreamer = ( groups, index = 0 ) => {
  if( !characteristic ) return;

  characteristic.writeValue( new Uint8Array( groups[ index ] ).buffer ).then( () => {
      if( groups[ index + 1 ] ) chunkStreamer( groups, index + 1 );
  });
}

export { connect, print, disconnect }