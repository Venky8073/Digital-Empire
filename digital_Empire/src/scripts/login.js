export const validateLogin = (users, username, password) => {
  console.log(users, username, password, "inside js file");
  let flag = false;
  users.forEach(element => {
    let newUser = element.user;
    let newPwd = element.pwd;
    if (newUser.toString() === username && newPwd.toString() === password) {
      flag = true;
    }
  });
  return flag;
}