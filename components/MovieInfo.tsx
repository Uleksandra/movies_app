import { View, Text } from 'react-native'
import React from 'react'

interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}

const MovieInfo = ({label, value}: MovieInfoProps) => {
  return (
    <View className='flex-col justify-center mt-5 items-start'>
      <Text className='text-sm font-normal text-light-200'>{label}</Text>
      <Text className='text-sm font-bold text-light-100'>{value || 'N/A'}</Text>
    </View>
  )
}

export default MovieInfo