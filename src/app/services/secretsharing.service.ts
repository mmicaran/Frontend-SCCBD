import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bc from 'bigint-conversion'

@Injectable({
  providedIn: 'root'
})
export class SecretsharingService {

  sharesClient!: Object

  URI = "http://localhost:4000"

  constructor(private http: HttpClient) { }

  getSecretSharing(url: string) {
    //Se recoge la parte del cliente de la clave del secret sharing
    return this.http.get(url)
  }

  combSecretSharingServer(url:string, sharesClient: object) {
    //Envia la parte del cliente de la clave del secret sharing
    console.log(sharesClient)
    const body = JSON.stringify(sharesClient)
    return this.http.post(url, {
      message: sharesClient //"8027ea2c46b31b88040588abd99fd11d8feb6c18a8ffdc5edbc7035844703b5399e7464b37dec0a247cb2696ebacf221b13f1b97c5df1d786cd7792963283b86c81957deaa7afcb98023aa6fdcae330dbaa"
    })
  }
}
