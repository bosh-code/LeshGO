import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { Dimensions, StyleSheet } from 'react-native'
import { API_KEY } from '../../api'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getDistance } from './helper'

const Maps = ({ destination, markers, origin, selectedRoute, setRouteData }) => {
  const [walkingData, setWalkingData] = useState()
  const [drivingData, setDrivingData] = useState()
  const [transitData, setTransitData] = useState()
  const [bicyclingData, setBicyclingData] = useState()
  const initialRegion = {
    latitude: -36.872036,
    longitude: 174.763428,
    latitudeDelta: 0.07,
    longitudeDelta: 0.04,
  }
  const [region, setRegion] = useState(initialRegion)
  const [newRegion, setNewRegion] = useState(initialRegion)
  const [regionChanged, setRegionChanged] = useState(false)

  const originSet = Object.prototype.hasOwnProperty.call(origin, 'latitude')
  const destinationSet = Object.prototype.hasOwnProperty.call(destination, 'latitude')

  const showRoute = originSet && destinationSet



  useEffect(() => {
    if (originSet && destinationSet) {
      const distance = getDistance(origin.latitude, origin.longitude, destination.latitude, destination.longitude)
      setNewRegion({
        latitude: (origin.latitude + destination.latitude) / 2,
        longitude: (origin.longitude + destination.longitude) / 2,
        latitudeDelta: .015 * distance,
        longitudeDelta: .015 * distance,
      })
      setRegion({
        latitude: (origin.latitude + destination.latitude) / 2,
        longitude: (origin.longitude + destination.longitude) / 2,
        latitudeDelta: .015 * distance,
        longitudeDelta: .015 * distance,
      })
    }
  }, [origin, destination])

  useEffect(() => {
    async function addStates () {
      setRouteData({
        walkingData,
        drivingData,
        transitData,
        bicyclingData
      })
    }

    addStates()
  }, [bicyclingData, drivingData, transitData, walkingData])

  const handleWalkingData = data => {
    const lastCoord = data.coordinates.length - 1
    setWalkingData({
      returnedOrigin: data.coordinates[0], // lat long object
      returnedDestination: data.coordinates[lastCoord], // lat long object
      distanceKM: data.distance,
      durationMIN: data.duration
    })
  }

  const handleDrivingData = data => {
    const lastCoord = data.coordinates.length - 1
    setDrivingData({
      returnedOrigin: data.coordinates[0], // lat long object
      returnedDestination: data.coordinates[lastCoord], // lat long object
      distanceKM: data.distance,
      durationMIN: data.duration
    })
  }

  const handleTransitData = data => {
    const lastCoord = data.coordinates.length - 1
    setTransitData({
      returnedOrigin: data.coordinates[0], // lat long object
      returnedDestination: data.coordinates[lastCoord], // lat long object
      distanceKM: data.distance,
      durationMIN: data.duration
    })
  }

  const handleBicyclingData = data => {
    const lastCoord = data.coordinates.length - 1
    setBicyclingData({
      returnedOrigin: data.coordinates[0], // lat long object
      returnedDestination: data.coordinates[lastCoord], // lat long object
      distanceKM: data.distance,
      durationMIN: data.duration
    })
  }

  const recentre = () => {
    if (originSet && destinationSet) {
      setRegion(newRegion)
      setRegionChanged(false)
    } else {
      setRegion(initialRegion)
    }
  }

  return (
    <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region} initialRegion={initialRegion} onRegionChangeComplete={() => setRegionChanged(true)}>
      <Icon name="location-arrow" size={20} onPress={recentre}
            style={{ position: 'absolute', right: '5%', bottom: '5%' }}/>
      {markers.map((marker, index) => (
        marker.coord.latitude !== undefined &&
        <Marker
          key={index}
          coordinate={marker.coord}/>
      ))}
      {showRoute && <MapViewDirections onReady={result => handleWalkingData(result)}
                                       origin={origin}
                                       destination={destination}
                                       apikey={API_KEY}
                                       mode="WALKING"
                                       precision="high"
                                       timePrecision="now"
                                       showsUserLocation
                                       strokeWidth={3}
                                       strokeColor={selectedRoute === 'walking' ? 'red' : 'transparent'}/>}
      {showRoute && <MapViewDirections onReady={result => handleDrivingData(result)}
                                       origin={origin}
                                       destination={destination}
                                       apikey={API_KEY}
                                       mode="DRIVING"
                                       precision="high"
                                       timePrecision="now"
                                       showsUserLocation
                                       strokeWidth={3}
                                       strokeColor={selectedRoute === 'driving' ? 'red' : 'transparent'}/>}
      {showRoute && <MapViewDirections onReady={result => handleTransitData(result)}
                                       origin={origin}
                                       destination={destination}
                                       apikey={API_KEY}
                                       mode="TRANSIT"
                                       precision="high"
                                       timePrecision="now"
                                       showsUserLocation
                                       strokeWidth={3}
                                       strokeColor={selectedRoute === 'transit' ? 'red' : 'transparent'}/>}
      {showRoute && <MapViewDirections onReady={result => handleBicyclingData(result)}
                                       origin={origin}
                                       destination={destination}
                                       apikey={API_KEY}
                                       mode="BICYCLING"
                                       precision="high"
                                       timePrecision="now"
                                       showsUserLocation
                                       strokeWidth={3}
                                       strokeColor={selectedRoute === 'bicycling' ? 'red' : 'transparent'}/>}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3.2,
  },
})

export default Maps
