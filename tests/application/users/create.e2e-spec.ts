import request from 'supertest'
import { app } from '#/app'
import { prisma } from '#/infra/db/prisma'
import { CreateUser } from '#/domain/use-cases/users'

describe('Create User e2e tests', () => {
  const userMock: CreateUser.InputDto = {
    full_name: 'John Doe',
    cpf: '000.000.000-00',
    email: 'email@test.com',
    favorite_color: 'red',
    observations: 'Lorem ipsum dolor sit amet',
  }

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    const deleteUser = prisma.user.deleteMany()
    await prisma.$transaction([deleteUser])
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a user', async () => {
    await request(app.server).post('/users').send(userMock).expect(201)
  })

  it('should return 400 if tries to create a user without required fields', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({})
      .expect(400)

    expect(response.body).toEqual({
      err: {
        name: 'InvalidFieldError',
        notificationErrors: {
          context: 'User',
          messages: {
            full_name: {
              _errors: ['Required'],
            },
            cpf: {
              _errors: ['Required'],
            },
            email: {
              _errors: ['Required'],
            },
            favorite_color: {
              _errors: ['Required'],
            },
            observations: {
              _errors: ['Required'],
            },
          },
        },
      },
    })
  })

  it('should return 400 if tries to create a user with invalid cpf', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        ...userMock,
        cpf: 'invalid_cpf',
      })
      .expect(400)

    expect(response.body).toEqual({
      err: {
        name: 'InvalidFieldError',
        notificationErrors: {
          context: 'User',
          messages: {
            cpf: {
              _errors: ['Invalid CPF'],
            },
          },
        },
      },
    })
  })

  it('should return 400 if tries to create a user with invalid favorite_color', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        ...userMock,
        favorite_color: 'invalid_color',
      })
      .expect(400)

    expect(response.body).toEqual({
      err: {
        name: 'InvalidFieldError',
        notificationErrors: {
          context: 'User',
          messages: {
            favorite_color: {
              _errors: [
                "Invalid enum value. Expected 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet', received 'invalid_color'",
              ],
            },
          },
        },
      },
    })
  })

  it('should return 400 if send an invalid JSON format', async () => {
    const json = '{"invalid_json": "invalid_json",}'
    const response = await request(app.server)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send(json)
      .expect(400)

    expect(response.body).toEqual({
      message: 'Invalid JSON',
    })
  })

  it('should return 400 if send an Unsupported Media', async () => {
    const response = await request(app.server)
      .post('/users')
      .send('invalid_json')
      .expect(400)

    expect(response.body).toEqual({
      message: 'Unsupported Media Type: application/x-www-form-urlencoded',
    })
  })

  it('should 409 if tries to create a user with an already used cpf', async () => {
    await request(app.server).post('/users').send(userMock).expect(201)
    const response = await request(app.server)
      .post('/users')
      .send({
        ...userMock,
        email: 'other_email@test.com',
      })
      .expect(409)

    expect(response.body).toEqual({
      message: 'User with same email or cpf already exists',
    })
  })

  it('should return 409 if tries to create a user with an already used email', async () => {
    await request(app.server).post('/users').send(userMock).expect(201)
    const response = await request(app.server)
      .post('/users')
      .send({
        ...userMock,
        cpf: '111.111.111-11',
      })
      .expect(409)

    expect(response.body).toEqual({
      message: 'User with same email or cpf already exists',
    })
  })

  it('should return 500 if controller throws an unknown error', async () => {
    jest.spyOn(prisma.user, 'create').mockImplementationOnce(() => {
      throw new Error('Test throw')
    })

    const response = await request(app.server)
      .post('/users')
      .send(userMock)
      .expect(500)

    expect(response.body).toEqual({
      message: 'Internal server error',
    })
  })
})
