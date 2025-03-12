import { Text, View, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';

export default function Index() {
  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image source={images.bg} className='absolute w-full z-0'/>
       <ScrollView className='flex-1 px-5'>
        <Image source={icons.logo} className='w-12 h-10 mt-20 mx-auto'/>

       </ScrollView>
    </View>
  );
}
