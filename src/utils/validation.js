
const Email = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); 

export function validationRegister (name, email, phone, password, confirmPassword, CountryCode)  {
    if(!name || !email || !phone || !password || !confirmPassword) {
        console.log("sadad");
        return "Fill the all inputs!"
    }
    else{
        if(password !== confirmPassword){
            return "Password and Confirm Password not matched!";
        }

        else if(CountryCode === "in" && phone.length !== 12){
            return "Enter the valid phone number!";
        } 
        else if(Email.test(email) === false){
            return "Enter the valid email address!";
        }

        else return "success"   
    }
}

export function validationLogin (name, email, phone, password) {
    if(!name || !email || !phone || !password) {
        return "Fill the all inputs!";
    }
    else{
        if(phone.length < 9){
            return "Enter the valid phone number!";
        }
        else if(Email.test(email) === false){
            return "Enter the valid email address!";
        }
        else return "success"   
    }
}