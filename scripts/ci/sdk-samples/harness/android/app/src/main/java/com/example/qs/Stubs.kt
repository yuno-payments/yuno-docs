package com.example.qs

// Merchant-side helpers the quickstart assumes exist (backend calls).
// Snippets are compiled against these; they are not part of the docs.
data class CheckoutSession(val id: String)
suspend fun createCheckoutSession(): CheckoutSession = CheckoutSession("session")
suspend fun createPayment(oneTimeToken: String, checkoutSession: String) {}
