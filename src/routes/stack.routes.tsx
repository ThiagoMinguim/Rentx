import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SchedulingComplete } from '../screens/SchedulingComplete'
import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { MyCars } from '../screens/MyCars'

import { CarDTO } from '../dtos/CarDTO'

export function StackRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator()

  return (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />

      <Screen name="CarDetails" component={CarDetails} />

      <Screen name="Scheduling" component={Scheduling} />

      <Screen name="SchedulingComplete" component={SchedulingComplete} />

      <Screen name="SchedulingDetails" component={SchedulingDetails} />

      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  )
}

export type RootStackParamList = {
  Home: undefined
  CarDetails: { car: CarDTO | undefined }
  Scheduling: { car: CarDTO | undefined }
  SchedulingDetails: { car: CarDTO; dates: string[] }
  SchedulingComplete: undefined
  MyCars: undefined
  Splash: undefined
}
