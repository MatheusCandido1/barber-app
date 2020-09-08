import React, { useState, useContext } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../Contexts/UserContext';

import Api from '../../Api';

import SignInput from '../../Components/SignInput';

import EmailIcon from '../../Assets/email.svg';
import LockIcon from '../../Assets/lock.svg';
import PersonIcon from '../../Assets/person.svg';


import BarberLogo from '../../Assets/barber.svg';

import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    const handleSignUpClick = async () => {
        if(name != '' || email != '' || password != ''){
            let response = await Api.signUp(name, email, password);
            if(response.token) {
                await AsyncStorage.setItem('token', response.token);

                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: response.data.avatar
                    }
                });
                
                navigation.reset({
                    routes: [{ name: 'MainTab'}]
                });
            } else {
                alert(response.error);
            }
        } else {
            alert('Preencha todos os campos!');
        }
    }

    return(
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
                <SignInput 
                    IconSvg={PersonIcon}
                    Placeholder="Digite seu nome completo"
                    Value={name}
                    OnChangeText={text=>setName(text)}
                />

                <SignInput 
                    IconSvg={EmailIcon}
                    Placeholder="Digite seu e-mail"
                    Value={email}
                    OnChangeText={text=>setEmail(text)}
                 />

                <SignInput 
                    IconSvg={LockIcon}
                    Placeholder="Digite sua senha"
                    Value={password}
                    OnChangeText={text=>setPassword(text)}
                    IsPassword={true}
                 />

                <CustomButton onPress={handleSignUpClick}>
                    <CustomButtonText>Criar Conta</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Entre!</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}