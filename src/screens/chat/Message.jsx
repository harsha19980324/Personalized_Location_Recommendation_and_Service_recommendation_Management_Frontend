import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { theme } from "../../core/theme";

const blue = `${theme.colors.primary}`;
const blueVari = `#538599`;


const Message = ({message}) => {
    const messageTypeStyle = message.type === 'sender' ? styles.rightContainer : styles.leftContainer;


    return(
       <View style={[
        styles.container,  messageTypeStyle 
            ]}
        >
        <Text style={{color:  'white'}}>
            {message.text}
        </Text>
       </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin:10,
        borderRadius: 10,
        maxWidth: '75%',
    
    },
    leftContainer : {
        backgroundColor: blue,
        marginLeft: 10,
        marginRight: 'auto'
    },

    rightContainer : {
        backgroundColor: blueVari,
        marginLeft: 'auto',
        borderRadius : 10,
        marginRight: 10
    }
})

export default Message;