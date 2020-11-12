import React from 'react';

import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.seeProfile = this.seeProfile.bind(this);
        this.seeExercise = this.seeExercise.bind(this);
        this.seeToday = this.seeToday.bind(this);
    }

    seeProfile() {
        this.props.navigation.navigate('Profile');
    }

    seeExercise() {
        this.props.navigation.navigate('Exercises');
    }

    seeToday() {
        this.props.navigation.navigate('Today');
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                <Button color="#942a21" style={styles.buttonInline} title="Profile" onPress={this.seeProfile} />
                <Button color="#942a21" style={styles.buttonInline} title="Exercises" onPress={this.seeExercise} />
                <Button color="#942a21" style={styles.buttonInline} title="Today" onPress={this.seeToday} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonInline: {
        display: "flex"
    },
});

export default HomePage;