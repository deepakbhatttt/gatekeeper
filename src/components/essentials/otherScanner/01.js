const scan = () => {
    // Check if NFC is supported
    if ("NDEFReader" in window) {
        // NFC is supported
        const ndef = new NDEFReader();
        // Scan for NFC tag
        ndef.scan()
            .then(() => {
                // NFC tag detected, set up reading
                ndef.onreading = event => {
                    // Loop through records and print data
                    for (const record of event.message.records) {
                        // Decode record data and print
                        const decoder = new TextDecoder();
                        const data = decoder.decode(record.data);
                        console.log("NFC Data:", data);
                    }
                };
            })
            .catch(error => {
                // Error handling if NFC scanning fails
                console.error("Error scanning NFC tag:", error);
            });
    } else {
        // NFC is not supported
        console.error("Web NFC is not supported on this Device.");
    }

    return (
        <>
            <h1>{data}</h1>
        </>
    );

};