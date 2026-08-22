// ==========================================
// JeevanSetu - Main Application
// ==========================================


// ==========================================
// SOS BUTTON
// ==========================================

function activateSOS() {

    // Prevent duplicate modal
    if (document.getElementById("sosModal")) {
        return;
    }

    const modal = document.createElement("div");

    modal.id = "sosModal";

    modal.innerHTML = `
        <div class="sos-overlay">

            <div class="sos-modal">

                <div class="sos-icon">
                    🚨
                </div>

                <h2>Emergency Assistance</h2>

                <p>
                    Are you in an emergency?
                </p>

                <p class="sos-description">
                    JeevanSetu can help you access emergency
                    services and share your location.
                </p>

                <div class="sos-actions">

                    <button
                        id="confirmSOS"
                        class="confirm-sos">
                        🚨 Yes, Get Help
                    </button>

                    <button
                        id="cancelSOS"
                        class="cancel-sos">
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    // Cancel SOS
    document
        .getElementById("cancelSOS")
        .addEventListener("click", closeSOSModal);


    // Confirm SOS
    document
        .getElementById("confirmSOS")
        .addEventListener("click", activateEmergencyMode);
}


// ==========================================
// EMERGENCY MODE
// ==========================================

function activateEmergencyMode() {

    const modal = document.querySelector(".sos-modal");

    if (!modal) return;

    const contacts =
        JSON.parse(
            localStorage.getItem("jeevanSetuContacts")
        ) || [];


    let contactsHTML = "";


    if (contacts.length === 0) {

        contactsHTML = `
            <div>
                👥
                <strong>Trusted Contacts</strong>
                <span>No contacts saved</span>
            </div>
        `;

    } else {

        contactsHTML = contacts.map(contact => `

            <div>
                👤
                <strong>${escapeHTML(contact.name)}</strong>
                <span>
                    ${escapeHTML(contact.relation)}
                    • ${escapeHTML(contact.phone)}
                </span>
            </div>

        `).join("");
    }


    modal.innerHTML = `

        <div class="sos-icon">
            🚨
        </div>

        <h2>Emergency Mode Activated</h2>

        <p>
            Stay calm. JeevanSetu is preparing your
            emergency assistance.
        </p>


        <div class="emergency-status">

            <div>
                📍
                <strong>Location</strong>
                <span>Ready to share</span>
            </div>


            <div>
                📞
                <strong>Emergency Services</strong>
                <span>Available</span>
            </div>


            ${contactsHTML}

        </div>


        <button
            class="cancel-sos"
            onclick="closeSOSModal()">
            Close
        </button>

    `;
}

// ==========================================
// CLOSE SOS MODAL
// ==========================================

function closeSOSModal() {

    const modal = document.getElementById("sosModal");

    if (modal) {
        modal.remove();
    }
}


// ==========================================
// LOCATION
// ==========================================

function getLocation() {

    if (!navigator.geolocation) {

        showLocationMessage(
            "Location Not Supported",
            "Your browser does not support location services."
        );

        return;
    }


    showLocationMessage(
        "Getting Your Location...",
        "Please allow location access when your browser asks."
    );


    navigator.geolocation.getCurrentPosition(
        locationSuccess,
        locationError,
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}


// ==========================================
// LOCATION SUCCESS
// ==========================================

function locationSuccess(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const mapsLink =
        `https://www.google.com/maps?q=${latitude},${longitude}`;


    const modal = document.getElementById("locationModal");

    if (!modal) return;


    modal.querySelector(".location-modal").innerHTML = `

        <div class="location-icon">
            📍
        </div>

        <h2>Location Found</h2>

        <p>
            Your current location has been detected.
        </p>

        <div class="coordinates">

            <div>
                <strong>Latitude</strong>
                <span>${latitude.toFixed(6)}</span>
            </div>

            <div>
                <strong>Longitude</strong>
                <span>${longitude.toFixed(6)}</span>
            </div>

        </div>

        <a
            href="${mapsLink}"
            target="_blank"
            rel="noopener"
            class="map-button">
            🗺️ Open in Google Maps
        </a>

        <button
            class="close-location"
            onclick="closeLocationModal()">
            Close
        </button>
    `;
}


// ==========================================
// LOCATION ERROR
// ==========================================

function locationError(error) {

    let message =
        "Unable to get your location.";

    if (error.code === 1) {

        message =
            "Location permission was denied. Please allow location access in your browser.";
    }

    else if (error.code === 2) {

        message =
            "Your location could not be determined. Please try again.";
    }

    else if (error.code === 3) {

        message =
            "Location request timed out. Please try again.";
    }


    showLocationMessage(
        "Location Error",
        message
    );
}


// ==========================================
// LOCATION MODAL
// ==========================================

function showLocationMessage(title, message) {

    const oldModal =
        document.getElementById("locationModal");

    if (oldModal) {
        oldModal.remove();
    }


    const modal =
        document.createElement("div");

    modal.id =
        "locationModal";


    modal.innerHTML = `

        <div class="location-overlay">

            <div class="location-modal">

                <div class="location-icon">
                    📍
                </div>

                <h2>${title}</h2>

                <p>${message}</p>

                <button
                    class="close-location"
                    onclick="closeLocationModal()">
                    Close
                </button>

            </div>

        </div>
    `;


    document.body.appendChild(modal);
}


// ==========================================
// CLOSE LOCATION MODAL
// ==========================================

function closeLocationModal() {

    const modal =
        document.getElementById("locationModal");

    if (modal) {
        modal.remove();
    }
}


// ==========================================
// EMERGENCY SERVICE CALL
// ==========================================

function callService(number) {

    const confirmCall =
        confirm(
            `Do you want to call emergency number ${number}?`
        );

    if (!confirmCall) {
        return;
    }

    window.location.href =
        `tel:${number}`;
}


// ==========================================
// FIND NEARBY HOSPITAL
// ==========================================

function findHospital() {

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


            const hospitalURL =
                `https://www.google.com/maps/search/hospital/@${latitude},${longitude},15z`;


            window.open(
                hospitalURL,
                "_blank"
            );
        },

        function() {

            alert(
                "Please allow location access to find nearby hospitals."
            );
        },

        {
            enableHighAccuracy: true,
            timeout: 10000
        }
    );
}

//==============test code=========================

// ==========================================
// EMERGENCY SERVICE CALL
// ==========================================

function callService(number) {

    const confirmCall = confirm(
        `Do you want to call emergency number ${number}?`
    );

    if (!confirmCall) {
        return;
    }

    window.location.href = `tel:${number}`;
}


// ==========================================
// FIND NEARBY HOSPITAL
// ==========================================

function findHospital() {

    if (!navigator.geolocation) {

        alert(
            "Location services are not supported by this browser."
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            const hospitalURL =
                `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},15z`;

            window.open(
                hospitalURL,
                "_blank"
            );
        },

        function(error) {

            if (error.code === 1) {

                alert(
                    "Location permission denied. Please allow location access."
                );

            } else {

                alert(
                    "Unable to detect your location. Please try again."
                );
            }
        },

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}

// ==========================================
// JeevanSetu - Trusted Contacts
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }

    loadContacts();

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const phone =
            document.getElementById("contactPhone").value.trim();

        const relation =
            document.getElementById("contactRelation").value;


        if (!name || !phone || !relation) {

            alert("Please fill all contact details.");

            return;
        }


        if (!/^[0-9]{10}$/.test(phone)) {

            alert("Please enter a valid 10-digit mobile number.");

            return;
        }


        const contacts =
            JSON.parse(localStorage.getItem("jeevanSetuContacts")) || [];


        const newContact = {

            id: Date.now(),

            name: name,

            phone: phone,

            relation: relation
        };


        contacts.push(newContact);


        localStorage.setItem(
            "jeevanSetuContacts",
            JSON.stringify(contacts)
        );


        contactForm.reset();


        loadContacts();


        alert(
            `${name} has been added as a trusted contact.`
        );
    });

});


// ==========================================
// LOAD CONTACTS
// ==========================================

function loadContacts() {

    const contactsList =
        document.getElementById("contactsList");

    const contactCount =
        document.getElementById("contactCount");


    if (!contactsList || !contactCount) {
        return;
    }


    const contacts =
        JSON.parse(
            localStorage.getItem("jeevanSetuContacts")
        ) || [];


    contactCount.textContent =
        `${contacts.length} Contact${contacts.length === 1 ? "" : "s"}`;


    if (contacts.length === 0) {

        contactsList.innerHTML = `

            <div class="empty-contacts">

                <div>👥</div>

                <h3>No contacts added yet</h3>

                <p>
                    Add a trusted person above.
                </p>

            </div>

        `;

        return;
    }


    contactsList.innerHTML =
        contacts.map(contact => `

            <div class="saved-contact-card">

                <div class="contact-info">

                    <div class="contact-avatar">
                        👤
                    </div>

                    <div>

                        <h3>
                            ${escapeHTML(contact.name)}
                        </h3>

                        <p>
                            ${escapeHTML(contact.relation)}
                        </p>

                        <span>
                            📞 ${escapeHTML(contact.phone)}
                        </span>

                    </div>

                </div>


                <div class="contact-actions">

                    <a
                        href="tel:${contact.phone}"
                        class="call-contact-btn">
                        📞 Call
                    </a>

                    <button
                        type="button"
                        class="delete-contact-btn"
                        onclick="deleteContact(${contact.id})">
                        🗑️ Delete
                    </button>

                </div>

            </div>

        `).join("");
}


// ==========================================
// DELETE CONTACT
// ==========================================

function deleteContact(id) {

    const contacts =
        JSON.parse(
            localStorage.getItem("jeevanSetuContacts")
        ) || [];


    const contact =
        contacts.find(item => item.id === id);


    if (!contact) {
        return;
    }


    const confirmDelete =
        confirm(
            `Delete ${contact.name} from trusted contacts?`
        );


    if (!confirmDelete) {
        return;
    }


    const updatedContacts =
        contacts.filter(item => item.id !== id);


    localStorage.setItem(
        "jeevanSetuContacts",
        JSON.stringify(updatedContacts)
    );


    loadContacts();
}


// ==========================================
// SECURITY - ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}

// ==========================================
// JeevanSetu - First Aid
// ==========================================

function showFirstAid(type) {

    const firstAidData = {

        bleeding: {
            title: "🩸 Severe Bleeding",
            description:
                "Heavy bleeding can become life-threatening quickly.",
            steps: [
                "Call emergency medical help for severe or uncontrolled bleeding.",
                "Apply firm, direct pressure to the wound using clean cloth or gauze.",
                "Keep pressure on the wound and do not repeatedly lift the cloth to check it.",
                "If blood soaks through, add more cloth or gauze on top and continue pressure.",
                "Keep the person as still and calm as possible."
            ],
            warning:
                "Do not remove deeply embedded objects from a wound."
        },

        burns: {
            title: "🔥 Burns",
            description:
                "For a minor thermal burn, cool the affected area promptly.",
            steps: [
                "Move away from the source of heat if it is safe to do so.",
                "Cool the burn under cool running water for about 20 minutes.",
                "Remove jewellery or tight items near the burn if they are not stuck to the skin.",
                "Cover the burn loosely with a clean, non-stick dressing.",
                "Seek urgent medical help for large, deep, electrical or chemical burns."
            ],
            warning:
                "Do not apply ice, butter, toothpaste or other household substances to a burn."
        },

        fainting: {
            title: "😵 Fainting",
            description:
                "If someone faints, protect them from injury and check their breathing.",
            steps: [
                "Help the person lie down safely.",
                "Check whether they are breathing normally.",
                "If they recover, let them rest and rise slowly.",
                "If they do not regain consciousness promptly or are not breathing normally, call emergency services immediately.",
                "Stay with the person until help arrives."
            ],
            warning:
                "If the person is unconscious but breathing, place them in the recovery position when appropriate."
        },

        breathing: {
            title: "🫁 Breathing Problem",
            description:
                "Severe difficulty breathing is an emergency.",
            steps: [
                "Call emergency medical services for severe or worsening breathing difficulty.",
                "Help the person sit in a comfortable position.",
                "Loosen tight clothing around the neck and chest.",
                "Help them use their prescribed emergency inhaler or medication if they have one.",
                "Stay with them and monitor their condition."
            ],
            warning:
                "Do not give food or drink to someone who is struggling severely to breathe."
        },

        cpr: {
            title: "❤️ CPR",
            description:
                "If an adult is unresponsive and not breathing normally, emergency help is needed immediately.",
            steps: [
                "Call emergency services or ask someone nearby to call.",
                "If an AED is available, ask someone to bring it.",
                "Start chest compressions if you are trained or follow instructions from the emergency dispatcher.",
                "Use an AED as soon as it becomes available and follow its voice instructions.",
                "Continue until professional help takes over or the person shows clear signs of recovery."
            ],
            warning:
                "CPR is an emergency procedure. Follow your local emergency dispatcher's instructions."
        },

        snakebite: {
            title: "🐍 Snake Bite",
            description:
                "A suspected venomous snake bite requires urgent medical evaluation.",
            steps: [
                "Move away from the snake and keep the person calm.",
                "Call emergency medical services or arrange urgent transport to a medical facility.",
                "Keep the bitten limb still and as comfortable as possible.",
                "Remove rings, watches or other tight items before swelling develops.",
                "If safe, remember the snake's appearance for medical staff, but do not try to catch it."
            ],
            warning:
                "Do not cut the wound, suck out venom, apply a tourniquet or attempt to catch the snake."
        },

        electric: {
            title: "⚡ Electric Shock",
            description:
                "Electrical injuries can cause serious internal damage even when the skin looks normal.",
            steps: [
                "Do not touch the person while they are still connected to the electrical source.",
                "Switch off the electricity at the source if it is safe to do so.",
                "Call emergency medical services for significant electrical shocks.",
                "Check breathing and responsiveness once the electrical source is disconnected.",
                "Stay with the person until professional help arrives."
            ],
            warning:
                "Never approach a person in contact with a high-voltage electrical source."
        },

        fracture: {
            title: "🦴 Possible Fracture",
            description:
                "A suspected broken bone should be protected from further movement.",
            steps: [
                "Keep the injured area as still as possible.",
                "Do not try to straighten or push the bone back into position.",
                "If there is bleeding, control it without putting pressure directly on a protruding bone.",
                "Use a cold pack wrapped in cloth around the area to help with swelling if appropriate.",
                "Seek medical evaluation as soon as possible."
            ],
            warning:
                "Do not move someone unnecessarily if you suspect a serious spine, neck or head injury."
        }

    };


    const data = firstAidData[type];

    if (!data) {
        return;
    }


    const modal =
        document.createElement("div");

    modal.id =
        "firstAidModal";


    modal.innerHTML = `

        <div class="first-aid-overlay">

            <div class="first-aid-modal">

                <h2>
                    ${data.title}
                </h2>

                <p>
                    ${data.description}
                </p>


                <ol class="first-aid-steps">

                    ${data.steps.map(step => `
                        <li>${step}</li>
                    `).join("")}

                </ol>


               <div class="first-aid-warning">

    ⚠️
    <strong>Important:</strong>
    ${data.warning}

</div>

<div class="first-aid-emergency-actions">

    <a
        href="tel:112"
        class="first-aid-call-btn">
        🚨 Call Emergency 112
    </a>

    <button
        type="button"
        class="first-aid-location-btn"
        onclick="getLocation();">
        📍 Share My Location
    </button>

    <button
        type="button"
        class="first-aid-hospital-btn"
        onclick="findHospital();">
        🏥 Find Nearby Hospital
    </button>

    <button
        type="button"
        class="close-first-aid"
        onclick="closeFirstAid();">
        ✖ Close
    </button>

</div>

`;


    document.body.appendChild(modal);
}


// ==========================================
// CLOSE FIRST AID
// ==========================================

function closeFirstAid() {

    const modal =
        document.getElementById("firstAidModal");

    if (modal) {
        modal.remove();
    }
}

// ==========================================
// FIRST AID SEARCH
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("firstAidSearch");

    const cards =
        document.querySelectorAll(".first-aid-card");

    const noResult =
        document.getElementById("noFirstAidResult");


    if (!searchInput || !cards.length) {
        return;
    }


    searchInput.addEventListener("input", () => {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();


        let visibleCards = 0;


        cards.forEach(card => {

            const searchData =
                card.dataset.aid.toLowerCase();

            const cardText =
                card.innerText.toLowerCase();


            const match =
                searchText === "" ||
                searchData.includes(searchText) ||
                cardText.includes(searchText);


            if (match) {

                card.style.display = "";

                visibleCards++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleCards === 0) {

            noResult.style.display = "block";

        } else {

            noResult.style.display = "none";

        }

    });

}); 

function hideTypingIndicator() {

    const typing =
        document.getElementById("typingIndicator");

    if (typing) {
        typing.remove();
    }
}