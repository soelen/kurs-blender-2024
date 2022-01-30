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
    .then( ( services ) => {
        console.log('services');

        const service = services.find( service => service.isPrimary );
        return service.getCharacteristics();
    } )
    .then( ( characteristics ) => {
        console.log('characteristics');
        const characteristic = characteristics.find( characteristic => characteristic.properties.write );
        return characteristic;
    }).catch( error => {
        console.log( error.message );
    });
}

export { connect }