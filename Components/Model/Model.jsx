import React, { useState, useContext } from "react";
import Image from "next/image";

// INTERNAL IMPORTS
import Style from "./Model.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Loader } from "../../Components/index";


const Model = ({
    openBox, 
    title, 
    head, 
    info, 
    smallInfo, 
    image, 
    functionName,
    address
}) => {
    //USESTATE
    const [name, setName] = useState("");
    const [accountAddress, setAccountAddress] = useState("");

    //USECONTEXT
    const {loading} = useContext(ChatAppContext);

    return (
        <div className={Style.Model}>
            <div className={Style.Model_box}>
                <div className={Style.Model_box_left}>
                    <Image src={image} alt="budy" width={700} height={700} />
                </div>
                <div className={Style.Model_box_right}>
                    <h1>{title} <span>{head}</span> </h1>
                    <p>{info}</p>
                    <small>{smallInfo}</small>

                    {loading == true ? (<Loader /> ): 
                    (
                        <div className={Style.Model_box_right_name}>
                            <div className={Style.Model_box_right_name_info}>
                                <Image src={images.username} alt="user" width={30} height={30} />
                                <input 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }} 
                                />
                            </div>
                   
                            <div className={Style.Model_box_right_name_info}>
                                <Image src={images.account} alt="user" width={30} height={30} />
                                <input 
                                    type="text" 
                                    placeholder={address || "Enter address.."}
                                    onChange={(e) => setAccountAddress(e.target.value)} 
                                />
                            </div>

                            <div className={Style.Model_box_right_name_btn}>
                                <button onClick={() => {
                                    functionName({accountName: name, accountAddress: accountAddress});
                                    }}>
                                    {""}
                                    <Image src={images.send} alt="Send" width={30} height={30} />
                                    {""}
                                    Submit
                                </button>

                                <button onClick={() => openBox(false)}>
                                    {""}
                                    <Image src={images.close} alt="Close" width={30} height={30} />
                                    {""}
                                    Cancle
                                </button>
                            </div>
                        </div> 
                    )}
                    
                </div>
            </div>
        </div>
    );
}

export default Model;