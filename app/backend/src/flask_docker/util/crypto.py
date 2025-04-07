import os
import ecdsa

def generate_private_key():
    return os.urandom(32).hex()

def generate_public_key(private_key):
    private_key_bytes = bytes.fromhex(private_key)
    sk = ecdsa.SigningKey.from_string(private_key_bytes, curve=ecdsa.SECP256k1)
    vk = sk.get_verifying_key()
    public_key_bytes = vk.to_string()

    x = public_key_bytes[:32]
    y = public_key_bytes[32:]
    if int.from_bytes(y, 'big') % 2 == 0:
        prefix = b'\x02'
    else:
        prefix = b'\x03'
    compressed_public_key = prefix + x
    return compressed_public_key.hex()