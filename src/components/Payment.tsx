import { useEffect, useState } from "react";

function PaymentSummary() {
    const [qty, setQty] = useState(300)
    const [summary, setSummary] = useState([
        {
            name: "Product price",
            value: 15000,
            icon: "",
        }
    ])
    const basePrice = 100;
    useEffect(() => {
        const productPrice = basePrice * qty;
        const tax = (productPrice) * (18 / 100);
        const discount = (productPrice) * (10 / 100);
        setSummary([
            {
                name: "Product price",
                value: productPrice,
                icon: "",
            },
            {
                name: "CGST(18%)",
                value: tax,
                icon: "+",
            },
            {
                name: "SGST(18%)",
                value: tax,
                icon: "+",
            },
            {
                name: "Discount(10%)",
                value: discount,
                icon: "-",
            },
            {
                name: "Total Price",
                value: productPrice + (2 * tax) - discount,
                icon: "",
            },
        ])
    }, [qty])

    return (
        <div className="credit-card w-full sm:w-auto mx-auto rounded-xl bg-white p-6">
            <div>
                <h2 className="text-gray-700 mb-4 font-medium text-xl">
                    Purchase Summary
                </h2>
            </div>
            <div className="text-sm mb-2">Add Credits</div>
            <div className="text-lg rounded-xl font-medium">
                <input
                    type="number"
                    className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                    placeholder="QTY."
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                />
                <div className="flex justify-between text-sm text-primary font-normal mt-2">
                    <button className="hover:bg-primary hover:text-white px-2 py-1 cursor-pointer rounded-sm" onClick={() => setQty(qty + 100)}>+100</button>
                    <button className="hover:bg-primary hover:text-white px-2 py-1 cursor-pointer rounded-sm" onClick={() => setQty(qty + 500)}>+500</button>
                    <button className="hover:bg-primary hover:text-white px-2 py-1 cursor-pointer rounded-sm" onClick={() => setQty(qty + 700)}>+700</button>
                    <button className="hover:bg-primary hover:text-white px-2 py-1 cursor-pointer rounded-sm" onClick={() => setQty(qty + 1000)}>+1000</button>
                </div>
            </div>
            <div className="mt-6">
                {
                    summary.map((item) => (
                        <div key={item.name} className="flex justify-between text-gray-700 last:text-gray-900 last:text-lg text-md last:font-semibold py-4 border-b border-gray-100 last:border-b-0">
                            <div>{item.name}</div>
                            <div>{item.icon}&#8377; {item.value} /-</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PaymentSummary