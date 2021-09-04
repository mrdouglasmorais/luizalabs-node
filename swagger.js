module.exports = {
  swagger: '2.0',
  info: {
    description: 'Documentação de API',
    version: '1.0.0',
    title: 'Luiza Coders',
    contact: { email: 'mr.douglasmorais23@gmail.com'}
  },
  host: 'http://localhost:3000',
  schema: ['http'],
  paths: {
    '/users': {
      post: {
        tags: [
          'Users',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Você deve passar o email e password no body',
            required: true,
            schema: { $ref: '#/definitions/CreateUserBody' },
          },
        ],
        summary: 'Cadastra um usuário na base',
        description: '',
        operationId: 'add',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: { $ref: '#/definitions/CreateUser' },
            },
          },
          409: { description: 'Usuário já cadastrado' },
        },
      },
    },
    '/session': {
      post: {
        tags: [
          'Login',
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Você deve passar o email e password no body',
            required: true,
            schema: { $ref: '#/definitions/LoginBody' },
          },
        ],
        summary: 'Realiza o login da aplicação',
        description: '',
        operationId: 'login',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: { $ref: '#/definitions/Login' },
            },
          },
          401: { description: 'Usuário não autorizado' },
        },
      },
    },
  },
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header',
    },
  },
  definitions: {
    Users: {
      type: 'object',
      required: [
        'name',
        'email',
        'password',
      ],
      properties: {
        id: {
          type: 'integer',
          format: 'integer',
        },
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      xml: { name: 'Usuario' },
    },
    Login: {
      type: 'object',
      required: [
        'email',
        'password',
      ],
      properties: {
        user: {
          type: 'object',
          id: {
            type: 'integr',
            format: 'uuid',
          },
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
        token: { type: 'bearear' },
      },
      xml: { name: 'Usuario' },
    },
    LoginBody: {
      type: 'object',
      required: [
        'email',
        'password',
      ],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      xml: { name: 'Usuario' },
    },
    CreateUser: {
      type: 'object',
      required: [
        'email',
        'password',
      ],
      properties: {
        id: {
          type: 'integr',
          format: 'uuid',
        },
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      xml: { name: 'Usuario' },
    },
    CreateUserBody: {
      type: 'object',
      required: [
        'email',
        'password',
      ],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      xml: { name: 'Usuario' },
    },
  },
  externalDocs: {
    description: 'Acesse o repositorio',
    url: 'http://github.com',
  },
}