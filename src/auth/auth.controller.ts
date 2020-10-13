import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { UserService } from '../user/user.service'

import { User } from '@prisma/client'
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

@Controller('user')
export class AuthController {

    constructor(
        private userService: UserService,
    ) { }


    @Post('/signup')
    public async signup(@Res() res, @Body() data): Promise<User> {
        // data.secret = bcrypt.hashSync(data.secret, 10);
        const newUser = await this.userService.create(data)
        console.log('newUser:')
        console.dir(newUser)

        if (newUser.hasOwnProperty('id')) return res.status(201).json({
            id: newUser['id'],
            fullname: newUser['fullname'],
            email: newUser['email'],
            cpf: newUser['cpf'],
            role: newUser['role'],
            datebirth: newUser['datebirth'],
            nickname: newUser['nickname'],
        })
        return res.status(400).json(newUser)
        // const userCreated = await this.userService.create(data)
        // if
        // return res.status(201).send({ id: userCreated.id, email: userCreated.email });
    }


    @Post('/signin')
    public async autenticar(@Res() res, @Body() data): Promise<any> {
        console.dir(data)
        if (data.email === '' || data.secret === '') {
            return res.status(400).json({ auth: false, message: 'Os campos devem ser preenchidos corretamente' });
        }

        try {

            const existsUser = await this.userService.getByEmail(data.email);
            console.dir(existsUser)

            if (existsUser?.email != null) {
                const userLoggedIn = await bcrypt.compare(data.secret, existsUser.secret);
                console.dir(userLoggedIn)
                if (userLoggedIn) {
                    const secret = process.env.SERVER_SECRET_TOKEN || 'Currículo→Único';
                    const token = jwt.sign({ email: data.email, _id: data.id }, secret, { expiresIn: '2h' });

                    console.log('\nUsuario', data.email, 'acaba de fazer login no sistema');
                    console.log("x-access-token:", token, '\n');

                    res.status(200).json({
                        auth: true,
                        _id: data.id,
                        email: data.email,
                        expiresIn: '2h',
                        token: token
                    });

                } else {
                    console.log('Senha incorreta')
                    res.status(401).json({ auth: false, message: 'Email ou senha não confere' });
                }

            } else {
                console.log('Email não encontrado')
                res.status(401).json({ auth: false, message: 'Email ou senha não confere' });
            }

            return data;

        } catch (err) {
            res.status(500).json({ auth: false, message: err });
        }
    }

}


