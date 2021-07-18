import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import RNPickerSelect from 'react-native-picker-select'

function Vehicle (props) {

  const vehicles = {
    petrolCar: {
      name: 'Petrol Car',
      eco: 'medium'
    },
    dieselCar: {
      name: 'Diesel Car',
      eco: 'medium'
    },
    petrolUte: {
      name: 'Petrol Ute',
      eco: 'high'
    },
    dieselUte: {
      name: 'Diesel Ute',
      eco: 'high'
    },
    petrolMotorbike: {
      name: 'Petrol Motorbike',
      eco: 'low'
    },
    dieselMotorbike: {
      name: 'Diesel Motorbike',
      eco: 'low'
    },
    petroltruck: {
      name: 'Petrol Truck',
      eco: 'high'
    },
    dieselTruck: {
      name: 'Diesel Truck',
      eco: 'high'
    },
    hybrid: {
      name: 'hybrid',
      eco: 'low'
    }
  }

  return (
    <View>
      <StyledText>
        <Icon name="search" size={30} color="#900"/>
        Select type of Vehicle:
      </StyledText>
      <RNPickerSelect
        onValueChange={(value) => props.setVehicleType(value)}
        items={[
          { label: vehicles.petrolCar.name, value: vehicles.petrolCar.name },
          { label: vehicles.dieselCar.name, value: vehicles.dieselCar.name },
          { label: vehicles.petrolUte.name, value: vehicles.petrolUte.name },
          { label: vehicles.dieselUte.name, value: vehicles.dieselUte.name },
          { label: vehicles.petrolMotorbike.name, value: vehicles.petrolMotorbike.name },
          { label: vehicles.dieselMotorbike.name, value: vehicles.dieselMotorbike.name },
          { label: vehicles.petroltruck.name, value: vehicles.petroltruck.name },
          { label: vehicles.dieselTruck.name, value: vehicles.dieselTruck.name },
          { label: vehicles.hybrid.name, value: vehicles.hybrid.name }
        ]}
      />
    </View>
  )
}

const StyledText = styled.Text`
  color: blue;
  font-size: 30px;
  margin-bottom: 30px;
`

export default Vehicle
