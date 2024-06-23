import React, { useState } from 'react';

const NFCReader = () => {
  const [output, setOutput] = useState('');

  const handleReadClick = async () => {
    if ('NDEFReader' in window) {
      try {
        const reader = new NDEFReader();
        await reader.scan();
        setOutput('Ready to read...');

        reader.onreading = event => {
          const message = event.message;
          let newData = '';
          for (const record of message.records) {
            const textDecoder = new TextDecoder();
            newData += `Data: ${textDecoder.decode(record.data)}`;
          }
          setOutput(newData);
        };
      } catch (error) {
        console.error(`Error: ${error.message}`);
        setOutput(`Error: ${error.message}`);
      }
    } else {
      setOutput('Web NFC is not supported.');
    }
  };

  return (
    <div>
      <h1>NFC Reader</h1>
      <button onClick={handleReadClick}>Tap to Read NFC Tag</button>
      <div id="output">{output}</div>
    </div>
  );
};

export default NFCReader;
