(function() {

    // function for checking input validation
    function validCheck() {
        let month = (inputFields[1].value[0] == 0) ? inputFields[1].value[1] : inputFields[1].value;
        let flag = true;
        for(let i = 0; i < inputFields.length; i++) {
            if(inputFields[i].value == "") {
                errorMsg[i].textContent = "This field is required";
                inputFields[i].classList.add('invalid');
                inputName[i].style.color = "hsl(0, 100%, 67%)";
                flag = false;
            }
        }
        if(inputFields[0].value > 31) {
                errorMsg[0].textContent = "Must be a valid date";
                inputFields[0].classList.add('invalid');
                inputName[0].style.color = "hsl(0, 100%, 67%)";
                flag = false;
        }
        if (inputFields[1].value > 12) {
                errorMsg[1].textContent = "Must be a valid month";
                inputFields[1].classList.add('invalid');
                inputName[1].style.color = "hsl(0, 100%, 67%)";
                flag = false;
        }
        if(inputFields[2].value > currentYear) {
                errorMsg[2].textContent = "Must be in the past";
                inputFields[2].classList.add('invalid');
                inputName[2].style.color = "hsl(0, 100%, 67%)";
        }
        if(inputFields[0].value != "" && inputFields[1].value != "") {
                if (inputFields[0].value > allMonths[month].days) {
                    errorMsg[0].textContent = "Must be a valid date";
                    inputFields[0].classList.add('invalid');
                    inputName[0].style.color = "hsl(0, 100%, 67%)";
                    flag = false;
                    }
        }

        if(flag == true) {
            return true;
        } else {
            for(let i = 0; i < inputFields.length; i++) {
                if(!inputFields[i].classList.contains('invalid')) {
                    if(screen.width <= 376) {
                        errorMsg[i].innerHTML = "<br><br>";
                    } else {
                        errorMsg[i].innerHTML = "<br>";
                    }
                }
            }
            return false;
        }
    }

    // function for calculating age
    function calculateAge(day, month, year) {
        if (userDay > currentDay) {
            currentDay += allMonths[currentMonth - 1].days;
            currentMonth--;
        }
        if(userMonth > currentMonth) {
            currentMonth += 12;
            currentYear--;
        }
        let yearDiff = currentYear - userYear;
        let monthDiff = currentMonth - userMonth;
        let dayDiff = currentDay - userDay;
        
        return [yearDiff, monthDiff, dayDiff];

    }

    let allMonths = {
        1: {
            "name": "January",
            "days": 31
            },
        2: {
            "name": "February",
            "days": 28
            },
        3: {
            "name": "March",
            "days": 31
            },
        4: {
            "name": "April",
            "days": 30
            },
        5: {
            "name": "May",
            "days": 31
            },
        6: {
            "name": "June",
            "days": 30
            },
        7: {
            "name": "July",
            "days": 31
            },
        8: {
            "name": "August",
            "days": 31
            },
        9: {
            "name": "September",
            "days": 30
            },
        10: {
            "name": "October",
            "days": 31
            },
        11: {
            "name": "November",
            "days": 30
            },
        12: {
            "name": "December",
            "days": 31
            }
    }
    // console.log(allMonths[11].days)

    // DOM elements
    let inputFields = document.querySelectorAll('input');
    let errorMsg = document.querySelectorAll('.error');
    let inputName = document.querySelectorAll(".inptName");
    let calculatedDate = document.querySelectorAll('.result-container p span');

    // variables for storing user inputs
    let userDay;
    let userMonth;
    let userYear;

    // current date
    let d = new Date();
    let currentYear = d.getFullYear();
    let currentMonth = d.getMonth() + 1;
    let currentDay = d.getDate();

    document.getElementById('btn').addEventListener('click', function(event) {
        event.preventDefault();

        for(let i = 0; i < inputFields.length; i++) {

            inputFields[i].classList.remove('invalid');
            errorMsg[i].innerHTML = "";
            inputName[i].style.color = "hsl(0, 1%, 44%)";
        }       
        
        validCheck();

        if(validCheck()) {
            userDay = inputFields[0].value;
            userMonth = inputFields[1].value;
            userYear = inputFields[2].value;

            let date = calculateAge(userDay, userMonth, userYear);
            calculatedDate[0].textContent = date[0];
            calculatedDate[1].textContent = date[1];
            calculatedDate[2].textContent = date[2];
        } 

    });

    
}) ();