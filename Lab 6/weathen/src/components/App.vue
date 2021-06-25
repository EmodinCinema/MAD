<template actionBarHidden="true">
    <Page actionBarHidden="true"  class="app">
      <StackLayout>
        <Label class='city'  :text='listOfItems[this.selectedItem]' @tap='city()'/>
        <ScrollView orientation="vertical"> 
           <StackLayout class='forecast' orientation="vertical">
              <Image class='img' :src="imagePath" stretch="none" @tap='check()'/> 
              <label class='text'> Температура: {{weather.fact.temp}}, ощущается: {{weather.fact.feels_like}}</label>
              <label class='text'> Ветер: {{weather.fact.wind_speed}} м/с, Влажность: {{weather.fact.humidity}}%</label>
              <label class='text'> Давление: {{weather.fact.pressure_mm}} мм рт. ст.</label>
           </StackLayout>
        </ScrollView>
      </StackLayout>
    </Page>
</template>

<script >
import { Http } from '@nativescript/core'
import * as ApplicationSettings from "application-settings";
  export default {
    data() {
      return {
        listOfItems: [
          { title: "Ханты-Мансийск",
            toString: () => {
              return 'Ханты-Мансийск';
            },
            latitude: 61.0041700,
            longitude: 69.0019400
          },
          { title: "Омск",
            toString: () => {
              return 'Омск';
            },
            latitude: 54.9924400,
            longitude: 73.3685900
          },
          { title: "Тобольск",
            toString: () => {
              return 'Тобольск';
            },
            latitude: 58.1980700,
            longitude: 68.2545700
          },
          { title: "Усть-Ишим",
            toString: () => {
              return 'Усть-Ишим';
            },
            latitude: 57.6935000,
            longitude: 71.1665000
          },
          { title: "Тевриз",
            toString: () => {
              return 'Тевриз';
            },
            latitude: 57.5090000,
            longitude: 72.4042000
          },
          { title: "Викулово",
            toString: () => {
              return 'Викулово';
            },
            latitude: 56.8166700,
            longitude: 70.6106900
          },
          { title: "Вагай",
            toString: () => {
              return 'Вагай';
            },
            latitude: 57.9356600,
            longitude: 69.0195300
          },
          { title: "Дубровное",
            toString: () => {
              return 'Дубровное';
            },
            latitude: 57.1750000,
            longitude: 66.5816667
          },
          { title: "Кип",
            toString: () => {
              return 'Кип';
            },
            latitude: 57.5458333,
            longitude: 71.8502778
          },
          { title: "Тавинск",
            toString: () => {
              return 'Тавинск';
            },
            latitude: 57.5872222,
            longitude: 71.7202778
          },
        ],
        selectedItem: 0,
        weather: {
          fact: {
            temp : 0,
            feels_like : 0,
            icon : 'name',
            condition : 'condition',
            wind_speed : 0,
            wind_dir : 'wind_dir',
            pressure_mm	: 0,
            }
        },
        imagePath: '',
        cities:['Ханты-Мансийск', 'Омск', 'Тобольск', 'Усть-Ишим', 'Тевриз', 'Викулово', 'Вагай', 'Дубровное', 'Кип', 'Тавинск']
      }
    },
    mounted(){
      if(ApplicationSettings.getString('weather')){
        this.weather.fact=JSON.parse(ApplicationSettings.getString('weather'));
        console.log('Погода загружена');
      }
      if(ApplicationSettings.getString('city')){
        this.selectedItem=JSON.parse(ApplicationSettings.getString('city'));
        console.log('Место загружено');
      }
      else{
        this.city()
      }
      this.imagePath = '~/res/' + String(this.weather.fact.condition) + '.png';
    },
    methods:{
      check(){
        Http.request({
        url: 'https://api.weather.yandex.ru/v2/forecast?limit=1&lat=' +  String(this.listOfItems[this.selectedItem].latitude) + '&lon=' + String(this.listOfItems[this.selectedItem].longitude),
        method: "GET",
        headers: {"X-Yandex-API-Key": "f665eb0c-c7fd-4b78-b474-75ab586a2551"},
        }).then(
        (response) => {
        this.weather = response.content.toJSON();
        this.imagePath = '~/res/' + String(this.weather.fact.condition) + '.png';
        console.log(`Путь изображения: ${this.imagePath}`)
        ApplicationSettings.setString('weather', JSON.stringify(this.weather.fact));        
        console.log(`Сохранено как: ${JSON.stringify(this.weather)}`)
      });
      },
      city(){
        action("Выберите город:", "отмена", this.cities)
        .then(result => {
           this.selectedItem = this.cities.indexOf(result);
           console.log(this.selectedItem )
           ApplicationSettings.setString('city', JSON.stringify(this.selectedItem));        
           this.check();
           
        });
      }
    }
  }
</script>

<style scoped>
.app{
  background-color:slategray;
}
.forecast{
  font-size: 20px;
  margin: 50px 70px;
  padding: 20px;
  padding-bottom: 90px;
  background-color:teal;
  border-radius: 10%;
}
.img{
  margin: 50px 20%;
}
.text{
  margin: 30px auto;
  font-size: 15px;
  color: white;
  text-align: center;
  border-radius: 10%;
  
}
.city{
  font-size: 28px;
  background-color:white;
  text-align: center;
  height: 200px;
  margin: 50px 70px;
  padding: 50px;
  height: 200px;
  border-radius: 10px;
}
</style>
