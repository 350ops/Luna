import { useStripe } from '@stripe/stripe-react-native';
import { View, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import Constants from 'expo-constants';

export default function TestPayment() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const setup = async () => {
        try {
            // Get the host URI (IP address of the machine running the bundler)
            const hostUri = Constants.expoConfig?.hostUri;
            if (!hostUri) {
                Alert.alert("Error", "Could not determine host URI");
                return;
            }

            // Construct the API URL using the host IP
            // expoConfig.hostUri includes the port, e.g., "192.168.1.100:8081"
            // We need to fetch from the server port (usually 8081 for expo router API routes if they are served by the same dev server)
            const apiUrl = `http://${hostUri.split(':')[0]}:8081/api/pay`;

            console.log("Fetching payment intent from:", apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followers: 1000,
                    targetLink: "https://instagram.com/test",
                    platforms: "Instagram"
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error:", errorText);
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }

            const { paymentIntent, publishableKey, error } = await response.json();

            if (error) {
                Alert.alert("API Error", error);
                return;
            }

            if (!paymentIntent) return;

            const { error: stripeError } = await initPaymentSheet({
                merchantDisplayName: 'Reach974',
                paymentIntentClientSecret: paymentIntent,
                returnURL: 'luna://stripe-redirect',
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: 'Jane Doe',
                }
            });
            if (stripeError) {
                console.log('Stripe init error:', stripeError);
            } else {
                console.log('Stripe init success');
            }
        } catch (e: any) {
            console.log('Error fetching pay params', e);
            Alert.alert("Network Error", e.message);
        }
    };

    useEffect(() => {
        setup();
    }, []);

    const checkout = async () => {
        setLoading(true);
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
        setLoading(false);
    };

    return (
        <View className="my-4">
            <Button
                title="Checkout (Test)"
                onPress={checkout}
                disabled={loading}
            />
        </View>
    );
}
