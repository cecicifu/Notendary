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

  return language.replace('_', '-')
}

export const toIsoString = (date: Date) => {
  const tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num: number) {
      return (num < 10 ? '0' : '') + num
    }

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' +
    pad(Math.abs(tzo) % 60)
  )
}
