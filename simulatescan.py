import firebase_admin
from firebase_admin import credentials, db
import random
import time

# Firebase Admin SDK setup
cred = credentials.Certificate('fir-1-7332d-firebase-adminsdk-rp01b-85e406a97c.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://fir-1-7332d-default-rtdb.firebaseio.com/'
})

# Product database simulation
products = {
    "d9d83f2": {"productName": "Sugar", "price": 50},
    "e3862cda": {"productName": "County", "price": 300},
    "6ea973f": {"productName": "Bananas", "price": -67},
    "123abc": {"productName": "Apples", "price": -45}
}

# Upload product details to Firebase cart with RFID tag as key
def upload_product_to_cart(rfid_tag):
    product = products.get(rfid_tag)
    if product:
        ref = db.reference(f'cart/{rfid_tag}')
        ref.set({
            'productName': product['productName'],
            'price': product['price']
        })
        print(f"Added {product['productName']} with price {product['price']} to the cart under tag {rfid_tag}.")
    else:
        print(f"RFID Tag {rfid_tag} not found in the product database.")

# Simulate RFID scanning
def simulate_rfid_scanning():
    while True:
        simulated_tag = random.choice(list(products.keys()))
        upload_product_to_cart(simulated_tag)
        time.sleep(5)  # Wait 5 seconds before scanning the next item

# Start simulation
simulate_rfid_scanning()
