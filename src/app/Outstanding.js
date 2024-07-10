import React, { useEffect, useState } from "react";
import style from "./Style.css";
import Image from "next/image";
import { useAccount, useEnsAvatar, useEnsName, useBalance } from "wagmi";

import { ethers } from "ethers";
import CertificationVerify from "../../public/CertificationVerify.json";
const axios = require("axios");
const FormData = require("form-data");

const Outstanding = ({}) => {
  // const mycontract = "0xEb56E5b74e92B3132aC7889a13B0a115DE4F3bc1";
  // const mycontract = "0xD0F186DB1e473dB0EeEf43972B30d23b72b1b83d";
  const mycontract = "0x8C0e83f3C569FD831B1126E1FA92c7a92204155A";

  const { address, isConnected } = useAccount();
  const { data: balance, refetch } = useBalance({ address });

  //Now ether
  const [addressE, setAddressE] = useState(null);
  const [contract, setContract] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successMessage2, setSuccessMessage2] = useState("");
  const [wrongMessage, setwrongMessage] = useState("");
  const [wrongMessage2, setwrongMessage2] = useState("");
  const [wrongMessage3, setwrongMessage3] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [data11, setData11] = useState(5);
  const [dataa3, setDataa3] = useState("");
  const [dataa2, setDataa2] = useState("");
  const [ipfshashData, setIpfshashData] = useState("");
  const [certificateID, setCertificateID] = useState(null);
  const [fileName, setFileName] = useState("");
  const [useEffectCompleted, setUseEffectCompleted] = useState(false);
  const [useEffectCompleted2, setUseEffectCompleted2] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);
  const [qqq, setQqq] = useState("");
  const [balanceError, setBalanceError] = useState(false);
  const [userPersonalError, setuserPersonalError] = useState(false);
  // const [data7, setData7] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [showCertificateForm3, setShowCertificateForm3] = useState(false);
  const [buttonCheckClicked, setButtonCheckClicked] = useState(false);
  const [successMessage33, setSuccessMessage33] = useState(false);
  const [errorForPrivate, setErrorForPrivate] = useState(false);
  const [formdata, setFormdata] = useState({
    // certificateID: "",
    certificateName: "",
    CertificateRecepient: "",
    cgpaObtained: "",
    cgpaMaximum: "",
    institution: "",
    uriData: "",
    certificateVisibility: "",
  });
  const [formdataa, setFormdataa] = useState({
    certificateID: "",
  });
  const [formdataaa, setFormdataaa] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [realtimeBalance, setRealtimeBalance] = useState(null);
  const [realtimeBalanceS, setRealtimeBalanceS] = useState(false);
  console.log("now realtime balance in outstanding.js", realtimeBalance);

  if (isConnected && balance) {
    const { formatted, symbol, ...other } = balance;
  }
  const updateBalance = async () => {
    await refetch();
  };
  console.log("balance after async balance funciton:", balance);

  //generating unique number

  async function generateUniqueNumber(min, max) {
    let randomNumber, checkingNumber;
  
    while (true) {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
      try {
        checkingNumber = await contract?.getCertificateID(randomNumber);
      } catch (error) {
        console.error("Error calling getCertificateID:", error);
        // If there is an error calling getCertificateID, assume the number is unique
        return randomNumber;
      }
  
      console.log("checking......", typeof randomNumber);
  
      if (
        checkingNumber &&
        checkingNumber.length > 0 &&
        checkingNumber[0].toNumber() === randomNumber
      ) {
        console.log("Found: Not a unique number");
      } else {
        console.log("The unique number is:", randomNumber);
        return randomNumber;
      }
    }
  }
  

  useEffect(() => {
    if (address) {
      async function initialize() {
        if (typeof window.ethereum !== "undefined") {
          try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            setAddressE(userAddress);
            console.log("im inside outstanding useeffect");
            const contract = new ethers.Contract(
              mycontract,
              CertificationVerify,
              signer
            );
            setContract(contract);
            console.log("Ethereum provider:", provider);
          } catch (error) {
            console.error("Error initializing:", error);
          }
        }
      }

      initialize();
    }
  }, [address]);

  function toggleFormVisibility() {
    // setFormdata({ certificateVisibility: "" });
    // setUseEffectCompleted(false);
    setBtn1(true);
    setBtn2(false);
    setShowForm(!false);
    setErrorForPrivate(false);
    setShowForm2(false);
    setShow(false);
    setSuccessMessage(false);
    setCertificateDetails(false);
    setwrongMessage(false);
    setBalanceError(false);
    setuserPersonalError(false);
    setLoader(false);
    setLoader2(false);
    setSuccessMessage33(false);
  }
  function toggleFormVisibility2() {
    setFormdataaa({ certificateVisibility: "" });
    setFormdata({ certificateVisibility: "" });
    setErrorForPrivate(false);
    setBtn1(false);
    setSuccessMessage33(false);
    setBtn2(true);
    setShowForm(false);
    setShowForm2(!false);
    if (showForm2) {
      formdata.certificateName = "";
      formdata.CertificateRecepient = "";
      formdata.cgpaObtained = "";
      formdata.cgpaMaximum = "";
      formdata.institution = "";
      setImage(null);
      setFileName("");
    }
    setShow(false);
    setSuccessMessage(false);
    setCertificateDetails(false);
    setwrongMessage(false);
    setBalanceError(false);
    setuserPersonalError(false);
    setLoader(false);
    setLoader2(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "certificateVisibility") {
      updatedValue = value === "true"; // Convert to boolean
    }
    // const isPublic = value === "true";
    setFormdata((data) => ({ ...data, [name]: updatedValue }));
    console.log("Selected formdata for addcertificatee:", formdata);
  }
  function handleSubmit2(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormdataa((data) => ({ ...data, [name]: value }));
  }
  // function handleSubmit3(e) {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setFormdataaa((data) => ({ ...data, [name]: value }));
  //   console.log("state now of visibility", formdataaa);
  // }
  const handleSubmit3 = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "certificateVisibility") {
      updatedValue = value === "true"; // Convert to boolean
    }
    // const isPublic = value === "true";
    setFormdataaa((data) => ({ ...data, [name]: updatedValue }));
    console.log("Selected formdata for addcertificatee:", formdataaa);
  };

  function onChangeFile(e) {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
      if (allowedExtensions.includes(fileExtension)) {
        setImage(file);
        const fileNamee = file.name;
        setFileName(fileNamee);
        console.log("image details:", file);
      } else {
        alert("Please select a valid image file (jpg, jpeg, png, gif).");
        e.target.value = null;
      }
    }
  }

  useEffect(() => {
    setUseEffectCompleted(false);
    if (image && !showForm2) {
      onSubmitImage().then(() => {
        setUseEffectCompleted(true);
        const uniqueNumber = generateUniqueNumber(10000, 99999);
        setData11(uniqueNumber);
        console.log("the unique number is:", uniqueNumber);
      });
    }
  }, [image]);

  // async function onSubmitImage() {
  //   const JWT =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYzAzYmM3My05N2U1LTQyYzMtYWI5Zi05MzYyZTQzZGZmYjQiLCJlbWFpbCI6Im1pdHVuQGRldm9sdmVkYWkuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjY4MTViZTMwZTg4YjMzZWE2ZTFkIiwic2NvcGVkS2V5U2VjcmV0IjoiY2E5YzhhMzg3MTY4Mjg0ZmFmNGI5YmFmNTgxMDgwODMwMzZjMGEwYzc5NWRkYzc0NTg2NWYzMWU3OGI0MzY5NiIsImlhdCI6MTcyMDU5OTA3NH0.-No9UwgmlDz3XwZAq2AFzZdqNOlUP_9-J0QCgtUe6Ek.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYWYyNjJjNS1lZTU2LTQyZGYtODg3MS0zYzYzYTAxYTA0OTMiLCJlbWFpbCI6Im1pdHVuc2hpbDc0N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDEyY2Q4NTFiOWNkYWE0ZDA4MTMiLCJzY29wZWRLZXlTZWNyZXQiOiIzMjNiMGY3NWRjYWJiNmRlYzZlNDFiZDA1M2RkNzI0MTQ0YzUxYzU3MDg2YTVkN2Q1NzcyNGI1Zjc1OGMzNDIyIiwiaWF0IjoxNjk2MzUzMjIxfQ.PDSS6hceiaRiE5Mj5H1goo9Q_e50dxPpUxiDP4SX8bk";
  //   // event.preventDefault();

  //   const formData = new FormData();
  //   // const file = fs.createReadStream(image);
  //   formData.append("file", image);

  //   const pinataMetadata = JSON.stringify({
  //     name: fileName,
  //   });
  //   console.log("PINATA METADATA STRINGIFY:", pinataMetadata);

  //   formData.append("pinataMetadata", pinataMetadata);

  //   const pinataOptions = JSON.stringify({
  //     cidVersion: 0,
  //   });
  //   formData.append("pinataOptions", pinataOptions);

  //   try {
  //     const res = await axios.post(
  //       "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //       formData,
  //       {
  //         maxBodyLength: "Infinity",
  //         headers: {
  //           "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
  //           Authorization: `Bearer ${JWT}`,
  //         },
  //       }
  //     );
  //     console.log("res.data", res.data.IpfsHash);
  //     setIpfshashData(`https://ipfs.io/ipfs/${res.data.IpfsHash}`);
  //     console.log(".......", ipfshashData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const onSubmitImage = async () => {
    const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYzAzYmM3My05N2U1LTQyYzMtYWI5Zi05MzYyZTQzZGZmYjQiLCJlbWFpbCI6Im1pdHVuQGRldm9sdmVkYWkuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjY4MTViZTMwZTg4YjMzZWE2ZTFkIiwic2NvcGVkS2V5U2VjcmV0IjoiY2E5YzhhMzg3MTY4Mjg0ZmFmNGI5YmFmNTgxMDgwODMwMzZjMGEwYzc5NWRkYzc0NTg2NWYzMWU3OGI0MzY5NiIsImlhdCI6MTcyMDU5OTA3NH0.-No9UwgmlDz3XwZAq2AFzZdqNOlUP_9-J0QCgtUe6Ek";
    const formData = new FormData();
  
    formData.append('file', image); // Assuming 'image' is a state variable holding the file object
  
    const pinataMetadata = JSON.stringify({
      name: fileName, // Assuming 'fileName' is a state variable holding the file name
    });
    formData.append('pinataMetadata', pinataMetadata);
  
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);
  
    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log("res.data", res.data.IpfsHash);
      setIpfshashData(`https://ipfs.io/ipfs/${res.data.IpfsHash}`);
      console.log(".......", ipfshashData);
    } catch (error) {
      console.log("Error uploading file to Pinata:", error.response.data);
    }
  }
  
  // async function submittingFormData() {
  //   if (balance.formatted > 0.1) {
  //     try {
  //       try {
  //         setUseEffectCompleted(false);
  //         console.log("Now starting submittingFormData");
  //         console.log("printing ipfs data before", ipfshashData);
  //         // if (image) {
  //         //   await onSubmitImage();
  //         // }
  //         console.log("Now just FInished submittingFormData");

  //         console.log("printing ipfs data after", ipfshashData);

  //         const data2 = formdata.certificateName;
  //         const data3 = formdata.CertificateRecepient;
  //         const data4 = formdata.cgpaObtained;
  //         const data5 = formdata.cgpaMaximum;
  //         const data6 = formdata.institution;
  //         const TrueFalse = formdata.certificateVisibility;
  //         setDataa2(data2);
  //         setDataa3(data3);
  //         // const data7 = formdata.uriData;
  //         console.log("dataaaaa certificateid/data11", data11);
  //         // console.log("dataaaaa uri", typeof data7);
  //         console.log("TypeOf data11", data11);
  //         console.log("TypeOf address", address);
  //         console.log("TypeOf certificatename", data2);
  //         console.log("TypeOf CertificateRecepient", data3);
  //         console.log("TypeOf cgpaObtained", data4);
  //         console.log("TypeOf cgpaMaximum", data5);
  //         console.log("TypeOf institution", data6);
  //         console.log("TypeOf uri", ipfshashData);
  //         console.log("TypeOf isPublic", typeof TrueFalse);
  //         console.log("TypeOf isPublic", TrueFalse);

  //         console.log("data1 is:", data11);
  //         console.log("IPHS is:", ipfshashData);
  //         if (
  //           // data1 === "" ||
  //           !fileName ||
  //           data2 === "" ||
  //           data3 === "" ||
  //           data4 === "" ||
  //           data5 === "" ||
  //           data6 === "" ||
  //           TrueFalse === ""
  //           // data7 === ""
  //         ) {
  //           //setShowForm(true);
  //           setLoader(false);
  //           setLoader2(false);
  //           setwrongMessage2("All fields required.");
  //           //successMessage(false);
  //         } else {
  //           setwrongMessage2("");
  //           setLoader2(true);
  //           setShowForm(false);
  //           if (ipfshashData) {
  //             try {
  //               const valueToSend = ethers.utils.parseUnits("0.1", "ether");
  //               const gasEstimate =
  //                 await contract.estimateGas.addNewCertificates(
  //                   data11,
  //                   address,
  //                   data2,
  //                   data3,
  //                   data5,
  //                   data4,
  //                   data6,
  //                   ipfshashData,
  //                   TrueFalse,
  //                   { value: valueToSend } // Pass the value parameter to the estimation
  //                 );

  //               // Send the transaction with the gas limit and value
  //               const mydeporesult = await contract.addNewCertificates(
  //                 data11,
  //                 address,
  //                 data2,
  //                 data3,
  //                 data5,
  //                 data4,
  //                 data6,
  //                 ipfshashData,
  //                 TrueFalse,
  //                 {
  //                   gasLimit: gasEstimate.add(50000),
  //                   value: valueToSend,
  //                 }
  //               );

  //               setLoader(true);
  //               setLoader2(false);
  //               console.log("Transaction Hash:", mydeporesult.hash);
  //               await mydeporesult.wait();
  //               console.log("Transaction confirmed!");
  //               setImage(null);
  //               setFileName("");
  //               formdata.certificateName = "";
  //               formdata.CertificateRecepient = "";
  //               formdata.cgpaObtained = "";
  //               formdata.cgpaMaximum = "";
  //               formdata.institution = "";
                

  //               setShowForm(false);
  //               setSuccessMessage(
  //                 "Congratulations! Your data has been successfully stored in BLOCKCHAIN."
  //               );
  //               setLoader(false);
  //               console.log(
  //                 "CHeck image here",
  //                 `https://ipfs.io/ipfs/${ipfshashData}`
  //               );
  //               setwrongMessage(false);
  //               setShowForm(false);
  //               setShowForm2(false);
  //               setwrongMessage2(false);
  //               setRealtimeBalanceS(!realtimeBalance);
  //               await updateBalance();
  //             } catch (error) {
  //               setLoader(false);
  //               setLoader2(false);
  //               setuserPersonalError(true);
  //               setwrongMessage(false);
  //               setShowForm(false);
  //               setShowForm2(false);
  //               setwrongMessage2(false);
  //               setImage(null);
  //               setFileName("");
  //               console.error(
  //                 "Error submitting data to the contract:",
  //                 error.message
  //               );
  //               console.log("hwlllo type error", typeof error.message);
  //               console.log("hwlllo type error", typeof error);
  //               console.log("hwlllo type error", error);
  //               console.log(error.message[0]);
  //               console.log(error.message.slice(0, error.message.indexOf("(")));
  //               console.log(error[1]);
  //               console.log(error[2]);
  //             }
  //           } else {
  //             console.log(
  //               "ipfs data not received to submit to contract",
  //               ipfshashData
  //             );
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error submitting data to the contract:", error);
  //       }
  //     } catch (error) {
  //       console.error("Error", error);
  //     }
  //     setFormSubmitted(true);
  //     // onUpdateBalance(balance.formatted);
  //     setRealtimeBalance(balance);
  //     // setRealtimeBalanceS(!realtimeBalance);

  //     ///

  //     //
  //   } else {
  //     setBalanceError(true);
  //     setShowForm(false);
  //     setFormSubmitted(false);
  //   }
  // }
  async function submittingFormData() {
    if (balance.formatted > 0.1) {
      try {
        setUseEffectCompleted(false);
        console.log("Now starting submittingFormData");
        console.log("printing ipfs data before", ipfshashData);
  
        console.log("Now just Finished submittingFormData");
        console.log("printing ipfs data after", ipfshashData);
  
        const data2 = formdata.certificateName;
        const data3 = formdata.CertificateRecepient;
        const data4 = formdata.cgpaObtained;
        const data5 = formdata.cgpaMaximum;
        const data6 = formdata.institution;
        setDataa2(data2);
        setDataa3(data3);
  
        console.log("dataaaaa certificateid/data11", data11);
        console.log("TypeOf data11", data11);
        console.log("TypeOf address", address);
        console.log("TypeOf certificatename", data2);
        console.log("TypeOf CertificateRecepient", data3);
        console.log("TypeOf cgpaObtained", data4);
        console.log("TypeOf cgpaMaximum", data5);
        console.log("TypeOf institution", data6);
        console.log("TypeOf uri", ipfshashData);
  
        console.log("data1 is:", data11);
        console.log("IPHS is:", ipfshashData);
        if (!fileName || data2 === "" || data3 === "" || data4 === "" || data5 === "" || data6 === "") {
          setLoader(false);
          setLoader2(false);
          setwrongMessage2("All fields required.");
        } else {
          setwrongMessage2("");
          setLoader2(true);
          setShowForm(false);
          if (ipfshashData) {
            try {
              const valueToSend = ethers.utils.parseUnits("0.1", "ether");
              const gasEstimate = await contract.estimateGas.addNewCertificates(
                data11,
                data2,
                data3,
                data4,
                data5,
                data6,
                ipfshashData,
                { value: valueToSend } // Pass the value parameter to the estimation
              );
  
              // Send the transaction with the gas limit and value
              const mydeporesult = await contract.addNewCertificates(
                data11,
                data2,
                data3,
                data4,
                data5,
                data6,
                ipfshashData,
                {
                  gasLimit: gasEstimate.add(50000),
                  value: valueToSend,
                }
              );
  
              setLoader(true);
              setLoader2(false);
              console.log("Transaction Hash:", mydeporesult.hash);
              await mydeporesult.wait();
              console.log("Transaction confirmed!");
              setImage(null);
              setFileName("");
              formdata.certificateName = "";
              formdata.CertificateRecepient = "";
              formdata.cgpaObtained = "";
              formdata.cgpaMaximum = "";
              formdata.institution = "";
  
              setShowForm(false);
              setSuccessMessage("Congratulations! Your data has been successfully stored in BLOCKCHAIN.");
              setLoader(false);
              console.log("Check image here", `https://ipfs.io/ipfs/${ipfshashData}`);
              setwrongMessage(false);
              setShowForm(false);
              setShowForm2(false);
              setwrongMessage2(false);
              setRealtimeBalanceS(!realtimeBalance);
              await updateBalance();
            } catch (error) {
              setLoader(false);
              setLoader2(false);
              setuserPersonalError(true);
              setwrongMessage(false);
              setShowForm(false);
              setShowForm2(false);
              setwrongMessage2(false);
              setImage(null);
              setFileName("");
              console.error("Error submitting data to the contract:", error.message);
            }
          } else {
            console.log("ipfs data not received to submit to contract", ipfshashData);
          }
        }
      } catch (error) {
        console.error("Error submitting data to the contract:", error);
      }
      setFormSubmitted(true);
      setRealtimeBalance(balance);
    } else {
      setBalanceError(true);
      setShowForm(false);
      setFormSubmitted(false);
    }
  }
  

  async function retrievingFormData() {
    setLoader3(true);
    console.log("Retrieving form data function called");
    console.log("Certificate ID:", formdataa.certificateID);
    setErrorForPrivate(false);
    setCertificateDetails(false);
    setShowForm(false);
    setShowForm2(false);

    try {
      const mydeporesult = await contract?.getCertificateDetails(
        formdataa.certificateID
      );
      console.log("hiiiiiiiiiiiiiiii");
      console.log("hello:", mydeporesult);
      console.log("hello id:", mydeporesult[0]);
      console.log("output", mydeporesult);
      setCertificateDetails(mydeporesult);

      if (mydeporesult[1]== "") {
        // setErrorForPrivate(true);
        setLoader3(false);
        console.log("Succesfully fetched data");
        setErrorForPrivate(false);
        setShowForm(false);
        setShowForm2(false);
        setSuccessMessage("Verification Successful!!");
        console.log("check the image:", `https://ipfs.io/ipfs/${ipfshashData}`);
        formdataa.certificateID = "";
      } else {
        console.log("Access denied");
        setLoader3(false);
      }
    } catch (error) {
      setLoader3(false);
      // console.log(certificateDetails.hash);
      console.error("hello Error:", error);
      if (error.message.toLowerCase().includes("access denied")) {
        console.log("wow we got access denied");
        setErrorForPrivate(true);
      } else {
        console.log("its first loop");
        setwrongMessage("Not Verified!!");
        setCertificateDetails(false);
        setShowForm(false);
        setShowForm2(false);
        setErrorForPrivate(false);
      }
    }
  }
  useEffect(() => {
    console.log("Now formdata state of visibility in useeffect:", formdataaa);
  }, [formdataaa]);
  //AGain calling next function
  const updateCertificateVisibility = async () => {
    setLoader2(true);

    try {
      setSuccessMessage(false);
      setCertificateDetails(false);
      console.log("current selected state inside final function:", formdataaa);
      const p = certificateDetails[0].toNumber();
      const q = formdataaa.certificateVisibility;
      setQqq(q);
      console.log(q);

      console.log("Just before submitting state q:", typeof qqq);
      console.log("Just before submitting state q:", qqq);
      console.log(
        "Just before submitting state formdataaa.certificateVisibility:",
        formdataaa.certificateVisibility
      );
      console.log(
        "Just before submitting state formdataaa.certificateVisibility:",
        typeof formdataaa.certificateVisibility
      );
      const tx = await contract?.setCertificateVisibility(p, q);
      setLoader2(false);
      setLoader(true);
      await tx.wait();

      console.log("ID number:", p);
      console.log("Successfully changed state of visibility");
      console.log("Form state of visibility", formdataaa.certificateVisibility);

      setLoader(false);
      setSuccessMessage33(true);
      setShowCertificateForm3(false);
      setFormdataaa({ ...formdataaa, certificateVisibility: "" });
    } catch (error) {
      console.error("Changing state error of visibility", error);
      setLoader2(false);
      setLoader(false);
    }
  };

  const certificateForm = (
    <span>
      <form className="mt-4">
        <div className="mb-4">
          <label htmlFor="uriData" className="block font-bold">
            Upload Certificate Image:
          </label>

          <input
            type="file"
            id="uriData"
            name="uriData"
            className="custom-input-width border rounded p-2"
            value={formdata.uriData}
            required
            onChange={onChangeFile}
          />
          {fileName && <p>{fileName.slice(0, 15)}...</p>}
          {useEffectCompleted && fileName && (
            <p className="text-orange-600 ">Susccessfully uploaded</p>
          )}
          {!useEffectCompleted && fileName && (
            <p className="text-orange-600 ">Uploading...</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="certificateName" className="block font-bold">
            Certificate Completed:
          </label>
          <input
            type="text"
            id="certificateName"
            name="certificateName"
            placeholder=" i.e. SSC or HSC or BSC"
            className="border rounded p-2"
            value={formdata.certificateName}
            required
            onChange={handleSubmit}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="CertificateRecepient" className="block font-bold">
            Certificate Recipient:
          </label>
          <input
            type="text"
            id="CertificateRecepient"
            name="CertificateRecepient"
            placeholder=" i.e. Abid Adnan"
            className="border rounded p-2"
            value={formdata.CertificateRecepient}
            required
            onChange={handleSubmit}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cgpaObtained" className="block font-bold">
            CGPA Obtained:
          </label>
          <input
            type="number"
            id="cgpaObtained"
            name="cgpaObtained"
            placeholder=" i.e. for 3.98 write 398"
            className="border rounded p-2"
            value={formdata.cgpaObtained}
            required
            onChange={handleSubmit}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cgpaMaximum" className="block font-bold">
            Maximum CGPA:
          </label>
          <input
            type="number"
            id="cgpaMaximum"
            name="cgpaMaximum"
            placeholder=" i.e. 4"
            className="border rounded p-2"
            value={formdata.cgpaMaximum}
            required
            onChange={handleSubmit}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="institution" className="block font-bold">
            Institution Name:
          </label>
          <input
            type="text"
            id="institution"
            name="institution"
            placeholder=" i.e. Harvard University"
            className="border rounded p-2"
            value={formdata.institution}
            required
            onChange={handleSubmit}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="institution" className="block font-bold">
            Keep your data:
          </label>
          <select
            id="certificateVisibility"
            name="certificateVisibility"
            value={formdata.certificateVisibility}
            onChange={handleSubmit}
            className="border rounded p-2"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>

        {wrongMessage2 && (
          <div className="text-red-900 text-xl mt-5 font-bold mb-4">
            {wrongMessage2}
          </div>
        )}
        <button
          type="button"
          className="flex justify-center mx-auto bg-blue-500 hover:bg-blue-400  text-white font-bold py-2 px-4 rounded"
          disabled={!useEffectCompleted}
          onClick={submittingFormData}
        >
          Submit
        </button>
      </form>
    </span>
  );
  const certificateForm2 = (
    <span>
      <form onSubmit={handleSubmit2} className="mt-4 ">
        <div className="mb-4">
          <label htmlFor="certificateID" className="block font-bold">
            Certificate ID:
          </label>
          <input
            type="number"
            id="certificateID"
            name="certificateID"
            placeholder=" i.e. 123456"
            className="border rounded p-2"
            value={formdataa.certificateID}
            required
            onChange={handleSubmit2}
          />
        </div>
        <button
          type="button"
          className="flex justify-center bg-blue-500 hover:bg-blue-400  text-white font-bold py-2 px-4 rounded"
          onClick={retrievingFormData}
        >
          CHECK
        </button>
      </form>
    </span>
  );
  const certificateForm3 = (
    <span>
      <form className=" bg-green-300 p-4 font-bold " onSubmit={handleSubmit3}>
        <div className="mb-4 flex flex-col items-center justify-center">
          <label className="block font-bold">Certificate Visibility:</label>
          <select
            id="certificateVisibility"
            name="certificateVisibility"
            value={formdataaa.certificateVisibility}
            onChange={handleSubmit3}
            className="border rounded p-2"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>
        <button
          type="button"
          className="flex mx-auto bg-blue-500 hover:bg-blue-400  text-white font-bold py-2 px-4 rounded"
          onClick={updateCertificateVisibility}
        >
          SET
        </button>
      </form>
    </span>
  );

  return (
    <span className="">
      <main className=" flex min-h-screen flex-col ">
        <div className="flex flex-col items-center py-10  mt-10 mb-10">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-orange-100 mb-10 ">
            <div className="px-6 py-4 ">
              <div className=" font-bold h-20 text-xl mb-2 text-center mt-12">
                Blockchain-Powered Certificate Verification System
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <button
              className=" bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={toggleFormVisibility}
            >
              Add Certificate
            </button>
            <button
              className=" bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={toggleFormVisibility2}
            >
              Verify
            </button>
          </div>

          {!isConnected && btn1 == true && (
            <p className="text-black-600 mt-9 font-bold bg-red-400 px-2">
              You are not logged in. Log in first, then try.
            </p>
          )}
          {!isConnected && btn2 == true && (
            <p className="text-black-600 mt-9 font-bold bg-red-400 px-2">
              You are not logged in. Log in first, then try.
            </p>
          )}

          {isConnected && showForm
            ? certificateForm
            : isConnected && showForm2 && certificateForm2}
          {isConnected &&
            successMessage &&
            certificateDetails &&
            certificateDetails[1] === address && (
              <div className="flex flex-col bg-green-300 p-4 items-center justify-center ">
                {certificateDetails[8] == true ? (
                  <p className=" font-bold text-sm ">
                    Current data visibility: PUBLIC
                  </p>
                ) : (
                  <p className=" font-bold text-sm ">
                    Current data visibility: PRIVATE
                  </p>
                )}

                <p className=" font-bold">
                  Want to change who can view your data?
                </p>
                <button
                  className=" bg-orange-400 p-2 ml-2 w-16 "
                  onClick={() => {
                    setShowCertificateForm3(!showCertificateForm3);
                    setFormdataaa({ certificateVisibility: "" }); // Reset formdataaa
                  }}
                >
                  {showCertificateForm3 ? <p>NO</p> : <p>YES</p>}
                </button>

                {showCertificateForm3 && certificateForm3}
              </div>
            )}
          {isConnected && successMessage && (
            <div className="mt-10 items-center flex flex-col justify-center text-center">
              <Image
                src="/img3.png"
                alt="Image Description"
                width={150}
                height={40}
              />
              <div className="text-white text-xl mt-4 font-bold">
                {successMessage}
              </div>
            </div>
          )}
          {isConnected && !certificateDetails && successMessage && (
            <div>
              <p className="font-bold text-xl mt-5 text-center">
                Your Unique ID: {data11}
              </p>
              <p className="font-bold text-xl text-center">
                Please make sure to keep a note of your ID for future reference.
              </p>
            </div>
          )}

          {isConnected && certificateDetails && (
            <div className=" flex flex-col items-center justify-center">
              <div className="mt-4 mb-10 ">
                <div className=" rounded overflow-hidden shadow-lg bg-green-100 mb-10 h-auto w-auto">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-center">
                      <h3 className="mb-4">Certificate Details</h3>

                      <p className="text-left">
                        Certificate ID:{" "}
                        {certificateDetails && certificateDetails.length > 0
                          ? certificateDetails[0].toNumber()
                          : "N/A"}
                      </p>
                      <p className="text-left">
                        Certificate Name:{" "}
                        {certificateDetails && certificateDetails.length > 0
                          ? certificateDetails[1]
                          : "N/A"}
                      </p>
                      <p className="text-left">
                        Recipient:{" "}
                        {certificateDetails && certificateDetails.length > 0
                          ? certificateDetails[2]
                          : "N/A"}
                      </p>
                      <p className="text-left">
                        CGPA Obtained:{" "}
                        {certificateDetails && certificateDetails.length > 0
                          ? certificateDetails[3].toNumber() / 100
                          : "N/A"}
                      </p>
                      <p className="text-left">
                        Maximum CGPA:{" "}
                        {certificateDetails && certificateDetails.length > 0
                          ? certificateDetails[4].toNumber()
                          : "N/A"}
                      </p>
                      <p className="text-left">
                        Institution:{" "}
                        {certificateDetails && certificateDetails.length > 0
                          ? certificateDetails[5]
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Now card for certificate showing */}

              <p className="text-center text-xl font-extrabold mb-4">
                Certificate Image:
              </p>
            </div>
          )}
          {isConnected && certificateDetails && (
            <div className="border-4 border-gray-300 border-w rounded-lg overflow-hidden shadow-xl to-orange-500 p-4 mb-100 lg:w-auto xl:w-auto lg:h-auto xl:h-auto min-h-96">
              <div className="px-6 py-4 flex flex-col items-center justify-center">
                {isLoading && (
                  <div className="flex flex-col w-20 h-20 m-auto">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
                    <p className=" items-center text-center font-bold ">
                      Loading...
                    </p>
                  </div>
                )}

                <Image
                  src={certificateDetails[6]}
                  alt="Image Description"
                  width={500}
                  height={300}
                  onLoad={() => {
                    setIsLoading(false);
                  }}
                />
              </div>
            </div>
          )}
          {isConnected && wrongMessage && (
            <div className=" mt-10 items-center flex flex-col justify-center text-center">
              <Image
                src="/img4.png"
                alt="Image Description"
                width={150}
                height={40}
              />
              <div className="text-red-900  text-xl mt-11 font-bold mb-4">
                {wrongMessage}
              </div>
            </div>
          )}

          {isConnected && balanceError && (
            <div className="mt-8  flex flex-col items-center  ">
              <Image
                src="/wallet.jpg"
                alt="Image Description"
                width={450}
                height={240}
              />
              <p className="font-bold text-xl mt-5 text-center">
                You have insufficient balance.
              </p>
              <p className="font-bold text-xl text-center">
                Your current balance is:{" "}
                {parseFloat(balance.formatted).toFixed(5)} {balance.symbol}
              </p>
              <p className="font-bold text-xl text-center">
                You must have more than 0.00003421 ETH equivalent to transact.
              </p>
            </div>
          )}
          {isConnected && userPersonalError && (
            <div className="mt-8  flex flex-col items-center  ">
              <Image
                src="/Picture1.png"
                alt="Image Description"
                width={450}
                height={240}
              />
              <p className="font-bold text-xl mt-5 text-center bg-orange-600 p-4 ">
                You have declined the transaction!
              </p>
            </div>
          )}
          {loader && (
            <div className="mt-5 flex flex-col justify-center items-center mx-auto ">
              <div className=" mt-7 animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
              <p className="mt-6 items-center text-center font-bold text-xl">
                Submitting to blockchain...
              </p>
            </div>
          )}
          {loader2 && (
            <div className="mt-5 flex flex-col justify-center items-center mx-auto">
              <div className="mt-7 animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
              <div>
                <p className="mt-6 items-center  font-bold text-xl whitespace-nowrap">
                  Waiting for your authentication...
                </p>
              </div>
            </div>
          )}
          {successMessage33 && (
            <div className="bg-green-400 p-6 text-xl font-bold mt-4">
              {qqq === false ? (
                <p> Data visibility state changed to: Private </p>
              ) : (
                <p>Data visibility state changed to: Public</p>
              )}
            </div>
          )}
          {isConnected && errorForPrivate && (
            <div className="bg-red-400 p-6 text-xl font-bold mt-4">
              <p>You dont have access to this data.</p>
            </div>
          )}
          {loader3 && (
            <div className="mt-5 flex flex-col justify-center items-center mx-auto">
              <div className="mt-7 animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
              <div>
                <p className="mt-6 items-center  font-bold text-xl whitespace-nowrap">
                  Fetching your data...
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </span>
  );
};

export default Outstanding;
