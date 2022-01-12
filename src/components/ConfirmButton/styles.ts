import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity)`
  width: 80px;
  height: 56px;

  background-color: ${props => props.theme.colors.shape_dark}
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-family: ${props => props.theme.font.primary_500};
  color: ${props => props.theme.colors.shape};

  font-size: ${RFValue(15)}px;
`