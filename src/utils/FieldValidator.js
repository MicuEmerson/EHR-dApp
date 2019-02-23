export default class FieldValidator {
  
  checkNumber(number){
    return /^\d+$/.test(number);
  }
  checkOnlyLetters(word){
    return /^[a-zA-Z]+$/.test(word);
  }
  checkEmail(email){
    return /\S+@\S+\.\S+/.test(email);
  }
  checkEmpty(field){
    return field === "";
  }
}