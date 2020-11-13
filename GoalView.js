import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import moment from 'moment';
import { Dimensions } from 'react-native';

class GoalView extends React.Component {
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
            goalMin: 0.0, todayMin: 0.0,
            goalCalories: 0.0, todayCalories: 0.0,
            goalCarb: 0.0, todayCarb: 0.0,
            goalProtein: 0.0, todayProtein: 0.0,
            goalFat: 0.0, todayFat: 0.0,
        }
    }
    
    getActivityMin() {
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
      let date = new Date();
      var exercises = this.state.exercises.filter((item) => {
        return moment(item.date).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD');
        });
        var totalTime = 0;
        exercises.forEach((item) => {
            totalTime += item.duration;
        })
        return totalTime;
    }


    Grid() {
        fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.username, {
      method: 'GET',
      headers: { 'x-access-token': this.props.accessToken }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          goalCalories: res.goalDailyCalories,
          goalProtein: res.goalDailyProtein,
          goalCarb: res.goalDailyCarbohydrates,
          goalFat: res.goalDailyFat,
          goalMin: res.goalDailyActivity
        });
      });

        return (
          <View style={styles.gridContainer}>
            <View style={styles.rowStyle}>
                <View style={styles.cellStyle}>
                    <Text></Text>
                </View>    
                <View style={styles.cellStyle}>
                    <Text>Today</Text>
                </View>  
                <View style={styles.cellStyle}>
                    <Text>Goals</Text>
                </View>  
            </View>
            <View style={styles.rowStyle}>
                <View style={styles.cellStyle}>
                    <Text>Daily Activity</Text>
                </View>    
                <View style={styles.cellStyle}>
                    <Text>{this.getActivityMin()}</Text>
                </View>  
                <View style={styles.cellStyle}>
                    <Text>{this.state.goalMin}</Text>
                </View>  
            </View>
            <View style={styles.rowStyle}>
                <View style={styles.cellStyle}>
                    <Text>Daily Calories</Text>
                </View>    
                <View style={styles.cellStyle}>
                    <Text>{this.state.todayCalories}</Text>
                </View>  
                <View style={styles.cellStyle}>
                    <Text>{this.state.goalCalories}</Text>
                </View>  
            </View>
            <View style={styles.rowStyle}>
                <View style={styles.cellStyle}>
                    <Text>Daily Carbohydrates</Text>
                </View>    
                <View style={styles.cellStyle}>
                    <Text>{this.state.todayCarb}</Text>
                </View>  
                <View style={styles.cellStyle}>
                    <Text>{this.state.goalCarb}</Text>
                </View>  
            </View>
            <View style={styles.rowStyle}>
                <View style={styles.cellStyle}>
                    <Text>Daily Protein</Text>
                </View>    
                <View style={styles.cellStyle}>
                    <Text>{this.state.todayProtein}</Text>
                </View>  
                <View style={styles.cellStyle}>
                    <Text>{this.state.goalProtein}</Text>
                </View>  
            </View>
            <View style={styles.rowStyle}>
                <View style={styles.cellStyle}>
                    <Text>Daily Fat</Text>
                </View>    
                <View style={styles.cellStyle}>
                    <Text>{this.state.todayFat}</Text>
                </View>  
                <View style={styles.cellStyle}>
                    <Text>{this.state.goalFat}</Text>
                </View>  
            </View>
            
          </View>
        );
      }

    /*{data.map((column) => 
              <View style={styles.rowStyle}>
              {column.map((data) => 
                <View style={styles.cellStyle}>
                  <Text>{data}</Text>
                  </View>
              )}
            </View>
            )}*/

    componentDidMount() {
        
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={{ flexGrow: 11, justifyContent: 'center', alignItems: "center" }}>
            <View style={styles.space} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.bigText}>Daily Goals</Text>
                </View>
                <View style={styles.space} />
                <>{this.Grid()}</>
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
      gridContainer: {
        width: 280,
    },
    rowStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    cellStyle: {
      flex: 1,
      margin: 8,
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

export default GoalView;