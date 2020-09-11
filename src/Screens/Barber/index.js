import React, { useState, useEffect } from 'react';
import { 
    Container,
    Scroller,
    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,
    Body,
    UserInfoArea,
    ServiceArea,
    TestimonialArea,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,
    BackButton,
    LoadingIcon,
    ServicesTitle,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ScheduleButton,
    ScheduleButtonText
 } from './styles';
 import Swiper from 'react-native-swiper';

import { useNavigation, useRoute} from '@react-navigation/native';

import Rating from '../../Components/Rating';

import Api from '../../Api';

import FavoriteIcon from '../../Assets/favorite.svg';
import BackIcon from '../../Assets/back.svg';
import NavPrevIcon from '../../Assets/nav_prev.svg';
import NavNextIcon from '../../Assets/nav_next.svg';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });


    const [loading, setLoading] = useState(false);

    const getBarberInfo = async () => {
        setLoading(true);
        let json = await Api.getBarber(userInfo.id);
        if(json.error == ''){
            setUserInfo(json.data);
            console.log(json.data);
        } else {
            alert('Erro: '+json.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        
        getBarberInfo();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <Scroller>
                {userInfo.photos && 
                    <Swiper
                        style={{height:240}}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                        autoplay={true}
                    >
                        {userInfo.photos.map((item, key) => (
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}} resizeMode="cover"/>
                            </SwipeItem>
                        ))}
                    </Swiper>  
                }
                <Body>
                    <UserInfoArea>
                        <UserAvatar source={{uri:userInfo.avatar}} />
                            <UserInfo>
                                <UserInfoName>{userInfo.name}</UserInfoName>
                                <Rating starts={userInfo.stars} showRating={true} />
                            </UserInfo>
                            <UserFavButton>
                                <FavoriteIcon width="24" height="24" fill="#FF0000" />
                            </UserFavButton>
                    </UserInfoArea>
                        {loading && 
                            <LoadingIcon size="large" color="#000000"/>
                        }

                        {userInfo.services && 
                    <ServiceArea>
                            <ServicesTitle>Lista de Serviços</ServicesTitle>
                            {userInfo.services.map((item, key) => (
                                <ServiceItem key={key}>
                                    <ServiceInfo>
                                        <ServiceName>{item.name}</ServiceName>
                                        <ServicePrice>R$ {item.price}</ServicePrice>
                                    </ServiceInfo>
                                    <ScheduleButton>
                                        <ScheduleButtonText>Agendar</ScheduleButtonText>
                                    </ScheduleButton>
                                </ServiceItem>
                            ))}
                    </ServiceArea>
}
                    {userInfo.testimonials &&
                    <TestimonialArea>
                        <Swiper
                            style={{height: 110}}
                            showsPagination={false}
                            showsButtons={true}
                            prevButton={<NavPrevIcon height="35" height="35" fill="#000000" />}
                            nextButton={<NavNextIcon height="35" height="35" fill="#000000" />}
                        >
                            {userInfo.testimonials.map((item, key) => (
                                <TestimonialItem key={key}>
                                    <TestimonialInfo>
                                        <TestimonialName>{item.name}</TestimonialName>
                                        <Rating starts={item.rate} showRating={false} />
                                    </TestimonialInfo>
                                    <TestimonialBody>
                                        {item.body}
                                    </TestimonialBody>
                                </TestimonialItem>
                            ))}

                        </Swiper>
                    </TestimonialArea>
                    }
                </Body>
            </Scroller>
            
        
        <BackButton onPress={handleBackButton}>
            <BackIcon width="44" height="44" fill="#FFFFFF" />
        </BackButton>
        </Container>
    );
}