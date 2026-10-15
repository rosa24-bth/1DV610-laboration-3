# Test Report

## Summary

I tested my application manually through its interface in a web browser. I checked the requirements K1-K9 from the README, including normal use, invalid input and an empty cart.

To repeat the tests, run this command from the application's root directory:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000 in a browser. Reload the page before each test to start with an empty cart and no discount. Use the buttons and fields described in the table below.

Unexpected cart resets while using the Live Server option in Visual Studio Code made the tests harder to complete. I continued testing with the Python server above, where the cart stayed intact. Reloading the page still clears the cart because it is kept in memory.

## Test Results

| Test case                            | Requirement | Input                                                                                                         | Expected outcome                                                                                                                                     | Actual outcome |
| ------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Display products                     | K1          | Open the application.                                                                                         | Five tea products are shown with names and prices.                                                                                                   | ✅ As expected.   |
| Add the same product twice           | K2          | Click "Lägg i varukorg" for Roibos twice.                                                                     | One cart row shows 2 items and a total of 120.00 kr.                                                                                                 | ✅ As expected.   |
| Change quantity and remove a product | K3          | Add Rooibos once. Click +, then −, then "Ta bort".                                                            | The quantity changes to 2, then 1. The minus button is disabled at 1. Removing the product leaves an empty cart with a total of 0.00 kr.             | ✅ As expected.   |
| Show the price breakdown             | K4          | Add Rooibos twice and apply a 10% discount.                                                                   | Subtotal: 120.00 kr. Discount: 12.00 kr. Total: 108.00 kr.                                                                                           | ✅ As expected.   |
| Apply valid discounts                | K5          | Add Rooibos once. Apply 0%, 100% and 10% in turn.                                                             | The total changes to 60.00 kr, 0.00 kr and 54.00 kr.                                                                                                 | ✅ As expected.   |
| Reject invalid discounts             | K5          | Add Rooibos once and apply 10%. Then try −1, 101 and an empty discount field.                                 | Each invalid value shows an error message. The previous 10% discount and total of 54.00 kr remain.                                                   | ✅ As expected.   |
| Clear the cart                       | K6          | Add products, apply a discount and click "Töm varukorgen".                                                    | All products are removed. The subtotal, discount and total are reset to zero. The discount field shows 0.                                            | ✅ As expected.   |
| Reject empty customer details        | K7          | Add a product. Leave both customer fields empty and click "Skapa beställning".                                | Errors are shown for the missing name and email. No order summary is shown.                                                                          | ✅ As expected.   |
| Reject an invalid email              | K7          | Add a product. Enter a name and an email without a valid format, then click "Skapa beställning".              | An email error is shown. No order summary is shown.                                                                                                  | ✅ As expected.   |
| Reject an empty order                | K8          | Leave the cart empty. Enter a valid name and email, then click "Skapa beställning".                           | A message asks the customer to add a product. No order summary is shown.                                                                             | ✅ As expected.   |
| Show a valid order summary           | K9          | Add Rooibos twice and Grönt te once. Apply 10%, enter a valid name and email, then click "Skapa beställning". | The summary shows the entered customer details, 2 Rooibos and 1 Grönt te. The subtotal is 170.00 kr, the discount is 10% and the total is 153.00 kr. | ✅ As expected.   |

## Known Issues in Third-Party Modules

I found none in the name and email validation used by this application.
