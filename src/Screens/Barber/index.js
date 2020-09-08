import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Container } from './styles';

import { useNavigation, useRoute} from '@react-navigation/native';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        starts: route.params.stars
    })

    return (
        <Container>
            <Text>Barbeiro: {userInfo.name}</Text>
        </Container>
    );
}