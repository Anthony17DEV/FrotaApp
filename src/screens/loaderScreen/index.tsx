import { Image, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import images from '@utils/images'
import styles from './style.css'
import { useValues } from '@App'
import { ImageSourcePropType } from 'react-native'

interface LoaderScreenProps {
  navigation: {
    replace: (screen: string) => void
  }
}

export function LoaderScreen({ navigation }: LoaderScreenProps) {
  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      navigation.replace('Drawer')
    }, 1000)

    return () => clearTimeout(timer)
  }, [navigation])

  const { isDark }: { isDark: boolean } = useValues()
  const imageBg: ImageSourcePropType = isDark
    ? images.loaderBgDark
    : images.loaderBg
  const loader: ImageSourcePropType = isDark ? images.loading : images.loaderGIF

  return (
    <ImageBackground style={styles.container} source={imageBg}>
      <Image
        style={isDark ? styles.imgStyleDark : styles.imgStyle}
        source={loader}
      />
    </ImageBackground>
  )
}
