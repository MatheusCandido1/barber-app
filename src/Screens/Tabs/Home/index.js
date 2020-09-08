import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
 } from './styles';

import SearchIcon from '../../../Assets/search.svg';
import LocationIcon from '../../../Assets/my_location.svg';

export default () => {
    const navigation = useNavigation();

    const [location, setLocation] = useState('');

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
                    <LocationFinder>
                        <LocationIcon width="26" height="26" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>
            </Scroller>
        </Container>
    );
}