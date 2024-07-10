// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NewCertificate is Ownable {
    event CertificateAdded(
        uint256 indexed certificateID,
        string certificateName,
        string CertificateRecepient,
        int cgpaObtained,
        int cgpaMaximum,
        string institution,
        string uriData
    );

    event CertificateChecked(address indexed user, uint256 certificateID);

    struct CertificateDetails {
        uint256 certificateID;
        string certificateName;
        string CertificateRecepient;
        int cgpaObtained;
        int cgpaMaximum;
        string institution;
        string uriData;
    }

    mapping(uint256 => CertificateDetails) public allCertificates;

    function addNewCertificates(
    uint256 _certificateID,
    string memory  _certificateName,
    string memory  _CertificateRecepient,
    int _cgpaObtained,
    int _cgpaMaximum,
    string memory _institution,
    string memory _uriData
) public payable {
    require(msg.value >= 100000000000000000 wei, "Insufficient Ether sent for the certificate addition");

    payable(owner()).transfer(msg.value);

    CertificateDetails storage newCertificate = allCertificates[_certificateID];
    newCertificate.certificateID = _certificateID;
    newCertificate.certificateName = _certificateName;
    newCertificate.CertificateRecepient = _CertificateRecepient;
    newCertificate.cgpaObtained = _cgpaObtained;
    newCertificate.cgpaMaximum = _cgpaMaximum;
    newCertificate.institution = _institution;
    newCertificate.uriData = _uriData;

    emit CertificateAdded(_certificateID, _certificateName, _CertificateRecepient, _cgpaObtained, _cgpaMaximum, _institution, _uriData);
}

     function getCertificateDetails(uint256 _certificateID) public view returns (
        uint256 certificateID,
        string memory certificateName,
        string memory CertificateRecepient,
        int cgpaObtained,
        int cgpaMaximum,
        string memory institution,
        string memory  _uriData
    ) {
        CertificateDetails memory detailsShowingCertificate = allCertificates[_certificateID];
        return (
            detailsShowingCertificate.certificateID,
            detailsShowingCertificate.certificateName,
            detailsShowingCertificate.CertificateRecepient,
            detailsShowingCertificate.cgpaMaximum,
            detailsShowingCertificate.cgpaObtained,
            detailsShowingCertificate.institution,
            detailsShowingCertificate.uriData
        );
    }
   
    
}
