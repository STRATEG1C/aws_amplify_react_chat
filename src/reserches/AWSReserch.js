import React, { useRef, useState } from 'react';

import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { Polly } from '@aws-sdk/client-polly';
import { getSynthesizeSpeechUrl } from '@aws-sdk/polly-request-presigner';

const client = new Polly({
    region: "eu-central-1",
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: "eu-central-1" }),
      identityPoolId: "eu-central-1:1ece4fb6-47dc-4c29-9e0b-59ef10d735d1"
    }),
});
// Set the parameters
const speechParams = {
    OutputFormat: "mp3", // For example, 'mp3'
    SampleRate: "16000", // For example, '16000
    Text: "", // The 'speakText' function supplies this value
    TextType: "text", // For example, "text"
    VoiceId: "Matthew" // For example, "Matthew"
};

const getSpeakUrl = async (text) => {
    // Update the Text parameter with the text entered by the user
    speechParams.Text = text;
    try{
        const url = await getSynthesizeSpeechUrl({
            client, params: speechParams
        });
        console.log(url);
        // Load the URL of the voice recording into the browser
        // document.getElementById('audioSource').src = url;
        // document.getElementById('audioPlayback').load();
        // document.getElementById('result').innerHTML = "Speech ready to play.";
        return url;
    } catch (err) {
        console.log("Error", err);
        // document.getElementById('result').innerHTML = err;
    }
};

const AWSReserch = () => {
    const [text, setText] = useState('');
    const [isSpeachReady, setSpeachReady] = useState(false);
    const audioElementRef = useRef(null);

    const onChangeText = (e) => setText(e.target.value);

    const onSpeakText = async () => {
        if (!audioElementRef) { return; }
        if (!text.trim()) { return; }

        const url = await getSpeakUrl(text);
        audioElementRef.current.src = url;
        setSpeachReady(true);
    }

    return (
        <div>
            <h1>AWS Tests</h1>
            <p>
                <audio controls src="" ref={audioElementRef} type="audio/mpeg" />
            </p>
            <input type="text" onChange={onChangeText} value={text} />
            <button onClick={onSpeakText}>Speak Text</button>
            {isSpeachReady ? <p>Speach is ready!</p> : null}
        </div>
    );
};

export default AWSReserch;
