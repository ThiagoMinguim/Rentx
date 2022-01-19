import React from 'react'
import { Button, StyleSheet, Dimensions } from 'react-native'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated'

const WIDTH = Dimensions.get('window').width

import * as S from './styles'

export function Splash() {
  const animation = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 500,
            easing: Easing.elastic(1)
          })
        }
      ]
    }
  })

  function handlePositionAnimation() {
    animation.value = Math.random() * (WIDTH - 100)
  }

  return (
    <S.Container>
      <Animated.View style={[styles.box, animatedStyles]} />

      <Button title="Mover" onPress={handlePositionAnimation} />
    </S.Container>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
})
