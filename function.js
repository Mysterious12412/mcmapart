async function send() {
    const url = 'https://discord.com/api/webhooks/1460499455219339389/OvFnvMeqWiApBuumLWXCZwbM6btygRwjUo3Cs-Y5vw3psG3oLbpd9GyBz9ikdWSf4Jil';

    const mapName = document.getElementById('mapName').value;
    const location = document.getElementById('location').value;
    const proof = document.getElementById('proof');
    const btn = document.getElementById('submit');

    if (!mapName || !location || proof.files.length === 0) {
        alert("Please fill in all fields and select an image.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "Sending...";

    const data = new FormData();
    data.append('file', proof.files[0]);
    
    const content = `**New Mapart Submission**\n` +
                    `**Name:** ${mapName}\n` +
                    `**Coordinates:** \`${location}\``;
    
    data.append('content', content);

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });

        if (res.ok) {
            alert("Submission successful!");
            document.getElementById('mapName').value = '';
            document.getElementById('location').value = '';
            proof.value = '';
        } else {
            alert("Error sending to Discord.");
        }
    } catch (e) {
        console.error(e);
        alert("Failed to connect.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Submit";
    }
}
