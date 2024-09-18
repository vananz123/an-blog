import { Containner } from "../Containner";
import { Separator } from "../ui/separator";

export default function Footer () {
    return (
        <div className='bg-gray-700 mt-5'>
            <Containner>
                <div className="mt-10">
                    <Separator/>
                    <div className="flex justify-between items-center my-10">
                        <p>@ 2024 Anblog. All rights reserved.</p>
                        <div className="flex gap-2">
                            <p>About us</p>
                            <p>Contact</p>
                            <p>RSS</p>
                            <p>Policy</p>
                        </div>
                    </div>
                </div>
            </Containner>
        </div>
    )
}