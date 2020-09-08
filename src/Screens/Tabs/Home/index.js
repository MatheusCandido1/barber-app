import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import Api from '../../../Api';

import { 
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea,
 } from './styles';

import SearchIcon from '../../../Assets/search.svg';
import LocationIcon from '../../../Assets/my_location.svg';

import BarberItem from '../../../Components/BarberItem';

export default () => {
    

    const navigation = useNavigation();

    const [location, setLocation] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const handleLocationFinder = async () => {
        setCoords(null);
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if(status === 'granted') {
            setLoading(true);
            setLocation('');
            setList([]);

            let information = await Location.getCurrentPositionAsync({});
            setCoords(information.coords);
            getBarbers();
        } else {
            alert('Permissão de localização negada!'); 
        }
    }

    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        let response = await Api.getBarbers();
        if(response.error == ''){
            if(response.loc){
                setLocation(response.loc);
            }
            setList(response.data);
        } else {
            alert("Erro: "+response.error);
        }
        setLoading(false);
    }

    useEffect (() => {
        getBarbers();
    }, []);

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search') }>
                        <SearchIcon width="26" height="26" fill="#FFFFFF"></SearchIcon>
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={location}
                        onChangeText={text=>setLocation(text)}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <LocationIcon width="26" height="26" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>
                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF" />
                }

                <ListArea>
                    {list.map((item, key) => (
                        <BarberItem key={key} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    );
}