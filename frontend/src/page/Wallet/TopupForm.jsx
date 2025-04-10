// import React from 'react';
// import {Input} from "@/components/ui/input.jsx";
// import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
// import { Dot } from "lucide-react";
// import {Label} from "@/components/ui/label.jsx"; // optional — if you want a custom icon
//
//
// const TopupForm = () => {
//     const [amount, setAmount] = React.useState('')
//     const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY")
//
//
//     const handlePaymentMethodChange = (value) => {
//         setPaymentMethod(value)
//     }
//     const handleChange = (e) => {
//         setAmount(e.target.value)
//     }
//     return (
//         <div className="pt-10 space-y-5">
//             <div >
//                 <h1 className='pb-1'> Enter Amount</h1>
//                 <Input onChange={handleChange} value={amount} className="py-7 text-lg" placeholder = "₹10000" />
//             </div>
//             <div>
//                 <h1 className="pb-1"> Select Payment Method</h1>
//                 <RadioGroup onValueChange={(value) => handlePaymentMethodChange(value)} className="flex" defaultValue="RAZORPAY">
//                     <div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
//                         <RadioGroupItem icon={Dot} className="h9 w-9" value="RAZORPAY" id="r1"/>
//                         <Label htmlFor="r1">
//                             <div className="bg-white rounded-md px-5 py-2 w-32">
//                                 <img src ="src/assets/razorpay.png" alt=""/>
//                             </div>
//                         </Label>
//                     </div>
//                     <div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
//                         <RadioGroupItem icon={Dot} className="h9 w-9" value="STRIPE" id="r1"/>
//                         <Label htmlFor="r1">
//                             <div className="bg-white rounded-md px-5 py-2 w-32">
//                                 <img src ="src/assets/stripe.png" alt=""/>
//                             </div>
//                         </Label>
//                     </div>
//                 </RadioGroup>
//             </div>
//         </div>
//     );
// };
//
// export default TopupForm;

import React from 'react';
import { Input } from "@/components/ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { Label } from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";

const TopupForm = () => {
    const [amount, setAmount] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY");

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    };

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = () => {
        console.log(amount, paymentMethod)
    };

    return (
        <div className="pt-10 space-y-5">
            <div>
                <h1 className='pb-1'>Enter Amount</h1>
                <Input onChange={handleChange} value={amount} className="py-7 text-lg" placeholder="₹10000" />
            </div>
            <div>
                <h1 className="pb-1">Select Payment Method</h1>
                <RadioGroup onValueChange={handlePaymentMethodChange} className="flex gap-4" defaultValue="RAZORPAY">
                    <Label htmlFor="razorpay" className="flex items-center space-x-4 border p-3 px-5 rounded-md cursor-pointer">
                        <RadioGroupItem value="RAZORPAY" id="razorpay" />
                        <div className="w-32 h-10 flex items-center justify-center bg-white rounded-md">
                            <img src="src/assets/razorpay.png" alt="Razorpay" className="h-full object-contain" />
                        </div>
                    </Label>

                    <Label htmlFor="stripe" className="flex items-center space-x-4 border p-3 px-5 rounded-md cursor-pointer">
                        <RadioGroupItem value="STRIPE" id="stripe" />
                        <div className="w-32 h-10 flex items-center justify-center bg-white rounded-md">
                            <img src="src/assets/stripe.png" alt="Stripe" className="h-full object-contain" />
                        </div>
                    </Label>
                </RadioGroup>
            </div>
            <Button onClick= {handleSubmit} className="w-full py-7"> Submit</Button>
        </div>
    );
};
export default TopupForm;