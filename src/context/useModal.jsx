import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UseModal() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const openModal = ()=> setIsOpen(true);
    const closeModal =()=> {
        navigate('/tasks');
        setIsOpen(false)
    };

    return {isOpen,openModal,closeModal,setIsOpen};
}

export default UseModal;