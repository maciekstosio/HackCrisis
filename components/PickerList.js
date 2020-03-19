import React from 'react'
import { 
    StyleSheet,
    View, 
    Text, 
    Picker, 
    TouchableOpacity,
    FlatList,
} from 'react-native'
import Flag from 'react-native-flags'
import {
    Modal,
} from '../components'

const PickerList = ({items, selectedValue, headerTitle, onValueChange, pickerVisibility, setPickerVisibility}) => {
    if (!pickerVisibility) return null

    if (Platform.OS === 'ios') {
        return (
            <View
                style={{
                    backgroundColor: '#ddd',
                }}
            >
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                >
                    {items.map(({label, value}) => <Picker.Item label={label} value={value} />)}
                </Picker>
            </View>
        )
    } 

    const onRowPress = (value) => {
        onValueChange(value)
        setPickerVisibility(false)
    }

    return (
        <Modal 
            headerTitle={headerTitle}
            onCloseClick={() => setPickerVisibility(false)}
        >
            <FlatList
                data={items}
                renderItem={({item}) => <PickerRow label={item.label} value={item.value} onPress={onRowPress} />}
                keyExtractor={item => item.value}
            />
        </Modal>
    )
}

const PickerRow = ({value, label, onPress}) => (
    <TouchableOpacity 
        onPress={() => onPress(value)}
        style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomColor: '#ddd',
            borderBottomWidth: StyleSheet.hairlineWidth,
        }}
    >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Flag code={value} size={16} type="flat" />
            <Text style={{fontSize: 20, marginLeft: 10}}>{label}</Text>
        </View>
    </TouchableOpacity>
)

export default PickerList