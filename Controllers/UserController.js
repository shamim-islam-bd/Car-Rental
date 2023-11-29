
class UserController {
    constructor(userService) {
        this.userService = userService;
    }


    async register(username, email, password, role) {
        const existingUser = await this.userService.getUserByEmail(email);

        if (existingUser) {
            throw new Error('Email already exists');
        }

        const newUser = await this.userService.createUser(username, email, password, role);
        console.log("User created: ", newUser);

        return newUser;
    }


    async login(email, password) {
        const user = await this.userService.getUserByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = user.password === password;

        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        return { user };
    }

    // Modify or remove logout method as needed

    async getUsers(req, res) {
        const users = await this.userService.getUsers();
        res.json(users);
    }
}






module.exports = UserController;
