async function donate() {
    if (!window.ethereum) {
        alert("MetaMask not detected! Please install MetaMask.");
        return;
    }

    try {
        const amount_in_ether = document.getElementById("ethAmount").value;
        if (!amount_in_ether || parseFloat(amount_in_ether) <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const donorAddress = accounts[0];

        const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

        if (!ethers.utils.isAddress(contractAddress)) {
            alert("Invalid contract address");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ["function donate() public payable"], signer);

        const tx = await contract.donate({ value: ethers.utils.parseEther(amount_in_ether) });

        document.getElementById("status").innerText = "Transaction Sent: " + tx.hash;

        await tx.wait();

        document.getElementById("status").innerText = "Donation Successful! Transaction Hash: " + tx.hash;


        const inrRate = 267307;

        const inrAmount = amount_in_ether * inrRate;
        const campaignTitle = document.getElementById("campaignTitle").value;

        await fetch("/save-donation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                donor_address: donorAddress,
                amount_in_ether: amount_in_ether,
                transaction_hash: tx.hash,
                inrAmount: inrAmount,
                campaign_title: campaignTitle,
            }),
        });

    } catch (error) {
        console.error("Error during donation:", error);


        if (error.code === -32000) {
            document.getElementById("status").innerText = "Transaction Failed: Insufficient Balance";
        } else {
            document.getElementById("status").innerText = "Transaction Failed: Something went wrong.";
        }
    }
}



async function convertEthToInr() {
    const ethAmount = document.getElementById("ethAmount").value;
    if (!ethAmount || parseFloat(ethAmount) <= 0) {
        document.getElementById("inrAmount").value = "₹ 0";
        return;
    }

    try {

        const inrRate = 267307;
        const inrAmount = ethAmount * inrRate;
        document.getElementById("inrAmount").value = `₹ ${inrAmount.toFixed(2)}`;
    } catch (error) {
        console.error("Error fetching conversion rate:", error);
        document.getElementById("inrAmount").value = "Error fetching price";
    }
}

window.onload = function () {
    document.getElementById("ethAmount").addEventListener("input", convertEthToInr);
};
