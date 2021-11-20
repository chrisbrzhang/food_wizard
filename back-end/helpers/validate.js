
exports.isValidAuthenticationRequest = (user) => {
  if (!user.username) {
    return [false, "A username is required to authenticate."];
  }
  if (!user.password) {
    return [false, "A password is required to authenticate."];
  }
  if (typeof(user.username) !== "string") {
    return [false, "Username must be a string value."];
  }
  if (typeof(user.password) !== "string") {
    return [false, "Password must be a string value."];
  }
  if (user.username === "") {
    return [false, "Username cannot be an empty string."];
  }
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (!user.password.match(regex)) {
    return [false, "Password must be a minimum six characters, and contain at least one uppercase letter, one lowercase letter, and one digit. Special characters are not allowed."]
  }
  return [true, "This is a valid request."];
}