function processPayment(): void {
    const cardNumber: string = (document.getElementById('card-number') as HTMLInputElement).value;
    const expiryDate: string = (document.getElementById('expiry-date') as HTMLInputElement).value;
    const cvv: string = (document.getElementById('cvv') as HTMLInputElement).value;

    // Here, we'll just do a basic check. In real-world scenarios, you'd use a secure payment gateway.
    if (cardNumber && expiryDate && cvv) {
        alert("Payment successful! Thank You for Shopping with us!!");
        // Clear the cart after payment
        localStorage.removeItem('cart');
        window.location.href = 'homepage.html'; // Redirect to the main page or a confirmation page
    } else {
        alert("Payment details invalid");
    }
}