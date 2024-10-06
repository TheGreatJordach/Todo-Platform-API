export interface HashAlgorithmInterface {
  hash(data: string | Buffer): Promise<string>;
  compare(data: string, hash: string, encrypted: string): Promise<boolean>;
}
