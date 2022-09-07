import {NativeModules, Platform} from 'react-native'

export const formatTimeForHumans = (date: string) => {
  const formattedDate = new Date(date).toLocaleTimeString().split(':')

  return `${formattedDate[0]}:${formattedDate[1]}`
}

export const getDeviceLocale = () => {
  const language: string =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier

  return language.replace("_", "-")
}
