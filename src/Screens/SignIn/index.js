import React, { useState } from 'react';
import { Text } from 'react-native';

import SignInput from '../../Components/SignInput';

import EmailIcon from '../../Assets/email.svg';
import LockIcon from '../../Assets/lock.svg';

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
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

                <CustomButton>
                    <CustomButtonText>Entrar</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se!</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}