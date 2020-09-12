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
import BarberModal from '../../Components/BarberModal';

import Api from '../../Api';

import UnfavoriteIcon from '../../Assets/favorite.svg';
import FavoriteIcon from '../../Assets/favorite_full.svg';

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
    const [favorite, setFavorite] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getBarberInfo = async () => {
        setLoading(true);
        let json = await Api.getBarber(userInfo.id);
        if(json.error == ''){
            setUserInfo(json.data);
            setFavorite(json.data.favorite)
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

    const handleFavoriteClick = () => {
        setFavorite(!favorite);
    }

    const handleServiceClick = (key) => {
        setSelectedService(key);
        setShowModal(true);
    }

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
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
                    :
                    <FakeSwiper>

                    </FakeSwiper>
                }
                <Body>
                    <UserInfoArea>
                        <UserAvatar source={{uri:userInfo.avatar}} />
                            <UserInfo>
                                <UserInfoName>{userInfo.name}</UserInfoName>
                                <Rating starts={userInfo.stars} showRating={true} />
                            </UserInfo>
                            <UserFavButton onPress={handleFavoriteClick}>
                                {favorite ? 
                                <FavoriteIcon width="32" height="32" fill="#FF0000" />
                                :
                                <UnfavoriteIcon width="32" height="32" fill="#FF0000" />
                                }
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
                                        <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                                    </ServiceInfo>
                                    <ScheduleButton onPress={() => handleServiceClick(key)}> 
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

                <BarberModal
                    show={showModal}
                    setShow={setShowModal}
                    barber={userInfo}
                    service={selectedService}
                />
        </Container>
    );
}