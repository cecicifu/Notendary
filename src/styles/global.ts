import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  defaultView: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 30,
    width: 300,
    display: 'flex',
    alignSelf: 'center',
  },
  buttonsInline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 50,
    marginRight: 20
  }
})
