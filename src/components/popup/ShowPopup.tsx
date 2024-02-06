import { useEffect, useState } from 'react'
import SuccessPopup from './SuccessPopup';

function ShowPopup() {
    const [data, setData] = useState(false)
    useEffect(() => {
        const url = window.location.search;
        const purchase = localStorage.getItem('purchase')
        if (url === "?purchase=true" && purchase) {
            setData(true)
            localStorage.removeItem("purchase");
        }
    }, [])
    return (
        <div>
            <SuccessPopup title="Payment Successful" show={data} onSubmit={() => console.log(234234)} onCancel={() => console.log(324234)} />
        </div>
    )
}

export default ShowPopup