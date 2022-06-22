import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as rsa from '../modulos/rsa'
import * as bc from 'bigint-conversion'
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RsaService {
  publicKey!: rsa.PublicKey
  privateKey!: rsa.PrivateKey
  serverPublicKey!: rsa.PublicKey
  initialized: Promise<void>

  URI = "http://localhost:4000"

  constructor(private http: HttpClient) {
    this.initialized = new Promise((resolve, reject) => {
      this.init().then(() => {
          resolve()
      }).catch(()=>{
          reject()
      })
    })
  }

  private async init(): Promise<void> {
    const keyPair = await rsa.generateKeys(2049)
    this.privateKey = keyPair.privateKey
    this.publicKey = keyPair.publicKey

    //Obtener las clave publica
    const receivedPublicKey = await firstValueFrom(this.getPublicKey()) as PublicKey
    this.serverPublicKey = jsonToPublicKey(receivedPublicKey)
    
    // console.log(this.publicKey)
    // console.log(this.privateKey)
    // console.log(this.serverPublicKey)
  }

  async mensajeCifrado(mensaje: string, pubKey: rsa.PublicKey) {
    await this.initialized

    console.log("Service")
    console.log(mensaje)
    const path = `${this.URI}/rsa/encrypt`
    return this.http.post(path, {
      message: mensaje,
      pubKey: publicKeyToJson(pubKey)
    } as EncryptVerifyRequest)
  }

  async decrypt(mensaje: string) {
    await this.initialized

    console.log("Desencriptando...")
    return await firstValueFrom(this.http.post(this.URI + '/rsa/decrypt', {
      message: mensaje
    } as RsaRequest))
  }

  async sign(mensaje: string) {
    console.log("Firmando...")
    return this.http.post(this.URI + '/rsa/sign', {
      message: mensaje
    } as RsaRequest)
  }

  async verify(mensaje: string, pubKey: rsa.PublicKey) {
    await this.initialized
    //console.log(publicKeyToJson(pubKey))
    console.log("Verficando...")
    return this.http.post(this.URI + '/rsa/verify', {
      message: mensaje,
      pubKey: publicKeyToJson(pubKey)
    } as EncryptVerifyRequest)
  }
  
  getPublicKey() {
    return this.http.get(this.URI + "/rsa/publickey")
  }
}

function publicKeyToJson(pubKey: rsa.PublicKey): PublicKey {
  return {
    e: bc.bigintToHex(pubKey.e),
    n: bc.bigintToHex(pubKey.n)
  }
}

function jsonToPublicKey(pubKeyJson: PublicKey): rsa.PublicKey {
  return new rsa.PublicKey(bc.hexToBigint(pubKeyJson.e), bc.hexToBigint(pubKeyJson.n))
}
