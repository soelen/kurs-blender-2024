let characteristic;

const connect = ( filter, service ) => {

    console.log('yes')
    console.log( filter, service );

    return navigator.bluetooth.requestDevice( {
        acceptAllDevices: true,
        optionalServices: [
            // 'battery_service',
            // parseInt( service ),
            0x18F0,
        ]
    })
    .then( ( device ) => {
        console.log('gatt', device );

        const gatt = device.gatt;

        return gatt.connect();
    } )
    .then( server => {
        console.log('get primary service');
        // return server.getPrimaryServices();
        // console.log( server.connected );
        return server.getPrimaryService( 0x18F0 );
    } )
    .then( ( service ) => {
        // console.log('services', services );

        // const service = services.find( service => service.isPrimary );
        return service.getCharacteristics();
    } )
    .then( ( characteristics ) => {
        console.log('characteristics');
        characteristic = characteristics.find( characteristic => characteristic.properties.write );
        return characteristic;
    }).catch( error => {
        console.log( error.message );
    });
}

const print = ( data ) => {

    let array = [];

    for (var i=0; i < data.length; i++ ) {
      array.push( data[i].charCodeAt(0) );
    }


    // array = [ 0x01b, 82, 50, ...array, ...[0x01B, 0x64, 2 ] ];
    const mapped = textEncoder( data );
    console.log( mapped );
    Promise.all( mapped ).then( data => {
        const reducedMap = mapped;
    //   const reducedMap = data.reduce( ( accumulator, map ) => [ ...accumulator, ...map.escpos ], [] );
      // array = [ 0x01b, 82, 50, ...reducedMap, ...[0x01B, 0x64, 2 ] ];
      // var chunk_size = 110;
      var chunk_size = 110;
      // var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
      var groups = []
      // groups.push( [0x01B, 0x64, 2 ] )
      groups = reducedMap.map( ( character, index ) => {

        return index % chunk_size === 0 ? reducedMap.slice( index, index + chunk_size ) : null;

      } ).filter( character => character );

      groups.push( [0x01B, 0x64, 2 ] )
      recursivefunction( groups );
      });
    // characteristic.writeValue( new Uint8Array( array ).buffer );



}

const textEncoder = ( string ) => {
  const array = [];

  for ( let i = 0; i < string.length; i++ ) {
    array.push( string[ i ].charCodeAt( 0 ) );
  }
  return array;

}

const recursivefunction = ( groups, index = 0 ) => {
  if( !characteristic ) return;

  characteristic.writeValue( new Uint8Array( groups[ index ] ).buffer ).then( () => {
      if( groups[ index + 1 ] ) recursivefunction( groups, index + 1 );
  });
}

export { connect, print, }