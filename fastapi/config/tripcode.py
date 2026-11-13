import hashlib, base64

def generate_tripcode(secret: str, salt_key: str = "fglab_salt") -> str:   
    encoded_secret = secret.encode("utf-8")
    encoded_salt = salt_key.encode("utf-8")
    
    # Hash determinista (usando SHA-256 con salt fijo para evitar rainbow tables triviales)
    digest = hashlib.sha256(encoded_salt + encoded_secret).digest()
    
    # Codificar en Base64 estándar y reemplazar caracteres no alfanuméricos
    b64_trip = base64.b64encode(digest).decode("utf-8")
    clean_trip = b64_trip.replace("+", ".").replace("/", ".")
    
    # Devolver los primeros 30 caracteres (formato estándar ◆XXXXXXXXXX)
    return clean_trip[:30]


def parse_userdata(raw_name: str, explicit_password: str) -> tuple[str, str]:
    clean_name = raw_name.strip()
    trip = generate_tripcode(explicit_password)
    
    return clean_name, trip
