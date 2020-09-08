import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Rating from '../Components/Rating';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const BarberName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

const ProfileButton = styled.View`
    width: 85px;
    height: 26px;
    border: 1px solid #4EADBE;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const ProfileButtonText = styled.Text`
    font-size: 13px;
    color: #258596;
`;



export default({data}) => {
    const navigation = useNavigation();

    const handleBarberClick = () => {
        navigation.navigate('Barber', {
            id: data.id,
            avatar: data.avatar,
            name: data.name,
            starts: data.stars
        });
    }

    return(
        <Area onPress={handleBarberClick}>
            <Avatar source={{uri: data.avatar}} />
            <InfoArea>
                <BarberName>{data.name}</BarberName>

                <Rating stars={data.stars} showRating={true} />

                <ProfileButton>
                    <ProfileButtonText>Ver Perfil</ProfileButtonText>
                </ProfileButton>
            </InfoArea>
        </Area>
    );
}