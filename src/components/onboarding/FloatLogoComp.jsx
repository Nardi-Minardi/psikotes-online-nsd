import { View, Text, Image } from 'react-native'
import React from 'react'
import { LogoNsd } from '../../assets'

const FloatLogoComp = () => {
  return (
    <View style={{ position: 'absolute', bottom: 0, right: 0, alignItems: 'center', padding: 20 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: '#8AC5FE', fontSize: 16, marginRight: 5, fontWeight: 'bold' }}
        >Powered by</Text>
        <Image source={LogoNsd} style={{ width: 30, height: 30 }} />
      </View>
    </View>
  )
}

export default FloatLogoComp