import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Dimensions, Modal } from 'react-native';

class ExercisesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            duration: 0.0,
            calories: 0.0,
            date: "",
            exercises: [],
            add: false,
        }
        this.getAllExercises = this.getAllExercises.bind(this);
        this.addExercise = this.addExercise.bind(this);
    }

    addExercise() {
        fetch('https://mysqlcs639.cs.wisc.edu/activities', {
            method: 'POST',
            headers: { 'x-access-token': this.props.accessToken },
            body: JSON.stringify({
                name: this.state.name,
                duration: this.state.duration,
                calories: this.state.calories,
                date: this.state.date
            })
        })
      .then(res => res.json())
      .then(res => {
        if(res) {
            alert(JSON.stringify(res.message));
        }
      });
    }

    getExercise() {

    }

    getAllExercises() {
        return(
        <>
        {this.state.exercises.map((exe, id) => (
            <Card>
            <Card.Header as="h5">{exe.name}</Card.Header>
            <Card.Body>
                <Card.Text>Date: {exe.date}</Card.Text>
                <Card.Text>Duration: {exe.duration}</Card.Text>
                <Card.Text>Calories burned: {exe.calories}</Card.Text>
                <Button variant="primary">Edit</Button>
            </Card.Body>
        </Card>
        ))}
        </>
        )
    }

    componentDidMount() {
    fetch('https://mysqlcs639.cs.wisc.edu/activities', {
            method: 'GET',
            headers: { 'x-access-token': this.props.accessToken }
        })
      .then(res => res.json())
      .then(res => {
        this.setState({
          exercises: res.activities
        });
      });
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={{ flexGrow: 11, justifyContent: 'center', alignItems: "center" }}>
                <View style={styles.space} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text style={styles.bigText}>Exercises</Text>
                    </View>
                    <View style={styles.spaceSmall}></View>
                    <Text>Let's get to know you!</Text>
                    <Text>Specify your information below.</Text>
                <View style={styles.space} />
                {this.getAllExercises()}
                <Button color="#a1635f" style={styles.buttonInline} title="Add" onPress={() => this.setState({add: true})} />
                
                <Modal visible={this.state.add} >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text>Activity name:</Text> 
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#d9bebd"
                        onChangeText={(name) => this.setState({ name: name })}
                        value={this.state.name}
                        autoCapitalize="none" />
                        <Text>Duration: </Text>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#d9bebd"
                            onChangeText={(duration) => this.setState({ duration: duration })}
                            value={this.state.duration}
                            autoCapitalize="none" />
                        <Text>Calories burned: </Text>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#d9bebd"
                            onChangeText={(calories) => this.setState({ calories: calories })}
                            value={this.state.calories}
                            autoCapitalize="none" />
                        <Text>Date: </Text>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#d9bebd"
                            onChangeText={(date) => this.setState({ date: date })}
                            value={this.state.date}
                            autoCapitalize="none" />

                        <Button title="Add" onPress={() => {
                            this.setState({add: false});
                            this.addExercise();
                        }}/>
                        <Button title="Close" onPress={() => this.setState({add: false})}/>
                    </View>
                    </View>
                </Modal>

                <Text style={{ textAlignVertical: "center", fontWeight: "700", fontSize: 20 }}>Personal Information</Text>
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>First Name</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Bucky"
          placeholderTextColor="#d9bebd"
          onChangeText={(firstName) => this.setState({ firstName: firstName })}
          value={this.state.firstName}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>

        <View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Last Name</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Badger"
          placeholderTextColor="#d9bebd"
          onChangeText={(lastName) => this.setState({ lastName: lastName })}
          value={this.state.lastName}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>

        <Text style={{ textAlignVertical: "center", fontWeight: "700", fontSize: 20 }}>Fitness Goals</Text>
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Daily Calories (kcal)</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="2200"
          placeholderTextColor="#d9bebd"
          onChangeText={(goalDailyCalories) => this.setState({ goalDailyCalories: goalDailyCalories })}
          value={this.state.goalDailyCalories + ""}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Daily Protein (grams)</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="52"
          placeholderTextColor="#d9bebd"
          onChangeText={(goalDailyProtein) => this.setState({ goalDailyProtein: goalDailyProtein })}
          value={this.state.goalDailyProtein + ""}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Daily Carbs (grams)</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="130"
          placeholderTextColor="#d9bebd"
          onChangeText={(goalDailyCarbohydrates) => this.setState({ goalDailyCarbohydrates: goalDailyCarbohydrates })}
          value={this.state.goalDailyCarbohydrates + ""}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Daily Fat (grams)</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="35"
          placeholderTextColor="#d9bebd"
          onChangeText={(goalDailyFat) => this.setState({ goalDailyFat: goalDailyFat })}
          value={this.state.goalDailyFat + ""}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>
        <View>
          <Text style={{ textAlignVertical: "center", fontWeight: "700" }}>Daily Activity (mins)</Text>
        </View>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="60"
          placeholderTextColor="#d9bebd"
          onChangeText={(goalDailyActivity) => this.setState({ goalDailyActivity: goalDailyActivity })}
          value={this.state.goalDailyActivity + ""}
          autoCapitalize="none" />
        <View style={styles.spaceSmall}></View>

        <View style={styles.space} />

        <Text style={{ fontWeight: "700", fontSize: 20 }}>Looks good! All set?</Text>
        <View style={styles.spaceSmall} />

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Button color="#942a21" style={styles.buttonInline} title="Save Profile" onPress={() => this.handleSaveProfile()} />
          <View style={styles.spaceHorizontal} />
          <Button color="#a1635f" style={styles.buttonInline} title="Exit" onPress={() => this.backToLogin()} />
        </View>
        <View style={styles.space} />
      </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        height: Dimensions.get('window').height
      },
      mainContainer: {
        flex: 1
      },
      scrollViewContainer: {},
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      bigText: {
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 5
      },
      spaceSmall: {
        width: 20,
        height: 10,
      },
      space: {
        width: 20,
        height: 20,
      },
      spaceHorizontal: {
        display: "flex",
        width: 20
      },
      buttonInline: {
        display: "flex"
      },
      input: {
        width: 200,
        padding: 10,
        margin: 5,
        height: 40,
        borderColor: '#c9392c',
        borderWidth: 1
      },
      inputInline: {
        flexDirection: "row",
        display: "flex",
        width: 200,
        padding: 10,
        margin: 5,
        height: 40,
        borderColor: '#c9392c',
        borderWidth: 1
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
});

export default ExercisesView;