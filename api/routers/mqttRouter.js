

// sub & print console message
mqtt_client.on('message', (topic, payload, retain) => {

    // verifico si es retain
    if (retain.retain==1){
      // clean retain topic
      console.log('retain true: ', retain.retain)
      console.log('msg en Retain true: ',topic, payload.toString())
      mqtt_client.publish(topic, '', { qos: 0, retain: true }, (error) => {
        if (error) {
          console.error(error)
        }
      })

    }else{
      // si no es retain
      //console.log(retain.retain)
      console.log('Receive Message: ',topic, payload.toString())

    }
  })