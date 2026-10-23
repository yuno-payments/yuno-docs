import UIKit

// Merchant-side helpers the quickstart assumes exist (backend calls).
// Snippets are type-checked against these; they are not part of the docs.
extension PaymentViewController {
    func createPaymentOnBackend(token: String, completion: @escaping (Result<Void, Error>) -> Void) {
        completion(.success(()))
    }
}
