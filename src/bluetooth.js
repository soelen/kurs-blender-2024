import { printAndFeedNLines } from './escpos';

let characteristic;
let bluetoothDevice;

    const PRINT_SERVICE = 0x18f0;

export const connect = () => {

  return new Promise( ( resolve, reject) => {

    return navigator.bluetooth.requestDevice( {
        acceptAllDevices: true,
        optionalServices: [ PRINT_SERVICE, ],
    })
    .then( device => {
        bluetoothDevice = device;
        return device.gatt.connect();
    } )
    .then( server => {
        return server.getPrimaryService( PRINT_SERVICE );
    } )
    .then( ( service ) => {
        return service.getCharacteristics();
    } )
    .then( ( characteristics ) => {
        characteristic = characteristics.find( characteristic => characteristic.properties.write );
        resolve( characteristic );
        return characteristic;
    }).catch( error => {
        return reject( error );
    });
  });

}

export const disconnect = () => {

  if (!bluetoothDevice) return false;

  if ( bluetoothDevice.gatt.connected ) {

    bluetoothDevice.gatt.disconnect();
    return true;
  }
  return false;
}

export const print = ( data ) => {

    // Zeichen in ascii codes umwandeln
    const asciiCodes = [];

    for (let index = 0; index < data.length; index++ ) {
      asciiCodes.push( data[ index ].charCodeAt( 0 ) );
    }

      const chunk_size = 16;
      const bufferGroups = asciiCodes.map( ( character, index ) => {
        return index % chunk_size === 0 ? asciiCodes.slice( index, index + chunk_size ) : null;
      } )

      // Buffergruppen trimmen
      .filter( character => character );

      // Bevor wir die umgewandelten Zeichen dem Drucker geben
      // müssen wir den ESC/POS Befehl zum drucken eingliedern
      bufferGroups.push( printAndFeedNLines( 2 ) );

      chunkStreamer( bufferGroups );
}


// Buffergrupppen werden jetzt in dieser rekursive Funktion
// nacheinander dem Drucker übergeben

const chunkStreamer = ( groups, index = 0 ) => {

  if( !characteristic ) return;

  characteristic.writeValue( new Uint8Array( groups[ index ] ).buffer ).then( () => {
      if( groups[ index + 1 ] ) chunkStreamer( groups, index + 1 );
  });
}
