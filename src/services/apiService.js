export function create(data) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        
    "user": {
        "email": data["email"],
        "password": data['password'],
        "password_confirmation": data['confirmPassword']
    }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://direct-shifts.herokuapp.com/users/signup", requestOptions)
        .then(response => {
            console.log(response.status)
            if (response.status === 201) {
                alert("Successfully created account! Login to continue.");
            } else {
                alert("Error creating account!");
            }
        })
        .catch(error => {
            alert('Sign up failed!')
        });
}

export function login(data) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "user": {
        "email": data["login_email"],
        "password": data['login_password']
    }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://direct-shifts.herokuapp.com/users/login", requestOptions)
        .then(response => {
            if (response.status === 200) {
                response.text().then(result => {
                    localStorage.setItem('token', JSON.parse(result)["token"]);
                    localStorage.setItem('id', JSON.parse(result)["user"]["id"]);
                    window.location.href = "/";
                });
            } else {
                alert('Login failed!');
            }
            })
        .catch(error => console.log('error', error));
}

export function refer(data) {
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem('token'));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://direct-shifts.herokuapp.com/users/users/${localStorage.getItem('id')}/send_referal?referal_user=${data["email"]}`, requestOptions)
    .then(response => {
        if (response.status === 200) {
            alert("Successfully referred!");
        } else {
            alert("Error sending referral!");
        }
    })
    .catch(error => alert('Error sending referral!'));
}
