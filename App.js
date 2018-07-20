/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    FlatList,
    View
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {data: null};
    }

    _keyExtractor = (item) => (
        item.releaseYear
    );

    componentWillMount() {
        return (
            fetch('https://facebook.github.io/react-native/movies.json')
                .then((response => response.json()))
                .then((responseJson) =>
                    this.setState({
                        data: responseJson['movies']
                    })
                )
                .catch((error) => {
                    console.error(error);
                })
        );
    }


    _renderItem = ({item}) => (
        <View>
            <Text>{item.releaseYear}</Text>
            <Text style={styles.listfont}>{'\t'}{item.title}</Text>
            <View style={styles.separator}/>
        </View>
    );

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#F5DA81'
    },
    container: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#F2F2F2',
    },
    listfont: {
        fontSize: 20,
        lineHeight: 25,
    },
    separator: {
        height: 1,
        backgroundColor: '#2A1B0A'
    }
});
