const User = require('../models/User');
const bcrypt = require('bcrypt');
module.exports = class UserController {

    static async register(req, res) {

        const { name, email, phone, password, confirmpassword } = req.body;

        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' });
            return;
        }

        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório' });
            return;

        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatório' });
            return;

        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatório' });
            return;

        }

        if (password !== confirmpassword) {
            res.status(422).json({ message: 'A senhas não conferem!' });
        }

        // Check if User exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(422).json({ message: 'E-mail já utilizado!' })
            return;
        }

        //Create password

        const salt = await bcrypt.genSalt(12);

        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({ name, email, phone, password: passwordHash })

        try {
            const newUser = await user.save();

            res.status(201).json({
                message: 'Usuário criado',
                newUser
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }
}