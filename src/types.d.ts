interface PublicKey {
  e: string // hex
  n: string // hex
}
interface RsaRequest {
  message: string // string in hex
}
interface RsaResponse {
  message: string // hex
}
interface EncryptVerifyRequest extends RsaRequest {
  pubKey: PublicKey
}