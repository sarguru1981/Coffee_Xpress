# Payment Screen

This React Native component represents a screen where users can select their preferred payment method and proceed with the payment. It includes various payment options and a button to initiate the payment process.

## Features

- **Payment Options**: Users can choose from a variety of payment methods, including credit card, wallet, Google Pay, Apple Pay, and Amazon Pay.
- **Credit Card Display**: Credit card details are displayed in a visually appealing manner, including the card number, cardholder name, and expiry date.
- **Animation**: The screen includes a pop-up animation to indicate the success of the payment process.

## Components

- **PaymentScreen**: This component renders the main payment screen layout, including the header, payment options, and footer.
- **PaymentMethod**: This component represents individual payment methods displayed on the screen.
- **PopUpAnimation**: This component displays the pop-up animation when the payment is successful.

## Usage

1. **PaymentScreen**: Import and use this component to render the payment screen in your React Native application. Pass the necessary props such as navigation and route.

2. **PaymentMethod**: Use this component to display individual payment methods on the payment screen. Pass the payment mode, name, icon, and other relevant props.

3. **PopUpAnimation**: Import and use this component to display the pop-up animation when the payment is successful. Pass the source of the animation as a prop.

## Installation

To use these components in your React Native application, follow these steps:

1. Copy the code for each component into the respective files in your project directory.

2. Import the necessary components into your screens or other components where needed.

3. Customize the styles and functionalities as per your application's requirements.

## Dependencies

- **React Native**: This component is built using React Native framework.
- **Lottie**: The PopUpAnimation component utilizes Lottie for displaying animations.
