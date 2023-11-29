const UserDTO = require("../Models/UserDTO");

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUserByEmail(email) {
        try {
            const user = await UserDTO.fromEntity(this.userRepository.getUserByEmail(email));
            console.log("user", user);

            return user;
        } catch (err) {
            throw err;
        }
    }

    // Remove logout method or modify as needed
}

module.exports = UserService;