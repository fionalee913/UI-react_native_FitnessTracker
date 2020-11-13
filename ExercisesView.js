import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Dimensions, Modal, FlatList, List, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class ExercisesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            duration: 0.0,
            calories: 0.0,
            date: new Date(),
            exercises: [],
            add: false,
            edit: false, 
            mode: "",
            pick: false,
            remove: false,
        }
        this.getAllExercises = this.getAllExercises.bind(this);
        this.addExercise = this.addExercise.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
    }

    addExercise() {
        fetch('https://mysqlcs639.cs.wisc.edu/activities', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-access-token': this.props.accessToken 
            },
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

    deleteExercise(id) {
        fetch(`https://mysqlcs639.cs.wisc.edu/activities/` + id, {
        method: 'DELETE',
        headers: {
            'x-access-token': this.props.accessToken
        },
    })
      .then(res => res.json())
      .then(res => {
        alert("This exercise has been deleted!");
      })
      .catch(err => {
        alert("Something went wrong!");
      })
    }

    editExercise(id) {
        fetch(`https://mysqlcs639.cs.wisc.edu/activities/` + id, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'x-access-token': this.props.accessToken 
            },
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

        return (
            <>
            {this.state.exercises.map((item) => 
                <View style={styles.item} key={item.id}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={styles.spaceSmall}></View>
                    <Text>Date: {item.date}</Text>
                    <Text>Duration: {item.duration}</Text>
                    <Text>Calories burned: {item.calories}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button title="Edit" onPress={() => {
                        this.setState({ 
                            id: item.id,
                            name: item.name,
                            date: item.date,
                            duration: item.duration, 
                            calories: item.calories,
                            edit: true,
                        });
                    }}/>
                    <View style={styles.spaceHorizontal} />
                    <Button title="Remove" onPress={() => {
                        this.setState({id: item.id, remove: true});
                    }}/>
                    </View>
                    
                </View>
            )}
            </>
        )
    }

    onChange = (event, selectedDate) => {
      const currentDate = selectedDate || this.state.date;
      this.setState({pick: Platform.OS === 'ios'});
      this.setState({date: currentDate});
    };

    showMode = (currentMode) => {
      var date = new Date();
      this.setState({ date });
      this.setState({pick: true});
      this.setState({mode: currentMode});
    };
   
    componentDidMount() {
        
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={{ flexGrow: 11, justifyContent: 'center', alignItems: "center" }}>
                <View style={styles.space} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text style={styles.bigText}>Exercises</Text>
                    </View>
                
                <View style={styles.space} />
                <Button color="#a1635f" style={styles.buttonInline} title="Add Exercises" onPress={() => this.setState({add: true})} />
                {this.getAllExercises()}
                
                <Modal visible={this.state.add} >
                    <View style={styles.centeredView}>
                    <Text>Activity name:</Text> 
                    <TextInput style={styles.input}
                        placeholderTextColor="#d9bebd"
                        onChangeText={(name) => this.setState({ name: name })}
                        value={this.state.name}
                        autoCapitalize="none" />
                        <Text>Duration: </Text>
                        <TextInput style={styles.input}
                            placeholderTextColor="#d9bebd"
                            onChangeText={(duration) => this.setState({ duration: duration })}
                            value={this.state.duration.toString()}
                            autoCapitalize="none" />
                        <Text>Calories burned: </Text>
                        <TextInput style={styles.input}
                            placeholderTextColor="#d9bebd"
                            onChangeText={(calories) => this.setState({ calories: calories })}
                            value={this.state.calories.toString()}
                            autoCapitalize="none" />
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                          <Button color="#942a21" style={styles.buttonInline} onPress={()=> this.showMode('date')} title="Set date" />
                          <View style={styles.spaceHorizontal} />
                          <Button color="#942a21" style={styles.buttonInline} onPress={()=> this.showMode('time')} title="Set time" />
                          <View style={styles.space} />
                        {this.state.pick && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChange}
                            style={{width: 350}}
                          />
                        )}
                        </View>
                        <View style={styles.space} />
                        <Text style={{alignItems: 'center'}}>Current time: </Text>
                        <Text>{this.state.date.toString()}</Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Button color="#942a21" style={styles.buttonInline} title="Add" onPress={() => {
                            this.setState({
                              name: "", duration: 0.0, calories: 0.0, pick: false,
                            })
                            this.addExercise();
                            this.setState({add: false});
                        }}/>
                        <View style={styles.spaceHorizontal} />
                        <Button color="#942a21" style={styles.buttonInline} title="Close" onPress={() => this.setState({add: false, pick: false})}/>
                      </View>
                    </View>
                </Modal>
                <Modal visible={this.state.edit} >
                    <View style={styles.centeredView}>
                    <Text>Activity name:</Text> 
                    <TextInput style={styles.input}
                        placeholderTextColor="#d9bebd"
                        placeholder={this.state.name}
                        onChangeText={(name) => this.setState({ name: name })}
                        value={this.state.name}
                        autoCapitalize="none" />
                        <Text>Duration: </Text>
                        <TextInput style={styles.input}
                            placeholderTextColor="#d9bebd"
                            placeholder={this.state.duration.toString()}
                            onChangeText={(duration) => this.setState({ duration: duration })}
                            value={this.state.duration.toString()}
                            autoCapitalize="none" />
                        <Text>Calories burned: </Text>
                        <TextInput style={styles.input}
                            placeholderTextColor="#d9bebd"
                            placeholder={this.state.calories.toString()}
                            onChangeText={(calories) => this.setState({ calories: calories })}
                            value={this.state.calories.toString()}
                            autoCapitalize="none" />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                          <Button color="#942a21" style={styles.buttonInline} onPress={()=> this.showMode('date')} title="Set date" />
                          <View style={styles.spaceHorizontal} />
                          <Button color="#942a21" style={styles.buttonInline} onPress={()=> this.showMode('time')} title="Set time" />
                          <View style={styles.space} />
                        {this.state.pick && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChange}
                            style={{width: 350}}
                          />
                        )}
                        </View>
                        <View style={styles.space} />
                        <Text style={{alignItems: 'center'}}>Current time: </Text>
                        <Text>{this.state.date.toString()}</Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Button color="#942a21" style={styles.buttonInline} title="Save" onPress={() => {
                            this.editExercise(this.state.id);
                            this.setState({edit: false, pick: false});
                        }}/>
                        <View style={styles.spaceHorizontal} />
                        <Button color="#942a21" style={styles.buttonInline} title="Close" onPress={() => this.setState({edit: false, pick: false})}/>
                      </View>
                    </View>
                </Modal>
                <Modal visible={this.state.remove}>
                        <View style={styles.centeredView}>
                          <Text>Remove this exercise?</Text>
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Button title="Remove" onPress={()=> {
                              this.deleteExercise(this.state.id);
                              this.setState({remove: false});
                            }}/>
                            <View style={styles.spaceHorizontal} />
                            <Button title="Cancel" onPress={()=> {
                              this.setState({remove: false});
                            }}/>
                            </View>
                        </View>
                    </Modal>
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
        margin: 5,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 40,
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
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
});

export default ExercisesView;