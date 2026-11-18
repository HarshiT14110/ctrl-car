emailjs.init({
    publicKey: "zPi_TSmSGrzEfY56t"
});

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       TEST DRIVE MODAL
    ========================================================= */

    const modal = document.getElementById("testDriveModal");
    const closeButton = document.getElementById("closeTestDrive");
    const form = document.getElementById("testDriveForm");

    const bookButtons = document.querySelectorAll(".book-test-drive");

    /* =========================================================
       CAR DATABASE
    ========================================================= */

    const cars = {

        Luxury: [
            "Mercedes-Benz S-Class",
            "BMW 7 Series",
            "Range Rover",
            "Mercedes-Benz GLS",
            "Porsche Panamera"
        ],

        Vintage: [
            "Ford Mustang",
            "Jaguar E-Type",
            "Mercedes-Benz 300 SL",
            "Porsche 911"
        ],

        Sports: [
            "Chevrolet Corvette C8",
            "Ferrari 296 GTB",
            "Lamborghini Huracan",
            "Nissan GT-R",
            "Porsche 911 GT3"
        ]

    };


    /* =========================================================
       OPEN MODAL
    ========================================================= */

    function openTestDrive() {

        if (!modal) return;

        modal.classList.add("active");

        document.body.classList.add("test-drive-open");

    }


    /* =========================================================
       CLOSE MODAL
    ========================================================= */

    function closeTestDrive() {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.classList.remove("test-drive-open");

    window.location.href = "index.html";

}

/* =========================================================
   SUCCESS POPUP — CLOSE BUTTON
   ========================================================= */

const successCloseButton =
    document.getElementById("closeSuccessButton");

if (successCloseButton) {

    successCloseButton.addEventListener("click", function () {

        window.location.href = "index.html";

    });

}


    /* =========================================================
       BOOK TEST DRIVE BUTTONS
       Navbar + Footer
    ========================================================= */

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            openTestDrive();

        });

    });


    /* =========================================================
       CLOSE BUTTON
    ========================================================= */

    if (closeButton) {

        closeButton.addEventListener("click", function () {

            closeTestDrive();

        });

    }


    /* =========================================================
       CLICK OUTSIDE MODAL TO CLOSE
    ========================================================= */

    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {

                closeTestDrive();

            }

        });

    }


    /* =========================================================
       ESC KEY TO CLOSE
    ========================================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeTestDrive();

        }

    });


    /* =========================================================
       COLLECTION → CAR DROPDOWN
    ========================================================= */

    const categorySelect = document.getElementById("carCategory");
    const carSelect = document.getElementById("carModel");


    if (categorySelect && carSelect) {

        categorySelect.addEventListener("change", function () {

            const selectedCategory = categorySelect.value;

            carSelect.innerHTML = "";

            if (!selectedCategory || !cars[selectedCategory]) {

                carSelect.disabled = true;

                const defaultOption = document.createElement("option");

                defaultOption.value = "";

                defaultOption.textContent = "Select Collection First";

                carSelect.appendChild(defaultOption);

                return;

            }


            carSelect.disabled = false;


            const defaultOption = document.createElement("option");

            defaultOption.value = "";

            defaultOption.textContent = "Select Automobile";

            carSelect.appendChild(defaultOption);


            cars[selectedCategory].forEach(function (car) {

                const option = document.createElement("option");

                option.value = car;

                option.textContent = car;

                carSelect.appendChild(option);

            });

        });

    }


    /* =========================================================
       CITY SELECTION
    ========================================================= */

    const cityOptions = document.querySelectorAll(".city-option");


    cityOptions.forEach(function (city) {

        city.addEventListener("click", function () {

            cityOptions.forEach(function (item) {

                item.classList.remove("selected");

            });

            city.classList.add("selected");

        });

    });


    /* =========================================================
       DATE — DO NOT ALLOW PAST DATES
    ========================================================= */

    const dateInput = document.getElementById("driveDate");


    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(today.getMonth() + 1).padStart(2, "0");

        const day = String(today.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;

        dateInput.min = formattedDate;

    }


    /* =========================================================
       FORM SUBMISSION
       
       FOR NOW:
       Show success message.
       
       EMAILJS WILL BE ADDED IN STAGE 2.
    ========================================================= */

    if (form) {
    form.addEventListener("submit", function (e) {

    e.preventDefault();

    const submitButton = form.querySelector(
    'button[type="submit"]'
);

    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = "SENDING REQUEST...";
Promise.all([

    // Email to CTRL+CAR / Admin
    emailjs.sendForm(
        "service_2xuwwcf",
        "template_k9gpogn",
        form
    ),

    // Confirmation email to customer
    emailjs.sendForm(
        "service_2xuwwcf",
        "template_7keko8r",
        form
    )

])
.then(function () {

    submitButton.disabled = false;
    submitButton.innerHTML = originalText;

    form.style.display = "none";

    document
        .getElementById("testDriveSuccess")
        .classList.add("active");

})
.catch(function (error) {

    console.error("EmailJS Error:", error);

    submitButton.disabled = false;
    submitButton.innerHTML = originalText;

    alert(
        "We couldn't submit your test drive request. Please try again."
    );

});

});

    }


    /* =========================================================
       RESET FORM WHEN MODAL CLOSES
    ========================================================= */

    if (modal) {

        modal.addEventListener("transitionend", function () {

            if (!modal.classList.contains("active")) {

                if (form) {

                    form.reset();

                    form.style.display = "";

                }

                if (carSelect) {

                    carSelect.innerHTML =
                        '<option value="">Select Collection First</option>';

                    carSelect.disabled = true;

                }

                cityOptions.forEach(function (city) {

                    city.classList.remove("selected");

                });


                const successMessage =
                    document.getElementById("testDriveSuccess");

                if (successMessage) {

                    successMessage.classList.remove("active");

                }


                const steps =
                    document.querySelector(".test-drive-steps");

                if (steps) {

                    steps.style.display = "";

                }

            }

        });

    }

});