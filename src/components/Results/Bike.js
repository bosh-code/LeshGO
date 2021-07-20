import React from 'react'
import styled from 'styled-components/native'

function Bike (props) {
  const { distance, duration } = props.undefinedData.bike
  const { setTwoDecimals, selectedRoute } = props

  return (
    props.data.mapRouteData.bicyclingData
    ? <StyledView>
        <StyledIcon>
          {selectedRoute === 'bicycling'
          ? <Image source={require("../../../assets/bike.gif")}/>
          : <Image source={require("../../../assets/bike.png")}/>
        } 
        </StyledIcon>
        <FlexText>
        <StyledText>
            <StyledTextLeft>Distance: </StyledTextLeft>
            <StyledTextRight>{setTwoDecimals(props.data.mapRouteData.bicyclingData.distanceKM)}KM</StyledTextRight>
          </StyledText>
          <StyledText>
            <StyledTextLeft>Time: </StyledTextLeft>
            <StyledTextRight>{setTwoDecimals(props.data.mapRouteData.bicyclingData.durationMIN)} mins</StyledTextRight>
          </StyledText>
        </FlexText>
      </StyledView>
    
    : <StyledView>
        <StyledIcon>
        <Image source={require("../../../assets/bike.png")}/>
        </StyledIcon>
        <FlexText>
        <StyledText>
            <StyledTextLeft>Distance: </StyledTextLeft>
            <GreyText>{distance}</GreyText>
          </StyledText>
          <StyledText>
            <StyledTextLeft>Time:</StyledTextLeft>
            <GreyText>{duration}</GreyText>
          </StyledText>
        </FlexText>
      </StyledView>
  )
}

const StyledText = styled.View`
  flex: 1;
  flex-direction: row;
  font-size: 16px;
  padding: 1%;
`

const StyledTextLeft = styled.Text`
  flex: 0.7;
  font-size: 16px;
  text-align: right;
`

const StyledTextRight = styled.Text`
  flex: 2;
  font-size: 16px;
  padding-left: 7%;
`

const GreyText = styled.Text`
  flex: 2;
  font-size: 16px;
  color: lightgrey;
  padding-left: 6%;
`

const StyledView = styled.View`
flex: 1;
flex-direction: row;
alignItems: center;
`

const FlexText = styled.View`
flex: 4;
flex-direction: column;
height: 100%;
justifyContent: center;
padding: 1%;
`

const StyledIcon = styled.View`
flex: 1;
height: 100%;
alignItems: center;
justifyContent: center;
padding-left: 3%;
padding-right: 2%;
`

const Image = styled.Image`
height: 65%;
width: 65%;
`


export default Bike
