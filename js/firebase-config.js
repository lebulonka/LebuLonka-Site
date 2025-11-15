// ===== Firebase Configuration =====
const firebaseConfig = {
    apiKey: "AIzaSyATjH7v7GuuHGR5ynALekpJmuud0DCImSU",
    authDomain: "lebulonka.firebaseapp.com",
    projectId: "lebulonka",
    storageBucket: "lebulonka.firebasestorage.app",
    messagingSenderId: "844692464290",
    appId: "1:844692464290:web:863b8e74ea805989feadfb"
};

// Firebase REST API endpoint for Firestore
const FIREBASE_REST_API = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

console.log('firebase-config.js loaded');
console.log('Firebase Project ID:', firebaseConfig.projectId);

// Function to save order using Firebase REST API (works without SDK)
async function saveOrderToFirestoreREST(orderData) {
    try {
        const timestamp = new Date().toISOString();
        
        // Prepare data in Firestore format
        const firestoreData = {
            fields: {
                id: { integerValue: orderData.id },
                timestamp: { stringValue: orderData.timestamp },
                customer: {
                    mapValue: {
                        fields: {
                            name: { stringValue: orderData.customer.name },
                            email: { stringValue: orderData.customer.email },
                            phone: { stringValue: orderData.customer.phone },
                            address: { stringValue: orderData.customer.address },
                            notes: { stringValue: orderData.customer.notes || '' }
                        }
                    }
                },
                items: {
                    arrayValue: {
                        values: orderData.items.map(item => ({
                            mapValue: {
                                fields: {
                                    id: { integerValue: item.id },
                                    name: { stringValue: item.name },
                                    price: { doubleValue: item.price },
                                    quantity: { integerValue: item.quantity }
                                }
                            }
                        }))
                    }
                },
                subtotal: { doubleValue: orderData.subtotal },
                discount: { doubleValue: orderData.discount },
                deliveryCharges: { doubleValue: orderData.deliveryCharges },
                total: { doubleValue: orderData.total },
                paymentMethod: { stringValue: orderData.paymentMethod },
                couponApplied: { stringValue: orderData.couponApplied || 'none' },
                status: { stringValue: orderData.status },
                createdAt: { timestampValue: timestamp }
            }
        };

        // Send to Firebase REST API
        const response = await fetch(
            `${FIREBASE_REST_API}/orders?key=${firebaseConfig.apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(firestoreData)
            }
        );

        if (response.ok) {
            const result = await response.json();
            console.log('✓ Order saved to Firebase with ID:', result.name);
            return result.name;
        } else {
            const error = await response.json();
            console.error('Firebase REST API error:', error);
            throw new Error(error.error?.message || 'Failed to save to Firebase');
        }
    } catch (error) {
        console.error('Error saving to Firebase:', error.message);
        throw error;
    }
}

// Function to add order to Firestore
async function addOrderToFirestore(orderData) {
    try {
        const docRef = await db.collection('orders').add({
            ...orderData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Order saved with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding order:', error);
    }
}

// Function to get orders from Firestore
async function getOrdersFromFirestore() {
    try {
        const querySnapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
        const orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return orders;
    } catch (error) {
        console.error('Error getting orders:', error);
    }
}

// Function to update order status
async function updateOrderStatus(orderId, status) {
    try {
        await db.collection('orders').doc(orderId).update({
            status: status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Order status updated:', orderId);
    } catch (error) {
        console.error('Error updating order:', error);
    }
}


// ===== Firebase Configuration Instructions =====
/*
To set up Firebase for this project:

1. Go to https://console.firebase.google.com/
2. Create a new project called "Lebu Lonka"
3. Enable Firestore Database
4. Go to Project Settings and copy your Firebase config
5. Replace the firebaseConfig values above with your actual credentials
6. Uncomment the Firebase initialization code above
7. Create a Firestore collection called "orders" with the following structure:
   - customer (object): {name, email, phone, address, notes}
   - items (array): [{id, name, price, quantity}]
   - total (number)
   - status (string): "পেন্ডিং" | "প্রসেসিং" | "ডেলিভারি" | "সম্পন্ন"
   - createdAt (timestamp)

8. (Optional) Set up authentication for admin panel to manage orders
*/
