// ==========================================
// JeevanSetu AI Emergency Assistant
// STEP 9 - FREE LOCAL AI MODE
// No OpenAI API required
// ==========================================


// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("assistantForm");
    const input = document.getElementById("assistantInput");

    if (!form || !input) {
        console.warn("JeevanSetu Assistant elements not found.");
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const message = input.value.trim();

        if (!message) {
            return;
        }

        sendUserMessage(message);

        input.value = "";
        input.focus();

    });

});


// ==========================================
// SEND USER MESSAGE
// ==========================================

function sendUserMessage(message) {

    addMessage(message, "user");

    showTypingIndicator();

    setTimeout(() => {

        hideTypingIndicator();

        const response = getEmergencyResponse(message);

        addMessage(response, "bot");

    }, 700);

}


// ==========================================
// QUICK MESSAGE
// ==========================================

function sendQuickMessage(message) {

    if (!message) {
        return;
    }

    sendUserMessage(message);

}


// ==========================================
// ADD MESSAGE
// ==========================================

function addMessage(message, type) {

    const chat = document.getElementById("chatMessages");

    if (!chat) {
        return;
    }

    const messageBox = document.createElement("div");


    // ======================================
    // USER
    // ======================================

    if (type === "user") {

        messageBox.className =
            "chat-message user-message";

        messageBox.innerHTML = `

            <div class="message-content">

                <strong>You</strong>

                <p>
                    ${escapeHTML(message)}
                </p>

            </div>

        `;

    }


    // ======================================
    // BOT
    // ======================================

    else {

        messageBox.className =
            "chat-message bot-message";

        messageBox.innerHTML = `

            <div class="message-avatar">
                🤖
            </div>

            <div class="message-content">

                <strong>
                    JeevanSetu Assistant
                </strong>

                <div>
                    ${message}
                </div>

            </div>

        `;

    }


    chat.appendChild(messageBox);

    chat.scrollTop = chat.scrollHeight;

}


// ==========================================
// TYPING INDICATOR
// ==========================================

function showTypingIndicator() {

    const chat = document.getElementById("chatMessages");

    if (!chat) {
        return;
    }

    // Prevent duplicate
    if (document.getElementById("typingIndicator")) {
        return;
    }

    const typing = document.createElement("div");

    typing.id = "typingIndicator";

    typing.className = "chat-message bot-message";

    typing.innerHTML = `

        <div class="message-avatar">
            🤖
        </div>

        <div class="message-content">

            <strong>
                JeevanSetu Assistant
            </strong>

            <p>
                Thinking...
            </p>

        </div>

    `;

    chat.appendChild(typing);

    chat.scrollTop = chat.scrollHeight;

}


// ==========================================
// HIDE TYPING INDICATOR
// ==========================================

function hideTypingIndicator() {

    const typing =
        document.getElementById("typingIndicator");

    if (typing) {
        typing.remove();
    }

}


// ==========================================
// EMERGENCY INTENT DETECTION
// ==========================================

function detectEmergencyIntent(message) {

    const text = String(message)
        .toLowerCase()
        .trim();


    // ======================================
    // CPR / CARDIAC
    // ======================================

    if (
        text.includes("cpr") ||
        text.includes("cardiac arrest") ||
        text.includes("heart attack") ||
        text.includes("not breathing") ||
        text.includes("no breathing") ||
        text.includes("दिल का दौरा") ||
        text.includes("दिल का अटैक") ||
        text.includes("दिल रुक")
    ) {
        return "cpr";
    }


    // ======================================
    // BREATHING
    // ======================================

    if (
        text.includes("breathing") ||
        text.includes("breath") ||
        text.includes("can't breathe") ||
        text.includes("cannot breathe") ||
        text.includes("difficulty breathing") ||
        text.includes("shortness of breath") ||
        text.includes("asthma") ||
        text.includes("सांस") ||
        text.includes("साँस") ||
        text.includes("दम घुट") ||
        text.includes("दम फूल")
    ) {
        return "breathing";
    }


    // ======================================
    // BLEEDING
    // ======================================

    if (
        text.includes("bleeding") ||
        text.includes("blood") ||
        text.includes("bleed") ||
        text.includes("wound") ||
        text.includes("cut") ||
        text.includes("खून") ||
        text.includes("खुन") ||
        text.includes("घाव") ||
        text.includes("जख्म")
    ) {
        return "bleeding";
    }


    // ======================================
    // BURN
    // ======================================

    if (
        text.includes("burn") ||
        text.includes("burned") ||
        text.includes("burnt") ||
        text.includes("जल") ||
        text.includes("जल गया") ||
        text.includes("जल गई") ||
        text.includes("जलने") ||
        text.includes("आग से")
    ) {
        return "burns";
    }


    // ======================================
    // UNCONSCIOUS
    // ======================================

    if (
        text.includes("unconscious") ||
        text.includes("faint") ||
        text.includes("fainted") ||
        text.includes("not responding") ||
        text.includes("बेहोश") ||
        text.includes("बेहोशी") ||
        text.includes("होश नहीं")
    ) {
        return "fainting";
    }


    // ======================================
    // SNAKE BITE
    // ======================================

    if (
        text.includes("snake") ||
        text.includes("snakebite") ||
        text.includes("snake bite") ||
        text.includes("venom") ||
        text.includes("सांप") ||
        text.includes("साँप")
    ) {
        return "snakebite";
    }


    // ======================================
    // ELECTRIC SHOCK
    // ======================================

    if (
        text.includes("electric shock") ||
        text.includes("electricity") ||
        text.includes("electrical") ||
        text.includes("current") ||
        text.includes("करंट") ||
        text.includes("करन्ट") ||
        text.includes("बिजली")
    ) {
        return "electric";
    }


    // ======================================
    // FRACTURE
    // ======================================

    if (
        text.includes("fracture") ||
        text.includes("broken bone") ||
        text.includes("bone broken") ||
        text.includes("हड्डी") ||
        text.includes("हड्डी टूट") ||
        text.includes("फ्रैक्चर") ||
        text.includes("हाथ टूट") ||
        text.includes("पैर टूट")
    ) {
        return "fracture";
    }


    return "unknown";

}


// ==========================================
// EMERGENCY ACTION BUTTONS
// ==========================================

function emergencyActions() {

    return `

        <div class="assistant-emergency-actions">

            <a
                href="tel:112"
                class="assistant-call-btn">
                🚨 Call 112
            </a>

            <button
                type="button"
                class="assistant-location-btn"
                onclick="assistantShareLocation()">
                📍 Share My Location
            </button>

            <button
                type="button"
                class="assistant-hospital-btn"
                onclick="assistantFindHospital()">
                🏥 Find Nearby Hospital
            </button>

        </div>

    `;

}


// ==========================================
// EMERGENCY RESPONSE
// ==========================================

function getEmergencyResponse(message) {

    const intent =
        detectEmergencyIntent(message);


    switch (intent) {


        // ==================================
        // BLEEDING
        // ==================================

        case "bleeding":

            return `

                🩸 <strong>Possible Severe Bleeding</strong>

                <br><br>

                Apply firm, direct pressure
                to the wound using clean cloth
                or gauze.

                <br><br>

                • Keep continuous pressure.
                <br>
                • If blood soaks through,
                add more cloth on top.
                <br>
                • Do not repeatedly remove
                the cloth.

                <br><br>

                🚨 If bleeding is severe
                or uncontrolled, call
                <strong>112</strong>.

                ${emergencyActions()}

            `;


        // ==================================
        // BURN
        // ==================================

        case "burns":

            return `

                🔥 <strong>Possible Burn Injury</strong>

                <br><br>

                • Move away from the heat
                source if safe.
                <br>
                • Cool the burn under
                cool running water.
                <br>
                • Cover loosely with a clean
                non-stick dressing.

                <br><br>

                ❌ Do not apply ice,
                butter or toothpaste.

                <br><br>

                🚨 Seek urgent medical help
                for serious burns.

                ${emergencyActions()}

            `;


        // ==================================
        // BREATHING
        // ==================================

        case "breathing":

            return `

                🫁 <strong>Breathing Difficulty</strong>

                <br><br>

                Severe breathing difficulty
                can be an emergency.

                <br><br>

                • Help the person sit comfortably.
                <br>
                • Loosen tight clothing.
                <br>
                • Help them use prescribed
                emergency medicine if available.

                <br><br>

                🚨 If breathing difficulty is
                severe or worsening, call
                <strong>112</strong> immediately.

                ${emergencyActions()}

            `;


        // ==================================
        // UNCONSCIOUS
        // ==================================

        case "fainting":

            return `

                😵 <strong>Possible Unconsciousness</strong>

                <br><br>

                • Check whether the person
                is breathing normally.
                <br>
                • If they are not breathing
                normally, call emergency services.
                <br>
                • If breathing, keep them safe
                and monitor them.
                <br>
                • Stay with the person.

                <br><br>

                🚨 Emergency:
                <strong>112</strong>

                ${emergencyActions()}

            `;


        // ==================================
        // SNAKE
        // ==================================

        case "snakebite":

            return `

                🐍 <strong>Possible Snake Bite</strong>

                <br><br>

                • Move away from the snake.
                <br>
                • Keep the person calm.
                <br>
                • Keep the bitten limb still.
                <br>
                • Remove rings and watches
                before swelling develops.

                <br><br>

                ❌ Do not cut the wound,
                suck venom or try to catch
                the snake.

                <br><br>

                🚨 Get urgent medical help.

                ${emergencyActions()}

            `;


        // ==================================
        // ELECTRIC
        // ==================================

        case "electric":

            return `

                ⚡ <strong>Electrical Shock</strong>

                <br><br>

                ⚠️ Do not touch the person
                while they are connected
                to the electrical source.

                <br><br>

                • Switch off electricity
                if it is safe.
                <br>
                • Once safe, check breathing.
                <br>
                • Seek medical attention
                for significant injuries.

                <br><br>

                🚨 Call <strong>112</strong>
                if emergency help is needed.

                ${emergencyActions()}

            `;


        // ==================================
        // FRACTURE
        // ==================================

        case "fracture":

            return `

                🦴 <strong>Possible Fracture</strong>

                <br><br>

                • Keep the injured area
                as still as possible.
                <br>
                • Do not try to straighten
                the bone.
                <br>
                • Seek medical evaluation.

                <br><br>

                🚨 Call emergency services
                for serious injuries.

                ${emergencyActions()}

            `;


        // ==================================
        // CPR
        // ==================================

        case "cpr":

            return `

                ❤️ <strong>Possible Cardiac Emergency</strong>

                <br><br>

                If an adult is unresponsive
                and not breathing normally:

                <br><br>

                • Call emergency services.
                <br>
                • Start CPR if trained or
                follow dispatcher instructions.
                <br>
                • Ask someone to bring an AED
                if available.

                <br><br>

                🚨 Call <strong>112</strong>
                immediately.

                ${emergencyActions()}

            `;


        // ==================================
        // GENERAL CHAT
        // ==================================

        default:

            return getGeneralResponse(message);

    }

}


// ==========================================
// GENERAL MEDICAL / NORMAL CONVERSATION
// ==========================================

function getGeneralResponse(message) {

    const text =
        message.toLowerCase();


    // Greeting

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey") ||
        text.includes("नमस्ते") ||
        text.includes("हेलो")
    ) {

        return `

            👋 <strong>Hello!</strong>

            <br><br>

            मैं <strong>JeevanSetu Assistant</strong> हूँ।

            <br><br>

            मैं emergency situations,
            basic first-aid guidance और
            general medical information
            समझाने में मदद कर सकता हूँ।

            <br><br>

            आप मुझसे पूछ सकते हैं:

            <br><br>

            🩸 Bleeding
            <br>
            🔥 Burns
            <br>
            🫁 Breathing problems
            <br>
            🐍 Snake bite
            <br>
            ❤️ CPR
            <br>
            💊 General medical information

            <br><br>

            🚨 Life-threatening emergency में
            तुरंत <strong>112</strong> पर call करें।

        `;

    }


    // Fever

    if (
        text.includes("fever") ||
        text.includes("bukhar") ||
        text.includes("बुखार")
    ) {

        return `

            🌡️ <strong>Fever Information</strong>

            <br><br>

            Fever कई कारणों से हो सकता है,
            जैसे infection या अन्य illness।

            <br><br>

            • आराम करें।
            <br>
            • पर्याप्त fluids लें।
            <br>
            • Temperature monitor करें।

            <br><br>

            अगर बहुत तेज बुखार,
            confusion, breathing difficulty,
            seizure या गंभीर कमजोरी हो,
            तो urgent medical care लें।

            <br><br>

            ⚠️ यह general information है,
            diagnosis नहीं।

        `;

    }


    // Headache

    if (
        text.includes("headache") ||
        text.includes("sir dard") ||
        text.includes("सिर दर्द")
    ) {

        return `

            🤕 <strong>Headache Information</strong>

            <br><br>

            Headache के कई कारण हो सकते हैं,
            जैसे dehydration, stress,
            lack of sleep या illness।

            <br><br>

            • पानी पिएँ।
            <br>
            • आराम करें।
            <br>
            • अगर headache अचानक बहुत severe हो,
            तो medical help लें।

            <br><br>

            ⚠️ लगातार या severe symptoms में
            doctor से सलाह लें।

        `;

    }


    // Medicine

    if (
        text.includes("medicine") ||
        text.includes("medication") ||
        text.includes("दवा") ||
        text.includes("दवाई")
    ) {

        return `

            💊 <strong>Medicine Safety</strong>

            <br><br>

            मैं medicine के बारे में
            general information दे सकता हूँ,
            लेकिन बिना medical history के
            किसी व्यक्ति के लिए specific
            prescription देना सुरक्षित नहीं है।

            <br><br>

            दवा लेने से पहले doctor या
            pharmacist से confirm करें।

        `;

    }


    // Hospital

    if (
        text.includes("hospital") ||
        text.includes("doctor") ||
        text.includes("अस्पताल") ||
        text.includes("डॉक्टर")
    ) {

        return `

            🏥 <strong>Medical Help</strong>

            <br><br>

            अगर आपको तत्काल medical help चाहिए,
            तो nearest hospital या emergency
            department जाएँ।

            <br><br>

            आप नीचे दिए button से nearby
            hospital भी खोज सकते हैं।

            <br><br>

            ${emergencyActions()}

        `;

    }


    // Default

    return `

        🤖 <strong>JeevanSetu Assistant</strong>

        <br><br>

        मैंने आपकी बात समझने की कोशिश की।

        <br><br>

        आप अपना सवाल थोड़ा और detail में
        लिख सकते हैं।

        <br><br>

        उदाहरण:

        <br>
        • मुझे बुखार है
        <br>
        • सिर में दर्द है
        <br>
        • snake bite में क्या करें?
        <br>
        • bleeding कैसे रोकें?
        <br>
        • CPR कैसे करें?

        <br><br>

        ⚠️ मैं general medical information
        और emergency guidance दे सकता हूँ,
        लेकिन diagnosis या doctor की जगह
        नहीं ले सकता।

        <br><br>

        🚨 Life-threatening emergency में
        तुरंत <strong>112</strong> पर call करें।

    `;

}


// ==========================================
// SHARE LOCATION
// ==========================================

function assistantShareLocation() {

    if (typeof getLocation === "function") {

        getLocation();

        return;

    }


    if (!navigator.geolocation) {

        alert(
            "Your browser does not support location services."
        );

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            const mapsLink =
                `https://www.google.com/maps?q=${latitude},${longitude}`;


            if (navigator.share) {

                navigator.share({

                    title:
                        "JeevanSetu Emergency Location",

                    text:
                        "My emergency location:",

                    url:
                        mapsLink

                }).catch(() => {});

            } else {

                window.open(
                    mapsLink,
                    "_blank"
                );

            }

        },

        function() {

            alert(
                "Unable to get your location."
            );

        },

        {

            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0

        }

    );

}


// ==========================================
// FIND HOSPITAL
// ==========================================

function assistantFindHospital() {

    if (typeof findHospital === "function") {

        findHospital();

        return;

    }


    if (!navigator.geolocation) {

        openHospitalSearch();

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            const url =
                `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`;

            window.open(
                url,
                "_blank"
            );

        },

        function() {

            openHospitalSearch();

        }

    );

}


// ==========================================
// HOSPITAL FALLBACK
// ==========================================

function openHospitalSearch() {

    window.open(
        "https://www.google.com/maps/search/nearby+hospitals",
        "_blank"
    );

}


// ==========================================
// QUICK EMERGENCY
// ==========================================

function quickEmergency(type) {

    const messages = {

        bleeding:
            "Someone is bleeding badly.",

        burns:
            "Someone has a serious burn.",

        breathing:
            "Someone is having difficulty breathing.",

        fainting:
            "Someone is unconscious.",

        snakebite:
            "Someone has been bitten by a snake.",

        electric:
            "Someone received an electric shock.",

        fracture:
            "Someone may have a broken bone.",

        cpr:
            "Someone is unresponsive and not breathing normally."

    };


    if (!messages[type]) {
        return;
    }


    sendUserMessage(
        messages[type]
    );

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value ?? "");

    return div.innerHTML;

}