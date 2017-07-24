/**
 * Created by Administrator on 2017/7/13.
 */
function User(username, password, id, phone, email) {
    this.username = username;
    this.password = password;
    this.id = id;
    this.phone = phone;
    this.email = email;
}

module.exports = User;