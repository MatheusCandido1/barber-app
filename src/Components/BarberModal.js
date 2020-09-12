import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import ExpandIcon from '../Assets/expand.svg';

import NavPrevIcon from '../Assets/nav_prev.svg';
import NavNextIcon from '../Assets/nav_next.svg';

import Api from '../Api';

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0,0,0, 0.5);
    justify-content: flex-end;
`;

const ModalBody = styled.View`
    background-color: #83D6E3;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height: 300px;
    padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`

const ModalCard = styled.View` 
    background-color: #FFFFFF;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 10px;
`

const BarberInfo = styled.View`  
    flex-direction: row;
    align-items: center;
`

const BarberAvatar = styled.Image` 
    width: 55px;
    height: 55px;
    border-radius: 20px;
    margin-right: 15px;
`
const BarberName = styled.Text`   
    font-size: 18px;
    font-weight: bold;
    color: #000000;
`

const ServiceInfo = styled.View`  
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const ServiceText = styled.Text` 
    font-size: 16px;
    font-weight: bold;
    color: #000000;
`

const ScheduleButton = styled.TouchableOpacity`
    background-color: #268596;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`

const ScheduleButtonText = styled.Text`
    color: #FFFFFF;
    font-size: 17px;
    font-weight: bold;
`

const ScheduleInfo = styled.View`
    flex-direction: row;
`

const SchedulePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`

const ScheduleNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
`

const ScheduleTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`

const ScheduleTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000000;
`

const DateList = styled.ScrollView`
`

const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: center;
`

const DateItemWeekDay = styled.Text`
    font-size: 16px;
    font-weight: bold;
`

const DateItemNumber = styled.Text`
    font-size: 16px;
    font-weight: bold;
`

const TimeList = styled.ScrollView`
`

const TimeItem = styled.TouchableOpacity`
    width: 75px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`

const TimeItemText = styled.Text`
    font-size: 16px;
    font-weight: bold;
`

const Scheduled = styled.View`
    background-color: #C70039 ;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 10px;

`
const ScheduledInfo = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
`


const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'November',
    'Dezembro'
];

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];

export default ({ show, setShow, barber, service }) => {
    const navigation = useNavigation();

    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);

    const [calendar, setCalendar] = useState([]);
    const [hour, setHour] = useState([]);

    useEffect(() =>{
        if(selectedDay > 0 && barber.available) {
            let d = new Date(selectedYear, selectedMonth, selectedDay);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();

            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;

            let selectedDate = `${year}-${month}-${day}`;

            let availability = barber.available.filter(e=>e.date === selectedDate);

            if(availability.length > 0) {
                setHour(availability[0].hours);
            }
        }
        setSelectedHour(null);
    }, [barber, selectedDay])

    useEffect(() => {
        if(barber.available){
        let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
        let newCalendar = [];

        for(let i = 1; i < daysInMonth; i++){
            let d = new Date(selectedYear, selectedMonth, i);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();

            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;

            let selectedDate = `${year}-${month}-${day}`;

            let availability = barber.available.filter(e=>e.date === selectedDate);

            newCalendar.push({
                status: availability.length > 0 ? true : false,
                weekday: days[ d.getDay() ] ,
                number: i,
            });
        }

        setCalendar(newCalendar);
        setSelectedDay(0);
        setHour([]);
        setSelectedHour(0);
        }
    }, [barber, selectedMonth, selectedYear])

    const getTodayFullDate = () => {
        let today = new Date();
        setSelectedDay(today.getDate());
        setSelectedMonth(today.getMonth());
        setSelectedYear(today.getFullYear());
    }

    useEffect(() => {
        getTodayFullDate();
    }, []);

    const handleCloseButton = () => {
        setShow(false);
    }

    const handleNextClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth( mountDate.getMonth() + 1);
        setSelectedDay(0);
        setSelectedMonth(mountDate.getMonth());
        setSelectedYear(mountDate.getFullYear());
    }

    const handlePrevClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth( mountDate.getMonth() - 1);
        setSelectedDay(0);
        setSelectedMonth(mountDate.getMonth());
        setSelectedYear(mountDate.getFullYear());
    }

    const handleScheduleClick = async () => {
        if( barber.id && service != null && selectedYear > 0 && selectedMonth > 0 && selectedDay > 0 && selectedHour != null) {
           /* let response = await Api.setAppoitment(
                user.id,
                service,
                selectedYear,
                selectedMonth,
                selectedDay,
                selectedHour
            );
            if(response.error == '') {
                setShow(false);
                navigation.navigate('Appointments');
            } else {
                alert(res.error);
            } */
                setShow(false);
                navigation.navigate('Appointments');
        } else {
            alert("Preencha todos os dados");
        }
    }

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                        <ExpandIcon width="40" height="40" fill="#000000" />
                    </CloseButton>

                    <ModalCard>
                        <BarberInfo>
                            <BarberAvatar source={{uri: barber.avatar}} />
                            <BarberName>{barber.name}</BarberName>
                        </BarberInfo>
                    </ModalCard>
                    {service != null &&
                    <ModalCard>
                        <ServiceInfo>
                            <ServiceText>{barber.services[service].name}</ServiceText>
                            <ServiceText>R$ {barber.services[service].price.toFixed(2)}</ServiceText>
                        </ServiceInfo>
                    </ModalCard>
                    }

                    <ModalCard>
                        <ScheduleInfo>
                            <SchedulePrevArea onPress={handlePrevClick}>
                                <NavPrevIcon width="35" height="35" fill="#000000" />
                            </SchedulePrevArea> 
                            <ScheduleTitleArea>
                                <ScheduleTitle>{months[selectedMonth]} {selectedYear}</ScheduleTitle>
                            </ScheduleTitleArea>
                            <ScheduleNextArea onPress={handleNextClick}>
                                <NavNextIcon width="35" height="35" fill="#000000" />
                            </ScheduleNextArea> 
                        </ScheduleInfo>
                        <DateList 
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {calendar.map((item, key) => (
                                <DateItem 
                                    key={key} 
                                    onPress={()=>item.status ? setSelectedDay(item.number) : null}
                                    style={{
                                        opacity: item.status ? 1 : 0.5,
                                        backgroundColor: item.number === selectedDay ? '#4EADBE' : '#FFFFFF'
                                    }}
                                >
                                    <DateItemWeekDay style={{color:item.number === selectedDay? '#FFFFFF' : '#000000'}}>{item.weekday}</DateItemWeekDay>
                                    <DateItemNumber style={{color:item.number === selectedDay? '#FFFFFF' : '#000000'}}>{item.number}</DateItemNumber>
                                </DateItem>
                            ))}
                        </DateList>
                    </ModalCard>

                    {selectedDay > 0 && hour.length > 0 &&
                         <ModalCard>
                            <TimeList 
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {hour.map((item, key) => (
                                    <TimeItem
                                        key={key}
                                        onPress={() => setSelectedHour(item)}
                                        style={{
                                            backgroundColor: item === selectedHour ? '#4EADBE' : '#FFFFFF'
                                        }}
                                    >
                                        <TimeItemText style={{color:item === selectedHour ? '#FFFFFF' : '#000000'}}>{item}</TimeItemText>
                                    </TimeItem>
                                ))}
                            </TimeList>
                         </ModalCard>
                    } 
                   

                        <ScheduleButton onPress={handleScheduleClick}>
                <ScheduleButtonText>Finalizar Agendamento</ScheduleButtonText>
                        </ScheduleButton>
                </ModalBody>
            </ModalArea>
        </Modal>
    )
}