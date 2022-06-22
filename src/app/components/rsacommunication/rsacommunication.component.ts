import { Component, OnInit } from '@angular/core';
import { RsaService } from '../../services/rsa.service'
import * as bc from 'bigint-conversion'
import * as bcu from 'bigint-crypto-utils'
import * as rsa from '../../modulos/rsa'


@Component({
  selector: 'app-rsacommunication',
  templateUrl: './rsacommunication.component.html',
  styleUrls: ['./rsacommunication.component.css']
})

export class RSAcommunicationComponent implements OnInit {

  constructor(private rsaService: RsaService) {
  }

  async ngOnInit(): Promise<void> {
  }

  //Encriptar mensaje
  async encrypt(mensaje: HTMLTextAreaElement) {
    const mensajeBigint = bc.textToBigint(mensaje.value)
    const cifrado = this.rsaService.serverPublicKey.encrypt(mensajeBigint)
    //console.log(bc.bigintToHex(cifrado));

    const plaintextHex = ((await this.rsaService.decrypt(bc.bigintToHex(cifrado))) as RsaResponse).message;
    
    if(mensajeBigint == bc.hexToBigint(plaintextHex)){
      console.log("Desencriptado")
    }else{
      console.log("No desencriptado")
    }
  }

  async sign(mensaje: HTMLTextAreaElement) {
    const mensajeBigint = bc.textToBigint(mensaje.value)
    //console.log(bc.bigintToHex(mensajeBigint));   
    const signed = this.rsaService.privateKey.sign(mensajeBigint);
    //console.log("Mensaje firmado: " + bc.bigintToHex(signed));
    // const verificado = this.rsaService.publicKey.verify(signed);
    // //console.log(this.rsaService.publicKey);
    // if(verificado == mensajeBigint){
    //   console.log("Verificado")
    // }else{
    //   console.log("No verificado")
    // }
    (await this.rsaService.verify(bc.bigintToHex(signed), this.rsaService.publicKey)).subscribe((res: any) => {
      if(bc.hexToBigint(res.message) == mensajeBigint){
        console.log("Verificado")
      }else{
        console.log("No verificado")
      }
    })
  }


  //Firma ciega
  async firmaCiega(mensaje: HTMLTextAreaElement) {
    //Cegamos el mensaje
    const mensajeBigint = bc.textToBigint(mensaje.value) 
    var n = this.rsaService.publicKey.n
    var rPrin = bcu.randBetween(n)
    const msgCegado = this.rsaService.serverPublicKey.blind(mensajeBigint, rPrin);
    //console.log(n)

    if(msgCegado == undefined){
      console.log("Error")
    }else{
      (await this.rsaService.sign(bc.bigintToHex(msgCegado))).subscribe((res: any) => {
        var msgFirmado = bc.hexToBigint(res.message)
        console.log(bc.hexToBigint(res.message))
        let msgUnblind = this.rsaService.serverPublicKey.unblind(msgFirmado,rPrin);

        let checkFirma = this.rsaService.serverPublicKey.verify(msgUnblind);

        if(checkFirma == mensajeBigint){
          console.log("Firmado OK")
        }else{
          console.log("Firmado KO")
        }
        
      })
    }
  }
}