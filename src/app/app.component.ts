import { Component, OnInit } from '@angular/core';
//atraer el modulo de angular para hacer peticiones
import { HttpClient } from '@angular/common/http'

interface Coin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//OnInit ciclo de vida de un componente
export class AppComponent implements OnInit {
  //title = 'api-crypto';
  //va ser una variable donde se guardara
  coins: Coin[] = []
  //Ttulos que que llevara la tabla
  titles: string[] = [
    '#',
    'Coin',
    'Price',
    'Price Change',
    '24 Volume',
  ]
  //es para llamar al metodo http
  constructor(private http: HttpClient) {

  }
  searchText: string = ''
  searchCoin() {
    //poner el texto a minusculas
    //includes: lo que se escriba
    this.coins = this.coins.filter(coin => coin.name.toLowerCase().includes(this.searchText.toLowerCase())
    || coin.symbol.toLowerCase().includes(this.searchText.toLowerCase()))
  }
  ngOnInit(): void {
    //hacer peticion a una api
    // this.http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    // .subscribe(
    //   res =>{ console.log(res)}
    //   ,err=>{console.log(err)}
    // )
    this.http.get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .subscribe(data => {
        console.log(data)
        this.coins = data
      }, error => console.log(error));

  }
}

