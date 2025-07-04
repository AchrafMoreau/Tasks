import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '@/providers/AuthProvider';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const userData = [
  { label: 'Profile', value: 'profile' },
  { label: 'Logout', value: 'logout' },
];

const UserIconDropdown = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { user, signOut } = useAuth();

  const onChange = (item: any) => {
    setIsFocus(false);
    if (item.value === 'logout') {
      signOut();
    } else if (item.value === 'profile') {
      console.log('Go to Profile');
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && styles.focused]}
        data={userData}
        labelField="label"
        valueField="value"
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        renderLeftIcon={() => (
          <View className='flex-row'>
            <FontAwesome name="user-circle" size={24} color="#333" style={{ marginRight: 8 }} />
            <Text>{user?.email}</Text>
          </View>
        )}
        placeholder={user?.displayName || user?.email || 'User'}
        value={null}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
      />
    </View>
  );
}

export default UserIconDropdown;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  dropdown: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  focused: {
    borderColor: '#007AFF',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
